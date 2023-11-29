import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info3',
  templateUrl: './plant-info3.component.html',
  styleUrls: ['./plant-info3.component.scss']
})
export class PlantInfo3Component {
  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  qrurl:any;
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {
    this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.plantservice.Allplant().subscribe(
        plant => {
          this.plant = plant.filter(plant => plant.ID && plant.ID.includes(this.id));
          this.loading = false;
          console.log(this.plant);
        },
        (error) => {
          console.log(error);
        }
      )
    });
  }
}
