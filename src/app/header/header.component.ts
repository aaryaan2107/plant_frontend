import { Component, OnInit} from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{  
  cartitem =0;
  loggin:boolean = false;
  data:any;
  total!: number;
  item: any;
  uname: any;

  constructor(private plantservice: PlantserviceService) { }

 ngOnInit() 
 {
  this.plantservice.userdata().subscribe((res)=>{  
    this.uname=res.name    
        });

  if(!localStorage.getItem('token')){
    this.loggin = false;
    let cartdata = localStorage.getItem('cart');
    if (cartdata) {
      this.cartitem = JSON.parse(cartdata).length;
    }
    this.plantservice.cartdata.subscribe((count) => {
      this.cartitem = count;
    });
  }
  else
  {
    this.loggin = true;
    this.plantservice.cartitem().subscribe(
      data => {
        this.data = data; 
        this.total = data.length;
      }
    )
  }

}

  isLoggedIn() {
    return this.plantservice.isAuthenticated();
  }
  
  onLogout() {
    this.plantservice.logout();
  }

  openNav() {
    const mySidenav = document.getElementById('mySidenav');
    if (mySidenav) {
      mySidenav.style.width = '250px';
    }
  }

  closeNav() {
    const mySidenav = document.getElementById('mySidenav');
    if (mySidenav) {
      mySidenav.style.width = '0';
    }
  }
}  