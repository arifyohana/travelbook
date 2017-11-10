
import { AlertController } from 'ionic-angular';
//import * as moment from "moment";

import { IRequest } from "../interfaces";

export class SearchHotelPageValidator {
    query: IRequest.ISearchHotelQuery
    constructor(public alertCtrl: AlertController) {

    }
    isValid() {
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
