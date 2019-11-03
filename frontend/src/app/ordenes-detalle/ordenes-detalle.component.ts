import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Orden } from '../ordenes';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.scss']
})
export class OrdenesDetalleComponent implements OnInit {

  orden: any = {
    _id: '',
    canal: '',
    estado: 'Reservada',
    tipo_de_entrega: 'Estandar',
    tipo_de_envio: '',
    valor: null,
    descuento: null, 
    items: [],
    createdAt: null
}

isLoadingResults= true;
  constructor(private api: ApiService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
        this.getOrdenDetails(this.route.snapshot.params['id']);
  }

  getOrdenDetails(id: any){
    this.api.getOrden(id)
    .subscribe((data: any)=>{
      this.orden = data
      this.isLoadingResults = false;
    })
  }

  /* deleteProduct(id: any){
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
    .subscribe((res)=>{
      this.isLoadingResults = false;
      this.router.navigate(['products']);
    }, (err =>{
      console.log(err);
      this.isLoadingResults = false;
    }))
  } */
}
