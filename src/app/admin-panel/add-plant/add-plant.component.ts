import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent {


  
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
  errormessage: string = '';
  success: String = '';
  Size:any;

  radiobtn = new FormGroup({
    Size: new FormControl(''),
  });
  constructor(private plantservice: PlantserviceService,private router:Router) {}
  ngOnInit() {
  }

  addplant(userdata: any) {
     
      this.plantservice.addplant(userdata,this.Size).subscribe(
        (res) => {
          if(res){
           this.success =res.message;
            this.errormessage = '';
            setTimeout(() => {
              this.success = '';
            }, 3000);
          }
        },
        (error) => {       
          if(error){ 
          this.errormessage = error.error.error;
            this.success = '';
            setTimeout(() => {
              this.errormessage = '';
            }, 3000);
          }
        })
  }



  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  changeSection(section: string) {

    this.selectedSection = section;
  }

  form(){
    this.Size = this.radiobtn.value.Size;
  console.log(this.Size);
  
    
  }
}

