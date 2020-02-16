import {Injectable} from '@angular/core';
import {CardItem} from '../model/card';
import {CardStatus} from '../model/card-status';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() {
  }

  getCategories(): CardItem[] {
    return [];
  }

  getStatus(): CardStatus[] {
    return [];
  }
}
