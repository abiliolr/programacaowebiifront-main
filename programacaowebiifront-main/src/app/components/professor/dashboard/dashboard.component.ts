import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="dashboard-welcome">
      <h1>Bem-vindo, Professor!</h1>
      <p>Utilize o menu lateral para gerenciar alunos e notas.</p>
    </div>
  `,
  styles: [`
    .dashboard-welcome {
      text-align: center;
      margin-top: 50px;
    }
    h1 { color: #112d4e; }
  `]
})
export class ProfessorDashboardComponent {}
