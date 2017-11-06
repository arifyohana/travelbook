import { IDiagnostic } from "../";
import { IMyOrder } from '../order/my-order';

export interface IGetOrderResult {
  diagnostic: IDiagnostic;
  output_type: string;
  myorder: IMyOrder;
  checkout: string;
  login_status: string;
  token: string;
}
