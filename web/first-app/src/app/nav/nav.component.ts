import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Menu} from '../entity/menu';
import {MenuService} from '../service/menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  menus: Menu[] = [];

  @Output()
  beLogout = new EventEmitter<void>();


  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menus = this.menuService.getAllowMenus();
    console.log('nav组件菜单项', this.menus);
  }

  onSubmit(): void {
    this.beLogout.emit(undefined);
  }
}
