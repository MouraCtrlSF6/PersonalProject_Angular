import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})

export class DefaultButtonComponent implements OnInit {
  @Input() type: string = "";

  @Output() onClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {}

  emitChanges() {
    this.onClick.emit();
  }
}
