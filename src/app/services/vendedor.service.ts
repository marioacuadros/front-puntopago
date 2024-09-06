import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';


@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL;
  getVendedores() {
    return this.http.get(`${this.URL}vendedores`);
  }
}
