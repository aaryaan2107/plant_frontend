import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info2',
  templateUrl: './plant-info2.component.html',
  styleUrls: ['./plant-info2.component.scss']
})
export class PlantInfo2Component {

  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  qrurl:any;
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {
    this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.plantservice.plantinfo2(this.id).subscribe(
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
