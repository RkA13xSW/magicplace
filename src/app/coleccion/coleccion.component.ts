import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EdicionesService } from '../SERVICIOS/ediciones.service';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.css']
})
export class ColeccionComponent implements OnInit {
  setsActuales: any[] = [];
  setCompletos: any[] = [];


  constructor(private edicionesService:EdicionesService) { }

  obtenerEdiciones(){
    this.edicionesService.getSets().subscribe(
      {
        next:(response: any) => {
          this.setCompletos = response.data;
          this.setsActuales = this.setCompletos;
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  irArriba(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    })
  }

  buscarTxt(key:string){
    this.setsActuales = this.setCompletos;  
    if(this.setsActuales.length > 0){
      let results: any[] = [];
      for(const set of this.setsActuales){
          if (set.name.toLowerCase().includes(key.toLowerCase())) {
            results.push(set);
          }
      }
      this.setsActuales = results;
      
    }
  }

  aplicarFiltros(filtro:string){
    switch (filtro) {
      case "nombre+":
        this.setCompletos.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        break;
      case "nombre-":
        this.setCompletos.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
        break;
      case "cartas+":
        this.setCompletos.sort((a,b) => (a.card_count > b.card_count) ? 1 : ((b.card_count > a.card_count) ? -1 : 0));
        break;
      case "cartas-":
        this.setCompletos.sort((a,b) => (a.card_count < b.card_count) ? 1 : ((b.card_count < a.card_count) ? -1 : 0));
        break;
      case "fecha+":
        this.setCompletos.sort((a,b) => (a.released_at > b.released_at) ? 1 : ((b.released_at > a.released_at) ? -1 : 0));
        break;
      case "fecha-":
        this.setCompletos.sort((a,b) => (a.released_at < b.released_at) ? 1 : ((b.released_at < a.released_at) ? -1 : 0));
        break;
      default:
        break;
    }

    this.setsActuales = this.setCompletos;
    const SEARCH = document.getElementById("buscador") as HTMLInputElement;
    SEARCH.value = "";
  }

  ngOnInit(): void {
    this.obtenerEdiciones();
  }

}
