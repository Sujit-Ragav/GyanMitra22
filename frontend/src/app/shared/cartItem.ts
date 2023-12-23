import { Products } from "./Product";

export class CartItem
{
  constructor(public product:Products){};
  price:number=this.product.price;
}
