import { Component, Input, OnChanges } from '@angular/core';
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
export class CardDog implements OnChanges {
  @Input() dog!: Dogapi;
  temperament?: string[] = [];

  ngOnChanges() {
    this.temperament = this.dog?.temperament?.split(',') ?? [];
  }
}
