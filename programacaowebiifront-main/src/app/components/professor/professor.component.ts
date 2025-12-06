import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professor.html',
  styleUrls: ['./professor.css']
})
export class ProfessorComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
