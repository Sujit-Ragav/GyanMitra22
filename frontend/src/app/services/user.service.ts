import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ALL_USER_LIST, EVENTS_NAMES, PEVENTS_NAMES, PWORSHOP_NAME, SEARCH_USER, USER_LIST, USER_LOGIN, USER_REGISTER_URL, WORSHOP_NAME } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IuserLogin';
import { IUserRegister } from '../shared/interfaces/IuserRegister';
import { User } from '../shared/user';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject=new BehaviorSubject<User>(this.getUserFromLocal());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrservice:ToastrService,private cartService:CartService) {
    this.userObservable=this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }
  login(userLogin:IUserLogin):Observable<any>{
    return this.http.post<any>(USER_LOGIN, userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrservice.success(`Welcome to Gyanmitra ${user.name}`,
          'Login Successful')
        },
        error:(errorResponse)=>{
          this.toastrservice.error(errorResponse.error,'Login Failed')
        }
      })
    );
  }


  register(userRegiser:IUserRegister): Observable<any>{
    return this.http.post<any>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrservice.success(
            `Welcome to the GyanMitra ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    localStorage.removeItem('Prouser');
    this.cartService.clearCart();
    window.location.reload();
  }

  private setUserToLocalStorage(user:any){

    localStorage.setItem('User',JSON.stringify(user));
    localStorage.setItem('Prouser',JSON.stringify(user));
  }

  private getUserFromLocal():any{
    const userjson=localStorage.getItem('User');
    return userjson?JSON.parse(userjson):new User();
  }

  getParticipants(product:any):any{
      return this.http.post<any>(USER_LIST,product);
  }

  getAllParticipants(user:any):any{
    return this.http.post<any>(ALL_USER_LIST,user);
  }

  search(useremail:any):any{
    return this.http.post<any>(SEARCH_USER,useremail);
  }

  getName(workshopName:any):any{
      return this.http.post<any>(WORSHOP_NAME,workshopName);
  }
  getEName(eventsNames:any):any{
    return this.http.post<any>(EVENTS_NAMES,eventsNames);
  }
  getPName(workshopName:any):any{
    return this.http.post<any>(PWORSHOP_NAME,workshopName);
}
getPEName(workshopName:any):any{
  return this.http.post<any>(PEVENTS_NAMES,workshopName);
}

}
