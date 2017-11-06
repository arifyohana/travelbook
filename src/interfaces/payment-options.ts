import { IPaymentOptionsAtributes } from './payment-options-atributes';
import { IPaychannelsData } from './paychannels-data';

export interface IPaymentOptions {
  "data": {
    "id": string;
    "type": string;
    "attributes": IPaymentOptionsAtributes;
    "relationships": { "paychannels": { "data": IPaychannelsData[] } }
  }[]
}
