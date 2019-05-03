import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ID, URL_SERVICES } from '../../../config/config';

/*
  Generated class for the CarrouselProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrouselProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CarrouselProvider Provider');
  }

  getCarrouselData() {
    let url = URL_SERVICES + '/carrousel/' + USER_ID;

    return this.http.get(url);
  }

}
