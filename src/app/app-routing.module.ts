import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { OperadorComponent } from './components/operador/operador.component'
import { VentaComponent } from './components/venta/venta.component';


const routes: Routes = [
  {path: '', component: NotFoundComponent},
  {path: 'operador', component: OperadorComponent},
  {path: 'venta', component: VentaComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
