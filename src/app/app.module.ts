import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { PlantComponent } from './plant/plant.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PlantInfo1Component } from './plant-info1/plant-info1.component';
import { HeaderComponent } from './header/header.component';
import { PlantInfo2Component } from './plant-info2/plant-info2.component';
import { PlantInfo3Component } from './plant-info3/plant-info3.component';
import { PlantInfo4Component } from './plant-info4/plant-info4.component';
import { PlantInfo5Component } from './plant-info5/plant-info5.component';
import { PlantInfo6Component } from './plant-info6/plant-info6.component';
import { QRCodeModule } from 'angularx-qrcode';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CurrentorderComponent } from './currentorder/currentorder.component';
import { AdminComponent } from './admin/admin.component';
import { AddplantComponent } from './addplant/addplant.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    PlantComponent,
    ContactUsComponent,
    FooterComponent,
    PlantInfo1Component,
    HeaderComponent,
    PlantInfo2Component,
    PlantInfo3Component,
    PlantInfo4Component,
    PlantInfo5Component,
    PlantInfo6Component,
    SignupComponent,
    LoginComponent,
    NotfoundComponent,
    UserprofileComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent,
    CurrentorderComponent,
    AdminComponent,
    AddplantComponent,
    PaymentComponent,
    OrderlistComponent,
    LoaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    BrowserModule, FormsModule, Ng2SearchPipeModule,NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
