import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import {Page} from '../entity/page';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('将总页码的最大数量控制在7页', () => {
    component.page = {
      number: 2,
      size: 20,
      totalPages: 20
    } as Page<any>;
    fixture.autoDetectChanges();
  });
});
