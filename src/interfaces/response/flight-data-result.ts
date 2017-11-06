import { IDiagnostic, IFlight } from "../";

export interface IFlightDataResult {
  diagnostic: IDiagnostic;
  output_type: string;
  required: any;
  departures: IFlight;
  returns: IFlight;
  login_status: string;
  token: string;
}
