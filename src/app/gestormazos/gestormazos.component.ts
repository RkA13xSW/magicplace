import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestormazos',
  templateUrl: './gestormazos.component.html',
  styleUrls: ['./gestormazos.component.css']
})
export class GestormazosComponent implements OnInit {
  mazosGuardados: any[] = [];
  constructor() { }

  obtenerMazos(){
    let mazos = localStorage.getItem('mazos');
    if(mazos != null){
      this.mazosGuardados = JSON.parse(mazos);;
    }
  }

  borrarMazo(id:number){
    this.mazosGuardados.forEach((mazo)=>{
      if(mazo.id == id){
        this.mazosGuardados.splice(this.mazosGuardados.indexOf(mazo),1);
        localStorage.setItem("mazos", JSON.stringify(this.mazosGuardados))
      }
    });
  }

  ngOnInit(): void {
    this.obtenerMazos();
  }

}
