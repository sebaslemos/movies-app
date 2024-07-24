import { IMAGES_SIZES } from './../../constants/images-size';
import { Component, Input, OnInit } from '@angular/core';
import { Watchable } from './../../models/watchable';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Watchable | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor() {}

  ngOnInit(): void {}
}
