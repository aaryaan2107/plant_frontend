import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.component.html',
  styleUrls: ['./orderinfo.component.scss']
})
export class OrderinfoComponent implements OnInit {
  id!: string | null;
  item : any[] = []
  Price:Number = 0;
  date!:Date;
  statusbar:String='';
  address:string='';
  nitem!:number;

  constructor(private plantservice: PlantserviceService, private route: ActivatedRoute, private ipservice: IpService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.orderinfo()
  }

  orderinfo(){
    this.plantservice.orderinfo(this.id).subscribe(
      (res) => {
        this.date = res.date;
        this.Price = res.Price;
        this.address = res.address;
        this.statusbar = res.Statusbar;
        this.item = res.item;
        this.nitem = this.item.length
    });
  }
}
