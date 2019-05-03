import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductsProvider } from '../../providers/products/products';
import { CheckoutPage } from '../checkout/checkout';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any = [];
  loading: boolean = true;
  cartEmptyMessage: boolean = false;
  total: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              private storage: Storage,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public _productsProvider: ProductsProvider,
              public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
          content: 'Cargando...'
          });
    loading.present();

    this.storage.ready().then(() => {
      this.storage.get('cart').then((data) => {
        if(data && data.length > 0) {
          this._productsProvider.updateCartItems(data).subscribe((resp: any) => {
            console.log(resp);
            this.cartItems = resp.cartItemsUpdated;
            this.calculateTotal();
            this.storage.set('cart', this.cartItems);
            loading.dismiss();
            this.loading = false
          })
        } else {
          this.cartEmptyMessage = true
          loading.dismiss();
          this.loading = false;
        }
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  removeItem(item: any, i: number) {
    const confirm = this.alertCtrl.create({
      title: 'Desea quitar el producto del carrito?',
      message: item.product.name,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Agree clicked');
            this.cartItems.splice(i, 1);
            this.calculateTotal();
            this.storage.set('cart', this.cartItems);
            const toast = this.toastCtrl.create({
              message: 'Producto quitado correctamente.',
              duration: 2500
            });
            toast.present();
          }
        }
      ]
    });
    confirm.present();
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  checkout() {
    this.storage.get('customerLoginInfo').then((data) => {
      if(data != null) {
        this.navCtrl.push(CheckoutPage, {login: true});
      } else {
        this.navCtrl.push(LoginPage, { next: CheckoutPage });
      }
    })
  }

  calculateTotal() {
    this.total = 0
    if(this.cartItems.length > 0) {
      for(let item of this.cartItems) {
        this.total = this.total + (item.qty * parseFloat(item.product.price))
      }
    }
  }

}
