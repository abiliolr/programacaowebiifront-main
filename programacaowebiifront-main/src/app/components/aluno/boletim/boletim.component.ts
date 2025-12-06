import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-container" style="max-width: 800px;">
      <h2>Meu Boletim</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Nota</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let nota of notas">
            <td>{{ nota.disciplina?.nome || 'N/A' }}</td>
            <td>{{ nota.valor }}</td>
            <td [ngClass]="{'aprovado': nota.valor >= 7, 'reprovado': nota.valor < 7}">
              {{ nota.valor >= 7 ? 'Aprovado' : 'Reprovado' }}
            </td>
          </tr>
          <tr *ngIf="notas.length === 0">
            <td colspan="3" style="text-align: center;">Nenhuma nota lançada.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    .table th { background-color: #f2f2f7; color: #112d4e; }
    .table tr:nth-child(even) { background-color: #f9f9f9; }
    .aprovado { color: green; font-weight: bold; }
    .reprovado { color: red; font-weight: bold; }
  `]
})
export class AlunoBoletimComponent implements OnInit {
  notas: any[] = [];
  alunoId: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.alunoId = user ? user.id : null;
    const username = user ? user.username : '';

    this.apiService.getNotas().subscribe({
      next: (allNotas: any) => {
        this.notas = allNotas.filter((n: any) => {
           const nAluno = n.aluno || {};

           if (this.alunoId && nAluno.id === this.alunoId) return true;

           if (username && nAluno.nome && nAluno.nome.toLowerCase().includes(username.toLowerCase())) return true;

           return false;
        });
      },
      error: (err: any) => console.error('Erro ao buscar notas', err)
    });
  }
}
