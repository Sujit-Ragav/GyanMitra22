import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { EventService } from 'src/app/services/event.service';
import { Products } from 'src/app/shared/Product';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!:User;
  product!:Products;
  workshopName!:string;
  workshopPrice!:number;
  eventNames:string[]=[];
  participantLists:any[]=[];
  participantList:any[]=[];
  List:any[]=[];
  Lists:any[]=[];
  Alist:boolean=false;
  Plist:boolean=false;
  count:number=0;
  list:boolean=false;
  particularUser:any;
  isSearch:boolean=false;

constructor(activatedRoute:ActivatedRoute,private toastrservice:ToastrService,private profileservice:ProfileService,private route:Router,private eventservice:EventService,private orderService:OrderService,private userService:UserService){

  // profileservice.userObservable.subscribe((newuser)=>{
  //   this.user=newuser;
  // })

  this.user=this.profileservice.currentProUser;
	if(this.user.workshop){
	  eventservice.getEventById(this.user.workshop).subscribe((serverproduct)=>{
              if(serverproduct){
              this.product=serverproduct;
              this.workshopName=this.product.name;
			        this.workshopPrice=this.product.price;
              }
        })
	}
	if(this.user.event){
			this.user.event.forEach((eve)=>{
					eventservice.getEventById(eve).subscribe((serv)=>{
            if(serv){
							this.eventNames.push(serv.name);
            }
					})

			})
	}


}


eventPay(){
this.orderService.eventpay("event").subscribe((result:any)=>{

      // window.location.reload();
      //console.log(result);

      let htmlBody = `
      <html>
      <body>
      <form action="${result.payurl}" id = "forms" method="post">
      <input type="hidden" name="key" value="${result.data.key}" />
      <input type="hidden" name="txnid" value="${result.data.txnid}" />
      <input type="hidden" name="productinfo" value="${result.data.productinfo}" />
      <input type="hidden" name="amount" value="${result.data.amount}" />
      <input type="hidden" name="email" value="${result.data.email}" />
      <input type="hidden" name="firstname" value="${result.data.firstname}" />
      <input type="hidden" name="surl" value="${result.data.surl}" />
      <input type="hidden" name="furl" value="${result.data.furl}" />
      <input type="hidden" name="phone" value="${result.data.phone}" />
      <input type="hidden" name="hash" value="${result.data.hash}" />
      <input hidden type="submit" value="submit"> </form>
      <script type="text/javascript"> document.getElementById("forms").submit();</script>
      </body>
     </html> `
     let url = URL.createObjectURL ( new Blob ( [ htmlBody ] , {type: 'text/html'}))
     window.location.href = url


    });
}
workshopPay(){
if(this.user.workshop){
this.orderService.pay(this.product).subscribe((result:any)=>{
      // this.router.navigateByUrl('/');
      // window.location.reload();
     console.log(result);
      let htmlBody = `
      <html>
      <body>
      <form action="${result.payurl}" id = "forms" method="post">
      <input type="hidden" name="key" value="${result.data.key}" />
      <input type="hidden" name="txnid" value="${result.data.txnid}" />
      <input type="hidden" name="productinfo" value="${result.data.productinfo}" />
      <input type="hidden" name="amount" value="${result.data.amount}" />
      <input type="hidden" name="email" value="${result.data.email}" />
      <input type="hidden" name="firstname" value="${result.data.firstname}" />
      <input type="hidden" name="surl" value="${result.data.surl}" />
      <input type="hidden" name="furl" value="${result.data.furl}" />
      <input type="hidden" name="phone" value="${result.data.phone}" />
      <input type="hidden" name="hash" value="${result.data.hash}" />
      <input hidden type="submit" value="submit"></form>
      <script type="text/javascript"> document.getElementById("forms").submit();</script>
      </body>
     </html> `
     let url = URL.createObjectURL ( new Blob ( [ htmlBody ] , { type: 'text/html' } ) )
     window.location.href = url
    });
  }
    else{
        this.toastrservice.error("Please select the workshop before you pay");
        this.route.navigateByUrl('/');
    }
  }


  change(){
    this.list=true;
    this.Alist=false;
    this.Plist=false;
    this.userService.getAllParticipants(this.user).subscribe((response:any)=>{
      if(response){
      // this.count=response.length;
      // this.participantList=response;
      // this.count=response.length;
      this.Lists=response;
      this.participantLists=this.Lists.filter(student=>student.isAdmin===false);
      this.count=this.participantLists.length;

      }
      else{
        this.toastrservice.error("No participants");
      }
    })
}

paymentList(){
  this.Plist=!this.Plist;
  this.Alist=false;
  this.list=false;
  this.userService.getAllParticipants(this.user).subscribe((response:any)=>{
    if(response){
      this.List=response;
      this.participantList=this.List.filter(student=>student.isPayed===true || student.eventPay===true  && student.isAdmin===false );
      this.count=this.participantList.length;
      this.participantList.forEach((participant)=>{
        if(participant.workshop && participant.isPayed){
          this.userService.getName({pworkshop:participant.workshop}).subscribe((response:any)=>{
            if(response){
              console.log(response);
              participant.workshop=response.name;
            }
          })
        }

      })
      this.participantList.forEach((participant)=>{
        if(participant.event.length && participant.eventPay){
          this.userService.getEName({pevents:participant.event}).subscribe((response:any)=>{
            if(response){
              participant.event=response.eventsname;
            }
          })
        }

      })
    }

    }

 )
}

exportToExcel()
  {

    let element = document.getElementById('participantsTable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = "RegistrationList.xlsx"

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }

 exportExcel()
  {


    /* pass here the table id */
    let element = document.getElementById('accomTable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = "AccomdationList.xlsx"

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }

 printPayList()
  {


    /* pass here the table id */
    let element = document.getElementById('paymentTable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = "PaymentList.xlsx"

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }

 accomdation(){
  this.Alist=!this.Alist;
  this.list=false;
  this.Plist=false;
  this.userService.getAllParticipants(this.user).subscribe((response:any)=>{
    if(response){

      this.List=response;
      this.participantList=this.List.filter(student=>student.accomdation==="yes" && student.isAdmin===false);
    this.count=this.participantList.length;
    }

  })
}

clickme(useemail:string){
  if(useemail){
    this.userService.search({email:useemail}).subscribe((response:any)=>{
      if(response){
          this.isSearch=true;
          this.particularUser=response;
      }
      else{
        this.isSearch=false;
        this.toastrservice.error("No User was found");
      }
  })
  }
  else{
    this.toastrservice.error("Enter the email to search");
  }

}

}
