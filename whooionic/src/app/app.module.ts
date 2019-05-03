import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Storage
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { SignupPage } from '../pages/signup/signup';
import { UsersProvider } from '../providers/users/users';
import { LoginPage } from '../pages/login/login';
import { CarrouselProvider } from '../providers/carrousel/carrousel';
import { ProductsProvider } from '../providers/products/products';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { CustomerProvider } from '../providers/customer/customer';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ShippingPage } from '../pages/shipping/shipping';
import { DataProvider } from '../providers/data/data';
import { ShippingProvider } from '../providers/shipping/shipping';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    SignupPage,
    LoginPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    CheckoutPage,
    ShippingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    SignupPage,
    LoginPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    CheckoutPage,
    ShippingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    CarrouselProvider,
    ProductsProvider,
    CustomerProvider,
    DataProvider,
    ShippingProvider
  ]
})
export class AppModule {}
