import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plant';
  
  constructor(private plantservice: PlantserviceService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.plantservice.setAuthState(true);
    }
  }
}
