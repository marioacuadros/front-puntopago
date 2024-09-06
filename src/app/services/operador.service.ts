import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';



@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL;
  getOperadores() {
    return this.http.get(`${this.URL}operadores`);
  }
  addOperador(operador: any) {
    return this.http.post(`${this.URL}operadores`, operador);
  }

  delOperador(id:number){
    return this.http.delete(`${this.URL}operadores/${id}`)
  }

  updateOperador(operador:any, id:number){
    return this.http.put(`${this.URL}operadores/${id}`, operador)
  }

}
