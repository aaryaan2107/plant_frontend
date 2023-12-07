import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {

  adminData: any;
  order:boolean = false;
  datas:any;
  data:any;
  plant!:any[];
  p: number = 1;
  formdata: { username: String, password: String, cpassword: String, email: String, phone: String, address: String } = {
    username: '',
    password: '',
    cpassword: '',
    email: '',
    phone: '',
    address: '',
  };
  a:string='';
  errormessage: string = '';
  success: String = '';
  selectedSection: string = 'home';
  current:any[]=[];
  alluser:any;
  trend: any[]=[];
  trendplant:boolean = false;
  message:string='';
  selection:any;


  constructor(private plantservice: PlantserviceService,private router:Router) {}

  ngOnInit(): void {

   this.allusers();
  }

  signup(userdata: any) {
    if (userdata.password == userdata.cpassword) {
      this.plantservice.adminsignup(userdata).subscribe(
        (res) => {
          this.success = 'Signup Suceesfully....';
          this.errormessage = '';

          setTimeout(() => {
            this.success = '';
            this.router.navigate(['/index']);
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


  addadmin(id:any,str:String){
    this.plantservice.admin(id,str).subscribe((res)=>{
    if(res){
      this.message = 'added admin successfull..';
        this.allusers();
    }
    })
  }


  allusers(){
    this.plantservice.Alluser().subscribe(
      (user) => {
        this.alluser = user;
      
      }
    )
  }
}
