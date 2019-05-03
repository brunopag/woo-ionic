import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  products: any[];
  category: any;
  page: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _productsProvider: ProductsProvider,
              public loadingCtrl: LoadingController) {
    this.page = 1;
    this.category = this.navParams.get('category');
    console.log(this.category);
    this.loadProductsByCategory(this.category.id);
  }

  loadProductsByCategory(category_id: any) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this._productsProvider.getProductsByCategory(category_id, this.page).subscribe((resp: any) => {
      console.log(resp);
      loading.dismiss();
      this.products = resp.products;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event: any){
    this.page++;
    this._productsProvider.getProductsByCategory(this.category.id, this.page).subscribe((resp: any) => {
      let temp:any = resp.products;

      console.log(temp);

      if(temp.length > 0){
        this.products = this.products.concat(resp.products);
        console.log(this.products);
        event.complete();
  
        if(temp.length < 10) {
          event.enable(false);
        }
      } else {
        event.complete();
      }
      
    })
  }

  openProductDetails(product: any) {
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

}
