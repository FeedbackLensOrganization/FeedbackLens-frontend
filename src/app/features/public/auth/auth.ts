import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-auth',
  imports: [RouterModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  errorMsg = '';
  loading = false;

  login() {
    this.errorMsg = '';
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.accessToken);
        this.router.navigate(['/admindashboard']);
      },
      error: () => {
        this.errorMsg = 'Falsches Passwort. Bitte erneut versuchen.';
        this.loading = false;
      }
    });
  }
}