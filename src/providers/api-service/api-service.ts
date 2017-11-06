import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';

import {
  IAirportCode, IForm, IResponse, IRequest, IPaymentOptions, ICountryCode
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
   * @returns {Promise<IAirportCode[]>} Array airport code
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
   * @returns {Promise<string>} token
   */
  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/get_token")
        .subscribe(
        response => {
          let results: IResponse.ITokenReqResult = response.json();
          if (results.diagnostic.status != 200) {
            reject(new Error(results.diagnostic.error_msgs));
          }
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

  getCountryCodes(): Promise<ICountryCode[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/country_codes")
        .subscribe(
        response => {
          let result: ICountryCode[] = response.json().resources;
          resolve(result);
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

//#region "Penerbangan"
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
            console.log(results);
            if (data.roundtrip && (results.returns === undefined || results.returns.result.length === 0)) {
              reject(new Error('Returns flight empty'));
            }
            if (results.departures === undefined || results.departures.result.length === 0) {
              reject(new Error('Departures flight empty'));
            }
            if (results.diagnostic.status != 200) {
              reject(new Error(results.diagnostic.error_msgs));
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
          let results: IResponse.IFlightDataResult = response.json();
          if (results.diagnostic.status != 200) {
            reject(new Error(results.diagnostic.error_msgs));
          }
          resolve(results);
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
          if(result.diagnostic.status != 200){
            reject(result);
          }
          resolve(result);
        },
        err => reject(err)
        );
    });
  }

  getFlightOrder(token: string): Promise<IResponse.IGetOrderResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/get_flight_order", { token: token }, { headers: this.headers })
        .subscribe(
        response => {
          let results: IResponse.IGetOrderResult = response.json();
          if (results.diagnostic.status != 200) {
            reject(new Error(results.diagnostic.error_msgs));
          }
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
            let results: IResponse.IDeleteFlightOrderResult = response.json();
            if (results.diagnostic.status != 200) {
              reject(new Error(results.diagnostic.error_msgs));
            }
            resolve(results);
          },
          err => reject(err)
        );
    });
  }

  paymentFlightOrder(data): Promise<IResponse.IPaymentFlightOrderResult> {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + "v1/payment_flight_order", data, { headers: this.headers })
        .subscribe(
          response => {
            let results: IResponse.IPaymentFlightOrderResult = response.json();
            if (results.diagnostic.status != 200) {
              reject(new Error(results.diagnostic.error_msgs));
            }
            resolve(results);
          },
          err => reject(err)
        );
    });
  }
//#endregion

//#region "Hotel"
  getHotels(name: string, token: string): Promise<IAirportCode[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/hotel_query.json", { params: { q: name, token: token } })
        .subscribe(
        response => {
          let results: IResponse.IAirportSearchResults = response.json();
          console.log(results);
          resolve(results.resources);
        },
        err => reject(err));
    });
  }

  searchHotel(data: IRequest.ISearchHotelQuery): Promise<IResponse.IHotelSearchResults> {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "v1/search_hotel", { params: data })
        .subscribe(
        response => {
          let results: IResponse.IHotelSearchResults = response.json();
          console.log(results);
          if (results.diagnostic.status != 200) {
            reject(new Error(results.diagnostic.error_msgs));
          }
          resolve(results);
        },
        err => reject(err));
    });
  }
//#endregion
}
