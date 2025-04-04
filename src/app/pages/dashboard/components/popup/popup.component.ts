import { Component } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';

//popup component to display the popup when hover or click the pin on the map
@Component({
  selector: 'app-popup',
  imports: [NzAlertModule, NzBadgeModule, NzIconModule,NzDescriptionsModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

}
