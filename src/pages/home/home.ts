import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  icons = {
    flight: { icon: 'assets/svg/plane-circle.svg', banner: 'assets/img/banner-flight.png' },
    hotel: { icon: 'assets/svg/hotel-circle.svg', banner: 'assets/img/banner-hotel.png' }
  }
  types: Array<{ name: string, text: string, icon: string, flight: boolean }> = [
    { name: 'domestic', text: 'Domestic Flights', icon: 'assets/svg/plane-circle.svg', flight: true },
    { name: 'international', text: 'International Flights', icon: 'assets/svg/plane-circle.svg', flight: true },
    { name: 'hotel', text: 'Hotels', icon: 'assets/svg/hotel-circle.svg', flight: false }
  ];
  index: number;

  constructor(public navCtrl: NavController, private app: App) {
    this.index = 0;
  }

  search() {
    this.app.getRootNavs()[0].push(SearchPage, this.types[this.index]);
  }

  next() {
    if (this.isLast()) {
      this.index = 0;
      return;
    }
    this.index += 1;
  }

  prev() {
    if (this.isFirst()) {
      this.index = this.types.length - 1;
      return;
    }
    this.index -= 1;
  }

  swipeEvent(e) {
    if (e.direction == 2) {
      this.prev();
    }
    if (e.direction == 4) {
      this.next();
    }
  }

  private isLast(): boolean {
    return this.index === this.types.length - 1;
  }

  private isFirst(): boolean {
    return this.index === 0;
  }
}
