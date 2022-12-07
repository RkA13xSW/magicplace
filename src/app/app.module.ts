import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';


// TODO: COMPONENTES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InterfazComponent } from './interfaz/interfaz.component';
import { ColeccionComponent } from './coleccion/coleccion.component';
import { GestormazosComponent } from './gestormazos/gestormazos.component';
import { MagicpediaComponent } from './magicpedia/magicpedia.component';
import { FooterComponent } from './footer/footer.component';
import { VercoleccionComponent } from './coleccion/vercoleccion/vercoleccion.component';
import { VercartaComponent } from './magicpedia/vercarta/vercarta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearmazoComponent } from './gestormazos/crearmazo/crearmazo.component';
import { VermazoComponent } from './gestormazos/vermazo/vermazo.component';
import { EditarmazoComponent } from './gestormazos/editarmazo/editarmazo.component';
// TODO: COMPONENTES


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InterfazComponent,
    ColeccionComponent,
    GestormazosComponent,
    MagicpediaComponent,
    FooterComponent,
    VercoleccionComponent,
    VercartaComponent,
    CrearmazoComponent,
    VermazoComponent,
    EditarmazoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: '', component: InicioComponent},
      {path: 'colecciones', component: ColeccionComponent},
      {path: 'coleccion/:id', component: VercoleccionComponent},
      {path: 'catalogo', component: MagicpediaComponent},
      {path: 'catalogo/:id', component: VercartaComponent},
      {path: 'mazos', component: GestormazosComponent},
      {path: 'mazos/crear', component: CrearmazoComponent},
      {path: 'mazo/:id', component: VermazoComponent},
      {path: 'mazos/modificar/:id', component: EditarmazoComponent},
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
