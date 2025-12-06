import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Lançamento de Notas</h2>
      <form (ngSubmit)="salvarNota()">
        <div class="form-group">
          <label>Aluno:</label>
          <select [(ngModel)]="nota.aluno.id" name="alunoId" required>
            <option value="" disabled>Selecione um aluno</option>
            <option *ngFor="let a of alunos" [value]="a.id">{{ a.nome }} ({{ a.matricula }})</option>
          </select>
        </div>

        <div class="form-group">
          <label>Disciplina:</label>
          <select [(ngModel)]="nota.disciplina.id" name="disciplinaId" required>
            <option value="" disabled>Selecione uma disciplina</option>
            <option *ngFor="let d of disciplinas" [value]="d.id">{{ d.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Nota (0-10):</label>
          <input type="number" [(ngModel)]="nota.valor" name="valor" min="0" max="10" step="0.1" required>
        </div>

        <div class="form-group">
          <button type="submit">Salvar Nota</button>
        </div>
      </form>

      <div class="mensagens">
        <p class="sucesso" *ngIf="mensagemSucesso">{{ mensagemSucesso }}</p>
        <p class="erro" *ngIf="mensagemErro">{{ mensagemErro }}</p>
      </div>
    </div>
  `
})
export class ProfessorNotasComponent implements OnInit {
  nota: any = {
    aluno: { id: '' },
    disciplina: { id: '' },
    valor: null
  };

  alunos: any[] = [];
  disciplinas: any[] = [];

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.apiService.getAlunos().subscribe((data: any) => this.alunos = data);
    this.apiService.getDisciplinas().subscribe((data: any) => this.disciplinas = data);
  }

  salvarNota(): void {
    if (!this.nota.aluno.id || !this.nota.disciplina.id || this.nota.valor === null) {
        this.mensagemErro = 'Preencha todos os campos.';
        return;
    }

    this.apiService.salvarNota(this.nota).subscribe({
      next: () => {
        this.mensagemSucesso = 'Nota lançada com sucesso!';
        this.mensagemErro = '';
        this.nota.valor = null; // Limpa valor
        // Limpar seleções se desejar
      },
      error: (err: any) => {
        console.error(err);
        this.mensagemErro = 'Erro ao lançar nota.';
        this.mensagemSucesso = '';
      }
    });
  }
}
