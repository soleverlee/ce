import {Component, OnInit} from '@angular/core';
import 'ztree';
import {CardService} from '../service/card.service';

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

  ngOnInit() {
    const setting = {
      view: {
        selectedMulti: false,
      }
    };
    this.cardService.getCategories().subscribe(result => {
      this.ztreeObject = $.fn.zTree.init($('#treeDemo'), setting, result);
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
