import { IMyOrderDetail } from './my-order-detail';

export interface IMyOrderData {
  expire: string;
  uri: string;
  order_detail_id: string;
  order_expire_datetime: Date;
  order_type: string;
  customer_price:number;
  order_name: string;
  order_name_detail: string;
  order_detail_status: string;
  detail: IMyOrderDetail;
  order_photo: string;
  order_icon: string;
  tax_and_charge: number;
  subtotal_and_charge: number;
  delete_uri: string;
  business_id: string;
}
