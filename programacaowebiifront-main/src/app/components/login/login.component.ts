import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  form: any = {
    username: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (data: any) => {
        // SIMULATION LOGIC:
        // If the API returns a role, use it.
        // If not, infer from username for demo purposes.
        let role = data.role;

        if (!role) {
            // Demo heuristic:
            // "admin" -> ADMIN
            // "prof" in username -> PROFESSOR
            // "aluno" or numeric -> ALUNO
            const usernameLower = this.form.username.toLowerCase();
            if (usernameLower.includes('admin')) {
                role = 'ADMIN';
            } else if (usernameLower.includes('prof')) {
                role = 'PROFESSOR';
            } else {
                role = 'ALUNO';
            }

            // Update the stored user with the simulated role
            const updatedUser = { ...data, role };
            this.authService.saveUser(updatedUser);
        }

        console.log('Login success. Role:', role);

        if (role === 'PROFESSOR') {
            this.router.navigate(['/professor']);
        } else if (role === 'ALUNO') {
            this.router.navigate(['/aluno']);
        } else if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
        } else {
            this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        console.error('Erro no login:', err);
        if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Erro desconhecido. Tente novamente.';
        }
      }
    });
  }
}
