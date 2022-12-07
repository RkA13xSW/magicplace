import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdicionesService {
  private apiServerUrl = "https://api.scryfall.com/sets";

  constructor(private Http: HttpClient) { }

  public getSetByTxt(key:string): Observable<any>{
    return this.Http.get<any>(`${this.apiServerUrl}/${key}`);
  }

  public getSets(): Observable<any[]>{
    return this.Http.get<any[]>(this.apiServerUrl);
  }
}
