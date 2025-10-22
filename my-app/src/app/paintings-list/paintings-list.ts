import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paintings-list',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './paintings-list.html',
  styleUrl: './paintings-list.css'
})
export class PaintingsList {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  loadPaintings() {
    const url =
      'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,image_id,date_display&page=1&limit=6';
    this.http.get<any>(url).subscribe(response => {
      this.products = response.data;
    });
  }

  getImageUrl(imageId: string): string {
    return imageId
      ? `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
      : '';
  }
}
