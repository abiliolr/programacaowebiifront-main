import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-container" style="max-width: 800px;">
      <h2>Listagem de Alunos</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let aluno of alunos">
            <td>{{ aluno.matricula }}</td>
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.email }}</td>
            <td>{{ aluno.curso?.nome || '-' }}</td>
          </tr>
          <tr *ngIf="alunos.length === 0">
            <td colspan="4" style="text-align: center;">Nenhum aluno encontrado.</td>
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
    .table tr:hover { background-color: #f1f1f1; }
  `]
})
export class ProfessorAlunosComponent implements OnInit {
  alunos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAlunos().subscribe({
      next: (data: any) => this.alunos = data,
      error: (err: any) => console.error('Erro ao buscar alunos', err)
    });
  }
}
