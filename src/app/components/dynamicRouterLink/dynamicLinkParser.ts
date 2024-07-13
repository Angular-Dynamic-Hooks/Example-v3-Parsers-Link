import { Injectable } from '@angular/core';
import { HookParser, HookPosition, HookValue, HookComponentData, HookBindings, HookFinder } from 'ngx-dynamic-hooks';
import { DynamicLinkComponent } from './dynamicLink.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLinkParser implements HookParser {
    linkOpeningTagRegex;
    linkClosingTagRegex;
    hrefAttrRegex;

    constructor(private hookFinder: HookFinder) {
        // Lets assemble a regex that finds the opening <a>-tags for internal links
        const domainName = this.escapeRegExp(window.location.hostname.replace('www.', '')); // <-- This is our website name
        const internalUrl = '(?:(?:https:)?\\/\\/(?:www\\.)?' + domainName + '|(?!(?:https:)?\\/\\/))([^\\"]*?)';
        const hrefAttr = '\\s+href\=\\"' + internalUrl + '\\"';
        const anyOtherAttr = '\\s+[a-zA-Z]+\\=\\"[^\\"]*?\\"';
        const linkOpeningTag = '\\<a(?:' + anyOtherAttr + ')*?' + hrefAttr + '(?:' + anyOtherAttr + ')*?\\>';

        // Transform into proper regex objects and save for later
        this.linkOpeningTagRegex = new RegExp(linkOpeningTag, 'gim');
        this.linkClosingTagRegex = new RegExp('<\\/a>',  'gim');
        this.hrefAttrRegex = new RegExp(hrefAttr, 'im');
    }

    public findHooks(content: string, context: any): Array<HookPosition> {
        // With the regexes we prepared, we can simply use findEnclosingHooks() to retrieve
        // the HookPositions of all internal <a>-elements from the content string
        return this.hookFinder.findEnclosingHooks(content, this.linkOpeningTagRegex, this.linkClosingTagRegex);
    }

    public loadComponent(hookId: number, hookValue: HookValue, context: any, childNodes: Array<Element>): HookComponentData {
        // Simply return the component class here
        return {
            component: DynamicLinkComponent
        };
    }

    public getBindings(hookId: number, hookValue: HookValue, context: any): HookBindings {
        // We can reuse the hrefAttrRegex here as its first capture group is the relative part of the url, 
        // e.g. '/jedi/windu' from 'https://www.mysite.com/jedi/windu', which is what we need
        const hrefAttrMatch = hookValue.openingTag!.match(this.hrefAttrRegex);
        let relativeLink = hrefAttrMatch![1];

        // The relative part of the link may still contain the query string and the 
        // anchor fragment, so we need to split it up accordingly
        const anchorFragmentSplit = relativeLink.split('#');
        relativeLink = anchorFragmentSplit[0];
        const anchorFragment = anchorFragmentSplit.length > 1 ? anchorFragmentSplit[1] : null;

        const queryParamsSplit = relativeLink.split('?');
        relativeLink = queryParamsSplit[0];
        const queryParams = queryParamsSplit.length > 1 ? this.parseQueryString(queryParamsSplit[1]) : {};

        // Give all of these to our DynamicRouterLinkComponent as inputs and we're done!
        return {
            inputs: {
                link: relativeLink,
                queryParams: queryParams,
                anchorFragment: anchorFragment
            }
        };
    }

    /**
     * A helper function that safely escapes the special regex chars of any string so it
     * can be used literally in a Regex.
     * Approach by coolaj86 & Darren Cook @ https://stackoverflow.com/a/6969486/3099523
     *
     * @param string - The string to escape
     */
    private escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * A helper function that transforms a query string into a QueryParams object
     * Approach by Wolfgang Kuehn @ https://stackoverflow.com/a/8649003/3099523
     *
     * @param queryParamString - The queryString to parse
     */
    private parseQueryString(queryParamString: string): {[key: string]: any} {
        return JSON.parse('{"' + 
            decodeURI(queryParamString)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + 
        '"}');
    }
}
