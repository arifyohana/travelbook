import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the SearchHotelResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-hotel-result',
  templateUrl: 'search-hotel-result.html',
})
export class SearchHotelResultPage {
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchHotelResultPage');
  }
  createStars(strnum: string) {
    let num:number = Number.parseInt(strnum);
    let items: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i < num) {
        items.push('hotel');
      } else {
        items.push('black');
      }
    }
    return items;
  }
}
