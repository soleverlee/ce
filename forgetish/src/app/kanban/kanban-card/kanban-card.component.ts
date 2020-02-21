import {Component, Input, OnInit} from '@angular/core';
import {CardItem} from '../../model/card';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() card: CardItem;

  constructor() {
  }

  ngOnInit() {
  }

}
