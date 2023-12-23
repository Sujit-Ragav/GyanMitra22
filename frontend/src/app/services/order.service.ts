import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { EVENT_REGISTER_URL,GROUP_CHECK_REGISTER,GROUP_CREATE,GROUP_REGISTER,ORDERS_EVENT_PAY_URL, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, TEAM_LIST } from '../shared/constants/urls';
import { Group } from '../shared/Group';
import { Order } from '../shared/Order';
import { Products } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient,private toastrservice:ToastrService) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  eventpay(s:any):any{
    return this.http.post<any>(ORDERS_EVENT_PAY_URL,s);
  }

  pay(price:any){
    return this.http.post<any>(ORDER_PAY_URL,price);
  }

  registerEventss(product:Products){
    return this.http.post<any>(EVENT_REGISTER_URL,product);

  }
  checkgroup(group:Group){
    return this.http.post<any>(GROUP_CHECK_REGISTER,group);
  }

  registerGroup(group:Group){
      return this.http.post<any>(GROUP_CREATE,group);
  }

  groupr(group:Group){
    return this.http.post<Group>(GROUP_REGISTER,group);
  }

  getTeams(product:any):any{
    return this.http.post<any>(TEAM_LIST,product);
}


}
