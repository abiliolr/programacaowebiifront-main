import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Alunos
  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alunos`);
  }

  getAlunoByMatricula(matricula: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/alunos/${matricula}`); // Assuming endpoint supports fetching by matricula or id
    // If endpoints is /alunos/{id}, we might need to find by id.
    // The prompt says: "Visualizar seus dados cadastrais (GET /api/alunos/{matricula})"
  }

  // Disciplinas
  getDisciplinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/disciplinas`);
  }

  // Notas
  getNotas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/notas`);
  }

  salvarNota(nota: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notas`, nota);
  }

  // Optional: Edit/Delete if backend supports it
  // updateNota(id: number, nota: any) ...
  // deleteNota(id: number) ...
}
