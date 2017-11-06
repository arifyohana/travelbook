import { IAirport } from "./airport";
export interface IDestination {
    dep_airport: IAirport;
    arr_airport: IAirport;
    date: string;
    formatted_date: string;
}