import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../service/card.service';
import {CardItem} from '../../model/card';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css']
})
export class KanbanCellComponent implements OnInit {
  @Input() cardStatus;
  @Input() title;

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
