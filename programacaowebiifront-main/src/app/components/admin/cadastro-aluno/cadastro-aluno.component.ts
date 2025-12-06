import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-aluno.component.html'
})
export class CadastroAlunoComponent implements OnInit {

  alunoForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  cursos: any[] = [];

  private urlApiAluno = 'http://localhost:8080/api/alunos';
  private urlApiCurso = 'http://localhost:8080/api/cursos';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.alunoForm = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      cursoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.buscarCursos();
  }

  buscarCursos() {
    this.http.get<any[]>(this.urlApiCurso).subscribe({
      next: dados => this.cursos = dados,
      error: erro => console.error('Erro ao buscar cursos:', erro)
    });
  }

  enviarFormulario() {
    if (this.alunoForm.valid) {
   
      const alunoDTO = {
        matricula: this.alunoForm.value.matricula,
        nome: this.alunoForm.value.nome,
        email: this.alunoForm.value.email,
        dataNascimento: this.alunoForm.value.dataNascimento, 
        cursoId: this.alunoForm.value.cursoId
      };

      this.http.post(this.urlApiAluno, alunoDTO)
        .subscribe({
          next: () => {
            this.mensagemSucesso = 'Aluno cadastrado com sucesso!';
            this.mensagemErro = '';
            this.alunoForm.reset();
          },
          error: erro => {
            this.mensagemErro = 'Erro ao cadastrar aluno.';
            this.mensagemSucesso = '';
            console.error('Erro ao cadastrar aluno:', erro);
          }
        });
    } else {
      this.mensagemErro = 'Preencha todos os campos corretamente.';
      this.mensagemSucesso = '';
    }
  }
}
