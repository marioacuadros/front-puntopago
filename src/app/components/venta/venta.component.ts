import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { DatePipe } from '@angular/common';
import { VentaService } from 'src/app/services/venta.service'
import { VendedorService } from 'src/app/services/vendedor.service'
import { OperadorService } from 'src/app/services/operador.service'

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {
  addForm: FormGroup

  private ventaService = inject(VentaService)
  private vendedorService = inject(VendedorService)
  private operadorService = inject(OperadorService)

  constructor(private frmBuilder: FormBuilder,
              private datePipe: DatePipe,
  ){
    this.addForm = this.frmBuilder.group({
      celular: ['', Validators.required],
      valor: ['', Validators.required],
      idOperador: ['', Validators.required],
      idVendedor: ['', Validators.required],
    })

  }
  
  ventas: any = null
  respuesta:any = null
  modoEdicion : boolean = false
  data:any = null
  vendedores:any=null
  operadores:any=null
  ventaObj:any={
    id:0,
    celular:'',
    fecha:'',
    valor:0,
    idOperador:1,
    idVendedor:1
  }

  ventaEmpty = this.ventaObj
  

  ngOnInit(): void {
    this.listVenta()
    this.listOperador()
    this.listVendedor()
  }

  listVenta(){
    this.ventaService.getVentas().subscribe(
      result => {
          this.respuesta = result;
          this.ventas = this.respuesta.ventaResponse.venta
      }
    ),(error:any)=>{
      console.log("Error", error)
    };
  }

  getVenta(venta:any){
    this.modoEdicion=true
    this.ventaObj = venta
  }

  delVenta(venta: any){
    if(confirm('Realmente desea elimnar el registro?')){
      this.ventaService.delVenta(venta.idVenta).subscribe(
        data => {
          this.listVenta();
        }
      );
    }  
  }

  addVenta(){
    const currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.ventaObj.fecha = currentDateAndTime
    this.ventaService.addVenta(this.ventaObj).subscribe(
      data => {
        this.listVenta();
        this.ventaObj = this.ventaEmpty
      }
    );

  }

  updateVenta(){
    this.ventaService.updateVenta(this.ventaObj, this.ventaObj.idVenta).subscribe(
      data => {
        this.listVenta();
        this.ventaObj = this.ventaEmpty
      }
    );
  }

  listVendedor(){
    this.vendedorService.getVendedores().subscribe(
      result => {
          this.respuesta = result;
          this.vendedores = this.respuesta.vendedorResponse.vendedor
      }
    ),(error:any)=>{
      console.log("Error", error)
    };
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
}
