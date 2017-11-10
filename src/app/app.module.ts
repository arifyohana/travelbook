import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { InlineSVGModule } from "ng-inline-svg";
import { MyApp } from './app.component';

import { CaraPemesananPageModule } from '../pages/cara-pemesanan/cara-pemesanan.module';
import { HubungiKamiPageModule } from "../pages/hubungi-kami/hubungi-kami.module";
import { LoginPageModule } from '../pages/login/login.module';
import { MainPageModule } from '../pages/main/main.module';
import { PengaturanPageModule } from "../pages/pengaturan/pengaturan.module";
import { PoinSayaPageModule } from "../pages/poin-saya/poin-saya.module";
import { PromoBerlangsungPageModule } from "../pages/promo-berlangsung/promo-berlangsung.module";
import { TentangKamiPageModule } from "../pages/tentang-kami/tentang-kami.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiService } from '../providers/api-service/api-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InlineSVGModule,

    CaraPemesananPageModule,
    HubungiKamiPageModule,
    LoginPageModule,
    MainPageModule,
    PengaturanPageModule,
    PoinSayaPageModule,
    PromoBerlangsungPageModule,
    TentangKamiPageModule,

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    ApiService,
    DatePipe,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
