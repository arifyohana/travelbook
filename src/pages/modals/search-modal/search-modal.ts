import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Searchbar } from 'ionic-angular';

import { IAirportCode } from "../../../interfaces/";
import { ApiService } from "../../../providers/api-service/api-service";

@Component({
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {
  @ViewChild('input') input: Searchbar;
  title: string = '';
  placeholder:string= '';
  type: string;
  token: string;
  items: IAirportCode[];
  constructor(public viewCtrl: ViewController, public navParams: NavParams, private api: ApiService) {
    this.type = this.navParams.get('type');
    this.token = this.navParams.get('token');
    this.init();
  }

  init() {
    switch (this.type) {
      case 'flightfrom':
        this.title = 'Keberangkatan'
        this.placeholder = 'Pilih Kota / Bandara'
        break;
      case 'flightto':
        this.title = 'Kedatangan'
        this.placeholder = 'Pilih Kota / Bandara'
        break;
      case 'hotel':
        this.title = 'Hotel/Destinasi'
        this.placeholder = 'Destinasi Tujuan, Nama Hotel'
        break;

      default:
        break;
    }
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.input.setFocus();
    }, 150);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  select(item: IAirportCode) {
    this.viewCtrl.dismiss({ data: item, type: this.type });
  }

  getItems(ev) {
    let val: string = ev.target.value;
    if (val.length === 0) {
      this.items = [];
      return;
    }
    if (this.type === 'hotel') {
      this.api.getHotels(val, this.token)
        .then(data => this.items = data)
        .catch(err => console.log(err));
    } else {
      this.api.getAirports(val)
        .then(data => this.items = data)
        .catch(err => console.log(err));
    }
  }
}
