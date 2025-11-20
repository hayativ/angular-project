import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  ticketCnt = 0;
  email = '';
  ticketButton = 'Add';
  ticketMessage = 'Click to add ticket';
  buyButton = 'Buy tickets';
  paymentMessage = '';

  ticket() {
    this.ticketCnt++;
  }

  buy() {
    this.paymentMessage = `We'll send payment to your email`;
  }
}
