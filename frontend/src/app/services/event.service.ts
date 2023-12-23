
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PRODUCT_BY_GROUP, PRODUCT_BY_ID_URL, PRODUCT_URL,ADD_PRODUCT_URL } from '../shared/constants/urls';
import { Products} from '../shared/Product';
import { ToastrService } from 'ngx-toastr';
import { InewProduct } from '../shared/interfaces/inew-product';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  user:any;
  constructor(private http:HttpClient,private toastrservice:ToastrService) { }
  getAll():Observable<Products[]>{
    return this.http.get<Products[]>(PRODUCT_URL);
  }

  getEventById(productId:string):Observable<Products>{
    return this.http.get<Products>(PRODUCT_BY_ID_URL+productId);
  }

  getEventByGroup(groupName:string):Observable<Products[]>{
    return this.http.get<Products[]>(PRODUCT_BY_GROUP+groupName);
  }

  addevent(newproduct:InewProduct): Observable<any>{
    return this.http.post<any>(ADD_PRODUCT_URL, newproduct).pipe(
      tap({
        next: (user) => {
 
          this.toastrservice.success(
            'Event Added Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error,
            'Failed to add event')
        }
      })
    )
  }



}
