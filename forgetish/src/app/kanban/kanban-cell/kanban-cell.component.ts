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
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
