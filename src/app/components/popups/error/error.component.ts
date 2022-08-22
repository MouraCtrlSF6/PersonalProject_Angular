import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
  @Input() text: string = "";
  @Input() hide: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
