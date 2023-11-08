import { Component, OnInit } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit{
  orderlist: any[] = [];

  constructor(private Plantservice:PlantserviceService){}
  ngOnInit(){
    this.Plantservice.getlinkid().subscribe(
      (res) => {
        this.orderlist = res;
        console.log(this.orderlist);
        
      }
    )
  }

}
