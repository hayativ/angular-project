import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaintingsService, Painting } from '../services/paintings.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnInit {
    title = 'Art Institute of Chicago';
    subtitle = 'Discover World-Class Art';
    featuredPaintings: Painting[] = [];
    loading = true;

    constructor(private readonly paintingsService: PaintingsService) { }

    ngOnInit() {
        this.paintingsService.loadPaintings(3).subscribe({
            next: (response) => {
                this.featuredPaintings = response.data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Load error:', err);
                this.loading = false;
            }
        });
    }

    getImageUrl(imageId: string): string {
        return this.paintingsService.getImageUrl(imageId);
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3EImage Unavailable%3C/text%3E%3C/svg%3E';
    }
}
