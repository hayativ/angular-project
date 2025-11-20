import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Painting } from '../services/paintings.service';

@Component({
  selector: 'app-painting-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './painting-card.html',
  styleUrl: './painting-card.css',
})
export class PaintingCard {
  @Input() painting!: Painting;
  @Input() getImageUrl!: (imageId: string) => string;
}
