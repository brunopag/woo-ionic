import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { CartPage } from '../cart/cart';

//Storage Module
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: Storage, 
              public toastCtrl: ToastController,
              public modalCtrl: ModalController) {
    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  openCategory(category: any) {
    this.navCtrl.push(ProductsByCategoryPage, { "category": category })
  }

  addToCart(product: any) {

    this.storage.get('cart').then((data) => {
      console.log(data);

      if(data === null || data.length === 0) {
        data = [];

        data.push({
          'product': product,
          'qty': 1
        });

      } else {
        let added = 0;

        for(let i = 0; i < data.length; i++ ) {
          if(product.id === data[i].product.id) {
            let qty = data[i].qty;
            data[i].qty = qty + 1;
            added = 1;
          }
        }

        if(added === 0) {
          data.push({
            'product': product,
            'qty': 1
          });
        }

      }

      this.storage.set('cart', data).then(() => {
        console.log('cart updated');
        console.log(data);

        const toast = this.toastCtrl.create({
          message: 'Producto agregado al carrito :)',
          duration: 3000
        });
        toast.present();

      });

    });

  }

  openCart() {
    const modal = this.modalCtrl.create(CartPage);
    modal.present();
  }

}
