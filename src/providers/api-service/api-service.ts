import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';

import {
  IAirportCode, IForm, IResponse, IRequest, IPaymentOptions
} from "../../interfaces";
/*
  API service v1
*/
@Injectable()
export class ApiService {
  API_URL: string = 'http://api.traveltravelbook.com/';
  headers: Headers;
  token: string;
  constructor(public http: Http, public datePipe: DatePipe, public platform: Platform) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    if (platform.is('core')) {
      this.API_URL = '';
    }
  }

  /**
   * Ambil list bandara
   * @param {string} name Nama kota/bandara
   * @returns {Observable<IAirportCode[]>} Array airport code
   */
  getAirports(name: string): Promise<IAirportCode[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/airports", { params: { q: name } })
        .subscribe(
        response => {
          let results: IResponse.IAirportSearchResults = response.json();
          resolve(results.resources);
        },
        err => reject(err));
    });
  }

  /**
   * Ambil token
   * @returns {Observable<string>} token
   */
  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/get_token")
        .subscribe(
        response => {
          let results: IResponse.ITokenReqResult = response.json();
          this.token = results.token;
          resolve(results.token);
        },
        err => reject(err));
    });
  }

  getNationality(): Promise<IResponse.IAirportSearchResults> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/nationality")
        .subscribe(
        response => {
          let results: IResponse.IAirportSearchResults = response.json();
          resolve(results);
        },
        err => reject(err));
    });
  }

  getPaymentOption(): Promise<IPaymentOptions> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/payment_options")
        .subscribe(
        response => {
          let results: IPaymentOptions = response.json();
          resolve(results);
        },
        err => reject(err));
    });
  }

  /**
   * Cari penerbangan
   * @param {IForm.ISearchFlightFormData} data
   * @returns {IResponse.IFlightSearchResults}
   */
  searchFlight(data: IForm.ISearchFlightFormData): Promise<IResponse.IFlightSearchResults> {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        let body: IRequest.ISearchFlightQuery = {
          token: token,
          flight_form: {
            from: data.from.id,
            to: data.to.id,
            go_date: data.goDate,
            ret_date: data.retDate,
            adult: data.adult,
            child: data.child,
            infant: data.infant,
            sort: data.sort,
          }
        }
        this.http.post(this.API_URL + "v1/search_flight", body, { headers: this.headers })
          .subscribe(
          response => {
            let results: IResponse.IFlightSearchResults = response.json();
            if (data.roundtrip && (results.returns === undefined || results.returns.result.length === 0)) {
              reject(new Error('Returns flight empty'));
            }
            if (results.departures === undefined || results.departures.result.length === 0) {
              reject(new Error('Departures flight empty'));
            }
            resolve(results);
          },
          err => reject(err));
      });
    });
  }

  getFlightData(data: IRequest.ISearchFlightDataQuery): Promise<IResponse.IFlightDataResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/get_flight_data", data, { headers: this.headers })
        .subscribe(
        response => {
          let result: IResponse.IFlightDataResult = response.json();
          resolve(result);
        },
        err => reject(err));
    });
  }

  addFlightOrder(data): Promise<IResponse.ITokenReqResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/add_flight_order", { flight_order: data }, { headers: this.headers })
        .subscribe(
          response => {
            let result: IResponse.ITokenReqResult = response.json();
            console.log(result);
            resolve(result);
          },
          err => reject(err)
        );
    });
  }

  getOrder(token: string): Promise<IResponse.IGetOrderResult> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/get_order", { params: { token: token } })
        .subscribe(
        response => {
          let results: IResponse.IGetOrderResult = response.json();
          resolve(results);
        },
        err => reject(err));
    });
  }

  deleteFlightOrder(data): Promise<IResponse.IDeleteFlightOrderResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/delete_flight_order", data, { headers: this.headers })
        .subscribe(
          response => {
            let result: IResponse.IDeleteFlightOrderResult = response.json();
            console.log(result);
            resolve(result);
          },
          err => reject(err)
        );
    });
  }

  paymentFlightOrder(data): Promise<IResponse.IPaymentFlightOrderResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/delete_flight_order", data, { headers: this.headers })
        .subscribe(
          response => {
            let result: IResponse.IPaymentFlightOrderResult = response.json();
            console.log(result);
            resolve(result);
          },
          err => reject(err)
        );
    });
  }

}
