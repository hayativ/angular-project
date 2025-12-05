import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Painting {
  id: number;
  title: string;
  artist_display: string;
  image_id: string;
  date_display: string;
  description?: string;
  short_description?: string;
  medium_display?: string;
  dimensions?: string;
  credit_line?: string;
  place_of_origin?: string;
  inscriptions?: string;
  publication_history?: string;
  exhibition_history?: string;
  provenance_text?: string;
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
  private readonly detailFields = 'id,title,artist_display,image_id,date_display,description,short_description,medium_display,dimensions,credit_line,place_of_origin,inscriptions,publication_history,exhibition_history,provenance_text';

  constructor(private readonly http: HttpClient) { }

  getPaintings(query?: string): Observable<Painting[]> {
    let url = `${this.baseUrl}?fields=${this.fields}&page=1&limit=6`;
    if (query && query.trim()) {
      url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&fields=${this.fields}&limit=6`;
    }

    return this.http.get<ArtworksResponse>(url).pipe(
      map(response => response.data || []),
      catchError(err => {
        console.error('Get paintings error:', err);
        return of([]);
      })
    );
  }

  getPaintingById(id: string | number): Observable<Painting> {
    const url = `${this.baseUrl}/${id}?fields=${this.detailFields}`;

    return this.http.get<{ data: Painting }>(url).pipe(
      map(response => response.data),
      catchError(err => {
        console.error('Get painting error:', err);
        throw err; // Let effects handle error or return null? User said "On errors, dispatch the failure actions". So throwing or returning error is fine.
        // But for safety let's return null or throw.
        // If I return of(null), the type signature Observable<Painting> is violated if strict.
        // Let's throw so catchError in effect catches it.
      })
    );
  }

  getImageUrl(imageId: string): string {
    if (!imageId) return '';
    const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
    return `http://localhost:3000/proxy/${encodeURIComponent(imageUrl)}`;
  }

}
