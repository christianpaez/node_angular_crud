import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenesCrearComponent } from './ordenes-crear/ordenes-crear.component';
import { OrdenesDetalleComponent } from './ordenes-detalle/ordenes-detalle.component';
import { OrdenesEditarComponent } from './ordenes-editar/ordenes-editar.component';
import { ItemsCrearComponent } from './items-crear/items-crear.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesComponent,
    OrdenesCrearComponent,
    OrdenesDetalleComponent,
    OrdenesEditarComponent,
    ItemsCrearComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
