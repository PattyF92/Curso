import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = "http://localhost/api/Php/";
  
  //Vetor
  vetor:curso = [];

  //Construtor
  constructor(private http: HttpClient) { }

  //Obter todos os cursos
  obterCursos(): Observable<'Curso'[]>{
    return this.http.get(this.url+"listar").pipe(
      map(( res ) => {
        this.vetor = res[curso];
        return this.vetor;
      })
    )    
  }

  //Cadastrar curso
  cadastrarCurso(c:curso): Observable<curso[]> {
    return this.http.post(this.url+'cadastrar',{curso:c})
    .pipe(map((res) =>{
      this.vetor.push(res['curso']);
      return this.vetor;
    }))
  }

  //Remover o curso
  removerCurso(c: curso): Observable<curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    return this.http.delete(this.url+'excluir',{params: params})
    .pipe(map((res) =>{

      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso'] !== +c.idCurso; 
      });

      
    }))
  }
  
  

  
}
