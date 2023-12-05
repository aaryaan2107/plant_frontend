import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class PlantserviceService {


  constructor(private http: HttpClient, private router: Router,private ipservice:IpService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }

  private url = this.ipservice.localurl();
  private isAuth = false;
  private isLoggedIn = false;
  cartdata: EventEmitter<number> = new EventEmitter<number>();


  // Method to filter plants by category
  filterPlantsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.url}/Apis/plants/filter/category/${category}`);
  }

  filterPlantsByFragrance(Fragrance: string): Observable<any> {
    return this.http.get(`${this.url}/Apis/plants/filter/Fragrance/${Fragrance}`);
  }


  //All Plant

  
Allplant(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/Apis/allplant`);
}
getPlants1(page: number): Observable<any> {
  return this.http.get(`${this.url}/Apis/plant?page=${page}`);
}
getPlants(page: number,pageSize: number ): Observable<any> {

  return this.http.get(`${this.url}/Apis/plant?page=${page}&pageSize=${pageSize}`);
}

  //login and signup

  signup(userdata: any): Observable<any> {
    return this.http.post(`${this.url}/Apis/signup`, userdata);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.url}/Apis/login`, { username, password }).pipe(
      map((response: any) => {
        if (typeof response === 'object' && response.token) {
          localStorage.setItem('token', response.token);
          this.isAuth = true;
          this.isLoggedIn = true;
          return true;
        } else {
          this.isAuth = false;
          return false;
        }
      })
    );
  }

  logout() {
    this.isAuth = false;
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setAuthState(isAuthenticated: boolean) {
    this.isAuth = isAuthenticated;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }


  //Profile 

  profile(): Observable<any> {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get(`${this.url}/Apis/profile`, { headers: headers });
  }
  

    
  updateProfile(updatedUserData: any) {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.put(`${this.url}/Apis/update`,{updatedUserData}, { headers: headers });
  }
  checkupdate(updatedUserData: any) {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.put(`${this.url}/Apis/checkupdate`,{updatedUserData}, { headers: headers });
  }


  // localstorage 

  localcartdata(data: any, quantity: number) {
    let cartdata: any[] = [];
    let localcart = localStorage.getItem('cart');

    if (!localcart) {
      cartdata = [{ product: data, quantity }];
    } else {
      cartdata = JSON.parse(localcart);
      const existIndex = cartdata.findIndex((item) => item.product[0]._id === data[0]._id);
      if (existIndex !== -1) {
        cartdata[existIndex].quantity += quantity;
      } else {
        cartdata.push({ product: data, quantity });
      }
    }

    localStorage.setItem('cart', JSON.stringify(cartdata));
    this.cartdata.emit(cartdata.length);
  }


  getCartData(): any[] {
    const cartdata = localStorage.getItem('cart');
    return cartdata ? JSON.parse(cartdata) : [];
  }


  //cart to mongodb

  
  sendCartDataToServer(cartData: any[]): Observable<any> {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.post(`${this.url}/Apis/cartnew`, { cartData }, { headers: headers });
  }
  
  //store

  addToCart(userId: string, productId: string, quantity: number, Price: number,Common_Name:string,Botanical_Name:string,Photo_1:string) {
    const body = { userId, productId, quantity, Price, Common_Name, Botanical_Name, Photo_1 };
    return this.http.post(`${this.url}/Apis/cart`, body);
  }


  //locastorage Item 

  cartitem(): Observable<any[]> {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get<any[]>(`${this.url}/Apis/cartitem`, { headers: headers });
  }


  //delete
  deleteUser(userId: string) {
    return this.http.delete(`${this.url}/Apis/deleteitem/${userId}`);
  }


  //icreament decrement
  qtyplus(data:any):Observable<any> {
    return this.http.post(`${this.url}/Apis/qtyplus`, data);
  }

  qtymins(data:any):Observable<any> {
    return this.http.post(`${this.url}/Apis/qtymins`, data);
  }

  wishlist(data:any):Observable<any> {
    console.log(data);
    
    return this.http.post(`${this.url}/Apis/wishlist`, data);
  }

  getwishlist():Observable<any> {
    const headers = {
      'Authorization':"Bearer " + localStorage.getItem('token')
    }
    return this.http.get(`${this.url}/Apis/getwishlist`, {headers:headers});
  }
  
  deletewishlist(userId: string) {
    return this.http.delete(`${this.url}/Apis/deletewishlist/${userId}`);
  }

  getcurrentitem(): Observable<any> {
    const headers = {
      'Authorization':"Bearer " + localStorage.getItem('token')
    }

    return this.http.get(`${this.url}/Apis/getcurrentorder`, {headers:headers});
  }


   
  searchPlants(query:String,page: number,pageSize: number )
  {
    return this.http.get(`${this.url}/Apis/search?search=${query}&page=${page}&pageSize=${pageSize}`);
  }
  searchPlants2(query:String )
  {
    return this.http.get(`${this.url}/Apis/search2?search=${query}`);
  }

  searchPlants3(query:String )
  {
    return this.http.get(`${this.url}/Apis/search3?search=${query}`);
  }
  
filterPlants(filters: any,page: number,pageSize: number ): Observable<any> {
  return this.http.post(`${this.url}/Apis/filterPlants?page=${page}&pageSize=${pageSize}`, filters);
}





getAdminData(): Observable<any> {
  const headers = {
    'Authorization':"Bearer " + localStorage.getItem('token')
  }

  return this.http.get(`${this.url}/Apis/data`, {headers:headers});
}


adminsignup(userdata: any): Observable<any> {
  return this.http.post(`${this.url}/admin/signup`, userdata);
}

getcurrentorder(data:any):Observable<any> {
  return this.http.post(`${this.url}/Apis/allgetcurrentorder`,data);
}

Alluser():Observable<any>{
  return this.http.get(`${this.url}/Apis/Alluser`);
}
admin(id:any,str:String){
  return this.http.post(`${this.url}/Apis/adminrole`,{id:id,str:str});
}

pastorder(data:any):Observable<any> {
  return this.http.get(`${this.url}/Apis/pastorder/${data}`, data);
}


deleteorder(userId: string) {
  return this.http.delete(`${this.url}/Apis/deleteorder/${userId}`);
}
getorderid(): Observable<any> {
  const headers = {
    'Authorization':"Bearer " + localStorage.getItem('token')
  }

  return this.http.get(`${this.url}/Apis/orderid`, {headers:headers});
}

// addplantid(): Observable<any> {

//   return this.http.get(`${this.url}/admin/addplantid`);
// }

addplant(userdata: any): Observable<any> {
  return this.http.post(`${this.url}/admin/addplant`, userdata);
}


getPayment(id:string | null): Observable<any> {
  return this.http.get(`${this.url}/Apis/getpayment/${id}`);
}

getlinkid(): Observable<any> {
  const headers = {
    'Authorization':"Bearer " + localStorage.getItem('token')
  }
  return this.http.get(`${this.url}/Apis/getlinkid`, {headers:headers});
}



currentorder(data:any):Observable<any> {
    const headers = {
      'Authorization':"Bearer " + localStorage.getItem('token')
    }
    return this.http.post(`${this.url}/Apis/currentorder`, data,{headers:headers});
}
//trending
TrendingPlants(trendid:any,trendid2:any) : Observable<any>{
  return this.http.post(`${this.url}/admin/trending`, {trendid,trendid2} );
}
tplants():Observable<any>{
  console.log('ghhgghghghghhghghg')
  return this.http.get(`${this.url}/admin/gettplants`);
}

removertrend(tid:any):Observable<any>{
  return this.http.delete(`${this.url}/admin/removertrend/${tid}`);
}
trending(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/admin/trend`);
}


getRePayment(id:string | null): Observable<any> {  
  return this.http.get(`${this.url}/Apis/getrepayment/${id}`);
}

getplantFamliy(id:string | null): Observable<any> {  
  return this.http.get(`${this.url}/Apis/plant/${id}`);
}

getplantid(id:string | null): Observable<any> {  
  return this.http.get(`${this.url}/Apis/plantid/${id}`);
}
// invoice
invoice(): Observable<any> {  
  return this.http.get(`${this.url}/Apis/pdf`);
}
orderinfo(id:string | null): Observable<any> {  
  const headers = {
    'Authorization':"Bearer " + localStorage.getItem('token')
  }
  return this.http.get(`${this.url}/Apis/orderinfo/${id}`,{headers:headers});
}

userdata(): Observable<any> {
  const headers = {
    'Authorization':"Bearer " + localStorage.getItem('token')
  }
  return this.http.get(`${this.url}/Apis/username`, {headers:headers});
}


}