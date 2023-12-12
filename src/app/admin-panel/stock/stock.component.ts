
import { Component, OnInit } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  formdata = {
    plantId: '',
    plantName: '',
    vendername:'',
    invoiceNumber: '',
    invoiceDate:'',
    quantity: '',
    price: ''
  };
  serachplant:any;
  searchdata:boolean = false;
  constructor(private plantservice: PlantserviceService) { }

  ngOnInit() { 
  }


  stock(formdata:any){
   this.plantservice.stock_details(formdata).subscribe((res)=>{
    console.log(res);
   })
  }

  
                 
  realTimeSearch() {
  
    if (this.formdata.plantName.trim() !== '') {
   
      this.plantservice.searchPlants(this.formdata.plantName,1,8).subscribe((data: any) => {
        this.serachplant = data;
      });

      this.plantservice.searchPlants3(this.formdata.plantName).subscribe(
        (res: any) => {
         this.serachplant = res;
          
          });
 
      this.searchdata = true;
    } else {
      this.searchdata = false;
      console.log('error');
    }
  }

  setInputValue(value: string) {
    this.formdata.plantName = value;
    this.searchdata = false;
}

}











