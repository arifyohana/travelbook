 import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainPage } from '../pages/main/main';
//import { LoginPage } from '../pages/login/login';
import { CaraPemesananPage } from '../pages/cara-pemesanan/cara-pemesanan';
import { HubungiKamiPage } from "../pages/hubungi-kami/hubungi-kami";
//import { PengaturanPage } from "../pages/pengaturan/pengaturan";
import { PoinSayaPage } from "../pages/poin-saya/poin-saya";
import { PromoBerlangsungPage } from "../pages/promo-berlangsung/promo-berlangsung";
import { TentangKamiPage } from "../pages/tentang-kami/tentang-kami";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: "home", component: MainPage },
      { title: 'Tentang kami', icon: "information-circle", component: TentangKamiPage },
      { title: 'Cara pemesanan', icon: "list-box", component: CaraPemesananPage },
      { title: 'Promo berlangsung', icon: "megaphone", component: PromoBerlangsungPage },
      { title: 'Poin saya', icon: "heart", component: PoinSayaPage },
      { title: 'Hubungi kami', icon: "call", component: HubungiKamiPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 3000);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
