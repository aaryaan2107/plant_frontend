import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info1',
  templateUrl: './plant-info1.component.html',
  styleUrls: ['./plant-info1.component.scss','./plant-info1_1.component.scss']
})
export class PlantInfo1Component {
  productquantity:number=1;
  id!: string | null;
  loading: Boolean = true;
  oneplant:any;
  plant!: any[];
  refplant!:any[];
  cart!:any[];
  data!:any[];
  message:string='';
  searchText:any; 
  user:any;
  addcart: String = '';
  qrurl:any;
  userID:string = '';

  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {

   this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
  });

    this.plantservice.getplantid(this.id).subscribe(
      (res) => {
        this.plant = res.data;
        this.loading = false;
        this.plantservice.getplantFamliy(this.plant[0].Family).subscribe(
              (res) => {
                this.refplant = res.data;
              }
            )
      }
    )
    this.user = localStorage.getItem('token');
    var decoded:any = jwt_decode(this.user);
    this.userID=decoded.userId;
  }

  addtocart(id:string) {
    
    if(this.plant)
    {
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
        let productId:any=this.id ;
            this.oneplant = this.refplant.filter(plant => String(plant.ID).includes(id));     
            this.plantservice.addToCart(userId, this.oneplant[0].ID, this.productquantity,this.oneplant[0].Price,this.oneplant[0].Common_Name,this.oneplant[0].Botanical_Name,this.oneplant[0].Photo_1).subscribe(
            (response) => {
              this.addcart = 'Add to cart Successfully';
              setTimeout(() => {
                this.addcart = '';
              }, 4000);
              console.log('Item added to cart successfully', response);
            },
            (error) => {
              console.error('Error adding item to cart', error);
            });
        }
    }
  }

  quantity(val:String)
  {
    if(this.productquantity<20  && val==='plus')
    {
      this.productquantity += 1;
    }
    else if(this.productquantity>1  && val==='min')
    {
      this.productquantity -= 1;
    }
  }
  
getwishlist() {
  this.plantservice.getwishlist().subscribe(
  data => {
    this.data = data;
  });
}

wishlist(data1 :any) {
  this.plantservice.wishlist(data1).subscribe(
    res => {
    this.message="Added to wishlist";
    setTimeout(() => {
      this.message=' ';
    }, 1000);
      this.getwishlist();
    },
    error => {
        this.message='Internal Error';
    }
  )
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



