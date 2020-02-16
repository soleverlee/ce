import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css']
})
export class KanbanCellComponent implements OnInit {
  @Input() title;
  @Input() totalCount;

  cards = [
    {id: 1, title: 'Btree的Java实现', category: 'Java'},
    {id: 2, title: '做一个todo List 应用', category: 'Java'},
    {id: 3, title: 'Redis基础知识', category: 'Java'},
    {id: 4, title: 'Rust基本知识', category: 'Java'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
