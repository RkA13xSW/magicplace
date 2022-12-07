import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartasService } from '../SERVICIOS/cartas.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EdicionesService } from '../SERVICIOS/ediciones.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cartas:any[] = [];
  sets:any[] = [];
  posicion:number = 0;
  interval: any;
  setsIni: string[] = [
    "thb",
    "rav",
    "afr",
    "uma",
    "ust",
    "ema",
    "sld",
    "eld",
    "neo"
  ];

  constructor(private cartasService:CartasService, private edicionesService:EdicionesService) { }

  obtenerSetsAleatorios(){
    let peticion : string[] = [];
    while (peticion.length < 5) {
      const rndNum = Math.floor(Math.random() * 9);
      if(!peticion.includes(this.setsIni[rndNum])){
        peticion.push(this.setsIni[rndNum]);
        this.edicionesService.getSetByTxt(this.setsIni[rndNum]).subscribe(
          {
            next:(response: any) => {
              this.sets.push(response);
            },
            error:(error: HttpErrorResponse) => {
              console.error(error);
            }
          }
        );
      }
    }

  }

  obtenerCartasAleatorias(){
    for (let i = 0; i < 5; i++) {
      this.cartasService.getRandomCard().subscribe(
        {
          next:(response: any) => {
            this.cartas.push(response);
          },
          error:(error: HttpErrorResponse) => {
            console.error(error);
          }
        }
      );
      
    }
    
  }

  cambiarPosicion(){
    const ELEMENTOANTERIOR = document.querySelectorAll(".posicion-carousel-cartas")[this.posicion] as HTMLInputElement;
    if(this.posicion == 4){
      this.posicion = 0;
    }else{
      this.posicion ++;
    }
    const ELEMENTOACTUAL = document.querySelectorAll(".posicion-carousel-cartas")[this.posicion] as HTMLInputElement;
    ELEMENTOANTERIOR.checked = false;
    ELEMENTOACTUAL.checked = true;
  }

  establecerIntervalo(){
    this.interval = setInterval(()=>{
      this.cambiarPosicion();
    }, 2000);
    this.interval;
  }

  borrarIntervalo(){    
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.obtenerCartasAleatorias();
    this.establecerIntervalo();
    this.obtenerSetsAleatorios()
  }

  ngOnDestroy() {
    this.borrarIntervalo();
  }

}
