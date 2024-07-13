import { Component } from '@angular/core';
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
  protocol = window.location.protocol;
  hostname = window.location.hostname;
  port = window.location.port;
  
  parsers = [DynamicLinkParser];
  content = `
    <p>Many wise and powerful Jedi sat on the High Council in the final days of the Republic, such as <a href="${this.protocol}//${this.hostname}:${this.port}/jedi/windu">Mace Windu</a>, 
    <a href="//${this.hostname}:${this.port}/jedi/kit_fisto#someAnchor" someClass="testClass">Kit Fisto</a> and 
    <a href="/jedi/yoda?someQueryParam=someValue&anotherQueryParam=anotherValue#andAnAnchor">Yoda</a>.</p>
  `;
}
