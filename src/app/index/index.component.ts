import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  trendingplant:boolean = true;
  trending:any[]=[];
  Allfilter=
  [
    {
      "title": "Indoor Plant",
      "src": "../../assets/filter/indoor_plant.png",
      "link":"/plants/Indoor"
    },
    {
      "title": "Outdoor Plant",
      "src": "../../assets/filter/outdoor_plant.png",
      "link":"/plants/Outdoor"
    },
    {
      "title": "Non-toxic Plant",
      "src": "../../assets/filter/non-toxic_plant.png",
      "link":"/plants/Non-Toxic"
    },
    {
      "title": "Low-Maintanance Plant",
      "src": "../../assets/filter/season_plant.png",
      "link":"/plants/Maintenance"
    },
    {
      "title": "Fragrance Plant",
      "src": "../../assets/filter/foliage_plant.png",
      "link":"/plants/Fragrance"
    },
    {
      "title": "Not-Fragrance Plant",
      "src": "../../assets/filter/foliage_plant.png",
      "link":"/plants/Fragrance",
      "class":'rescen'
    },
  ];

  

  isRightNavbarVisible: boolean = false;
  constructor(private plantservice: PlantserviceService) { }

  ngOnInit()
  {
    this.trendd();
  }

  toggleRightNavbar()
   {
    this.isRightNavbarVisible = !this.isRightNavbarVisible;
  
  if (this.isRightNavbarVisible) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}


chunkArray(array: any[], chunkSize: number): any[][] {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  

  return result;
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

}


