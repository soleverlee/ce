import {Injectable} from '@angular/core';
import {CardItem} from '../model/card';
import {CardStatus} from '../model/card-status';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Category} from '../model/category';
import {RankMapping} from '../model/rankmapping';

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

  moveCategory(name: string, parentCategory: string): Observable<number> {
    return this.http.post<number>('/api/categories/move', {
      name,
      parent: parentCategory,
    });
  }

  moveCard(id: number, category: string): Observable<boolean> {
    return this.http.post<boolean>('/api/cards/move', {
      id,
      category,
    });
  }

  createCard(category: string, title: string, description: string):
    Observable<boolean> {
    return this.http.post<boolean>('/api/cards', {
      category,
      title, description,
    });
  }

  removeCard(id: number): Observable<boolean> {
    return this.http.post<boolean>('/api/cards/remove', {
      id,
    });
  }

  removeCategory(name: string): Observable<boolean> {
    return this.http.post<boolean>('/api/categories/remove', {
      name,
    });
  }

  updateCardStatus(id: number, status: number): Observable<number> {
    return this.http.post<number>('/api/cards/updateStatus', {
      id,
      status,
    });
  }

  updateCardRank(rankmappings: RankMapping[]): Observable<number> {
    return this.http.post<number>('/api/cards/updateRank',
      rankmappings
    );
  }
}
