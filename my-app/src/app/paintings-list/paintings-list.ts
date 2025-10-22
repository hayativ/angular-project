import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-paintings-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './paintings-list.html',
  styleUrls: ['./paintings-list.css']
})
export class PaintingsList implements OnInit, OnDestroy {
  loadingText = "No data yet. Click the button";
  placeholderText  = "Search..."
  products: any[] = [];
  searchTerm: string = '';
  errorMessage: string | null = null;
  loading = false;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      switchMap(term => {
        if (term.trim()) {
          this.loading = true;
          this.errorMessage = null;

          const url = `https://api.artic.edu/api/v1/artworks/search?q=${term}&fields=id,title,artist_display,image_id,date_display&page=1&limit=6`;

          return this.http.get<any>(url).pipe(
            catchError(err => {
              console.error('Search error:', err);
              this.errorMessage = 'Failed to load results. Try again';
              this.loading = false;
              return of({ data: [] });
            })
          );
        } else {
          return of({ data: [] });
        }
      })
    ).subscribe({
      next: (response: any) => {
        this.products = response.data || [];
        this.loading = false;
      },
      error: err => {
        console.error('Subscription error:', err);
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
    const url = 'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,image_id,date_display&page=1&limit=6';
    this.loading = true;
    this.errorMessage = null;

    this.http.get<any>(url).pipe(
      catchError(err => {
        console.error('Load error:', err);
        this.errorMessage = 'Failed to load paintings. Try again.';
        this.loading = false;
        return of({ data: [] });
      })
    ).subscribe(response => {
      this.products = response.data;
      this.loading = false;
      this.searchTerm = '';
    });
  }

  getImageUrl(imageId: string): string {
    return imageId
      ? `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
      : '';
  }
}
