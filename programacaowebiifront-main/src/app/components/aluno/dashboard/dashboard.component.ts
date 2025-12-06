import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="dashboard-welcome">
      <h1>Bem-vindo, Aluno!</h1>
      <p>Acesse seu boletim e perfil pelo menu lateral.</p>
    </div>
  `,
  styles: [`
    .dashboard-welcome { text-align: center; margin-top: 50px; }
    h1 { color: #112d4e; }
  `]
})
export class AlunoDashboardComponent {}
