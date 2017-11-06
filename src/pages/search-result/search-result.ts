import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { ApiService } from "../../providers/api-service/api-service";
import { IFlight, IResponse, IRequest } from "../../interfaces";

import { IsiDataPage } from "../isi-data/isi-data";
import { SearchResultPageValidator } from '../../validators/search-result-page-validator';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage extends SearchResultPageValidator {
  color: string;
  title: string = 'Pemesanan';
  isReturn: boolean = false;
  searchResult: IResponse.IFlightSearchResults;
  data: { subtitle: string, list: IFlight[], date: string };
  dataQuery: IRequest.ISearchFlightDataQuery;
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private api: ApiService,
    public alertCtrl: AlertController,
  ) {
    super(alertCtrl);
    this.color = this.navParams.get('color');
    this.searchResult = this.navParams.get('data');
    this.isReturn = this.navParams.get('is_return');
    this.go = this.navParams.get('go');
    if (this.isReturn) {
      this.data = {
        subtitle: "Kedatangan",
        list: this.searchResult.returns.result,
        date: this.searchResult.ret_det.formatted_date,
      }
    } else {
      this.data = {
        subtitle: "Keberangkatan",
        list: this.searchResult.departures.result,
        date: this.searchResult.go_det.formatted_date,
      }
    }
    this.dataQuery = {
      depart_flight_id: this.navParams.get('depart_flight_id'),
      return_flight_id: undefined,
      go_date: this.searchResult.go_det.date,
      ret_date: undefined,
      token: this.searchResult.token
    }
  }
  ionViewDidLoad() {
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon tunggu...'
    });
    this.loading.present();
  }
  next(item: IFlight) {
    if (this.go != undefined) {
      this.item = item;
      if (this.isValid()) {
        console.log('Lanjut Ke Halaman Pemesanan');
      }
    } else {
      console.log('Lanjut Ke Halaman Pemesanan');
    }
    if (this.searchResult.round_trip && !this.isReturn) {
      this.navCtrl.push(SearchResultPage, { data: this.searchResult, color: this.color, is_return: true, depart_flight_id: item.flight_id });
    } else {
      if (this.isReturn) {
        this.dataQuery.return_flight_id = item.flight_id;
        this.dataQuery.ret_date = this.searchResult.ret_det.date;
      } else {
        this.dataQuery.depart_flight_id = item.flight_id;
      }
      this.presentLoading();
      this.api.getFlightData(this.dataQuery)
        .then(result => {
          console.log(result);
          this.loading.dismiss();
          //go_det dan ret_det di pake sementara, karena di output getflight data gak ada info dep/arr city
          this.navCtrl.push(IsiDataPage, { data: result, color: this.color, go_det: this.searchResult.go_det, ret_det: this.searchResult.ret_det });
        })
        .catch(err => console.log(err.message));
    }
  }

}
