import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit{
  order:Order = new Order();
  constructor(private orderService: OrderService, private router: Router) {
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
        },
        error:() => {
          router.navigateByUrl('/checkout');
        }
      })

   }

  ngOnInit(): void {
  }

  payProcess(){
    this.orderService.pay(this.order).subscribe((result:any)=>{
      // this.router.navigateByUrl('/');
      // window.location.reload();
      console.log(result);
      let htmlBody = `
      <!DOCTYPE html>
      <html>
      <body>
      <form action="${result.payurl}" id = "forms" method="post">
      <input type="hidden" name="key" value="${result.data.key}" />
      <input type="hidden" name="txnid" value="${result.data.txnid}" />
      <input type="hidden" name="productinfo" value="${result.data.productinfo}" />
      <input type="hidden" name="amount" value="${result.data.amount}" />
      <input type="hidden" name="email" value="${result.data.email}" />
      <input type="hidden" name="firstname" value="${result.data.firstname}" />
      <input type="hidden" name="surl" value="${result.data.surl}" />
      <input type="hidden" name="furl" value="${result.data.furl}" />
      <input type="hidden" name="phone" value="${result.data.phone}" />
      <input type="hidden" name="hash" value="${result.data.hash}" />
      <input type="submit" value="submit"> </form>
      <script type="text/javascript"> document.getElementById('forms').submit()</script>
      </body>
     </html> `
     let url = URL.createObjectURL ( new Blob ( [ htmlBody ] , { type: 'text/html' } ) )
     window.location.href = url
    });
  }

}
