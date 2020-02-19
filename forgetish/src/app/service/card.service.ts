import {Injectable} from '@angular/core';
import {CardItem} from '../model/card';
import {CardStatus} from '../model/card-status';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
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

  createCategory(name: string, parentCategory: string): Observable<boolean> {
    return this.http.post<boolean>('/api/categories', {
      name,
      parent: parentCategory,
    });
  }
}
