import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-field',
  templateUrl: './default-field.component.html',
  styleUrls: ['./default-field.component.css']
})
export class DefaultFieldComponent implements OnInit {
  @Input() label: string = "";
  @Input() values: string[] = [];

  constructor() { }

  ngOnInit(): void {}
}
