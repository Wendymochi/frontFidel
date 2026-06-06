import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { MENU_ITEMS } from '@core/constants/menu-items';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  pageTitle = 'Dashboard';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTitle(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateTitle(event.urlAfterRedirects);
      });
  }

  private updateTitle(url: string): void {

    const currentItem = MENU_ITEMS.find(
      item => item.route === url
    );

    this.pageTitle = currentItem?.label ?? 'FrontMaster';
  }
}
