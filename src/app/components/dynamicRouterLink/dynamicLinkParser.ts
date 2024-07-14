import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HookParser, HookValue, HookComponentData, HookBindings } from 'ngx-dynamic-hooks';
import { DynamicLinkComponent } from './dynamicLink.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLinkParser implements HookParser {
    base;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.base = `${this.document.location.protocol}//${this.document.location.hostname}`;
    }

    public findHookElements(contentElement: HTMLElement, context: any): any[] {
        // First get all link elements
        return Array.from(contentElement.querySelectorAll('a[href]'))
        // Then filter them so that only those with own hostname remain
        .filter(linkElement => {
            const url = new URL(linkElement.getAttribute('href')!, this.base);
            return url.hostname === this.document.location.hostname;
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
                path: url.pathname,
                queryParams: Object.fromEntries(url.searchParams.entries()),
                fragment: url.hash.replace('#', '')
            }
        };
    }
}
