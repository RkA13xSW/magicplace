import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartasService } from 'src/app/SERVICIOS/cartas.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-vermazo',
  templateUrl: './vermazo.component.html',
  styleUrls: ['./vermazo.component.css']
})
export class VermazoComponent implements OnInit {
  @ViewChild('presupuesto-mazo',{static:false}) el!: ElementRef;

  mazo: any = {
    id: 0,
    nombre: "",
    cartasId:{
      principal:[],
      banquillo:[]
    }
  }
  idMazo:number = -1;
  cartasMostradas: any = {
    principal:[],
    banquillo:[]
  };
  cantidades = {
    principal: 0,
    banquillo: 0
  };
  precios = {
    eur: 0,
    eur_foil: 0,
    usd: 0,
    usd_foil: 0,
    tix: 0
  }

  private routeSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private cartasService:CartasService) { }


  obtenerMazosActuales(){
    let mazosAnteriores = localStorage.getItem('mazos');
    let mazosGuardados = [];
    if(mazosAnteriores != null){
      mazosGuardados = JSON.parse(mazosAnteriores);
    }
    mazosGuardados.forEach((mazo:any)=>{
      if(mazo.id == this.idMazo){
        this.mazo = mazo;
        this.obtenerCartasMazo();
      }
    });
    
  }

  obtenerCartasMazo(){
    this.mazo.cartasId.principal.forEach((carta:any)=>{
      this.cantidades.principal += carta.cantidad;
      this.obtenerCarta(carta.id, 1, carta.cantidad)
    });
    this.mazo.cartasId.banquillo.forEach((carta:any)=>{
      this.cantidades.banquillo += carta.cantidad;
      this.obtenerCarta(carta.id, 2, carta.cantidad)
    });
  }

  obtenerCarta(id:string, donde:number, cantidad:number){
    this.cartasService.getCard(id).subscribe(
      {
        next:(response: any) => {
          if(donde == 1){
            this.cartasMostradas.principal.push({
              cantidad:cantidad,
              datos: response
            });
          }else{
            this.cartasMostradas.banquillo.push({
              cantidad:cantidad,
              datos: response
            });
          }
          this.precios.eur += (response.prices.eur != null)? parseFloat(response.prices.eur) : 0;
          this.precios.eur_foil += (response.prices.eur_foil != null)? parseFloat(response.prices.eur_foil) : 0;
          this.precios.usd += (response.prices.usd != null)? parseFloat(response.prices.usd) : 0;
          this.precios.usd_foil += (response.prices.usd_foil != null)? parseFloat(response.prices.usd_foil) : 0;
          this.precios.tix += (response.prices.tix != null)? parseFloat(response.prices.tix) : 0;
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  generatePDF(nombre:string){
    const PRESUPUESTO  = document.getElementById("presupuesto-mazo") as HTMLDivElement;
    PRESUPUESTO.style.visibility = "visible";
    let pdf = new jsPDF('l', 'pt','a2',true);
    pdf.html(PRESUPUESTO, {
      callback: function () {
        pdf.save(`${nombre}_coleccion.pdf`);
        PRESUPUESTO.style.visibility = "collapse";

      }
    });
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.idMazo = params['id'];
      this.obtenerMazosActuales();
    });
  }

  ngOnDestroy() {
    if(this.routeSub != undefined){
      this.routeSub.unsubscribe();
    }
  }

}
