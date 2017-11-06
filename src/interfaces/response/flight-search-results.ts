import { IDiagnostic, IFlight, IDestination } from "../";
import { ISearchFlightQuery } from "../request";
export interface IFlightSearchResults {
  diagnostic: IDiagnostic;
  output_type: string;
  round_trip: boolean;
  search_queries: ISearchFlightQuery;
  go_det: IDestination;
  ret_det: IDestination;
  departures: { result: IFlight[] };
  returns: { result: IFlight[] };
  nearby_go_date: { nearby: { date: string, price: string }[] };
  nearby_ret_date: { nearby: { date: string, price: string }[] };
  login_status: string;
  token: string;
}
