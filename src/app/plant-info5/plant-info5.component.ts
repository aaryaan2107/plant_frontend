import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';

@Component({
  selector: 'app-plant-info5',
  templateUrl: './plant-info5.component.html',
  styleUrls: ['./plant-info5.component.scss']
})
export class PlantInfo5Component {
  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  qrurl:any;
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute,private ipservice:IpService) { }

  ngOnInit() {
    this.qrurl =  this.ipservice.qrcode();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.plantservice.getplantid(this.id).subscribe(
        (res) => {
          this.plant = res.data
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
