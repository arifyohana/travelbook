export interface ISearchQuery {
  q: string;
  uid: string;
  startdate: string;
  enddate: string;
  night: string;
  room: number;
  adult: number;
  child: number;
  sort: string;
  minstar: number;
  maxstar: number;
  minprice: number;
  maxprice: number;
  distance: number;
}
