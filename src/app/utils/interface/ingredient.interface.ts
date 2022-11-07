import { Dish } from './dish.interface';
import { Stock } from './stock.interface';

export interface Ingredient {
  id?: number,
  dish: Dish,
  item: Item[],
}


export interface Item{
  stock?: Stock,
  quantityUsed?: number,
}
