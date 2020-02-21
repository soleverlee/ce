import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../service/card.service';
import {CardItem} from '../../model/card';
import {CardStatus} from '../../model/card-status';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css'],
})
export class KanbanCellComponent implements OnInit {
  @Input() cardStatus: number;
  @Input() title: string;

  cards: CardItem[] = [];

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    this.cardService.getCards(this.cardStatus)
      .subscribe(result => {
        this.cards = result;
      });
  }

}
