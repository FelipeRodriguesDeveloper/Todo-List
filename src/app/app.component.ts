import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from 'src/Entidades/tarefa.entidade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  public modo = 'lista';
  public tarefas: Tarefa[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.form = this.fb.group(
       {   
         titulo: ['', Validators.compose([  
           Validators.minLength(3),
           Validators.maxLength(60),
           Validators.required
          ])]
       }
    )

    this.loadLocalStorage();
  }

  salvar()
  {  
     const titulo = this.form.controls['titulo'].value;
     this.tarefas.push(new Tarefa(this.tarefas.length + 1, titulo, false));
     this.salvarLocalStorage();
     this.limparFormulario()
     this.modo = 'lista';
  }
 
  remover(tarefa: Tarefa)
  {
      const indice = this.tarefas.indexOf(tarefa);

      if(indice != -1)
      {
        this.tarefas.splice(indice, 1);
      }

      this.salvarLocalStorage();
  }

  limparFormulario()
  {
    this.form.reset();
  }

  marcarComoConcluida(tarefa: Tarefa)
  {
     tarefa.concluida = true; 
     this.salvarLocalStorage();
  }

  marcarComoNaoConcluida(tarefa: Tarefa)
  {
    tarefa.concluida = false;
    this.salvarLocalStorage();
  }

  salvarLocalStorage()
  {
    const dados = JSON.stringify(this.tarefas);
    localStorage.setItem('tarefas',dados);
  }

  loadLocalStorage()
  {
    const dados = localStorage.getItem('tarefas');
    
    if(dados)
    {
      this.tarefas = JSON.parse(dados);
    }
    else
    {
      this.tarefas = [];
    }
  }
  
  trocarModo(modo: string)
  {
    this.modo = modo;
  }
}


