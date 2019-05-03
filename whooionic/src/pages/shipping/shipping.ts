import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShippingProvider } from '../../providers/shipping/shipping';


@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {

  order: any;
  shippingMethods: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _shippingProvider: ShippingProvider,
              public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Calculando Envío...'
    });
    loading.present();
    this.order = this.navParams.get('order');
    console.log(this.order);
    this._shippingProvider.calculateShipping(this.order.shipping.country, 
                                              this.order.shipping.state, 
                                              this.order.shipping.postcode).subscribe((resp: any) => {
        console.log(resp);
        this.shippingMethods = resp.methods;
        loading.dismiss();
                                              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingPage');
  }

  continue() {
    
  }

}
