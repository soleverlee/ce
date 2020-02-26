import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardItem} from '../../model/card';
import {MatSnackBar} from '@angular/material';
import {CardService} from '../../service/card.service';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() card: CardItem;

  @Output() cardRemoved = new EventEmitter();

  constructor(private snackBar: MatSnackBar,
              private cardService: CardService) {
  }

  ngOnInit() {
  }

  removeCard(cardId: number) {
    this.cardService.removeCard(cardId)
      .subscribe(success => {
        this.cardRemoved.emit(cardId);
      }, error => {
        this.snackBar.open('删除失败:' + cardId);
      });
  }
}
