import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  listplants:boolean = false;
  trendingplant:boolean = false;

  constructor(private plantservice: PlantserviceService,private router:Router,private activeroute:ActivatedRoute) {}

  
  ngOnInit(): void {

    this.activeroute.paramMap.subscribe((p)=>{
      let act = p.get('act');
    if(act=="list-of-plants"){
      this.listplants = true;
    this.trendingplant =false;}
    if(act=="list-of-trendingplant"){
    this.trendingplant = true;
  this.listplants =false;}
      
    })

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