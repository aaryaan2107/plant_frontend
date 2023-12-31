import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import jwt_decode from "jwt-decode";
import { flush } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent  implements OnInit {
  plants: any[] = [];
  plantss: any[] = [];
  plants3:any[]=[]; 
  filteredPlants: any[] = [];  
  trending:any[]=[];
  loading:boolean=false;
  loading2:boolean=false;
  searchdata:boolean = false;
  filter:boolean = false;
  trendingplant:boolean = true;
  user:any;
  data:any;
  userID!:string;
  searchQuery: string = '';
  message: string = '';
  defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwnvLCKw84lm1Gli7GUrhVNzB0GNpeJevWst8ED__Gw&s";
  filterCategory: string = '';
  Fragrance: string = '';
  categoryFilter: string = '';  
  ToxicityFilter : string = '';
  MaintenanceFilter : string = '';
  ExposureFilter : string = '';
  FragranceFilter : string = '';
  WaterReqFilter : string = '';
  totalPlants!: number ;
  totalPlantss!: number;
  totalPlants2!: number;
  priceFilter: any = 0;
  page: number = 1;
  p : number = 1;
  p1:number=1;
  p2:number=1;
  p3: number = 1;
  productquantity:number=1;
  pageSize: number = 8;
  pageSiz1: number = 8;
  pagesize2:number=8;
  pageSize3: number = 8;
  totalFilteredPages!:number;
  a!:any;
  addcart: String = '';
  oneplants!:any;
  serachplant:any;
  // b:String='Our';
  
  
  
  
  constructor(private plantservice: PlantserviceService,private el: ElementRef, private renderer: Renderer2,   private avroute:ActivatedRoute) { }
  
  ngOnInit() {
    this.getwishlist(); 
    this.avroute.paramMap.subscribe(params=>{
      let code=params.get('code');
      this.a = code;
    });
   if(this.a){
    this.trendd();
    this.setDefaultFilter();
    // this.filterPlants();
   }
   else{
    this.loadPlants();
    // this.get();
  this.trendd();
   
   }
   this.user = localStorage.getItem('token');
   var decoded:any = jwt_decode(this.user);
   this.userID=decoded.userId;
      
   
    
  }

  scrollToElement(target:any): void {
    
   target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


   trendd(){ 
    this.plantservice.trending().subscribe((res)=>{
      this.trending = res;
   if(res.length<1){
      this.trendingplant = false;
      console.log('h');
   }
      
    })
   }

       
  setDefaultFilter(){ 
    this.avroute.paramMap.subscribe(params=>{
      let code=params.get('code')
      console.log(code);
    

      if(code!=null)
      {
        if(code=='Outdoor' || code=='Indoor'){
        this.categoryFilter = code;
      }

      if(code=='Fragrance'){
        this.FragranceFilter = 'Yes';
      }

      if(code=='Non-Toxic'){
        this.ToxicityFilter = code;
      }
      if(code=='Maintenance'){
        this.MaintenanceFilter = 'Easy';
      }

        this.filterPlants();
      }
      
    })
   }


  
  filterPlants() {
    this. closeNav() ;
    this.filter = true;


      const filters = {
        Category: this.categoryFilter,
        Fragrance: this.FragranceFilter,
        Maintenance : this.MaintenanceFilter,
        Toxicity : this.ToxicityFilter
      };
console.log(filters);

      this.plantservice.filterPlants(filters,this.p3,this.pageSize3).subscribe((data) => {
        this.plants = data.plant; 
        this.totalFilteredPages = Math.ceil(data.total/this.pageSize3);
      });
  }
  
  changePage2(newPage: number,target:any) {
    this.p3 = newPage;   
    this.filterPlants();
    this.scrollToElement(target);
  }

  totalPages2(): number { 
    return this.totalFilteredPages ;
  }
  



  // addtocart(id:string){
  //   console.log(id);
    
  //   if(this.plants)
  //   {
  //     if(!localStorage.getItem('token')) {  
  //       this.plantservice.localcartdata(this.plants.filter(plant => String(plant.ID).includes(id)),this.productquantity);
  //       this.addcart = 'Add to cart Successfully';
  //       setTimeout(() => {
  //         this.addcart = '';
  //       }, 5000);
  //     }
  //     else{
  //       this.oneplants = this.plants.filter(plant => String(plant.ID).includes(id));
  //       this.plantservice.addToCart(this.userID, id, this.productquantity,this.oneplants[0].Price,this.oneplants[0].Common_Name,this.oneplants[0].Botanical_Name,this.oneplants[0].Photo_1).subscribe(
  //         (res) =>{
  //           this.addcart = 'Add to cart Successfully';
  //           setTimeout(() => {
  //           this.addcart = '';
  //           }, 5000);
  //       });
  //     }
      
      
  //   }

  // }
  














  // fetchPlants(): void {
  //   this.loading = true;
  //   this.plantservice.getPlants1(this.page).subscribe((data) => {
  //     this.loading = false;
  //     this.plantss = [...this.plants, ...data];
  //     this.plants = [...this.plants, ...data];

  //   });
  // }

  handleImageError(plant: any): void {
    plant.Photo_1 = this.defaultImageUrl;
  }

  onLoadMore(): void {
    this.page++;
    // this.fetchPlants();
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
 
  search() {
    this.clearAllFilters();
    this.plantservice.searchPlants2(this.searchQuery).subscribe(
    (res: any) => {
          this.totalPlants2 = res;
          console.log(this.totalPlants2);
  
          
      });
    this.searchdata = true;
    if (this.searchQuery.trim() !== '') {
   
      
      this.plantservice.searchPlants(this.searchQuery,this.p2, this.pagesize2).subscribe((data: any) => {
        this.plants = data;
        console.log(this.plants);
      });
    } else {
     console.log('error');
    }
  }



  
                 
  realTimeSearch() {
  
    if (this.searchQuery.trim() !== '') {
      this.clearAllFilters();
      this.plantservice.searchPlants(this.searchQuery, this.p2, this.pagesize2).subscribe((data: any) => {
        this.serachplant = data;
      });

      this.plantservice.searchPlants3(this.searchQuery).subscribe(
        (res: any) => {
         this.serachplant = res;
      
              
          });
 
      this.searchdata = true;
    } else {
      this.searchdata = false;
      console.log('error');
    }
  }


  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    
  
    return result;
  }
  


totalPages(): number {

  return Math.ceil(this.totalPlants2 / this.pagesize2);
}

changePage(newPage: number,target:any) {
  if (newPage >= 1 && newPage <= this.totalPages()) {
    this.p2 = newPage;
    this.search();
    this.scrollToElement(target);
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

  clearAllFilters() {
    this.closeNav();
    this.categoryFilter= '';
   this.priceFilter  = '';
   this.ToxicityFilter   = '';
   this.MaintenanceFilter = '';
   this.ExposureFilter   = '';
   this.FragranceFilter   = '';
   this.WaterReqFilter ='';
   this.plants = this.plants; 
   this.filter = false;
  }

  openNav() {
    const mySidenav = this.el.nativeElement.querySelector('#mySidenav2');
    if (mySidenav) {
      this.renderer.setStyle(mySidenav, 'width', '250px');
    }
  }

  closeNav() {
    const mySidenav = this.el.nativeElement.querySelector('#mySidenav2');
    if (mySidenav) {
      this.renderer.setStyle(mySidenav, 'width', '0');
    }
  }





  loadPlants() {
    this.loading2=true;
   
    this.plantservice.getPlants(this.p1, this.pageSize).subscribe(
      (data) => {
        this.loading2 = false;
         this.plants = data.plants; 
         console.log(data.plants);
         
         this.totalPlantss = Math.ceil(data.totalplants/this.pageSize);
        console.log( this.totalPlantss);
      },
      (error) => {
        console.error('Error fetching plants', error);
      }
    );
  }

/*

  changePage2(newPage: number) {
    this.p3 = newPage;     
    this.filterPlants();
  }

  totalPages2(): number { 
    return this.totalFilteredPages ;
  }
  */ 

pages(newPage:number,taget:any){
this.p1 = newPage;
this.loadPlants();
this.scrollToElement(taget);
}


getTotalPages(){
  return this.totalPlantss;
}




}

