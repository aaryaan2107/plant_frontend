import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

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
  ];
  

  isRightNavbarVisible: boolean = false;

  toggleRightNavbar()
   {
    this.isRightNavbarVisible = !this.isRightNavbarVisible;
  
  if (this.isRightNavbarVisible) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}
}
