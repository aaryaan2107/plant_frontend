import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info6',
  templateUrl: './plant-info6.component.html',
  styleUrls: ['./plant-info6.component.scss']
})
export class PlantInfo6Component {
  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  qrurl:any;
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {
    this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.plantservice.plantinfo6(this.id).subscribe(
        (res) => {
          this.plant = res;
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
