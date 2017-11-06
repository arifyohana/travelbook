export interface IPaymentFlightOrderDetail {
  orderType: string[];
  currency: string;
  payment_charge: number;
  sub_total: number;
  unique_code: number;
  grand_total: number;
  grand_subtotal: number;
  order_expire_datetime: Date;
}
