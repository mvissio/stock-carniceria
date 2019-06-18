import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() enabledCloseButton = false;
  @Output() clickClose = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.clickClose.emit();
  }
}
