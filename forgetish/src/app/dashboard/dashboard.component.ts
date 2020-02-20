import {Component, OnInit} from '@angular/core';
import 'ztree';
import {CardService} from '../service/card.service';
import {Category} from '../model/category';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CategoryDialogComponent} from '../category-dialog/category-dialog.component';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ztreeObject: any;

  constructor(
    private _snackBar: MatSnackBar,
    private cardService: CardService,
    public dialog: MatDialog) {
    console.log('card service:', this.cardService);
  }

  extendTreeNode = (node: Category) => {
    const isCard = node.type === 'card';
    const icon = isCard ? '/assets/task_created.png' : '/assets/category.png';
    const css = isCard ? {
      color: 'darkred',
      'border-left': '3px solid darkgreen',
    } : {};

    return {
      ...node,
      icon,
      font: css,
      children: node.children.map(child => this.extendTreeNode(child)),
    };
  };

  getFont = (treeId, node) => {
    return node.font ? node.font : {};
  };

  ngOnInit() {
    this.refreshTree();
  }

  zTreeOnDrop = (event, treeId, treeNodes, targetNode, moveType) => {
    const selected = treeNodes[0].name;
    const target = targetNode ? targetNode.name : null;
    this.cardService.moveCategory(selected, target)
      .subscribe(success => {
      }, error => {
        console.error(error);
        this._snackBar.open('移动分类失败', selected);
        this.refreshTree();
      });
  };

  refreshTree = () => {
    const setting = {
      view: {
        fontCss: this.getFont,
        nameIsHTML: false,
        selectedMulti: false,
      },
      edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        drag: {
          isCopy: false,
        }
      },
      callback: {
        onDrop: this.zTreeOnDrop,
      }
    };
    this.cardService.getCategories().subscribe(result => {
      const formatted = result.map(item => this.extendTreeNode(item));
      this.ztreeObject = $.fn.zTree.init($('#categoryTree'), setting, formatted);
    });
  };

  onExpand = (expand: boolean) => {
    this.ztreeObject.expandAll(expand);
  };

  onExpandSelected = (expand: boolean) => {
    const selected = this.ztreeObject.getSelectedNodes();
    if (selected.length < 1) {
      return;
    }
    this.ztreeObject.expandNode(selected[0], expand, true);
  };

  openAddDialog = () => {
    let parentCategory = null;
    const selected = this.ztreeObject.getSelectedNodes();
    if (selected.length === 1) {
      parentCategory = selected[0].name;
      console.log(parentCategory);
    }
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: {parentCategory},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.cardService.createCategory(result.categoryName, result.parentCategory)
        .subscribe(success => {
          this.refreshTree();
        }, error => {
          this._snackBar.open('创建分类失败', result.categoryName);
        });
    });
  };
}
