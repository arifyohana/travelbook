
import { AlertController } from 'ionic-angular';
import * as moment from "moment";

import { IForm } from "../interfaces";

export class SearchPageValidator {
    frmData: IForm.ISearchFlightFormData
    constructor(public alertCtrl: AlertController) {

    }
    isValid() {
        //#region tujuan
        if (this.frmData.from.id === '' && this.frmData.to.id === '') {
            this.presentAlert('Silahkan pilih bandara keberangkatan dan tujuan');
            return false;
        }
        if (this.frmData.from.id === '') {
            this.presentAlert('Silahkan pilih bandara keberangkatan');
            return false;
        }
        if (this.frmData.to.id === '') {
            this.presentAlert('Silahkan pilih bandara tujuan');
            return false;
        }
        if (this.frmData.from.id == this.frmData.to.id) {
            this.presentAlert('Kota keberangkatan dan kota tujuan harus berbeda');
            this.frmData.to.id = '';
            this.frmData.to.text = '';
            return false;
        }
        //#endregion 

        //#region penumpang
        if ((this.frmData.adult + this.frmData.child + this.frmData.infant) === 0) {
            this.presentAlert('Harap pilih jumlah penumpang');
            return false;
        }
        if (this.frmData.adult === 0) {
            this.presentAlert('Penumpang dewasa minimal 1 orang');
            return false;
        }
        if (this.frmData.adult > 6 || this.frmData.child > 6 || this.frmData.infant > 6) {
            this.presentAlert('Jumlah penumpang tiap tipe tidak lebih dari 6 orang');
            return false;
        }
        if (this.frmData.infant > this.frmData.adult) {
            this.presentAlert('Jumlah bayi tidak lebih dari jumlah dewasa');
            return false;
        }
        //#endregion

        //#region tanggal
        let now = moment();
        let mGo = moment(this.frmData.goDate);
        let mRet = moment(this.frmData.retDate);
        if (mRet.diff(mGo, 'days') < 0 && this.frmData.roundtrip) {
            this.presentAlert('Tanggal pulang minimal harus sama atau lebih besar dari tanggal pergi. Silahkan pilih tanggal lain');
            return false;
        }
        if (mGo.diff(now,'days') > 360) {
            this.presentAlert('Tanggal keberangkatan tidak lebih dari 360 hari');
            return false;
        }
        if (mGo.diff(now,'days') < 0) {
            this.presentAlert('Maaf, tanggal yang dipilih sudah lewat. Silahkan pilih tanggal lain');
            return false;
        }
        //#endregion
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
