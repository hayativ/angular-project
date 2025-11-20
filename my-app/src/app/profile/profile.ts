import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user$: Observable<any | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.user$ = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
}