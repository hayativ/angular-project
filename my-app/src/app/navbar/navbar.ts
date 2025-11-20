import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class Navbar {
    title = 'Art Institute';

    navLinks = [
        { path: '/', label: 'Home', exact: true },
        { path: '/paintings', label: 'Paintings', exact: false },
        { path: '/about', label: 'About', exact: false },
        { path: '/login', label: 'Login', exact: false }
    ];
}
