import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartasService } from 'src/app/SERVICIOS/cartas.service';
import { EdicionesService } from 'src/app/SERVICIOS/ediciones.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-vercoleccion',
  templateUrl: './vercoleccion.component.html',
  styleUrls: ['./vercoleccion.component.css']
})
export class VercoleccionComponent implements OnInit {
  @ViewChild('presupuesto',{static:false}) el!: ElementRef;

  private routeSub: Subscription | undefined;
  
  idSet: string = '';
  currentSet: any | undefined = undefined;
  setProcediente: string | undefined = undefined;
  cartas :any[] = [];
  presupuestoPreparado: boolean =  true;
  preciosTotales : number[] = [0,0,0,0,0];
  next: string | null = null;

  generatePDF(nombre:string){
    const PRESUPUESTO  = document.getElementById("presupuesto") as HTMLDivElement;
    PRESUPUESTO.style.visibility = "visible";
    let pdf = new jsPDF('l', 'pt','a2',true);
    pdf.html(this.el.nativeElement, {
      callback: function () {
        pdf.save(`${nombre}_coleccion.pdf`);
        PRESUPUESTO.style.visibility = "collapse";

      }
    });
  }

  constructor(private route: ActivatedRoute, private edicionService:EdicionesService, private cartasService:CartasService) { }

  irArriba(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    })
  }

  obtenerSet(key:string){
    this.edicionService.getSetByTxt(key).subscribe(
      {
        next:(response: any) => {
          this.currentSet = response;
          this.obtenerCartasSet()
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }
  
  calcularPresupuesto(){    
      if(this.next != null){
        this.cartasService.getSetCards(this.next).subscribe(
          {
            next:(response: any) => {
              this.cartas = this.cartas.concat(response.data);
              if(response.has_more == true){
                this.next = response.next_page;
                this.calcularPresupuesto();
              }else{
                this.next = null;
              }
            },
            error:(error: HttpErrorResponse) => {
              console.error(error);
            }
          }
        );
      }
              
    
    this.cartas.forEach((carta)=>{
      this.preciosTotales[0] = (carta.prices.eur != null)? (this.preciosTotales[0] + parseFloat(carta.prices.eur)): this.preciosTotales[0] ;
      this.preciosTotales[1] = (carta.prices.eur_foil != null)? (this.preciosTotales[1] + parseFloat(carta.prices.eur_foil)): this.preciosTotales[1] ;
      this.preciosTotales[2] = (carta.prices.usd != null)? (this.preciosTotales[2] + parseFloat(carta.prices.usd)): this.preciosTotales[2] ;
      this.preciosTotales[3] = (carta.prices.usd_foil != null)? (this.preciosTotales[3] + parseFloat(carta.prices.usd_foil)): this.preciosTotales[3] ;
      this.preciosTotales[4] = (carta.prices.tix != null)? (this.preciosTotales[4] + parseFloat(carta.prices.tix)): this.preciosTotales[4] ;
    });

  }

  obtenerCartasSet(){
    this.cartasService.getSetCards(this.currentSet.search_uri).subscribe(
      {
        next:(response: any) => {
          this.cartas = response.data;
          if(response.has_more == true){
            this.next = response.next_page;
          }else{
            this.next = null;
          }
          this.calcularPresupuesto();
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.idSet = params['id'];
      this.obtenerSet(this.idSet);
    });
  }

  ngOnDestroy() {
    if(this.routeSub != undefined){
      this.routeSub.unsubscribe();
    }
  }

}
