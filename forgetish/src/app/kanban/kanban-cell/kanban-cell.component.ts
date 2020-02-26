import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../service/card.service';
import {CardItem} from '../../model/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CardDialogComponent} from '../../card-dialog/card-dialog.component';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css'],
})
export class KanbanCellComponent implements OnInit {
  @Input() cardStatus: number;
  @Input() title: string;

  cards: CardItem[] = [];

  constructor(private cardService: CardService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cardService.getCards(this.cardStatus)
      .subscribe(result => {
        this.cards = result;
      });
  }

  drop(event: CdkDragDrop<CardItem[]>) {
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

  openAddCardDialog() {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.cardService.createCard(result.category || 'Default', result.title, result.description)
        .subscribe(success => {
          this.refresh();
        }, error => {
          this.snackBar.open('创建任务失败', result.title);
        });
    });
  }

  onCardRemoved(id: any) {
    this.refresh();
  }
}
