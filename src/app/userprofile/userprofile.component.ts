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
  editing:Boolean = false;
  constructor(private plantservice: PlantserviceService) { }

  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
    this.plantservice.profile().subscribe((res) => {
        this.data = res.data;
    })
  }

  editUser() {
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveChanges() {
   
    const updatedUserData = {
      username: this.data.username, 
      email: this.data.email,
      phone: this.data.phone,
      home_address: this.data.home_address,
      office_address: this.data.office_address,
      other_address: this.data.other_address,
    };

    console.log(updatedUserData);
    

    this.plantservice.updateProfile(updatedUserData).subscribe(
      (res) => {
       console.log(res);
       
        this.editing = false;
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
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
