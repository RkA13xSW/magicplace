import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent implements OnInit {

  constructor() { }

  toogleNav(){
    document.querySelector("#botonNavegacion")?.classList.toggle("noVer");
    document.querySelector("#navegacion")?.classList.toggle("noVer");
  }

  ngOnInit(): void {
  }

}
