import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/cart';
import { CartItem } from '../shared/cartItem';
import { EVENT_REGISTER_URL } from '../shared/constants/urls';
import { Products } from '../shared/Product';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart);

  constructor(private toastrservice:ToastrService) { }
  addToCart(product:Products):void{
      let cartItem=this.cart.items.find(item=>item.product.id ===product.id);
      let workshops=this.cart.items.filter(item=>item.product.tname==="workshop");
      if(cartItem){
        this.toastrservice.error("Already item has been selected");
        return;
      }
      if(product.tname=="workshop" && workshops.length>=1){
        this.toastrservice.error("Worshop should be selected once");
        return;
      }

      this.cart.items.push(new CartItem(product));
      this.setCartToLocalStorage();
    }

  removeFromCart(productid:string):void{
      this.cart.items=this.cart.items.filter(item=>item.product.id!=productid);
      this.setCartToLocalStorage();
  }
  getCart(): Cart{
    return this.cartSubject.value;
  }
  clearCart(){
    localStorage.clear();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    let eventitem=this.cart.items.find(item=>item.product.tname==="event");
    let groupeventitem=this.cart.items.find(item=>item.product.tname==="groupevent");
    let workshopitems=this.cart.items.find(item=>item.product.tname==="workshop");
    let eventprice=0;
    let workshopPrice=0;
    if(eventitem || groupeventitem){
      eventprice=200;
    }
    if(workshopitems){
      // workshopPrice=workshopitems.price;
      workshopPrice=1;
    }
    this.cart.totalPrice=eventprice+workshopPrice;
    const cartJson=JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartJson);
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage():Cart{
    const cartJson =localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}
