export interface IFlightInfo {

  flight_number: string;
  class: string;
  departure_city: string;
  departure_city_name: string;
  arrival_city: string;
  arrival_city_name: string;
  airlines_name: string;
  departure_date_time: Date;
  string_departure_date: string;
  string_departure_date_short: string;
  simple_departure_time: Date;
  arrival_date_time: Date;
  string_arrival_date: string;
  string_arrival_date_short: string;
  simple_arrival_time: Date;
  img_src: string;
  duration_time: number;
  duration_hour: string;
  duration_minute: string;
  check_in_baggage: number;
  check_in_baggage_unit: string;
  terminal: string;
  transit_duration_hour: number;
  transit_duration_minute: number;
  transit_arrival_text_city: string;
  transit_arrival_text_time: string;
}
