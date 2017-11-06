
import { AlertController } from 'ionic-angular';

import { IFlight } from '../interfaces/flight';

import * as moment from "moment";

export class SearchResultPageValidator {
  go: IFlight;
  item: IFlight;

  constructor(public alertCtrl: AlertController) {

  }

  isValid() {
    let mGoTime = moment(this.go.arrival_flight_date + ' ' + this.go.simple_arrival_time);
    let mRetTime = moment(this.item.departure_flight_date + ' ' + this.item.simple_departure_time);
    if (mRetTime.diff(mGoTime, 'seconds') < 0) {
      this.presentAlert('Waktu pulang harus lebih besar dari waktu pergi');
      return false;
    }
    return true;
  }

  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Peringatan',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
