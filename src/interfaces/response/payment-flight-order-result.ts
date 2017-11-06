import { IDiagnostic } from "../";
import { IPaymentFlightOrderDetail } from '../';

export interface IPaymentFlightOrderResult {
  diagnostic: IDiagnostic;
  output_type: string;
  orderId: string;
  detail: IPaymentFlightOrderDetail;
  message: string;
  grand_total: number;
  login_status: string;
  guest_id: string;
  login_email: string;
  token: string;
}
