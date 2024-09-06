import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { OperadorService } from 'src/app/services/operador.service'

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {
  addForm: FormGroup

  private operadorService = inject(OperadorService)

  constructor(private frmBuilder: FormBuilder,){
    this.addForm = this.frmBuilder.group({
      operador: ['', Validators.required],
    })

  }
  
  operadores: any = null
  respuesta:any = null
  modoEdicion : boolean = false
  data:any = null
  operadorObj:any={
    id:0,
    operador:''
  }

  operadorEmpty = this.operadorObj
  

  ngOnInit(): void {
    this.listOperador()
  }

  listOperador(){
    this.operadorService.getOperadores().subscribe(
      result => {
          this.respuesta = result;
          this.operadores = this.respuesta.operadorResponse.operador
      }
    ),(error:any)=>{
      console.log("Error", error)
    };
  }

  getOperador(operador:any){
    this.modoEdicion=true
    this.operadorObj = operador
    console.log(this.operadorObj)
  }

  delOperador(operador: any){
    console.log('operador',operador)
    if(confirm('Realmente desea elimnar el registro?')){
      this.operadorService.delOperador(operador.idOperador).subscribe(
        data => {
          this.listOperador();
        }
      );
    }  
  }

  addOperador(){
    this.operadorService.addOperador(this.operadorObj).subscribe(
      data => {
        this.listOperador();
        this.operadorObj = this.operadorEmpty
      }
    );

  }

  updateOperador(){
    this.operadorService.updateOperador(this.operadorObj, this.operadorObj.idOperador).subscribe(
      data => {
        this.listOperador();
        this.operadorObj = this.operadorEmpty
      }
    );
  }
}
