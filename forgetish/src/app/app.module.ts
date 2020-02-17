import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KanbanComponent} from './kanban/kanban.component';
import {KanbanCellComponent} from './kanban/kanban-cell/kanban-cell.component';
import {KanbanCardComponent} from './kanban/kanban-card/kanban-card.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KanbanComponent,
    KanbanCellComponent,
    KanbanCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}