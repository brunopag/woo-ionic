import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CustomerProvider } from '../../providers/customer/customer';
//Storage Module
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public _customerProvider: CustomerProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
      });
    loading.present();
    this._customerProvider.login(this.username, this.password).subscribe((res: any) => {
      console.log(res);
      if(res.error){
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Usuario/Contraseña incorrectas',
          subTitle: 'Intente nuevamente.',
          buttons: ['Ok']
        });
        alert.present();
      } else {
        this.storage.set('customerLoginInfo', res).then(data => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Usuario Logeado!',
            subTitle: 'El Usuario ' + res.resp.user.firstname + ' ' + res.resp.user.lastname + ' inició sesion correctamente.',
            buttons: [{
              text:'OK',
              handler: () => {
                if(this.navParams.get('next')){
                  this.navCtrl.push(this.navParams.get('next'), { login: true });
                } else {
                  this.navCtrl.pop();
                }
              }
            }]
          });
          alert.present();
        })
      }
      
    });
  }

  createCustomer() {
    if(this.navParams.get('next')){
      this.navCtrl.push(this.navParams.get('next'), { login: false });
    } else {
      this.navCtrl.push(SignupPage);
    }
  }

}
