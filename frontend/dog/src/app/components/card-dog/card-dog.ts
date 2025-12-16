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
import { Dogapi } from '../../models/RazaModel';

@Component({
  selector: 'app-card-dog',
  imports: [Chip, CardModule, ButtonModule],
  templateUrl: './card-dog.html',
  styleUrl: './card-dog.css',
})
export class CardDog implements OnInit {
  @Input() dog!: Dogapi;
  @Output() dialog = new EventEmitter<Dogapi>();

  temperament?: string[] = [];

  ngOnInit() {
    this.temperament = this.dog.temperament?.split(',');
  }

  openDialog() {
    this.dialog.emit(this.dog);
  }

}
