import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Menu, ButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
