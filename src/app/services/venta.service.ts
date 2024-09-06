import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL;
  getVentas() {
    return this.http.get(`${this.URL}ventas`);
  }
  addVenta(venta: any) {
    return this.http.post(`${this.URL}ventas?celular=${venta.celular}&fecha=${venta.fecha}&valor=${venta.valor}&idOperador=${venta.idOperador}&idVendedor=${venta.idVendedor}`,null);
  }

  delVenta(id:number){
    return this.http.delete(`${this.URL}ventas/${id}`)
  }

  updateVenta(venta:any, id:number){
    return this.http.put(`${this.URL}ventas/${id}`, venta)
  }
}
