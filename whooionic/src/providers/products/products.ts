import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ID, URL_SERVICES } from '../../../config/config';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
  }

  getHomeProducts() {
    let url = URL_SERVICES + '/products/homeproducts/' + USER_ID;

    return this.http.get(url);
  }

  getMenuProductsCategories() {
    let url = URL_SERVICES + '/products/menu/categories/' + USER_ID;

    return this.http.get(url);
  }

  getProductsByCategory(category_id: any, page: number) {
    let url = URL_SERVICES + '/products/productsbycategory/' + category_id + '/' + USER_ID + '/' + page;

    return this.http.get(url);
  }

  updateCartItems(cartItems: any[]) {
    let url = URL_SERVICES + '/products/updatecartproducts/' + USER_ID;

    let object: any = {
      cartItems: cartItems
    }

    return this.http.post(url, object);
  }

}
