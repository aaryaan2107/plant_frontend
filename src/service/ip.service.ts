import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private url = 'https://plant-backend6.onrender.com';
  private urllocal = 'http://192.168.68.53:3000';
  private qrurl = 'https://growmoreplant.netlify.app';
    
  constructor(private router: Router) { }



  localurl() {
    return this.url;
  }


  qrcode(){
    return this.qrurl;
  }
}
