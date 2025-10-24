import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  title = 'Art Institue of Chicago';
  schedule = 'Daily 10-8';
  message = '';
  exhibitionButton = 'See upcoming exhibitions';
  photoUrl = "https://artic-web.imgix.net/905abd91-5c0d-451b-9319-f7cd1505bc33/IM026911_002-web.jpg?w=1200&h=800&fit=crop"

  toggleMessage() {
    this.message = this.message ? '' : 'Pablo Picasso "Paragraphs". 1.11 - 15.11';
  }

}
