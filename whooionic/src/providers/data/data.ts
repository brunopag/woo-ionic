import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ID, URL_SERVICES } from '../../../config/config';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getCountries() {
    let url = URL_SERVICES + '/data/countries/' + USER_ID;

    return this.http.get(url);
  }

  getStates(country_id: string) {
    let url = URL_SERVICES + '/data/countries/' + country_id + '/' + USER_ID;

    return this.http.get(url);
  }

}
