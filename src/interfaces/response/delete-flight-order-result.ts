import { IDiagnostic } from "../";

export interface IDeleteFlightOrderResult {
  diagnostic: IDiagnostic;
  output_type: string;
  updateStatus: string;
  login_status: string;
  token: string;
}
