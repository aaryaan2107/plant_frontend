import { Component, OnInit } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import {  ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productquantity: number = 1;
  cartData: any[] = [];
  item: any;
  cartitem = 0;
  loading: Boolean = true;
  plant!: any[];
  cartallitem: any;
  login: boolean = false;
  total!:number;
  allq!:number;
  loggin: boolean = false;
  deleteId1!:string;
  constructor(private plantservice: PlantserviceService,private renderer: Renderer2, private elementRef: ElementRef) { }


  ngOnInit(): void
  {
      if (!localStorage.getItem('token')) {
        this.loggin = false;
          this.cartData = this.plantservice.getCartData();
          this.login = false;
          this.calculateTotall();
          this.calqty();
          
      }
      else {
        this.loggin = true;
        this.cartdata();
        }
       
  }

cartdata()
{
  this.plantservice.cartitem().subscribe((data) => {
    this.item = data;
    this.calculateTotal();
    this.calculateqtyTotal();
    this.loading = false;
  
  });
}

calculateTotal() {
    this.total = this.item.reduce((total: any,item: any) => total + ( item.Price* item.quantity) , 0);
  }
  calculateqtyTotal() {
    this.allq= this.item.reduce((total: any,item: any) => total + item.quantity , 0);
  }

  calculateTotall() {
    this.total = this.cartData.reduce((total: number, cartItem: any) => total +(cartItem.product[0]?.Price * cartItem.quantity), 0);
  }
  calqty() {
    this.allq = this.cartData.reduce((total: number, cartItem: any) => total + cartItem.quantity, 0);
  
  }
  deleteId(Id:string){
    this.deleteId1 = Id;
  }
  onDeleteUser(userId: string) {
    console.log(userId);
    this.plantservice.deleteUser(userId).subscribe(
      (res) => {
        console.log(res);
        this.item = this.item.filter((data: { _id: string; }) => data._id !== userId);
        this.calculateTotal();
        this.calculateqtyTotal();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onDeleteUser2(productID: string) {
    
    const cartData: { product: { ID: string }[], quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCartItems = cartData.filter(item => item.product[0]?.ID !== productID);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    this.cartData = updatedCartItems;
    this.calculateTotall();
    this.calqty();
  }


  qtyplus(id: any) {
  
    const localcart = localStorage.getItem('cart');
    if (localcart) {
      const cartdata: any[] = JSON.parse(localcart);
      const existingProductIndex = cartdata.findIndex((item) => item.product[0]._id === id);
  
      if (existingProductIndex !== -1) {
        if (cartdata[existingProductIndex].quantity < 20 ) { // Check if the quantity is less than 20
          cartdata[existingProductIndex].quantity++;
          localStorage.setItem('cart', JSON.stringify(cartdata));
          window.location.reload();
        } 
    }
  }
}
  qtyminus(id: any) {
    const localcart = localStorage.getItem('cart');
    if (localcart) {
      const cartdata: any[] = JSON.parse(localcart);
      const existingProductIndex = cartdata.findIndex((item) => item.product[0]._id === id);
      if (existingProductIndex !== -1  && cartdata[existingProductIndex].quantity > 0   ) {
    
        cartdata[existingProductIndex].quantity--;
        localStorage.setItem('cart', JSON.stringify(cartdata));

        
      if (cartdata[existingProductIndex].quantity === 0) {
        this.onDeleteUser2(cartdata[existingProductIndex]?.product[0]?.ID);

      }
      
      }
    }
    window.location.reload();
      }
    



      
  qtyplus2(id: any) {

    this.plantservice.qtyplus(id).subscribe(
      res => {
        this.cartdata();
      }
    )

}
  qtyminus2(id: any) {
 

    this.plantservice.qtymins(id).subscribe(
      res => {
        this.cartdata();
      }
      
  )
  }
}