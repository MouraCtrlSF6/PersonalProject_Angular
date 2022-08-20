import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.css']
})
export class DefaultInputComponent implements OnInit {
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() name: string = "";
  @Input() label: string = "";

  public currentValue: string = '';
  @Output() value = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitChanges() {
    this.value.emit(this.currentValue);
  }
}
