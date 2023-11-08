import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlantserviceService } from 'src/service/plantservice.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:any;
  token:any;

  constructor(private plantservice: PlantserviceService, private router:Router){}  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    this.token = localStorage.getItem('token');
   var decoded:any = jwt_decode(this.token);
   if (this.token) 
   {
     if (route.data && route.data['expectedRole'] && route.data['expectedRole'] !== decoded.role) {
       // Redirect to unauthorized page or handle accordingly
       this.router.navigate(['/index']);
       return false;
     }
     return true;
   }
   else
   {
     console.log('not uuser');
     this.router.navigate(['/login']);
     return false;
   }
 }
}