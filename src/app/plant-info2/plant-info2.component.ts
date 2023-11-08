import { Component } from '@angular/core';
import { PlantserviceService } from 'src/service/plantservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-info2',
  templateUrl: './plant-info2.component.html',
  styleUrls: ['./plant-info2.component.scss']
})
export class PlantInfo2Component {

  id!: string | null;
  loading: Boolean = true;
  plant!: any[];
  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
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
