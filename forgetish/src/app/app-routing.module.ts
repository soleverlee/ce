import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KanbanComponent} from './kanban/kanban.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'kanban', component: KanbanComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
