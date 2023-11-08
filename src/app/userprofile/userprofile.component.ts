import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { PlantserviceService } from 'src/service/plantservice.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  data: any;
  constructor(private plantservice: PlantserviceService) { }

  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
    this.plantservice.profile().subscribe((res) => {
      if (res.success) {
        this.data = res.data;
      }
    })
  }

  onLogout() {
    setTimeout(() => {
      this.plantservice.logout();
    }, 400);

  }


  activeTab: number = 1; // Set Text 1 as the default active tab

  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }


  order()
  {
  this.plantservice.getcurrentitem().subscribe(
    res => {
        console.log(res);
        this.data = res;
  });

}

}