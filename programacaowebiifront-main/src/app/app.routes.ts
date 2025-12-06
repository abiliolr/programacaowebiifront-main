import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register'; 
import { AdminComponent } from './components/admin/admin.component';
import { CadastroDisciplinaComponent } from './components/admin/cadastro-disciplina/cadastro-disciplina.component';
import { CadastroCursoComponent } from './components/admin/cadastro-curso/cadastro-curso.component';
import { CadastroAlunoComponent } from './components/admin/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/admin/cadastro-professor/cadastro-professor.component';
import { AdminWelcomeComponent } from './components/admin/welcome/welcome.component';

// PROFESSOR COMPONENTS
import { ProfessorComponent } from './components/professor/professor.component';
import { ProfessorDashboardComponent } from './components/professor/dashboard/dashboard.component';
import { ProfessorAlunosComponent } from './components/professor/alunos/alunos.component';
import { ProfessorNotasComponent } from './components/professor/notas/notas.component';

// ALUNO COMPONENTS
import { AlunoComponent } from './components/aluno/aluno.component';
import { AlunoDashboardComponent } from './components/aluno/dashboard/dashboard.component';
import { AlunoBoletimComponent } from './components/aluno/boletim/boletim.component';
import { AlunoPerfilComponent } from './components/aluno/perfil/perfil.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, // Public home

  // --- ADMIN ROUTES ---
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      { path: '', component: AdminWelcomeComponent },
      { path: 'professores/cadastro', component: CadastroProfessorComponent },
      { path: 'disciplinas/cadastro', component: CadastroDisciplinaComponent },
      { path: 'cursos/cadastro', component: CadastroCursoComponent },
      { path: 'alunos/cadastro', component: CadastroAlunoComponent },
    ]
  },

  // --- PROFESSOR ROUTES ---
  {
    path: 'professor',
    component: ProfessorComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'PROFESSOR' },
    children: [
      { path: '', component: ProfessorDashboardComponent },
      { path: 'alunos', component: ProfessorAlunosComponent },
      { path: 'notas', component: ProfessorNotasComponent }
    ]
  },

  // --- ALUNO ROUTES ---
  {
    path: 'aluno',
    component: AlunoComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ALUNO' },
    children: [
      { path: '', component: AlunoDashboardComponent },
      { path: 'boletim', component: AlunoBoletimComponent },
      { path: 'perfil', component: AlunoPerfilComponent }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
