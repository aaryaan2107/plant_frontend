import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
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
    price: '',
    Size:''
  };
  feedback = {
    reason: '',
    quantity: ''
  };
  searchitem:String='';
  searchQuery: string = '';
  serachplant:any;
  searchdata:boolean = false;
  totalstock:boolean=false;
  addstock:boolean=false;
  stockinfo:any[]=[];
  a:any
  success:string='';
  model:any;
  stockid:string='';
  id:any;
  constructor(private plantservice: PlantserviceService,private activeroute:ActivatedRoute) { }

  ngOnInit() { 
 

   this.model = document.getElementById('model');
   if(this.model){
    this.model.style.visibility ="hidden" ;
    this.model.style.transition="all ease 0.1s";
   }
    this.activeroute.paramMap.subscribe((p)=>{
      let act = p.get('act');
    if(act=="add-new-stock"){
      this.addstock = true;
    this.totalstock = false;}
    if(act=="total-stock"){
    this.totalstock = true;
    this.addstock=false;}
      
    })

  }

  remove(id:any){

    this.stockid = id;
  this.model.style.visibility="visible";
  this.model.style.transition="all ease 0.4s";
}

close(){
    this.model.style.visibility="hidden";
}


feedbackdata(feedback:any){
this.plantservice.deadstock(feedback,this.stockid).subscribe((res)=>{
  this.stockget(this.id);
  this.close();
  console.log(res);
});
}



  stock(formdata:any){
 
   this.plantservice.stock_details(formdata).subscribe((res)=>{
      this.a = res;
      this.success = this.a.message;
      setTimeout(() => {
        this.success='';
      }, 3000);
      
   })
  }

                 
  realTimeSearch() {
  
    if (this.formdata.plantName.trim() !== '') {
      // this.plantservice.searchPlants(this.formdata.plantName,1,8).subscribe((data: any) => {
      //   this.serachplant = data;
      //        if(this.serachplant.length ==0){
      //     this.searchdata = false;
      //  }       
        
      // });
      this.plantservice.searchPlants3(this.formdata.plantName).subscribe(
        (res: any) => {
         this.serachplant = res;
       if(this.serachplant.length ==0){
          this.searchdata = false;
       }       
          }); 
      this.searchdata = true;
    } else {
      this.searchdata = false;
      console.log('error');
    }
  }


totalstocksearch(){
  
    if (this.searchitem.trim() !== '') {

      this.plantservice.searchPlants3(this.searchitem).subscribe(
        (res: any) => {
         this.serachplant = res;
       if(this.serachplant.length ==0){
          this.searchdata = false;
       }       
          }); 
      this.searchdata = true;
    } else {
      this.searchdata = false;
      console.log('error');
    }
  
}


  stockget(id:any){
    this.id = id;
    this.plantservice.Allstock(id).subscribe((res)=>{     
      this.stockinfo = res;
      if(res)
      this.searchdata= false;
    this.formdata.plantName ='';
    let textbox = document.getElementById("input");
    textbox?.focus();

    });
  }

  setInputValue(value: string) {
    this.formdata.plantName = value;
    this.searchdata = false;
  }



                 



}











