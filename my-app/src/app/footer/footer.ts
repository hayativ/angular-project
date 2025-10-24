import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
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

bootstrapApplication(Footer);
