import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MENU_ITEMS } from '@core/constants/menu-items';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = MENU_ITEMS;
}
