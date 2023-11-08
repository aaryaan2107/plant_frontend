import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private Plantservice: PlantserviceService, private router: Router,private route: ActivatedRoute) { }

  login() {
    this.Plantservice.login(this.username, this.password).subscribe(
      (response) => {
          const cartData = this.Plantservice.getCartData();
          this.Plantservice.sendCartDataToServer(cartData).subscribe(
            (response) => {
                localStorage.removeItem('cart');
            },
            (error) => {
                console.error('Error sending cart data to server:', error);
            }
           );
           const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

           // Navigate to the intended URL or default to home
           this.router.navigateByUrl(returnUrl);
      },
      (error) => {
        this.errorMessage = 'Enter Valid username or password';
        this.router.navigate(['/login']);
      }
   );
 }

}


