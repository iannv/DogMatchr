import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'INICIO',
        icon: 'pi pi-home',
      },
      {
        label: 'RAZAS',
      },
      {
        label: '¡ENCONTRAR A MI COMPAÑERO!',
      },
    ];
  }
}
