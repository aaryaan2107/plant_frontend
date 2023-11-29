import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info1',
  templateUrl: './plant-info1.component.html',
  styleUrls: ['./plant-info1.component.scss']
})
export class PlantInfo1Component {
  productquantity:number=1;
  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  cart!:any[];
  searchText:any; 
  user:any;
  addcart: String = '';
  qrurl:any;

  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {

   this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
    this.id = params.get('id');

    this.plantservice.Allplant().subscribe(
    plant => {
      this.plant = plant.filter(plant => plant.ID && plant.ID.includes(this.id));
      this.loading = false;
      console.log(this.plant);
    },
    (error) => {
      console.log(error);
      }
    )
   });
  }


  addtocart() {

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
    

        this.plantservice.Allplant().subscribe(
          plants => {
            const plant = plants.find(plant => plant.ID && plant.ID.includes(this.id));
            const plantPrice = plant.Price;
            
            this.plantservice.addToCart(userId, productId, this.productquantity,plantPrice,plant.Common_Name,plant.Botanical_Name,plant.Photo_1).subscribe(
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
}



