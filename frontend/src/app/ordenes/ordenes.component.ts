import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Orden } from '../ordenes';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  displayedColumns: string[] = ['canal', 'valor', 'estado', 'createdAt'];
  data: Orden[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getOrdenes()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
