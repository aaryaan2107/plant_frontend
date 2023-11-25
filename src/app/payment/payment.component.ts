import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantserviceService } from 'src/service/plantservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payment: any;
  order_id: string = ''
  cf_payment_id: string = ''
  id!: string | null;
  
constructor(private plantservice: PlantserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');      
    });

    this.plantservice.getPayment(this.id).subscribe(
      (res) => {

        this.payment = res.data;
        this.order_id = res.order_id;
        this.cf_payment_id = res.cf_payment_id;
      }
    )
  }

  repayment(){    
    this.plantservice.getRePayment(this.id).subscribe(
      (res) => {        
      window.location.href = res.link_url;
      }
    )
  }
  
}
