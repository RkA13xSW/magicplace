import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtrosService {

  constructor(private Http: HttpClient) { }

  public conseguirSimbolos(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/symbology`);
  }

  public creatureTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/creature-types`);
  }

  public planeswalkerTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/planeswalker-types`);
  }

  public landTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/land-types`);
  }

  public artifactTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/artifact-types`);
  }

  public enchantmentTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/enchantment-types`);
  }

  public spellTypes(): Observable<any>{
    return this.Http.get<any>(`https://api.scryfall.com/catalog/spell-types`);
  }
}
