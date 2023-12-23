import { CartItem } from "./cartItem";

export class Order{
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  college!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
