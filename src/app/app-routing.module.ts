import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PlantComponent } from './plant/plant.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { PlantInfo1Component } from './plant-info1/plant-info1.component';
import { AboutComponent } from './about/about.component';
import { PlantInfo2Component } from './plant-info2/plant-info2.component';
import { PlantInfo3Component } from './plant-info3/plant-info3.component';
import { PlantInfo4Component } from './plant-info4/plant-info4.component';
import { PlantInfo5Component } from './plant-info5/plant-info5.component';
import { PlantInfo6Component } from './plant-info6/plant-info6.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import {NotfoundComponent} from './notfound/notfound.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CurrentorderComponent } from './currentorder/currentorder.component';
import { AdminComponent } from './admin-panel/admin/admin.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { OrderinfoComponent } from './orderinfo/orderinfo.component';
import {AdminPanelModule  } from './admin-panel/admin-panel.module';
import { AddAdminComponent } from './admin-panel/add-admin/add-admin.component';
import { AddPlantComponent } from './admin-panel/add-plant/add-plant.component';
import { PlantDetailComponent } from './admin-panel/plant-detail/plant-detail.component';





const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'header',component:HeaderComponent},
  {path:'loader',component:LoaderComponent},
  {path:'plants',component:PlantComponent},
  {path:'plants/:code',component:PlantComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'index',component:IndexComponent},
  {path:'plantinfo2/:id',component:PlantInfo2Component},
  {path:'plantinfo1/:id',component:PlantInfo1Component},
  {path:'plantinfo3/:id',component:PlantInfo3Component},
  {path:'plantinfo4/:id',component:PlantInfo4Component},
  {path:'plantinfo5/:id',component:PlantInfo5Component},
  {path:'plantinfo6/:id',component:PlantInfo6Component,},
  {path:'about',component:AboutComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'user',component:UserprofileComponent,canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'wishlist',component:WishlistComponent,canActivate:[AuthGuard]},
  {path:'order',component:CurrentorderComponent,canActivate:[AuthGuard]},
  {path:'admin',component:AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  {path:'admin/add-admin/:act',component:AddAdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  {path:'admin/add-plant',component:AddPlantComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  {path:'admin/plant-details/:act',component:PlantDetailComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  {path :'orderlist',component:OrderlistComponent,canActivate: [AuthGuard]},
  {path :'orderinfo/:id',component:OrderinfoComponent,canActivate: [AuthGuard]},
  {path:'orderlist/payment/:id',component:PaymentComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotfoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]  
 
})
export class AppRoutingModule { }
