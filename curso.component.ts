import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL base
  url ="http://localhost/api/Php/";

  //Vetor de cursos
  vetor: curso[] = [];

  //Objeto da Classe curso
  Curso: curso = new curso ();


  //Construtor
  constructor (private curso_servico:CursoService) { }

  //Inicializador
  ngOnInit(): void {   
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();      
  }

  //Cadastrar
  cadastro(): void{
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res:curso[]) => {

        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualizar a listagem de curso
        this.selecao();
      }
    )
  }

  //Seleção
  selecao(): void{
    this.curso_servico.obterCursos().subscribe(
      (res: curso[]) => {
          this.vetor = res;
      }
    )
  }

  //Alterar
  alterar(): void {
    alert ("Alterar");
  }

  //Remover
  remover(): void{
   this.curso_servico.removerCurso(this.curso).subscribe(
    (res : curso[]) => {
      this.vetor = res;

      this.curso.nomeCurso = null;
      this.curso.valorCurso = null;
    }
   )
  }

  //Selecionar curso especifico
  selecionarCurso(c:curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }
}  