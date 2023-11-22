import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import jwt_decode from "jwt-decode";
import { flush } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';


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
  searchdata:boolean = false;
  filter:boolean = false;
  user:any;
  data:any;
  userID!:string|null;
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
  priceFilter: number = 0;
  page: number = 1;
  p : number = 1;
  p2:number=1;
  p3: number = 1;
  pageSize: number = 8;
  pagesize2:number=8;
  pageSize3: number = 8;
  totalFilteredPages!:number;
  
  
  
  
  
  constructor(private plantservice: PlantserviceService,private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.loadPlants();
    this.plantservice.Allplant().subscribe((res)=>{
        this.plants3= res;
    });
    this.get();
    this.user = localStorage.getItem('token');
    var decoded:any = jwt_decode(this.user);
    this.userID=decoded.userId;

    this.plantservice.trending().subscribe((res)=>{
      this.trending = res;
      console.log(this.trending);
      
    })
  }

  loadPlants() {
    this.loading=true;
    if (this.totalPlantss !== undefined) {
    this.plantservice.getPlants(this.p, this.pageSize).subscribe(
      (data) => {
        this.loading = false;
         this.plants = data;
         console.log(this.p,this.pageSize,this.plants);
         
        console.log( this.totalPlantss);
      },
      (error) => {
        console.error('Error fetching plants', error);
      }
    );
    }
  }
  
  get() {
      this.plantservice.Allplant().subscribe((res) => {
      this.totalPlants = res.length;
      this.plants3 = res;
      this.totalPlantss = this.totalPlants;  
      this.loadPlants();
    });
  }
  
  filterPlants() {
    this. closeNav() ;
    this.filter = true;
    this.loading = true;

    const filteredPlants = this.plants3.filter((plant) => {
      const FragranceFilter = !this.FragranceFilter || plant.Fragrance === this.FragranceFilter;
      const categoryMatch = !this.categoryFilter || plant.Category === this.categoryFilter;
      const ToxicityFilter = !this.ToxicityFilter || plant.Toxicity === this.ToxicityFilter;
      const MaintenanceFilter = !this.MaintenanceFilter || plant.Maintenance === this.MaintenanceFilter;
      const ExposureFilter = !this.ExposureFilter || plant.Exposure === this.ExposureFilter;
      const WaterReqFilter = !this.WaterReqFilter || plant.WaterReq === this.WaterReqFilter;
      const priceMatch = this.priceFilter === 0 || plant.Price <= this.priceFilter;
      return ( categoryMatch &&  priceMatch && ToxicityFilter && MaintenanceFilter && 
              WaterReqFilter && ExposureFilter && FragranceFilter
        );
      });

      const startIndex = (this.p3 - 1) * this.pageSize3;
      const endIndex = startIndex + this.pageSize3;
      this.plants = filteredPlants.slice(startIndex, endIndex);
      this.loading = false;
    this.totalFilteredPages = Math.ceil(filteredPlants.length / this.pageSize3) //26
  }
  
  changePage2(newPage: number) {
    this.p3 = newPage;      // Update the current page
    this.filterPlants();
  }

  totalPages2(): number {
    return this.totalFilteredPages ;
  }
  
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
    this.plantservice.searchPlants2(this.searchQuery).subscribe(
    (res: any) => {
        if (Array.isArray(res)) {
          this.totalPlants2 = res.length;
          console.log(this.totalPlants2);
          
        } 
      });
    console.log(this.searchQuery);
    
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

changePage(newPage: number) {
  if (newPage >= 1 && newPage <= this.totalPages()) {
    this.p2 = newPage;
    this.search();
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
   this.priceFilter = 0;
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














  nextPage() {
  
    if (this.p < this.getTotalPages()) {
      this.p++;
      this.loadPlants();
    }
    else{
      console.log('error');
    }
  }

  prevPage() {
    if (this.p > 1) {
      this.p--;
      this.loadPlants();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages() && page !== this.p) {
      this.p = page;
      this.loadPlants();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalPlants / this.pageSize);
  }

  getPageNumbers(): number {
    const totalPages = this.getTotalPages();
    return totalPages;
  }

}

