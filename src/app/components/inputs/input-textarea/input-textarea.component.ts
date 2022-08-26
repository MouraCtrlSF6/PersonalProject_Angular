import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent implements OnInit {

  @Input() label: string = "";
  @Input() placeholder: string = "";

  @Output() value = new EventEmitter();

  public currentValue: string = "";

  public emitChanges(): void {
    this.value.emit(this.currentValue);
  }

  constructor() {}

  ngOnInit(): void {}
}
