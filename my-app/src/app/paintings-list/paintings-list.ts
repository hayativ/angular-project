import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PaintingsService, Painting } from '../services/paintings.service';
import { PaintingCard } from '../painting-card/painting-card';
import * as PaintingActions from '../painting/state/painting.actions';
import * as PaintingSelectors from '../painting/state/painting.selectors';

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
  private storeSubscription?: Subscription;

  constructor(
    private readonly paintingsService: PaintingsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select(PaintingSelectors.selectPaintingState).subscribe(state => {
      this.paintings = state.paintings;
      this.loading = state.loadingList;
      this.errorMessage = state.errorList;
    });

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
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
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
      this.store.dispatch(PaintingActions.loadPaintings({ query }));
    } else {
      // If no query, and we want to clear, we might need a clear action or just load default.
      // The user didn't specify a clear action in the new requirements.
      // But previously we had one.
      // If I strictly follow "loadPaintings(query)", maybe passing empty query loads default?
      // Service: if query is empty, it loads default list.
      // So let's load default list if query is empty, OR do nothing if we want to clear.
      // The previous behavior was "clear".
      // But the new service `getPaintings` returns default list if query is empty.
      // So `loadPaintings({})` (undefined query) will load default list.
      // If we want to clear, we don't have a clear action in the new spec.
      // I will assume we should load default list (empty query) or just not dispatch if we want to keep it empty?
      // The prompt said "define actions for loading the list of Paintings...".
      // Let's just load default list if query is empty, effectively "resetting" to initial state (but with data).
      // Or I can dispatch loadPaintings with empty query.
      // Wait, if the user wants "clear", I should probably have added it. But I didn't in the plan because it wasn't in the prompt.
      // I'll just load default paintings if query is empty.
      // Actually, looking at `getPaintings` implementation:
      // if (query && query.trim()) ... else url = ...limit=6
      // So it returns 6 paintings.
      // This seems acceptable.
      this.store.dispatch(PaintingActions.loadPaintings({ query: '' }));
    }
  }

  loadPaintings() {
    this.searchTerm = '';
    this.store.dispatch(PaintingActions.loadPaintings({ query: '' }));
  }

  getImageUrl(imageId: string): string {
    return this.paintingsService.getImageUrl(imageId);
  }
}
