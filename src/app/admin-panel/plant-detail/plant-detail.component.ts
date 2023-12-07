import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent {

  plant:any[]=[];
  trend: any[]=[];
  trendplant:boolean = false;
  message:string='';

  constructor(private plantservice: PlantserviceService,private router:Router) {}

  
  ngOnInit(): void {
    this.allplants()
    this.alltrendingplants()
  }

  alltrendingplants(){
    this.plantservice.tplants().subscribe((res)=>{
      this.trend = res;
      console.log(this.trend);
      
    })
  }


    
  allplants()
  {
    this.plantservice.Allplant().subscribe(
      (data)=>{
        this.plant=data;     
      }
    )
    
  }
  
  trending(id:any,id2:any){

    
    this.plantservice.TrendingPlants(id,id2).subscribe((res)=>{
       console.log(res);
       if(res){
        this.trendplant = true;
        this.message = 'added trending plant';
        this.alltrendingplants();
        setTimeout(() => {
          this.message ='';
          this.trendplant = false;
        }, 3000);
      }
       else{
        this.trendplant = false;
        this.message='';
       }
     })
   }
 

   removetrend(id:any){
    this.plantservice.removertrend(id).subscribe((res)=>{
        console.log(res);
        this.alltrendingplants()
    });
  }

}