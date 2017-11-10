import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading, AlertController } from 'ionic-angular';
import * as moment from "moment";

import { SearchHotelResultPage } from "../search-hotel-result/search-hotel-result";
import { SearchModalPage } from "../modals/search-modal/search-modal";

import { IAirportCode } from "../../interfaces/";

import { ApiService } from "../../providers/api-service/api-service";

import { SearchHotelPageValidator } from "../../validators/search-hotel-page-validator";

@IonicPage()
@Component({
  selector: 'page-search-hotel',
  templateUrl: 'search-hotel.html',
})
export class SearchHotelPage extends SearchHotelPageValidator {
  toText: string;
  loading: Loading;
  title: string;
  color: string;
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

    super(alertCtrl);

    this.query = {
      to: '',
      startdate: moment().format('YYYY-MM-DD'),
      enddate: moment().add(1, 'days').format('YYYY-MM-DD'),
      night: 1,
      room: 1,
      adult: 1,
      token: ''
    }
    this.color = this.navParams.get('name');
    this.title = this.navParams.get('text');
  }
  ionViewDidLoad() {
    this.presentLoading();
    this.toText = '';
    this.api.getToken()
      .then(token => {
        this.query.token = token
        this.loading.dismiss();
      })
      .catch(err => console.log(err.message));
  }
  increase(val: number) {
    return (val += 1);
  }
  decrease(val: number) {
    return (val -= 1);
  }
  presentModal() {
    let modal = this.modalCtrl.create(SearchModalPage, { type: 'hotel', token: this.query.token });
    modal.onDidDismiss(ret => this.processModalData(ret));
    modal.present();
  }
  processModalData(ret: { data: IAirportCode, type: string }) {
    if (ret) {
      this.toText = ret.data.text;
      this.query.to = ret.data.id;
    }
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon tunggu...'
    });
    this.loading.present();
  }
  search() {
    if (this.isValid()) {
      this.presentLoading();
      this.api.searchHotel(this.query)
        .then(result => {
          this.loading.dismiss();
          this.navCtrl.push(SearchHotelResultPage, { data: result});
        })
        .catch(err => {
          this.loading.dismiss();
          this.presentAlert(err.message);
        });
    }
  }
  minDate() {
    return moment().format('YYYY-MM-DD');
  }
  maxDate() {
    return moment().add(1, 'year').format('YYYY-MM-DD');
  }

}
