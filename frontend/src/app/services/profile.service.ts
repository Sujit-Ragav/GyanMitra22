import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EVENT_REGISTER_URL } from '../shared/constants/urls';
import { Products } from '../shared/Product';
import { User } from '../shared/user';
import { OrderService } from './order.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userSubject=new BehaviorSubject<any>(this.getUserFromLocal());
  public userObservable:Observable<any>;
  constructor(private http:HttpClient,private orderService:OrderService,private toastrservice:ToastrService,private route:Router,private userservice:UserService) {
    this.userObservable=this.userSubject.asObservable();
  }

  // public get currentUser():any{
  //   return this.userSubject.value;
  // }

  public get currentProUser():any{
    return this.userSubject.value;
  }
  registerEventss(product:Products):void{
    this.http.post<any>(EVENT_REGISTER_URL,product).subscribe((response)=>{
      if(response['msg']!=-1){
        this.setUserToLocalStorage(response);
        this.userSubject.next(response);
        this.toastrservice.success('Register Successful');
        this.route.navigateByUrl('/profile');
      }
      else{
        this.toastrservice.error("Already workshop or event is registered");
      }
    })

  }

  registerGroupEvents(product:Products):Observable<any>{
    return this.http.post<any>(EVENT_REGISTER_URL, product).pipe(
      tap({
        next: (user) => {
          if (user['msg'] != -1) {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            return user;
          }
          return user;
          // else {
          //   this.toastrservice.error('Already you have registered');
          //   this.route.navigateByUrl('/profile');
          //   return;
          // }
          // this.setUserToLocalStorage(user);
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error, 'Register Failed');
        }
      })
    );
  }

  private setUserToLocalStorage(user:any){

    localStorage.setItem('Prouser',JSON.stringify(user));
  }

  private getUserFromLocal():any{
    const userjson=localStorage.getItem('Prouser');
    return userjson?JSON.parse(userjson):new User();
  }

}
