import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-container">
      <h2>Meu Perfil</h2>
      <div *ngIf="aluno">
        <div class="profile-item"><strong>Nome:</strong> {{ aluno.nome }}</div>
        <div class="profile-item"><strong>Matrícula:</strong> {{ aluno.matricula }}</div>
        <div class="profile-item"><strong>E-mail:</strong> {{ aluno.email }}</div>
        <div class="profile-item"><strong>Curso:</strong> {{ aluno.curso?.nome || 'Não informado' }}</div>
      </div>
      <div *ngIf="!aluno && !erro">Carregando...</div>
      <div *ngIf="erro" class="erro">{{ erro }}</div>
    </div>
  `,
  styles: [`
    .profile-item { padding: 10px; border-bottom: 1px solid #eee; }
    .erro { color: red; padding: 10px; }
  `]
})
export class AlunoPerfilComponent implements OnInit {
  aluno: any = null;
  erro = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && (user.matricula || user.username)) {
        const key = user.matricula || user.username;
        this.apiService.getAlunoByMatricula(key).subscribe({
            next: (data: any) => this.aluno = data,
            error: (err: any) => {
                console.error(err);
                this.erro = 'Não foi possível carregar os dados do aluno.';
            }
        });
    } else {
        this.erro = 'Usuário não identificado corretamente.';
    }
  }
}
