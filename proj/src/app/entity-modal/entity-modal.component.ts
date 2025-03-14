import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entity-modal',
  templateUrl: './entity-modal.component.html',
  styleUrls: ['./entity-modal.component.css']
})
export class EntityModalComponent {
  @Input() entity: any;  // Accepts admin, user, or role data
  @Input() entityType: string = ''; // Defines entity type
  @Output() close = new EventEmitter<void>(); // Emits event to close modal
}
