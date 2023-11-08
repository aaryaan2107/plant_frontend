
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
total!:Number;
allq!:Number;
item:any[]=[];
orderId:Number = 1;
user:String='';
selection:string='';
addressold:String='';
avi!:Number;
userInput: string = '';
formdata:{price:Number,address:string,quantity:Number,userId:String}={address:'',price : this.avi,quantity:0,userId:''};

constructor(private http: HttpClient,private plantservice: PlantserviceService,private renderer: Renderer2, private elementRef: ElementRef) { 

}

ngOnInit(){
  this.cartdata();
  // console.log(this.calculateTotal());

  this.plantservice.profile().subscribe((res) => {
    if (res.success) {
      this.user = res.data._id;
      this.addressold = res.data.address;
    }
  })

  this.plantservice.getorderid().subscribe(
    res => {
      this.orderId = res.orderID+1;
      if(!this.orderId)
      {
        this.orderId = 1
      }
    }
  )
}

onInputChange(event: any) {
  this.userInput = event.target.value;
}
cartdata()
{
  this.plantservice.cartitem().subscribe((data) => {
    this.item = data;
    this.calculateTotal();
    this.calculateqtyTotal();
  
  });
}

calculateTotal() {
    this.total = this.item.reduce((total: any,item: any) => total + ( item.Price* item.quantity) , 0);
   let avi = this.total;
  return this.item.reduce((total: any,item: any) => total + ( item.Price* item.quantity) , 0);
  }
calculateqtyTotal() {
  this.allq= this.item.reduce((total: any,item: any) => total + item.quantity , 0);
}


// currentorder(cartdata:any){
//   this.plantservice.currentorder(cartdata).subscribe(
//     res => {
//       console.log(res);
//     }
//   )
//   location.reload();
// }
currentorderold(cartdata:any){
  this.plantservice.currentorder(cartdata).subscribe(
    res => {
      console.log(res);
      window.location.href = res.paymentLink;
      this.cartdata();
    }
  )

}
addre(str:string){
  this.selection= str;
}

}
