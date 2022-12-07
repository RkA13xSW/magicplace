import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartasService } from 'src/app/SERVICIOS/cartas.service';
import { EdicionesService } from 'src/app/SERVICIOS/ediciones.service';

@Component({
  selector: 'app-vercarta',
  templateUrl: './vercarta.component.html',
  styleUrls: ['./vercarta.component.css']
})
export class VercartaComponent implements OnInit {
  private routeSub: Subscription | undefined;
  idCard:any = -1;
  carta :any | undefined = undefined;

  caraActual: boolean = true;

  constructor(private route: ActivatedRoute, private edicionService:EdicionesService, private cartasService:CartasService) { }

  toogleCara(){
    this.caraActual = !this.caraActual;
  }

  recuperarCarta(){
    this.cartasService.getCard(this.idCard).subscribe(
      {
        next:(response: any) => {
          console.log(response);
          this.carta = response;

          this.cartasService.getCardES(this.carta.set, this.carta.collector_number).subscribe(
            {
              next:(response: any) => {
                console.log(response);
                this.carta = response;
              },
              error:(error: HttpErrorResponse) => {
                console.error("No disponemos de versión en Castellano");

              }
            }
          );
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.idCard = params['id'];
      this.recuperarCarta();

    });
  }

  ngOnDestroy() {
    if(this.routeSub != undefined){
      this.routeSub.unsubscribe();
    }
  }

}
