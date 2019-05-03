import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES, USER_ID } from '../../../config/config';

/*
  Generated class for the ShippingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShippingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShippingProvider Provider');
  }

  calculateShipping( country: any, state:any, postcode:any ) {
    let url = URL_SERVICES + '/shipping/calculateshipping/' + USER_ID;

    let object: any = {
      country: country,
      state: state,
      postcode: postcode
    };

    return this.http.post(url, object);
  }

}
