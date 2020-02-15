import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  cells = [
    '计划进行',
    '进行中',
    '搁置',
    '已完成',
  ];

  constructor() { }

  ngOnInit() {
  }

}
