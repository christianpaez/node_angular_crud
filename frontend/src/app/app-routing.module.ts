import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenesCrearComponent } from './ordenes-crear/ordenes-crear.component';
import { OrdenesDetalleComponent } from './ordenes-detalle/ordenes-detalle.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


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
  
  /* {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
  },
  
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Edit Product' }
  }, */
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
