import { Component, OnInit } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-currentorder',
  templateUrl: './currentorder.component.html',
  styleUrls: ['./currentorder.component.scss']
})
export class CurrentorderComponent implements OnInit{
data:any;
plant!:any[];
  constructor(private Plantservice:PlantserviceService){}

  ngOnInit():void{
    this.order();
    this.Plantservice.Allplant().subscribe(
      plant => {
        this.plant = plant;
      });
  }
  order()
  {
    
  this.Plantservice.getcurrentitem().subscribe(
    res => {
        console.log(res);
        this.data = res;
  });
}



deleteorder(userId: string) {
  console.log(userId);
  this.Plantservice.deleteorder(userId).subscribe(
    res => {
      console.log(res);
      this.order();
    }
  );
}
}
