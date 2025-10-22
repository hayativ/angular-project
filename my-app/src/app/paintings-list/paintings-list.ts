import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paintings-list',
  imports: [CommonModule],
  templateUrl: './paintings-list.html',
  styleUrl: './paintings-list.css'
})
export class PaintingsList {
  paintings = ['A', 'B', 'C'];
}
