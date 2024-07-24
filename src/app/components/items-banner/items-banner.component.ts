import { Component, Input, OnInit } from '@angular/core';
import { Watchable } from './../../models/watchable';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent implements OnInit {
  @Input() items: Watchable[] = [];
  @Input() title: String = '';

  constructor() {}

  ngOnInit(): void {}
}
