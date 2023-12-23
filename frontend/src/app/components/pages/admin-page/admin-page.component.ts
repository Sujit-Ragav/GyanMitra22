import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Products } from 'src/app/shared/Product';
import { IUserRegister } from 'src/app/shared/interfaces/IuserRegister';
import { InewProduct } from 'src/app/shared/interfaces/inew-product';
import { User } from 'src/app/shared/user';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

//   participantList:any[]=[];
//   List:any[]=[];
//   part:any[]=[];
//   count:number=0;
//   user!:User;

//   constructor(private userService:UserService,private profileservice:ProfileService){
//     this.user=this.profileservice.currentProUser;
//   }

//   RegEvent(){
//   this.userService.getAllParticipants(this.user).subscribe((response:any)=>{
//     if(response){
//       this.List=response;
//       this.participantList=this.List.filter(student=>student.isAdmin===false );
//       this.part=this.participantList.filter(student =>student.event && student.eventPay=== true);
//       this.count=this.part.length;
//         this.part.forEach((participant)=>{
//           if(participant.event.length>0){
//             this.userService.getEName({pevents:participant.event}).subscribe((response:any)=>{
//               if(response){
//                 participant.event=response.eventsname;
//               }
//             })
//           }

//         })
//       }
//     })

//   }


//  exportToExcel()
//   {


//     /* pass here the table id */
//     let element = document.getElementById('participantsEventTable');
//     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

//     /* generate workbook and add the worksheet */
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     let fileName = "TotalEventRegistered.xlsx";

//     /* save to file */
//     XLSX.writeFile(wb, fileName);

//  }
//===========================================
showadd=false;
showdelete=false;
neweventForm!:FormGroup;
isSubmitted = false;
gproducts!:Products[];
eventss!:Products[];
workshopss!:Products[];
groupevents!:Products[];
returnUrl = '';
constructor(
  private formBuilder: FormBuilder,
  private eventservice: EventService,
  private activatedRoute: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  this.neweventForm = this.formBuilder.group({
    name: ['', Validators.required],
    time: ['', [Validators.required]],
    imageUrl: ['', Validators.required],
    venue: ['', Validators.required],
    conductedby: ['', Validators.required],
    tname:['',[Validators.required]],
    group:['',Validators.required],

  });

  this.eventservice.getAll().subscribe(serverfood=>{
    this.gproducts=serverfood;
    this.eventss=this.gproducts.filter(product=>product.tname==="event");
    this.workshopss=this.gproducts.filter(product=>product.tname==="workshop");
     this.groupevents=this.gproducts.filter(product=>product.tname==="groupevent");

  })


  this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
}

get fc() {
  return this.neweventForm.controls;
}

submit(){
  this.isSubmitted = true;
  if(this.neweventForm.invalid) return;

  const fv= this.neweventForm.value;
  const product :InewProduct = {
    name: fv.name,
    time: fv.time,
    imageUrl: fv.imageUrl,
    venue:fv.venue,
    conductedby: fv.conductedby,
    tname:fv.tname,
    group:fv.group
  };

  this.eventservice.addevent(product).subscribe(_ => {
    this.router.navigateByUrl(this.returnUrl);
  })
}

}
