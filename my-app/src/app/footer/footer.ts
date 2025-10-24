import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  likes = 0;
  message = '';
  name = '';
  email = '';
  gratitudeMessage = 'Join our newsletter to discover the latest exhibits, events, and museum news!';
  subscribeButton = 'Subscribe';
  subscribeMessage = '';
  like() {
    this.likes++;
  }

  toggleMessage() {
    this.message = this.message ? '' : 'Thank you for visiting!';
  }

  subscribe() {
    if (this.email) {
      this.subscribeMessage = `Let's be in touch, ${this.email}`;
    }
  }
}
bootstrapApplication(Footer);
