import { IMyOrderPassengers } from './my-order-passengers';
import { IMyOrderBreakdownPrice } from './my-order-breakdown-price';

export interface IMyOrderDetail {
  order_detail_id: string;
  airlines_name: string;
  flight_number: string;
  trip: string;
  price_adult: string;
  price_child: string;
  price_infant: string;
  flight_date: Date;
  departure_time: Date;
  arrival_time: Date;
  baggage_fee: number;
  departure_airport_name: string;
  arrival_airport_name: string;
  passengers: { adult: IMyOrderPassengers[] };
  real_flight_date: string;
  price: number;
  breakdown_price: IMyOrderBreakdownPrice[];
  departure_city: string;
  arrival_city: string;
}
