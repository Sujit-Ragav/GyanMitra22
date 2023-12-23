import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent {

  participantList:any[]=[];
  part:any[]=[];
  List:any[]=[];
  count:number=0;
  user!:User;

  constructor(private userService:UserService,private profileservice:ProfileService){
    this.user=this.profileservice.currentProUser;
  }
  RegWorkshop(){
  this.userService.getAllParticipants(this.user).subscribe((response:any)=>{
    if(response){
      this.List=response;
      this.participantList=this.List.filter(student=>student.isAdmin===false );
      this.part=this.participantList.filter(student =>student.workshop && (student.isPayed === true));
      this.count=this.part.length;
        this.part.forEach((participant)=>{
          if(participant.workshop){
            this.userService.getName({pworkshop:participant.workshop}).subscribe((response:any)=>{
              if(response){
                console.log(response);
                participant.workshop=response.name;
              }
            })
          }

        })
      }
    })

  }


 exportToExcel()
  {


    /* pass here the table id */
    let element = document.getElementById('participantsWorshopTable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = "TotalWorshopRegistered.xlsx";

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }
}
