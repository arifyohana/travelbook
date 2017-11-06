import { IAirportCode } from "../airport-code";

export interface ISearchFlightFormData {
  from: IAirportCode;
  to: IAirportCode;
  goDate: string;
  retDate: string;
  roundtrip: boolean;
  adult: number;
  child: number;
  infant: number;
  bussiness: boolean;
  sort:any;
}
