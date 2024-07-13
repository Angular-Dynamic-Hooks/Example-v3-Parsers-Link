import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Renders a link with Angular's RouterLink-directive
 */
@Component({
  selector: 'app-dynamiclink',
  templateUrl: './dynamicLink.component.html',
  styleUrls: ['./dynamicLink.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class DynamicLinkComponent {
  @Input() link: string = '';
  @Input() queryParams: {[key: string]: any} = {};
  @Input() anchorFragment: string = '';

  constructor() {
  }

  ngOnInit() {
    console.log(this.link, this.queryParams, this.anchorFragment);
  }
}
