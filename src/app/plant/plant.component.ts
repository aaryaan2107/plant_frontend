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
  p : number = 1;
  page: number = 1;
  searchControl = new FormControl();
  loading:boolean=false;
  user:any;
  userID!:string|null;
  searchQuery: string = '';
  message: string = '';
  searchdata:boolean = false;
  data:any;
  defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwnvLCKw84lm1Gli7GUrhVNzB0GNpeJevWst8ED__Gw&s";
  filterCategory: string = '';
  Fragrance: string = '';

  filteredPlants: any[] = []; // Array to store the filtered data
  categoryFilter: string = ''; // Category filter value
  priceFilter: number = 0; // Price filter value
  ToxicityFilter : string = '';
  MaintenanceFilter : string = '';
  ExposureFilter : string = '';
  FragranceFilter : string = '';
  WaterReqFilter : string = '';


 constructor(private plantservice: PlantserviceService,private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {


    this.getwishlist();
    this.fetchPlants();
    this.user = localStorage.getItem('token');
    var decoded:any = jwt_decode(this.user);
    this.userID=decoded.userId
    
  }







  search() {
    if (this.searchQuery.trim() !== '') {
      this.plantservice.searchPlants(this.searchQuery).subscribe((data: any) => {
        this.plants = data;
      });
    } else {
      this.plants = []; // Clear the list if the search query is empty
    }
  }

  selectPlant(plant: any) {
    // Handle the selected plant, e.g., navigate to its details page
    console.log('Selected Plant:', plant);
    
    // Clear the plants array after selecting a plant
    this.plants = [];
  }






    filterPlants() 
    {    this.loading = true;
      this.plants = this.plantss.filter(plants => {
        this.loading = false;
        const FragranceFilter = !this.FragranceFilter || plants.Fragrance === this.FragranceFilter;
        const categoryMatch = !this.categoryFilter || plants.Category === this.categoryFilter;
        const ToxicityFilter = !this.ToxicityFilter || plants.Toxicity === this.ToxicityFilter;
        const MaintenanceFilter = !this.MaintenanceFilter || plants.Maintenance === this.MaintenanceFilter;
        const ExposureFilter = !this.ExposureFilter || plants.Exposure === this.ExposureFilter;
        const WaterReqFilter = !this.WaterReqFilter || plants.WaterReq === this.WaterReqFilter;
        const priceMatch = this.priceFilter === 0 || plants.Price <= this.priceFilter;

        
        return categoryMatch && priceMatch && ToxicityFilter && MaintenanceFilter && WaterReqFilter && ExposureFilter && FragranceFilter;
      });
    }


  
  fetchPlants(): void {
    this.loading = true;
    this.plantservice.getPlants(this.page).subscribe((data) => {
      this.loading = false;
      this.plantss = [...this.plants, ...data];
      this.plants = [...this.plants, ...data];

    });
  }

  handleImageError(plant: any): void {
    plant.Photo_1 = this.defaultImageUrl;
  }

  onLoadMore(): void {
    this.page++;
    this.fetchPlants();

  }

getwishlist()
{
  this.plantservice.getwishlist().subscribe(
    data => {
      this.data = data;
    }
  )
}
  wishlist(data1 :any)
  {
    this.plantservice.wishlist(data1).subscribe(
      res => {
      this.message="Added to wishlist";
      setTimeout(() => {
        this.message=' ';
      }, 1000);
        console.log('hello');
        this.getwishlist();
      },
      error => {
          this.message='Internal Error';
console.log(error);
      }
    )
  }
 


  // search() {
  //   console.log(this.searchQuery);
    
  //   this.searchdata = true;
  //   if (this.searchQuery.trim() !== '') {
  //     this.plantservice.searchPlants(this.searchQuery).subscribe((data: any) => {
  //       this.plants = data;
  //       console.log(this.plants);
  //     });
  //   } else {
  //    console.log('error');
  //   }
  // }
  // selectPlant(plant: any) {
  //   // Handle the selected plant, e.g., navigate to its details page
  //   console.log('Selected Plant:', plant);
  // }


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


    this.categoryFilter= '';
   this.priceFilter = 0;
   this.ToxicityFilter   = '';
   this.MaintenanceFilter = '';
   this.ExposureFilter   = '';
   this.FragranceFilter   = '';
   this.WaterReqFilter ='';
     
       this.plants = this.plantss; 
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


}
