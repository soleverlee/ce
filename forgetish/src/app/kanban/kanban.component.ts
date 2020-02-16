import {Component, OnInit} from '@angular/core';
import {CardService} from '../service/card.service';
import {CardStatus} from '../model/card-status';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  cardStatus: CardStatus[];

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    this.cardService.getCardStatus().subscribe(results => {
      this.cardStatus = results;
    });
  }

  getDisplayStatus() {
    return this.cardStatus.filter(s => s.display);
  }
}
