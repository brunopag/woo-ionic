import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { CustomerProvider } from '../../providers/customer/customer';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser:any = {};
  sameBillingShipping: boolean = true;
  emailValid: any = 'pristine';
  countries: any[] = [];
  states: any[] = [];
  states2: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public _usersProvider: UsersProvider,
    public alertCtrl: AlertController,
    public _customerProvider: CustomerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public _dataProvider: DataProvider) {
    this.newUser.billing = {};
    this.newUser.shipping = {};
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    this._dataProvider.getCountries().subscribe((resp: any) => {
      console.log(resp);
       this.countries = resp.countries;
       loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  registrarme() {
    console.log(this.newUser);
    this._usersProvider.createUser(this.newUser).subscribe((resp: any) => {
      console.log(resp);
      const alert = this.alertCtrl.create({
        title: 'Usuario Creado!',
        subTitle: 'El Usuario ' + resp.user.first_name + ' fué creado correctamente.',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  showAlert() {
    
  }

  setBillingToShipping() {
    this.sameBillingShipping = !this.sameBillingShipping;
  }

  checkEmail(){

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.newUser.email)){
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

  signup() {
    let data: any = {
      email: this.newUser.email,
      first_name: this.newUser.first_name,
      last_name: this.newUser.last_name,
      username: this.newUser.username,
      password: this.newUser.password,
      billing: {
        address_1: this.newUser.billing.address_1,
        address_2: this.newUser.billing.address_2,
        city: this.newUser.billing.city,
        state: this.newUser.billing.state,
        postcode: this.newUser.billing.postcode,
        country: this.newUser.billing.country,
        phone: this.newUser.billing.phone
      }
    };

    data.shipping = {};

    if(this.sameBillingShipping) {
      data.shipping = data.billing
    } else {
      data.shipping = {
        address_1: this.newUser.shipping.address_1,
        address_2: this.newUser.shipping.address_2,
        city: this.newUser.shipping.city,
        state: this.newUser.shipping.state,
        postcode: this.newUser.shipping.postcode,
        country: this.newUser.shipping.country,
      }
    }

    this._customerProvider.createCustomer(data).subscribe((resp: any) => {
      console.log(resp);
      if(!resp.customerCreated.message){
        this.toastCtrl.create({
          message: "Usuario creado correctamente",
          duration: 3000
        }).present();
      } else {
        this.toastCtrl.create({
          message: "Error: " + resp.customerCreated.message,
          showCloseButton: true
        }).present();
      }
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
