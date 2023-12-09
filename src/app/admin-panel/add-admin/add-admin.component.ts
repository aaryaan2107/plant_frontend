import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {

  // adminData: any;
  // order:boolean = false;
  // datas:any;
  // data:any;
  // plant!:any[];
  // p: number = 1;
  formdata: { username: String, password: String, cpassword: String, email: String, phone: String, address: String } = {
    username: '',
    password: '',
    cpassword: '',
    email: '',
    phone: '',
    address: '',
  };
  addadminform:boolean=false;
  listofuser:boolean=false;
  // a:string='';
  errormessage: string = '';
  success: String = '';
  // selectedSection: string = 'home';
  // current:any[]=[];
  alluser:any;
  // trend: any[]=[];
  // trendplant:boolean = false;
  message:string='';
  // selection:any;


  constructor(private plantservice: PlantserviceService,private router:Router, private activeroute:ActivatedRoute) {}

  ngOnInit(): void {

this.activeroute.paramMap.subscribe((p)=>{
  let act = p.get('act');
if(act=="add-new-admin"){
  this.addadminform = true;
this.listofuser = false;}
if(act=="list-of-user"){
this.listofuser = true;
this.addadminform=false;}
  
})


    // this.avroute.paramMap.subscribe(params=>{
    //   let code=params.get('code')
    //   console.log(code);
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
            setTimeout(() => {
              this.errormessage ='';
            },3000);
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
