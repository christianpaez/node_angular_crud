import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenesCrearComponent } from './ordenes-crear/ordenes-crear.component';
import { OrdenesDetalleComponent } from './ordenes-detalle/ordenes-detalle.component';
import { OrdenesEditarComponent } from './ordenes-editar/ordenes-editar.component';
import { ItemsCrearComponent } from './items-crear/items-crear.component';


const routes: Routes = [
  {
    path: 'ordenes',
    component: OrdenesComponent,
    data: { title: 'Lista de Órdenes' }
  },
  {
    path: 'ordenes-crear',
    component: OrdenesCrearComponent,
    data: { title: 'Crear Nueva Orden' }
  },
  {
    path: 'ordenes-detalle/:id',
    component: OrdenesDetalleComponent,
    data: { title: 'Detalle de Orden' }
  },
  {
    path: 'ordenes-editar/:id',
    component: OrdenesEditarComponent,
    data: { title: 'Editar Orden' }
  },
  {
    path: 'ordenes-detalle/:id/items-crear',
    component: ItemsCrearComponent,
    data: { title: 'Crear Ítem' }
  },
  { path: '',
    redirectTo: '/ordenes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
