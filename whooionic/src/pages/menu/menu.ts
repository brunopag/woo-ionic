import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';
import { ProductsProvider } from '../../providers/products/products';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';

//Storage Module
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any;
  categories:any[];
  customerLoged: boolean;
  customer: any;

  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public modalCtrl: ModalController,
              public _productsProvider: ProductsProvider) {
    this.customer = {};
    this.homePage = HomePage;
    this._productsProvider.getMenuProductsCategories().subscribe((resp: any) => {
      console.log(resp);
      this.categories = resp.categories;
    })
  }

  ionViewDidEnter() {
    
    this.storage.ready().then(() => {
      this.storage.get('customerLoginInfo').then((customerLoginInfo) => {
        if(customerLoginInfo != null) {
          this.customer = customerLoginInfo.resp.user;
          this.customerLoged = true;
        } else {
          this.customer = {};
          this.customerLoged = false;
        }
      })
    })

  }

  loadProductsCategories() {

  }

  openPage(page: string) {
    if(page === 'registro') {
      this.navCtrl.push(SignupPage);
    } else if(page === 'login') {
      this.navCtrl.push(LoginPage);
    } else if(page === 'logout') {
      this.storage.remove('customerLoginInfo').then(() => {
        this.customer = {};
        this.customerLoged = false;
      })
    } else if(page === 'cart') {
      const modal = this.modalCtrl.create(CartPage);
      modal.present();
    }
  }

  openCategory(category: any) {
    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category })
  }

  goHome() {
    this.childNavCtrl.setRoot(HomePage);
  }

}
