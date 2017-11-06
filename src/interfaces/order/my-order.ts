import { IMyOrderData } from './my-order-data';

export interface IMyOrder {
  order_id: string;
  data: IMyOrderData[];
  total: number;
  total_tax: number;
  total_without_tax: number;
  count_installment: number;
  promo: any[];
  discount: number;
  discount_amount: number;
}
