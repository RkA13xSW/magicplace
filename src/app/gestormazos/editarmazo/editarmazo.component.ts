import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartasService } from 'src/app/SERVICIOS/cartas.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarmazo',
  templateUrl: './editarmazo.component.html',
  styleUrls: ['./editarmazo.component.css']
})
export class EditarmazoComponent implements OnInit {
  idMazo:number = -1;
  private routeSub: Subscription | undefined;


  mazo: any = {
    id: 0,
    nombre: "",
    cartasId:{
      principal:[],
      banquillo:[]
    }
  }
  mazosGuardados: any[] = [];
  cartas: any = {
    principal:[],
    banquillo:[]
  };
  cartasMostradas: any = [];
  cantidades = {
    principal: 0,
    banquillo: 0
  };

  guardarNombre(event:any){
    this.mazo.nombre = event.target.value;
  }

  guardarMazo(){
    let mazosActualizados:any = [];
    this.mazosGuardados.forEach((mazo)=>{
      if(mazo.id != this.mazo.id){
        mazosActualizados.push(mazo);
      }else{
        mazosActualizados.push(this.mazo);
      }
    })
    this.mazosGuardados = mazosActualizados;
    localStorage.setItem('mazos', JSON.stringify(this.mazosGuardados));
  }

  obtenerMazosActuales(){
    let mazosAnteriores = localStorage.getItem('mazos');
    if(mazosAnteriores != null){
      this.mazosGuardados = JSON.parse(mazosAnteriores);
    }
    this.mazosGuardados.forEach((mazo:any)=>{
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
            this.cartas.principal.push({
              cantidad:cantidad,
              id: response.id,
              datos: response
            });
          }else{
            this.cartas.banquillo.push({
              cantidad:cantidad,
              id: response.id,
              datos: response
            });
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  aniadirMazo(id:string){
    let encontrada = false;
    this.mazo.cartasId.principal.forEach((datosCarta:any)=>{
      if(datosCarta.id == id){
        this.mazo.cartasId.principal[this.mazo.cartasId.principal.indexOf(datosCarta)].cantidad++;
        this.cartas.principal.forEach((cartaPrincipal:any)=>{
          if(cartaPrincipal.id == id){
            this.cartas.principal[this.cartas.principal.indexOf(cartaPrincipal)].cantidad++;
          }
        });
        encontrada = true;
      }
    });
    if (!encontrada) {
      this.mazo.cartasId.principal.push(
        {
          id: id,
          cantidad: 1
        }
      );
      this.cartasMostradas.forEach((carta:any)=>{
        if(carta.id == id){
          this.cartas.principal.push({
            id: id,
            cantidad: 1,
            datos: carta
          })
        }
      });
    }

    this.cantidades.principal++;
  }

  aniadirBanquillo(id:string){
    let encontrada = false;
    this.mazo.cartasId.banquillo.forEach((datosCarta:any)=>{
      if(datosCarta.id == id){
        this.mazo.cartasId.banquillo[this.mazo.cartasId.banquillo.indexOf(datosCarta)].cantidad++;
        this.cartas.banquillo.forEach((cartabanquillo:any)=>{
          if(cartabanquillo.id == id){
            this.cartas.banquillo[this.cartas.banquillo.indexOf(cartabanquillo)].cantidad++;
          }
        });
        encontrada = true;
      }
    });
    if (!encontrada) {
      this.mazo.cartasId.banquillo.push(
        {
          id: id,
          cantidad: 1
        }
      );
      this.cartasMostradas.forEach((carta:any)=>{
        if(carta.id == id){
          this.cartas.banquillo.push({
            id: id,
            cantidad: 1,
            datos: carta
          })
        }
      });
    }
    this.cantidades.banquillo++;

  }

  quitarMazo(id:string){
    this.mazo.cartasId.principal.forEach((datosCarta:any)=>{
      if(datosCarta.id == id){
        if(this.mazo.cartasId.principal[this.mazo.cartasId.principal.indexOf(datosCarta)].cantidad == 1){
          this.mazo.cartasId.principal.splice(this.mazo.cartasId.principal.indexOf(datosCarta),1);
        }else{
          this.mazo.cartasId.principal[this.mazo.cartasId.principal.indexOf(datosCarta)].cantidad--;
        }
        this.cartas.principal.forEach((cartaPrincipal:any)=>{
          if(cartaPrincipal.id == id){
            if(this.cartas.principal[this.cartas.principal.indexOf(cartaPrincipal)].cantidad == 1){
              this.cartas.principal.splice(this.cartas.principal.indexOf(cartaPrincipal),1);
            }else{
              this.cartas.principal[this.cartas.principal.indexOf(cartaPrincipal)].cantidad--;
            }
          }
        });
      }
    });
    this.cantidades.principal--;
  }

  quitarBanquillo(id:string){
    this.mazo.cartasId.banquillo.forEach((datosCarta:any)=>{
      if(datosCarta.id == id){
        if(this.mazo.cartasId.banquillo[this.mazo.cartasId.banquillo.indexOf(datosCarta)].cantidad == 1){
          this.mazo.cartasId.banquillo.splice(this.mazo.cartasId.banquillo.indexOf(datosCarta),1);
        }else{
          this.mazo.cartasId.banquillo[this.mazo.cartasId.banquillo.indexOf(datosCarta)].cantidad--;
        }
        this.cartas.banquillo.forEach((cartabanquillo:any)=>{
          if(cartabanquillo.id == id){
            if(this.cartas.banquillo[this.cartas.banquillo.indexOf(cartabanquillo)].cantidad == 1){
              this.cartas.banquillo.splice(this.cartas.banquillo.indexOf(cartabanquillo),1);
            }else{
              this.cartas.banquillo[this.cartas.banquillo.indexOf(cartabanquillo)].cantidad--;
            }
          }
        });
      }
    });
    this.cantidades.banquillo--;
  }

  

  // TODO:BUSCADOR

  mostrarBuscador(accion:boolean){
    const BUSCADOR = document.querySelector(".buscador") as HTMLDivElement;
    BUSCADOR.style.animationName = (accion) ? "mostrarBuscador" : "ocultarBuscador";
  
  }

  // TODO:CARTAS

  buscarCarta(key:string){
    let txt = "q=" + ((key.length > 0)? key : "a");
    this.cartasService.getFiltredSearch(txt).subscribe(
      {
        next:(response: any) => {
          this.cartasMostradas = (response.object == "error")? [] : response.data;
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
          this.cartasMostradas = [];
        }
      }
    );
  }

  obtenerCartasIniciales(){
    this.cartasService.initialSearch().subscribe(
      {
        next:(response: any) => {
          this.cartasMostradas = response.data;          
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }


  constructor(private cartasService:CartasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.idMazo = params['id'];
      this.obtenerMazosActuales();
      this.obtenerCartasIniciales();
    });
    
  }

  ngOnDestroy() {
    if(this.routeSub != undefined){
      this.routeSub.unsubscribe();
    }
  }

}
