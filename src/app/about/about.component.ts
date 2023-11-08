import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // isSidebarOpen: boolean = true;

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }
  filterSpecies: string = '';
  filterCategory: string = '';
  plants: any[] = [];
  filteredPlants: any[] = [];

  constructor(private plantService: PlantserviceService) {}

  ngOnInit() {

  }

  filterPlants() {
    if (this.filterCategory) {
      this.plantService.filterPlantsByCategory(this.filterCategory).subscribe((data: any) => {
       this.plants = data;
       console.log(this.plants);
      }
      )};
  }
  
  
}