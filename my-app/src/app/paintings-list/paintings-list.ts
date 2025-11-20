import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { PaintingsService, Painting } from '../services/paintings.service';
import { PaintingCard } from '../painting-card/painting-card';

@Component({
  selector: 'app-paintings-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaintingCard],
  templateUrl: './paintings-list.html',
  styleUrls: ['./paintings-list.css']
})
export class PaintingsList implements OnInit, OnDestroy {
  viewButton = 'View collection';
  loadingText = 'No data yet. Click the button';
  placeholderText = 'Search...';
  paintings: Painting[] = [];
  searchTerm: string = '';
  errorMessage: string | null = null;
  loading = false;

  private readonly searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private readonly paintingsService: PaintingsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe({
      next: (term) => {
        this.updateSearchQuery(term);
      }
    });

    this.routeSubscription = this.route.queryParams.pipe(
      startWith({ q: '' })
    ).subscribe({
      next: (params) => {
        const query = params['q'] || '';
        this.searchTerm = query;
        this.getItems(query);
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  updateSearchQuery(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query || null },
      queryParamsHandling: 'merge'
    });
  }

  getItems(query: string) {
    if (query.trim()) {
      this.loading = true;
      this.errorMessage = null;
      this.paintingsService.searchPaintings(query).subscribe({
        next: (response) => {
          if (response?.data) {
            this.paintings = response.data;
          } else {
            this.paintings = [];
          }
          this.loading = false;
        },
        error: err => {
          console.error('Search error:', err);
          this.errorMessage = 'Failed to load results. Try again';
          this.paintings = [];
          this.loading = false;
        }
      });
    } else {
      this.paintings = [];
      this.loading = false;
      this.errorMessage = null;
    }
  }

  loadPaintings() {
    this.errorMessage = null;
    this.searchTerm = '';

    this.paintingsService.loadPaintings(6).subscribe({
      next: (response) => {
        this.paintings = response.data;
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
