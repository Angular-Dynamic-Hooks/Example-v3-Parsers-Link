import { Injectable } from '@angular/core';
import { HookParser, HookValue, HookComponentData, HookBindings } from 'ngx-dynamic-hooks';
import { DynamicLinkComponent } from './dynamicLink.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLinkParser implements HookParser {
    base = `${window.location.protocol}//${window.location.hostname}`;

    public findHookElements(contentElement: HTMLElement, context: any): any[] {
        // First get all link elements
        return Array.from(contentElement.querySelectorAll('a[href]'))
        // Then filter them so that only those with own hostname remain
        .filter(linkElement => {
            const url = new URL(linkElement.getAttribute('href')!, this.base);
            return url.hostname === window.location.hostname;
        }
        );
    }

    public loadComponent(hookId: number, hookValue: HookValue, context: any, childNodes: Element[]): HookComponentData {
        return { component: DynamicLinkComponent };
    }

    public getBindings(hookId: number, hookValue: HookValue, context: any): HookBindings {
        const url = new URL(hookValue.elementSnapshot.getAttribute('href')!, this.base);

        // Extract what we need from the URL object and pass it along to DynamicLinkComponent
        return {
            inputs: {
                routerLink: url.pathname,
                queryParams: Object.fromEntries(url.searchParams.entries()),
                fragment: url.hash.replace('#', '')
            }
        };
    }
}
