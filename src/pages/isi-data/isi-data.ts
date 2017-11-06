import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { IResponse, IDestination, ICountryCode } from "../../interfaces";
import { ApiService } from "../../providers/api-service/api-service";

import { ContactPage } from "../modals/contact/contact";
import { PassengerPage } from "../modals/passenger/passenger";
import { ReviewPage } from "../review/review";

import _ from 'lodash';

import { IsiDataPageValidator } from "../../validators/isi-data-page-validator";
@IonicPage()
@Component({
  selector: 'page-isi-data',
  templateUrl: 'isi-data.html',
})
export class IsiDataPage extends IsiDataPageValidator {
  color: string;
  data: IResponse.IFlightDataResult
  goDet: IDestination;
  retDet: IDestination;
  required: any;
  requiredVal: any;
  national: IResponse.IAirportSearchResults;
  countryCodes: ICountryCode[];
  loading: Loading;
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    super(alertCtrl);
    this.data = this.navParams.get('data');
    this.color = this.navParams.get('color');
    this.goDet = this.navParams.get('go_det');
    this.retDet = this.navParams.get('ret_det');
    this.mapRequired();

    this.api.getNationality()
      .then(data => this.national = data)
      .catch(err => console.log(err));
    this.api.getCountryCodes()
      .then(data => this.countryCodes = data)
      .catch(err => console.log(err));
  }

  changeResourceKewarganegaraan() {
    let index = _.findIndex(this.requiredVal, ['FieldText', 'Kewarganegaraan']);
    if (index > -1)
      this.requiredVal[index].resource = this.national.resources;
  }

  ionViewDidLoad() {
  }

  countFlightPrice(type, flight = 'd'): number {
    let f = this.data.departures;
    if (flight === 'r') {
      f = this.data.returns;
    }
    switch (type) {
      case 'a':
        return (parseInt(f.count_adult) * parseInt(f.price_adult));
      case 'c':
        return (parseInt(f.count_child) * parseInt(f.price_child));
      case 'i':
        return (parseInt(f.count_infant) * parseInt(f.price_infant));
    }
  }
  countBagagePrice(flight = 'd') {
    let total = 0;
    return total;
  }
  countTotalPrice() {
    let dep = parseInt(this.data.departures.price_value);
    let ret = 0;
    let depBaggage = 0;
    let retBaggage = 0;
    if (this.data.returns != undefined) {
      ret = parseInt(this.data.returns.price_value);
    }
    let total = dep + ret + depBaggage + retBaggage;
    return total;
  }

  countAdultToItem() {
    let num = parseInt(this.data.departures.count_adult);
    return this.createRange(num);
  }

  createRange(num: number) {
    let items: number[] = [];
    for (let i = 1; i <= num; i++) {
      items.push(i);
    }
    return items;
  }

  mapRequired() {
    this.required = _.omitBy(this.data.required, { category: 'separator' });
    this.required['area_code'] = {
      mandatory: 1,
      type: "combobox",
      example: "+62",
      FieldText: "Kode Negara",
      category: "contact",
      resources: this.countryCodes
    }
    this.required['phone'] = this.required['conPhone'];
    delete this.required['conPhone'];
    _.forEach(this.required, item => {
      item['value'] = '';
    });
    this.requiredVal = _.values(this.required);
  }

  fillContactData() {
    this.required.area_code.resource = this.countryCodes;
    this.presentModal(ContactPage, { required: this.requiredVal });
  }

  fillAdultPassengerData(num) {
    this.changeResourceKewarganegaraan();
    let category = 'adult' + num;
    this.presentModal(PassengerPage, { required: this.requiredVal, category: category });
  }

  presentModal(page, data) {
    let modal = this.modalCtrl.create(page, data);
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        this.requiredVal = data;
      }
    });
    modal.present();
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon tunggu...'
    });
    this.loading.present();
  }
  displayName(type, num) {
    let propFname = 'firstname' + type + num;
    let propLname = 'lastname' + type + num;
    if (this.required[propFname] === undefined) {
      return '';
    }
    return this.required[propFname].value + ' ' + this.required[propLname].value;
  }

  displayBaggage(flight, type, transit, num) {
    let propBaggage = flight + 'checkinbaggage' + type + transit + num;
    if (this.required[propBaggage] === undefined) {
      return this.data.departures.check_in_baggage;
    }
    return this.required[propBaggage].value;
  }

  addFlightOrder() {
    this.presentLoading();
    let data = {
      token: this.data.token,
      adult: this.data.departures.count_adult,
      child: this.data.departures.count_child,
      infant: this.data.departures.count_infant,
      flight_id: this.data.departures.flight_id,
      date: this.data.departures.flight_date,
    };
    if (this.data.returns) {
      data['ret_flight_id'] = this.data.returns.flight_id;
      data['ret_date'] = this.data.returns.flight_date;
    }
    let keys = _.keys(this.required);
    keys.forEach(element => {
      if (element.includes('birthdate')) {
        let date: string[] = this.required[element].value.split('-');
        data[element + '(1i)'] = date[0];
        data[element + '(2i)'] = date[1];
        data[element + '(3i)'] = date[2];
      } else {
        data[element] = this.required[element].value.toUpperCase();
      }
    });
    this.api.addFlightOrder(data)
      .then(res => {
        console.log(res);
        this.api.getFlightOrder(this.data.token)
          .then(result => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.push(ReviewPage, { data: result, color: this.color, go_det: this.goDet, ret_det: this.retDet, flight_data: this.data })
          })
          .catch(err => {
            this.loading.dismiss();
            this.presentAlert(err);
            console.log(err);
          });
      })
      .catch(err => {
        this.loading.dismiss();
        this.presentAlert(err);
        console.log(err);
      });
  }

}
