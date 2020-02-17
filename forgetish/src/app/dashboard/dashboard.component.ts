import {Component, OnInit} from '@angular/core';
import 'ztree';
import {CardService} from '../service/card.service';
import * as _ from 'lodash';
import {Category} from '../model/category';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ztreeObject: any;

  constructor(private cardService: CardService) {
  }

  _extendTreeNode(node: Category) {
    return {
      ...node,
      icon: '/assets/category.png',
      children: node.children.map(child => this._extendTreeNode(child)),
    };
  }

  ngOnInit() {
    const setting = {
      view: {
        selectedMulti: false,
      }
    };
    this.cardService.getCategories().subscribe(result => {
      const formatted = result.map(item => this._extendTreeNode(item));
      console.log(formatted);
      this.ztreeObject = $.fn.zTree.init($('#treeDemo'), setting, formatted);
    });
  }

  onExpand(expand: boolean) {
    this.ztreeObject.expandAll(expand);
  }

  onExpandSelected(expand: boolean) {
    const selected = this.ztreeObject.getSelectedNodes();
    if (selected.length < 1) {
      return;
    }
    this.ztreeObject.expandNode(selected[0], expand, true);
  }
}
