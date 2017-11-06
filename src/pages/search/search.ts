import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading, AlertController } from 'ionic-angular';

import { SearchResultPage } from "../search-result/search-result";
import { SearchModalPage } from "../modals/search-modal/search-modal";

import { IAirportCode } from "../../interfaces/";

import { ApiService } from "../../providers/api-service/api-service";

import { SearchPageValidator } from "../../validators/search-page-validator";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage extends SearchPageValidator {
  loading: Loading;
  title: string;
  color: string;
  token: string;
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public datePipe: DatePipe) {

    super(alertCtrl);
    this.color = this.navParams.get('name');
    this.title = this.navParams.get('text');
    this.frmData = {
      from: { id: '', text: '' },
      to: { id: '', text: '' },
      goDate: this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
      retDate: undefined,
      adult: 1, child: 0, infant: 0,
      roundtrip: false, bussiness: false, sort: undefined
    }
  }
  ionViewDidLoad() {
    this.presentLoading();
    this.api.getToken()
      .then(token => {
        this.token = token
        this.loading.dismiss();
        this.api.getHotels("Jakarta", this.token);
      })
      .catch(err => console.log(err.message));
  }
  increase(val: number) {
    return (val += 1);
  }
  decrease(val: number) {
    return (val -= 1);
  }
  roundTripToggle() {
    if (this.frmData.roundtrip) {
      this.frmData.roundtrip = false;
      this.frmData.retDate = undefined;
    } else {
      this.frmData.roundtrip = true;
      this.frmData.retDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    }
  }
  presentModal(val: string) {
    let modal = this.modalCtrl.create(SearchModalPage, { type: val });
    modal.onDidDismiss(ret => this.processModalData(ret));
    modal.present();
  }
  processModalData(ret: { data: IAirportCode, type: string }) {
    if (ret) {
      switch (ret.type) {
        case "flightfrom":
          this.frmData.from = ret.data; break;
        case "flightto":
          this.frmData.to = ret.data; break;
        default:
          break;
      }
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
      this.api.searchFlight(this.frmData)
        .then(result => {
          this.loading.dismiss();
          this.navCtrl.push(SearchResultPage, { data: result, color: this.color });
        })
        .catch(err => {
          this.loading.dismiss();
          this.presentAlert(err.message);
        });
    }
  }
  minDate() {
    return this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }
  maxDate() {
    let d = new Date();
    return (d.getFullYear() + 1).toString();
  }
}
