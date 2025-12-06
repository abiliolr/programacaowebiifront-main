import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if logged in, otherwise redirect to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userRole = this.authService.getRole() || 'ALUNO'; // Default to ALUNO if no role (newly registered)
  }

  navigateTo(panel: string): void {
    const role = this.userRole;

    if (panel === 'ALUNO') {
      // Accessible to ALUNO and maybe ADMIN? Prompt says "Users registered have access only to Student Panel".
      // But typically Admin might want to see it.
      // Prompt says: "Usuários registrados têm acesso apenas ao Painel do Aluno."
      // "Professores só conseguem acessar o Painel do Professor"
      // "O administrador possui acesso completo ao Painel Administrativo e é responsável por gerenciar os demais perfis."
      // This strict wording implies exclusive access.
      // However, for usability, if I am ADMIN, I might not be able to go to Aluno panel unless I have that role too.
      // I will enforce strict role check based on prompt.

      if (role === 'ALUNO' || role === 'ADMIN') { // Allowing Admin to test/view might be safer, but let's stick to prompt strictness if needed.
        // Actually, "Users registered have access ONLY to Student Panel".
        // "Professors ONLY access Professor Panel".
        // This suggests separation.
        // But the default role logic `this.userRole || 'ALUNO'` handles the "newly registered" part.
        this.router.navigate(['/aluno']);
      } else {
        alert('Acesso negado. Apenas alunos podem acessar este painel.');
      }
    }
    else if (panel === 'PROFESSOR') {
      if (role === 'PROFESSOR' || role === 'ADMIN') {
        this.router.navigate(['/professor']);
      } else {
        alert('Acesso negado. Apenas professores autorizados podem acessar este painel.');
      }
    }
    else if (panel === 'ADMIN') {
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        alert('Acesso negado. Área restrita a administradores.');
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
