import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

//shared layout component over all pages
//specify header of pages, menu, content and all other shared layout
export class LayoutComponent {
  isCollapsed = false;
}
