import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { EventService } from 'src/app/services/event.service';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Products } from 'src/app/shared/Product';
import { User } from 'src/app/shared/user';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  isShow:boolean=false;
  isgroup:boolean=false;
  isPay:boolean=false;
  eLen:number=0;
  user!:any;
  product!:Products;
  list:boolean=false;
  participantList:any[]=[];
  count:number=0;
  List:any[]=[];
  constructor(activatedRoute:ActivatedRoute,eventservice:EventService,private cartservice:CartService,private route:Router,private userService:UserService,private orderService:OrderService,private toastrservice:ToastrService,private profileservice:ProfileService){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      eventservice.getEventById(params['id']).subscribe(serverfood=>{
        this.product=serverfood;
        if(this.product.tname==="groupevent"){
          this.isgroup=true;

        }
      if(this.product.tname==="event"|| this.product.tname==="groupevent")
        {
          this.isShow=true;
        }
      })
    })
    this.user=this.userService.currentUser;
    this.isPay=this.user.isPayed;
    if(this.user.event)
    this.eLen=this.user.event.length;

  }

  addToCart(){
      this.user=this.userService.currentUser;
      if(this.user.token){
        this.cartservice.addToCart(this.product);
        this.route.navigateByUrl('/cart-page');
      }
      else{
        this.route.navigateByUrl('/login');
      }
  }


  registerEvent(){
    this.user=this.userService.currentUser;
    // alert('hello');
    if(this.user.token){
      this.profileservice.registerEventss(this.product);
    }
    else{
      this.route.navigateByUrl("/login");
    }

  }

  eventspay(){
  if(this.user.token){
    if(this.user.eventPay==false){
      this.profileservice.registerEventss(this.product);
      // this.route.navigateByUrl('/profile');
     }
   else{
     this.route.navigateByUrl('/');
     this.toastrservice.success('Participated Successfully');
   }

  }
  else{
    this.route.navigateByUrl('/login');
  }

  }

  change(){
      this.list=!this.list;
      this.userService.getParticipants(this.product).subscribe((response:any)=>{
        if(response){
          this.List=response;
          this.participantList=this.List.filter(student=>student.isAdmin===false);
          this.count=this.participantList.length;
        }

      })
  }

  exportToExcel()
  {

    let element = document.getElementById('list');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = this.product.name+".xlsx"

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }

}
