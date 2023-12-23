import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Products } from 'src/app/shared/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  gproducts!:Products[];
  eventss!:Products[];
  workshopss!:Products[];
  groupevents!:Products[];
  
  constructor(activatedRoute:ActivatedRoute,eventservice:EventService){
    activatedRoute.params.subscribe((params)=>{
      if(params['groupname'])
      eventservice.getEventByGroup(params['groupname']).subscribe(serverfood=>{
        this.gproducts=serverfood;
        this.eventss=this.gproducts.filter(product=>product.tname==="event");
        this.workshopss=this.gproducts.filter(product=>product.tname==="workshop");
         this.groupevents=this.gproducts.filter(product=>product.tname==="groupevent");

      })
    })
  
  }
  ngOnInit(): void {

  }
}
