import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { ApiService } from '../api.service';
import { Orden } from '../ordenes';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.scss']
})
export class OrdenesDetalleComponent implements OnInit {

  displayedColumns: string[] = ['sku', 'nombre', 'cantidad', 
  'precio', 'codigo_de_barra', 'acciones'];

  mySubscription: any;

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
items: [] = []

isLoadingResults= true;
  constructor(private api: ApiService, private router: Router, 
    private route: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
     } 

  ngOnInit() {
        this.getOrdenDetails(this.route.snapshot.params['id']);
  }

  getOrdenDetails(id: any){
    this.api.getOrden(id)
    .subscribe((data: any)=>{
      if(data){
        this.orden = data
        this.items = data.items
      }
      this.isLoadingResults = false;
    })
  }

  deleteItem(idItem: string){
    this.isLoadingResults = true;
    this.api.deleteItem(this.orden._id, idItem)
    .subscribe((res)=>{
      this.isLoadingResults = false;
      this.orden = res
      this.router.navigateByUrl(`ordenes-detalle/${this.orden._id}`);
    }, (err =>{
      console.log(err);
      this.isLoadingResults = false;
    }))
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
