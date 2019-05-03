import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ID, URL_SERVICES } from '../../../config/config';
import { User } from '../../../models/user.model';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  user: User;

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
    this.loadUser().subscribe((resp: any) => {
      this.user = resp.user;
    })
  }

  loadUser() {
    let url = URL_SERVICES + '/user/' + USER_ID;

    return this.http.get(url);
  }

  createUser(newUser: any) {
    console.log('Llamado Generar Signature');
    let url = URL_SERVICES + '/customer/crear';

    return this.http.post(url, newUser);
  }

}
