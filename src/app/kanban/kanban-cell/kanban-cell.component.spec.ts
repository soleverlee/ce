import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanCellComponent } from './kanban-cell.component';

describe('KanbanCellComponent', () => {
  let component: KanbanCellComponent;
  let fixture: ComponentFixture<KanbanCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
