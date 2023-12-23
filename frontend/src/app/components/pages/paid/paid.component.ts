import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit{
  constructor(private route: ActivatedRoute,private userservice:UserService) { }

  success = false

  ngOnInit(): void {
    this.route.queryParams.subscribe ( params => {
      this.success = ( params [ "status" ] == "success")
    } )
  }

  logout(){
      this.userservice.logout();
  }
}
