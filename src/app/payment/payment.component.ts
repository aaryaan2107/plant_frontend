import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpService } from 'src/service/ip.service';
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
  url:any
  
constructor(private plantservice: PlantserviceService, private route: ActivatedRoute, private http: HttpClient,private ipservice:IpService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');      
    });
    this.url = this.ipservice.localurl();
  

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
  
 downloadPdf() {
  this.http.get(this.url+'/Apis/pdf', { responseType: 'arraybuffer' })
    .subscribe(data => {
      this.handlePdfDownload(data);
    });
}

handlePdfDownload(pdfData: ArrayBuffer) {
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'order-summary.pdf';

  // Append the link to the document and trigger the click event
  document.body.appendChild(link);
  link.click();

  // Clean up the link element
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


}
