import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  private apiServerUrl = "https://api.scryfall.com/cards";
  constructor(private Http: HttpClient) { }

  //Obtener el listado de todos los libros actualmente disponibles.
  public getRandomCard(): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/random`);
  }

  public getSetCards(url:string): Observable<any>{
    return this.Http.get<any>(url);
  }

  public getFiltredSearch(filted:string): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/search?${filted}`);
  }

  public initialSearch(): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/search?order=cmc&q=c%3Ared+pow%3D3`);
  }

  public getCard(id:any): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/${id}`);
  }

  public getCardES(set:string, colection:number): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/${set}/${colection}/es`);
  }
}


