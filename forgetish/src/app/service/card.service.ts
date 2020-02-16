import {Injectable} from '@angular/core';
import {CardItem} from '../model/card';
import {CardStatus} from '../model/card-status';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  getCategories(): CardItem[] {
    return [];
  }

  getCardStatus(): Observable<CardStatus[]> {
    return this.http.get<CardStatus[]>('/api/cards/all_status');
  }

  getCards(status): Observable<CardItem[]> {
    return this.http
      .get<CardItem[]>('/api/cards', {
        params: {status}
      });
  }
}
