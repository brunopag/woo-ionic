import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ID, URL_SERVICES } from '../../../config/config';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CustomerProvider Provider');
  }

  checkEmailValidity(email: string) {
    let url = URL_SERVICES + '/customers/checkemail/' + USER_ID;

    let body: any = {
      email: email
    };

    return this.http.post(url, body);
  }

  createCustomer(customerData: any) {
    let url = URL_SERVICES + '/customers/create/' + USER_ID;

    return this.http.post(url, customerData);
  }

  login(user: string, password: string) {
    let url = URL_SERVICES + '/customers/login/' + USER_ID;

    return this.http.post(url, {username: user, password: password});
  }

  getCustomer(email: string) {
    let url = URL_SERVICES + '/customers/get/' + USER_ID + '/' + email;

    return this.http.get( url );
  }

}
