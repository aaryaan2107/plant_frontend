import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { StockComponent } from './stock/stock.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@NgModule({
  declarations: [
    AddAdminComponent,
    PlantDetailComponent,
    AddPlantComponent,
    AdminComponent,
    StockComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports:[
    AddAdminComponent,
    PlantDetailComponent,
    AddPlantComponent,
    AdminComponent
  ]
})
export class AdminPanelModule { }
