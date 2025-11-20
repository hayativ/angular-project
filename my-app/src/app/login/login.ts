import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    email = '';
    password = '';
    message = '';

    onSubmit() {
        // Placeholder - no actual authentication
        if (this.email && this.password) {
            this.message = 'Login functionality coming soon!';
        } else {
            this.message = 'Please enter both email and password';
        }
    }
}
