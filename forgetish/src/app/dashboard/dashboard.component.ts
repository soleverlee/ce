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

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    const setting = {};
    this.cardService.getCategories().subscribe(result => {
      $.fn.zTree.init($('#treeDemo'), setting, result);
    });
  }
}
