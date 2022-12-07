import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { CartasService } from '../SERVICIOS/cartas.service';
import { EdicionesService } from '../SERVICIOS/ediciones.service';
import { OtrosService } from '../SERVICIOS/otros.service';

@Component({
  selector: 'app-magicpedia',
  templateUrl: './magicpedia.component.html',
  styleUrls: ['./magicpedia.component.css']
})
export class MagicpediaComponent implements OnInit {
  
  filtrosActivo: boolean = false;

  //Cartas obtenidas.
  cartas: any[] = [];

  //Información de la petición de cartas
  info: any = {
    has_more: false,
    next_page: null,
    total_cards: 0
  }
  
  //Filtros aplicados.
  filtros : any = {
    q: '',
    unique: 'cards',
    order: 'name',
    include_extras: false,
    include_multilingual: false,
    include_variations: false,
    pretty: false,
    color: '',
    edicion:'',
    rareza: '',
    tipo: '',
    tipoE: '',
    formato: ''
  };

  //Costes de mana de las cartas
  colores: any[] = [];

  //Ediciones disponibles.
  sets: any[] = [];

  //Formatos Existentes.
  formatos: string[]= [
    "alchemy",
    "brawl",
    "commander",
    "duel",
    "explorer",
    "future",
    "gladiator",
    "historic",
    "historicbrawl",
    "legacy",
    "modern",
    "pauper",
    "paupercommander",
    "penny",
    "pioneer",
    "premodern",
    "oldschool",
    "standard",
    "vintage"
  ];

  //Tipos
  tipos: any = {
    creature:[],
    planeswalker:[],
    land:[],
    artifact:[],
    spell:[],
    enchantment:[]
  }

  constructor(private cartasService:CartasService, private otrosService: OtrosService, private edicionService:EdicionesService) { }

//TODO: OBTENER INFORMACIÓN

  obtenerCartasIniciales(){
    this.cartasService.initialSearch().subscribe(
      {
        next:(response: any) => {
          this.cartas = response.data;
          this.info.next_page = (response?.next_page != undefined) ? response?.next_page : '';
          this.info.has_more = (response?.has_more != undefined) ? response?.has_more : false;
          this.info.total_cards = (response?.total_cards != undefined) ? response?.total_cards : 0;
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerSiguienteLista(){
    if(this.info.has_more && this.info.next_page.length > 1){
      this.cartasService.getSetCards(this.info.next_page).subscribe(
        {
          next:(response: any) => {
            this.cartas = this.cartas.concat(response.data);
            this.info.next_page = (response?.next_page != undefined) ? response?.next_page : '';
            this.info.has_more = (response?.has_more != undefined) ? response?.has_more : false;
            this.info.total_cards = (response?.total_cards != undefined) ? response?.total_cards : 0;
          },
          error:(error: HttpErrorResponse) => {
            console.error(error);
          }
        }
      );
    }
  }

  obtenerColores(){
    this.otrosService.conseguirSimbolos().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.forEach((elemento: any) => {
              if(elemento.represents_mana == true){
                this.colores.push(elemento);
              }
            });
            
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerEdiciones(){
    this.edicionService.getSets().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.sets = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenercreatureTypes(){
    this.otrosService.creatureTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.creature = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerplaneswalkerTypes(){
    this.otrosService.planeswalkerTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.planeswalker = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerlandTypes(){
    this.otrosService.landTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.land = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerartifactTypes(){
    this.otrosService.artifactTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.artifact = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerenchantmentTypes(){
    this.otrosService.enchantmentTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.enchantment = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

  obtenerspellTypes(){
    this.otrosService.spellTypes().subscribe(
      {
        next:(response: any) => {
          if(response?.data != undefined){
            response.data.sort(function (a:any, b:any) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            this.tipos.spell = response.data;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
        }
      }
    );
  }

//TODO: OBTENER INFORMACIÓN





  irArriba(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    })
  }


  @HostListener("window:scroll", [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 400)) {
          this.obtenerSiguienteLista();
      }
  }

  // FILTROS:
  applyFiler(key:string){
    if(key.length > 0){
      this.filtros.q = key; 
    }else{
      this.filtros.q = ""; 
    }
    this.getFiltredSearch();
  }

  getFiltredSearch(){
    this.cartasService.getFiltredSearch(this.formatearFiltro()).subscribe(
      {
        next:(response: any) => {
          if(response.object == "error"){
            this.cartas = [];
            this.info.next_page = '';
            this.info.has_more= false;
            this.info.total_cards= 0;
          }else{
            this.cartas = response.data;
            this.info.next_page = (response?.next_page != undefined) ? response?.next_page : '';
            this.info.has_more = (response?.has_more != undefined) ? response?.has_more : false;
            this.info.total_cards = (response?.total_cards != undefined) ? response?.total_cards : 0;
          }
        },
        error:(error: HttpErrorResponse) => {
          console.error(error);
          this.cartas = [];
          this.info.next_page = '';
          this.info.has_more= false;
          this.info.total_cards= 0;
        }
      }
    );
  }

  togleFiltrosCaja(){
    const CAJA = document.querySelector(".caja-filtros") as HTMLDivElement;
    if(this.filtrosActivo){
      CAJA.style.left = "-320px";
      this.filtrosActivo = false;
    }else{
      CAJA.style.left = "0px";
      this.filtrosActivo = true;
    }
  }

  limpiarFiltros(){
    this.filtros = {
      q: '',
      unique: 'cards',
      order: 'name',
      include_extras: false,
      include_multilingual: false,
      include_variations: false,
      pretty: false,
      color: '',
      edicion:'',
      rareza: '',
      tipo: '',
      tipoE: '',
      formato: ''
    };

    const BUSCADOR = document.getElementById("buscador") as HTMLInputElement;
    BUSCADOR.value = '';
    this.togleFiltrosCaja();
    this.obtenerCartasIniciales();
  }

  formatearFiltro(){
    let filtroFormateado = 'q=';
    filtroFormateado = (this.filtros.q.length > 0) ? (`${filtroFormateado}${this.filtros.q.replace(" ", "%20")}`) : filtroFormateado;
    filtroFormateado = (this.filtros.tipo.length > 0) ? (`${filtroFormateado}%20t:${this.filtros.tipo}`) : filtroFormateado;
    filtroFormateado = (this.filtros.tipoE.length > 0) ? (`${filtroFormateado}%20t:${this.filtros.tipoE}`) : filtroFormateado;
    filtroFormateado = (this.filtros.rareza.length > 0) ? (`${filtroFormateado}%20r:${this.filtros.rareza}`) : filtroFormateado;
    filtroFormateado = (this.filtros.formato.length > 0) ? (`${filtroFormateado}%20f:${this.filtros.formato}`) : filtroFormateado;
    filtroFormateado = (this.filtros.color.length > 0) ? (`${filtroFormateado}%20mana:${this.filtros.color}`) : filtroFormateado;
    filtroFormateado = (this.filtros.edicion.length > 0) ? (`${filtroFormateado}%20set:${this.filtros.edicion}`) : filtroFormateado;
    
    if(filtroFormateado.length < 3){
      filtroFormateado = 'q=a';
    }

    filtroFormateado = (this.filtros.include_extras) ? (`${filtroFormateado}&include_extras=${this.filtros.include_extras}`) : filtroFormateado;
    filtroFormateado = (this.filtros.include_multilingual) ? (`${filtroFormateado}&include_multilingual=${this.filtros.include_multilingual}`) : filtroFormateado;
    filtroFormateado = (this.filtros.include_variations) ? (`${filtroFormateado}&include_variations=${this.filtros.include_variations}`) : filtroFormateado;
    
    filtroFormateado = (this.filtros.order.length > 0) ? (`${filtroFormateado}&order=${this.filtros.order}`) : filtroFormateado;
    filtroFormateado = (this.filtros.unique.length > 0) ? (`${filtroFormateado}&unique=${this.filtros.unique}`) : filtroFormateado;
    
    
    return filtroFormateado;
  }

  addFiltro(evt:any){
    switch (evt.target.id) {
      case "unique":
        this.filtros.unique = evt.target.value;

        break;
      case "order":
        this.filtros.order = evt.target.value;
        break;

      case "include_extras":
        this.filtros.include_extras = evt.target.checked;
        break;

      case "include_multilingual":
        this.filtros.include_multilingual = evt.target.checked;
        break;

      case "include_variations":
        this.filtros.include_variations = evt.target.checked;
        break;

      case "tipo":
        this.filtros.tipoE = '';
        if(this.filtros.tipo.length > 0){
          document.getElementById(`SLT-${this.filtros.tipo}`)?.classList.add("noVer");
        }
        this.filtros.tipo = evt.target.value;
        if(this.filtros.tipo.length > 0){
          document.getElementById(`SLT-${this.filtros.tipo}`)?.classList.remove("noVer");
        }
        break;

      case "tipoE":
        this.filtros.tipoE = evt.target.value;
        break;

      case "rareza":
        this.filtros.rareza = evt.target.value;
        break;

      case "formato":
        this.filtros.formato = evt.target.value;
        break;

      default:
        break;
    }
    this.getFiltredSearch();
  }

  addFiltroEsp(filtro:string, value:string){
    switch (filtro) {
      case "color":
        this.filtros.color = value;
        break;
      case "edicion":
        this.filtros.edicion = value;
        break;
      default:
        break;
    }
    this.getFiltredSearch();
  }


  ngOnInit(): void {
    this.obtenerCartasIniciales();
    this.obtenerColores();  
    this.obtenerEdiciones();
    this.obtenercreatureTypes();
    this.obtenerplaneswalkerTypes();
    this.obtenerlandTypes();
    this.obtenerartifactTypes();
    this.obtenerenchantmentTypes();
    this.obtenerspellTypes();
  }

}

