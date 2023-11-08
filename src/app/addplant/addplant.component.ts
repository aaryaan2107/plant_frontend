import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-addplant',
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.scss']
})
export class AddplantComponent {


  plantid!:number;
  plantdata:{Price:Number,Direction:String,Humidity:String,WaterFreq:String,WaterReq:String,Sunlight_Freq:String,Soil:String,Exposure:String,Family:String,Botanical_Name:String,Blooming_Period:String, Sowing_Period:String,Container:String,Common_Name:String,Photo_1:String,Photo_2:String,Photo_3:String, Category:String,Growing_Time:String,Maintenance:String,Special_Properties:String,Location:String}={
    Price:0,
    Family:'',
    WaterFreq:'',
    Humidity:'',
    WaterReq:'',
    Direction:'',
    Soil:'',
    Sunlight_Freq:'',
    Exposure:'',
    Botanical_Name:'',
    Common_Name:'',
    Container:'',
    Photo_1:'',
    Photo_2:'',
    Photo_3:'',
    Category:'',
    Growing_Time:'',
    Maintenance:'',
    Special_Properties:'',
    Location:'',
    Sowing_Period:'',
    Blooming_Period:''
  }
  selectedSection: string = '';
  navOpen: boolean = false;

  constructor(private plantservice: PlantserviceService,private router:Router) {}
  ngOnInit() {
  }

  addplant(userdata: any) {
     
      this.plantservice.addplant(userdata).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        })
  }



  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  changeSection(section: string) {

    this.selectedSection = section;
  }
}

