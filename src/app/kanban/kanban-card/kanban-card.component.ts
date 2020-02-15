import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() id;
  @Input() title;
  @Input() category;

  constructor() {
  }

  ngOnInit() {
  }

}
