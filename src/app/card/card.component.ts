import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() url: string = '';
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() description: string = '';
}
