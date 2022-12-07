import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartasService } from 'src/app/SERVICIOS/cartas.service';

@Component({
  selector: 'app-crearmazo',
  templateUrl: './crearmazo.component.html',
  styleUrls: ['./crearmazo.component.css']
})
export class CrearmazoComponent implements OnInit {
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

  // TODO:MAZOS

  guardarNombre(event:any){
    this.mazo.nombre = event.target.value;
  }

  guardarMazo(){
    let encontrado = false;
    let mazosActualizados = [];
    this.mazosGuardados.forEach((mazo)=>{
      if(mazo.id != this.mazo.id){
        mazosActualizados.push(mazo);
      }
    })
    mazosActualizados.push(this.mazo);
    this.mazosGuardados = mazosActualizados;
    localStorage.setItem('mazos', JSON.stringify(this.mazosGuardados));
  }

  obtenerMazosActuales(){
    let mazosAnteriores = localStorage.getItem('mazos');
    if(mazosAnteriores != null){
      this.mazosGuardados = JSON.parse(mazosAnteriores);
    }
    if(this.mazosGuardados.length == 0){
      this.mazo.id = 0;

    }else{
      this.mazo.id = this.mazosGuardados[this.mazosGuardados.length - 1].id + 1;
    }
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


  constructor(private cartasService:CartasService) { }

  ngOnInit(): void {
    this.obtenerMazosActuales();
    this.obtenerCartasIniciales();
  }

}
