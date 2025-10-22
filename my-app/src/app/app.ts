import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { PaintingsList } from './paintings-list/paintings-list';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, PaintingsList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
