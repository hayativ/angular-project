import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Painting } from '../services/paintings.service';

@Component({
  selector: 'app-painting-card',
  imports: [RouterLink],
  templateUrl: './painting-card.html',
  styleUrl: './painting-card.css',
})
export class PaintingCard {
  @Input() painting!: Painting;
  @Input() getImageUrl!: (imageId: string) => string;
}
