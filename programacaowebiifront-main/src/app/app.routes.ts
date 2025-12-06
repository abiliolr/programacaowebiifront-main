import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register'; 
import { AlunoComponent } from './components/aluno/aluno.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { CadastroDisciplinaComponent } from './components/admin/cadastro-disciplina/cadastro-disciplina.component';
import { CadastroCursoComponent } from './components/admin/cadastro-curso/cadastro-curso.component';
import { CadastroAlunoComponent } from './components/admin/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/admin/cadastro-professor/cadastro-professor.component';
import { AdminWelcomeComponent } from './components/admin/welcome/welcome.component';

export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'aluno', component: AlunoComponent },

  { path: 'professor', component: ProfessorComponent },

  { path: 'home', component: HomeComponent }, 

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminWelcomeComponent },
      { path: 'professores/cadastro', component: CadastroProfessorComponent },
      { path: 'disciplinas/cadastro', component: CadastroDisciplinaComponent },
      { path: 'cursos/cadastro', component: CadastroCursoComponent },
      { path: 'alunos/cadastro', component: CadastroAlunoComponent },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' },

];
