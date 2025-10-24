import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Painting {
  id: number;
  title: string;
  artist_display: string;
  image_id: string;
  date_display: string;
}

export interface ArtworksResponse {
  data: Painting[];
}

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {
  private readonly baseUrl = 'https://api.artic.edu/api/v1/artworks';
  private readonly fields = 'id,title,artist_display,image_id,date_display';

  constructor(private readonly http: HttpClient) {}

  loadPaintings(limit: number = 6): Observable<ArtworksResponse> {
    const url = `${this.baseUrl}?fields=${this.fields}&page=1&limit=${limit}`;
    
    return this.http.get<ArtworksResponse>(url).pipe(
      catchError(err => {
        console.error('Load error:', err);
        return of({ data: [] });
      })
    );
  }

  searchPaintings(searchTerm: string, limit: number = 6): Observable<ArtworksResponse> {
    if (!searchTerm.trim()) {
      return of({ data: [] });
    }

    const url = `${this.baseUrl}/search?q=${searchTerm}&fields=${this.fields}&page=1&limit=${limit}`;
    
    return this.http.get<ArtworksResponse>(url).pipe(
      catchError(err => {
        console.error('Search error:', err);
        return of({ data: [] });
      })
    );
  }

  getImageUrl(imageId: string): string {
    return imageId ? `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg` : '';
  }
}
