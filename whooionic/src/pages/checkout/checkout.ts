import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomerProvider } from '../../providers/customer/customer';
import { ShippingPage } from '../shipping/shipping';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any = {};
  sameBillingShipping: boolean = true;
  emailValid: any = 'pristine';
  login: boolean;
  countries: any[] = [];
  states: any[] = [];
  states2: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: Storage,
              public toastCtrl: ToastController,
              public _customerProvider: CustomerProvider,
              public loadingCtrl: LoadingController,
              public _dataProvider: DataProvider) {
    this.newOrder.billing = {};
    this.newOrder.shipping = {};

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    this.login = this.navParams.get('login');

    if(this.login){
      this.storage.get('customerLoginInfo').then((data) => {
        console.log(data.resp.user);
        this._customerProvider.getCustomer(data.resp.user.email).subscribe((resp: any) => {
          console.log(resp);
          this.newOrder = resp.customer;
          this._dataProvider.getCountries().subscribe((resp: any) => {
            console.log(resp);
             this.countries = resp.countries;
             if(this.newOrder.billing.country) {
                this.loadStates(this.newOrder.billing.country);
             }
             if(this.newOrder.shipping.country) {
              this.loadStates2(this.newOrder.shipping.country);
           }
             loading.dismiss();
          })
        })
      })
    } else {
      this._dataProvider.getCountries().subscribe((resp: any) => {
        console.log(resp);
         this.countries = resp.countries;
         loading.dismiss();
      })
    }

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  setBillingToShipping() {
    this.sameBillingShipping = !this.sameBillingShipping;
  }

  checkEmail(){

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.newOrder.email)){
      //email looks valid

      this.emailValid = true;

    } else {
      this.emailValid = false;
      this.toastCtrl.create({
        message: "Su email no es válido. Intente con otro email por favor.",
        showCloseButton: true
      }).present();

    }

  }

  continue() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    if(!this.login){
      this.signupCustomer().then((res: any) => {
        if(res) {
          console.log('usuario creado correctamente');
          this.loginCustomer(res.customerCreated.email, this.newOrder.password).then((resLogin: any) => {
            if(resLogin){
              loading.dismiss();
              this.navCtrl.push(ShippingPage, {order: this.newOrder});
            }
          })
        } else {
          console.log('usuario NO creado.');
          loading.dismiss();
        }
      });
    } else {
      loading.dismiss();
      this.navCtrl.push(ShippingPage, {order: this.newOrder});
    }
  }

  signupCustomer() {
    return new Promise((resolve, reject) => {
      let data: any = {
        email: this.newOrder.email,
        first_name: this.newOrder.first_name,
        last_name: this.newOrder.last_name,
        username: this.newOrder.username,
        password: this.newOrder.password,
        billing: {
          address_1: this.newOrder.billing.address_1,
          address_2: this.newOrder.billing.address_2,
          city: this.newOrder.billing.city,
          state: this.newOrder.billing.state,
          postcode: this.newOrder.billing.postcode,
          country: this.newOrder.billing.country,
          phone: this.newOrder.billing.phone
        }
      };
  
      data.shipping = {};
  
      if(this.sameBillingShipping) {
        data.shipping = data.billing
      } else {
        data.shipping = {
          address_1: this.newOrder.shipping.address_1,
          address_2: this.newOrder.shipping.address_2,
          city: this.newOrder.shipping.city,
          state: this.newOrder.shipping.state,
          postcode: this.newOrder.shipping.postcode,
          country: this.newOrder.shipping.country,
        }
      }
  
      this._customerProvider.createCustomer(data).subscribe((resp: any) => {
        console.log(resp);
        if(!resp.customerCreated.message){
          this.toastCtrl.create({
            message: "Usuario creado correctamente",
            duration: 3000
          }).present();
          resolve(resp);
        } else {
          this.toastCtrl.create({
            message: "Error: " + resp.customerCreated.message,
            showCloseButton: true
          }).present();
          resolve(false);
        }
      })
    });
    
  }

  loginCustomer(email: any, password: any) {
    return new Promise((resolve, reject) => {
      this._customerProvider.login(email, password).subscribe((res: any) => {
        console.log(res);
        this.storage.set('customerLoginInfo', res).then(data => {
          resolve(true);
        })
      });
    })
    
  }

  loadStates(country_id: any) {
    console.log('load states');
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    if(country_id) {
      this._dataProvider.getStates(country_id).subscribe((resp: any) => {
        this.states = resp.states;
        loading.dismiss();
      });
    }
  }

  loadStates2(country_id: any) {
    console.log('load states');
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    if(country_id) {
      this._dataProvider.getStates(country_id).subscribe((resp: any) => {
        this.states2 = resp.states;
        loading.dismiss();
      });
    }
  }

}
