import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardItem} from '../../model/card';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CardService} from '../../service/card.service';
import {CardDialogComponent} from '../../card-dialog/card-dialog.component';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() card: CardItem;

  @Output() cardRemoved = new EventEmitter();

  @Output() cardUpdated = new EventEmitter();

  expanded = false;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
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

  editCard(card: CardItem) {
    console.log(card);
    const dialogRef = this.dialog.open(CardDialogComponent, {
      width: '400px',
      data: {...card},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.cardService.updateCard(result.cardId, result.category || 'Default', result.title, result.description)
        .subscribe(success => {
          this.cardUpdated.emit(card);
        }, error => {
          this.snackBar.open('创建任务失败', result.title);
        });
    });
  }

  expandCheckList() {
    this.expanded = !this.expanded;
  }
}
