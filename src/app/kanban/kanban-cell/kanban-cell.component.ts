import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css']
})
export class KanbanCellComponent implements OnInit {
  @Input() title;
  @Input() totalCount;

  constructor() {
  }

  ngOnInit() {
  }

}
