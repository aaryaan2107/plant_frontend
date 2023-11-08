import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  formdata: { username: String, password: String, cpassword: String, email: String, phone: String, address: String } = {
    username: '',
    password: '',
    cpassword: '',
    email: '',
    phone: '',
    address: '',
  };
  errormessage: string = '';
  success: String = '';


  constructor(private plantservice: PlantserviceService, private router: Router) { }

  signup(userdata: any) {
    if (userdata.password == userdata.cpassword) {
      this.plantservice.signup(userdata).subscribe(
        (res) => {
          this.success = 'Signup Suceesfully....';
          this.errormessage = '';

          setTimeout(() => {
            this.success = '';
            this.router.navigate(['/login']);
          }, 800);
        },
        (error) => {
          if (error.status === 409) {
            this.errormessage = 'username already exist';
          }
          else if (error.status === 400 && error.error.error === 'Username or Password is Empty') {
            this.errormessage = 'Username or Password is Empty';
          }
          else {
            this.errormessage = 'signup Failed';
          }
        })
    }
    else {
      this.errormessage = 'password are not match';
    }
  }
}
