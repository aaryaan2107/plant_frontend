import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { PlantserviceService } from 'src/service/plantservice.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  user:any;
  userID:String='';
  username!:String | null;
  data: any[] = [];

  id!: string | null;
  addcart: String = '';
  plant!: any[];
  productquantity:number=1;
  message:String = '';
  loading:boolean=false;
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
  
this.getwishlist();
    });
  }



  getwishlist()
  {
       this.loading=true
    this.plantservice.getwishlist().subscribe(
      data => {
        this.loading=false
        this.data = data;
        
      }
    )
  }
  addtocart(pid:any,Price:number,Common_Name:string,Botanical_Name:string,Photo_1:string) {



    if(!localStorage.getItem('token')) {
      this.plantservice.localcartdata(this.plant,this.productquantity);
      this.addcart = 'Add to cart Successfully';
      setTimeout(() => {
        this.addcart = '';
      }, 4000);

    }
    else {

    this.user = localStorage.getItem('token');
    var decoded:any= jwt_decode(this.user);
    let userId = decoded.userId;
    let productId=pid ;



    console.log(productId);
    
    this.plantservice.addToCart(userId,productId,this.productquantity,Price,Common_Name,Botanical_Name,Photo_1).subscribe(
      (res) => {
            this.message = '     View Cart    ';
         
      },
      error => {
          console.log(error);
      });
    }
    }
  

    deletewishlist(userId: string) {
      this.plantservice.deletewishlist(userId).subscribe(
        (res) => {
          this.data = this.data.filter((data: { _id: string; }) => data._id !== userId);
        },
        (error) => {
          console.error(error);
        }
      );
    }


  }