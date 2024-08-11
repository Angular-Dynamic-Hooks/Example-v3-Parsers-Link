import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DynamicHooksComponent } from 'ngx-dynamic-hooks';
import { DynamicLinkParser } from '../../components/dynamicRouterLink/dynamicLinkParser';

/**
 * The routing view for home
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [DynamicHooksComponent],
})
export class HomeComponent {
  parsers = [DynamicLinkParser];
  content: string;

  constructor(@Inject(DOCUMENT) document: Document) {
    const protocol = document.location.protocol;
    const hostname = document.location.hostname;
    const port = document.location.port;

    this.content = `
      <p>Many wise and powerful Jedi sat on the High Council in the final days of the Republic, such as
      <a href="${protocol}//${hostname}:${port}/jedi/windu">Mace Windu</a>, 
      <a href="//${hostname}:${port}/jedi/kit_fisto#someAnchor" someClass="testClass">Kit Fisto</a> and 
      <a href="/jedi/yoda?someQueryParam=someValue&anotherQueryParam=anotherValue#andAnAnchor">Yoda</a>.</p>
    `;
  }
}
