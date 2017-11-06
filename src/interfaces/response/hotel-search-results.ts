import { IDiagnostic, ISearchQuery, IHotel, IPagination } from "../";

export interface IHotelSearchResults {
  diagnostic: IDiagnostic;
  output_type: string;
  search_queries: ISearchQuery;
  results: { result: IHotel[] }
  pagination: IPagination;
  login_status: boolean;
  token: string;
}
