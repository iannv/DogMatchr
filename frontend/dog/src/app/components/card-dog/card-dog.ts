import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Chip } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Dogapi, RazaResponse } from '../../models/RazaModel';

@Component({
  selector: 'app-card-dog',
  imports: [Chip, CardModule, ButtonModule],
  templateUrl: './card-dog.html',
  styleUrl: './card-dog.css',
})
export class CardDog implements OnInit {
  @Input() dog?: RazaResponse;
  @Output() dialog = new EventEmitter<RazaResponse>();

  temperament?: string[] = [];
  charDescription: string = '';

  ngOnInit() {
    this.temperament = this.dog?.dogapi?.temperament?.split(',');

    const description = this.dog?.dogapi?.description;
    if (description !== undefined) {
      if (description.length > 68) {
        this.charDescription = this.dog?.dogapi?.description?.slice(0, 68) + ' ...';
      } else {
        description;
      }
    }
  }

  openDialog() {
    this.dialog.emit(this.dog);
  }
}
