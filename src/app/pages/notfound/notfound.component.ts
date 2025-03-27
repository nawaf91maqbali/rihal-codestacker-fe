import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-notfound',
  imports: [NzResultModule, NzButtonModule, RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}
