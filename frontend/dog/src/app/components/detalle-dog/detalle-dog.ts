import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RazaResponse } from '../../models/RazaModel';
import { Avatar } from "primeng/avatar";
import { Card } from "primeng/card";
import { Chip } from "primeng/chip";

@Component({
  selector: 'app-detalle-dog',
  imports: [Dialog, ButtonModule, Avatar, Card, Chip],
  templateUrl: './detalle-dog.html',
  styleUrl: './detalle-dog.css',
})
export class DetalleDog {
  @Input() razaResponse?: RazaResponse;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }
}
