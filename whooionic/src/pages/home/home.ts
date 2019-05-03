import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import { CarrouselProvider } from '../../providers/carrousel/carrousel';
import { ProductsProvider } from '../../providers/products/products';
import { UsersProvider } from '../../providers/users/users';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { ProductDetailsPage } from '../product-details/product-details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('productSlides') productSlides: Slides;
  @ViewChild('categoriesSlides') categoriesSlides: Slides;

  carrouselProducts: any[] = [];
  carrouselCategories: any[] = [];
  homeProducts:any[] = [];
  categorySelected:any;
  categories: any;
  category: string;

  constructor(public navCtrl: NavController, 
              public _carrouselProvider: CarrouselProvider,
              public _productsProvider: ProductsProvider,
              public _usersProvider: UsersProvider,
              public loadingCtrl: LoadingController ) {

    let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
    loading.present();

    this._productsProvider.getHomeProducts().subscribe((resp: any) => {
      console.log(resp);
      loading.dismiss();
      this.homeProducts = resp.homeProductsData;
      this.categories = resp.homeProductsData
      this.category = resp.homeProductsData[0].category.slug;
    })
  }

  ionViewDidLoad() {
    this._carrouselProvider.getCarrouselData().subscribe((resp: any) => {
      console.log(resp);
      if(resp.carrousel) {
        if(resp.products) {
          this.carrouselProducts = resp.products;
        } else if( resp.categories ) {
          this.carrouselCategories = resp.categories;
        }
        if(this.carrouselProducts.length > 0) {
          setInterval(() => {
            if( this.productSlides.getActiveIndex() == this.productSlides.length() -1 ) {
              this.productSlides.slideTo(0)
            } else {
              this.productSlides.slideNext()
            }
          }, 3000)
        }
        console.log(this.carrouselCategories);
        if(this.carrouselCategories.length > 0) {
          console.log('entro if')
          setInterval(() => {
            if( this.categoriesSlides.getActiveIndex() == this.categoriesSlides.length() -1 ) {
              this.categoriesSlides.slideTo(0)
            } else {
              this.categoriesSlides.slideNext()
            }
          }, 3000)
        }
      }
    })
    
  }

  openCategory(category: any) {
    this.navCtrl.push(ProductsByCategoryPage, { "category": category })
  }

  openProductDetails(product: any) {
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

}
