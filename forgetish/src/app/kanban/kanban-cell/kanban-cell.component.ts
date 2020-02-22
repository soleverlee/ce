import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../service/card.service';
import {CardItem} from '../../model/card';
import {CardStatus} from '../../model/card-status';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.data, event.previousIndex, event.currentIndex);
    const status = Number(event.container.id.replace('card-drag-', ''));
    const card = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.cardService.updateCardStatus(card.cardId, status)
        .subscribe(result => {
          console.log(result);
        });
    }

    const rankMapping = [];
    for (let i = 0; i < this.cards.length; i++) {
      rankMapping.push({id: this.cards[i].cardId, rank: i});
    }
    this.cardService.updateCardRank(rankMapping)
      .subscribe(result => {
        console.log(result);
      });
  }
}
