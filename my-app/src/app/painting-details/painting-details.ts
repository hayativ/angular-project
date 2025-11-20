import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaintingsService, Painting } from '../services/paintings.service';

@Component({
    selector: 'app-painting-details',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './painting-details.html',
    styleUrl: './painting-details.css'
})
export class PaintingDetails implements OnInit {
    painting: Painting | null = null;
    errorMessage: string | null = null;
    isLoading = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly paintingsService: PaintingsService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.loadPainting(+id);
        } else {
            this.errorMessage = 'No painting ID provided';
        }
    }

    loadPainting(id: number) {
        this.isLoading = true;
        this.errorMessage = null;
        console.log('Loading painting with ID:', id);

        this.paintingsService.getPaintingById(id).subscribe({
            next: (response) => {
                console.log('Received response:', response);
                if (response?.data && typeof response.data === 'object' && response.data.id) {
                    this.painting = response.data;
                    console.log('Painting loaded successfully:', this.painting);
                } else {
                    this.errorMessage = 'Painting not found';
                    console.error('Invalid response data:', response);
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Load error:', err);
                this.errorMessage = 'Failed to load painting details';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getImageUrl(imageId: string): string {
        return this.paintingsService.getImageUrl(imageId);
    }

    goBack() {
        this.router.navigate(['/paintings']);
    }
}
