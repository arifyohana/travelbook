import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IResponse, IDestination } from "../../interfaces";

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  color: string;
  data: IResponse.IGetOrderResult
  fdata: IResponse.IFlightDataResult
  goDet: IDestination;
  retDet: IDestination;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.data = this.navParams.get('data');
    this.fdata = this.navParams.get('flight_data');
    this.color = this.navParams.get('color');
    this.goDet = this.navParams.get('go_det');
    this.retDet = this.navParams.get('ret_det');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }
  getPassengers() {
    let data: any[] = [];
    let dep = this.data.myorder.data[0].detail.departure_city + ' - ' + this.data.myorder.data[0].detail.arrival_city;
    this.data.myorder.data[0].detail.passengers.adult.forEach(item => {
      data.push({
        name: item.title + ' ' + item.first_name + ' ' + item.last_name,
        birthdate: item.birth_date,
        dep: dep,
        dbaggage: item.check_in_baggage + ' ' + item.check_in_baggage_unit,
        ret: '',
        rbaggage: ''
      });
    });
    if (this.data.myorder.data.length === 1) {
      return data;
    }

    let ret = this.data.myorder.data[1].detail.departure_city + ' - ' + this.data.myorder.data[1].detail.arrival_city;
    this.data.myorder.data[1].detail.passengers.adult.forEach((item, index) => {
      data[index].ret = ret;
      data[index].rbaggage = item.check_in_baggage + ' ' + item.check_in_baggage_unit;
    });
    return data;
  }
  getDetails() {
    let data: any[] = [];
    this.data.myorder.data.forEach(item => {
      data.push({
        text: item.order_name_detail + '(Dewasa)' + '(' + item.detail.passengers.adult.length + ')',
        price: (item.detail.passengers.adult.length * parseInt(item.detail.price_adult))
      })
    });
    this.data.myorder.data.forEach(item => {
      data.push({
        text: 'Bagasi ' + item.detail.departure_city + ' - ' + item.detail.arrival_city,
        price: item.detail.baggage_fee
      })
    });
    data.push({
      text: 'Kode unik',
      price: this.data.myorder.discount_amount
    });
    data.push({
      text: 'Harga Total',
      price: this.data.myorder.total
    });
    return data;
  }

}
