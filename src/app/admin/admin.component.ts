import { Component, ElementRef, ViewChild } from '@angular/core';
declare var $: any;
import { Router } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
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
  alluser:any[]=[];
  @ViewChild('content1') content1!: ElementRef;
  @ViewChild('content2') content2!: ElementRef;


  constructor(private plantservice: PlantserviceService,private router:Router) {}

  navOpen: boolean = false;

  ngOnInit(): void {
    this.getprofile();
    this.plantservice.alluser().subscribe(
      (user) => {
        this.alluser = user;
      }
    )
    this.allplants()
  }
  
  allplants()
  {
    this.plantservice.Allplant().subscribe(
      (data)=>{
        this.plant=data
        console.log(this.plant);
        
      }
    )
    
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




  getprofile() {
    this.plantservice.profile().subscribe((res) => {
      if (res.success) {
        this.datas = res.data;
      }
    })
  }

  
  changeSection(section: string) {
    this.order=false
    this.selectedSection = section;
  }

  getcurrentorder(data:any){
    this.order = true;
    this.selectedSection = 'order';
    this.data = data;
    if(data.statusbar == 'current')
    {
      this.a ='a';
    }
    else
    {
      this.a = '';
    }

    this.p = 1;
    this.plantservice.getcurrentorder(data).subscribe(
      (current) =>{
        this.current = current;
        console.log(current)
      }
    )
  }

  pastorder(data:any){
    this.plantservice.pastorder(data).subscribe(
      res =>{
        console.log(res);
        this.getcurrentorder({statusbar:'current'});
      }
    )
  }
  







  toggleContent(contentId: string): void {
    if (contentId === 'content1') {
      $(this.content2.nativeElement).collapse('hide');
      $(this.content1.nativeElement).collapse('toggle');
    } else if (contentId === 'content2') {
      $(this.content1.nativeElement).collapse('hide');
      $(this.content2.nativeElement).collapse('toggle');
    }


  }



  toggleNav() {
    this.navOpen = !this.navOpen;
  }















}
