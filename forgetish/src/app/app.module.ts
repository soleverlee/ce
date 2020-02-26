import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KanbanComponent} from './kanban/kanban.component';
import {KanbanCellComponent} from './kanban/kanban-cell/kanban-cell.component';
import {KanbanCardComponent} from './kanban/kanban-card/kanban-card.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatInputModule, MatSidenavModule, MatSliderModule, MatSnackBarModule} from '@angular/material';
import {CategoryDialogComponent} from './category-dialog/category-dialog.component';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CardDialogComponent} from './card-dialog/card-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KanbanComponent,
    KanbanCellComponent,
    KanbanCardComponent,
    CategoryDialogComponent,
    CardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    DragDropModule,
  ],
  entryComponents: [
    CategoryDialogComponent,
    CardDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
