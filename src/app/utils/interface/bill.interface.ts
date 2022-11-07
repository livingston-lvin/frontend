import { Dish } from './dish.interface';
export interface Bill {
  id?: number,
  tableNo: number,
  billItem: BillColumn[],
  totalAmount: number
}

export interface BillColumn {
  dish: Dish,
  price: number,
  quantity: number,
  amount: number
}
