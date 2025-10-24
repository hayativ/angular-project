import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PaintingsService, Painting } from '../services/paintings.service';

@Component({
  selector: 'app-paintings-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paintings-list.html',
  styleUrls: ['./paintings-list.css']
})
export class PaintingsList implements OnInit, OnDestroy {
  viewButton = 'View collection';
  loadingText = 'No data yet. Click the button';
  placeholderText  = 'Search...';
  products: Painting[] = [];
  searchTerm: string = '';
  errorMessage: string | null = null;
  loading = false;

  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(private readonly paintingsService: PaintingsService) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      switchMap(term => {
        if (term.trim()) {
          this.loading = true;
          this.errorMessage = null;
          return this.paintingsService.searchPaintings(term);
        } else {
          this.products = [];
          this.loading = false;
          return [];
        }
      })
    ).subscribe({
      next: (response) => {
        if (response?.data) {
          this.products = response.data;
        }
        this.loading = false;
      },
      error: err => {
        console.error('Subscription error:', err);
        this.errorMessage = 'Failed to load results. Try again';
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  loadPaintings() {
    this.loading = true;
    this.errorMessage = null;
    this.searchTerm = '';

    this.paintingsService.loadPaintings(6).subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load error:', err);
        this.errorMessage = 'Failed to load paintings. Try again.';
        this.loading = false;
      }
    });
  }

  getImageUrl(imageId: string): string {
    return this.paintingsService.getImageUrl(imageId);
  }
}
