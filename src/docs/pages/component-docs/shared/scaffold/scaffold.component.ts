import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { ViewportService } from '../../../../services/viewport/viewport.service';

export type TabName = 'examples' | 'api-docs' | 'playground';

@Component({
    selector: 'app-component-doc-scaffold',
    template: `
        <div class="scaffold-container">
            <div class="fixed-tab-group-banner"
                style="height: 50px; background: white; width: 100%; position: sticky; left: 0; z-index: 2"
                [style.top.px]="isSmall() ? 56+1 : 64+1"
            >
            </div>
            <div class="tabs-container" [class.small]="isSmall()">
                <mat-tab-group
                    style="width: 100%"
                    animationDuration="0ms"
                    (selectedTabChange)="userChangeTab($event)"
                    [(selectedIndex)]="currentTabIndex"
                >
                    <mat-tab label="Examples">
                        <div class="examples-tab-content-wrapper">
                            <ng-content select="[examples]"></ng-content>
                        </div>
                    </mat-tab>
                    <mat-tab label="API Docs">
                        <div class="doc-tab-content">
                            <markdown *ngIf="useDefaultDocs" [data]="md"></markdown>
                            <ng-content select="[docs]"></ng-content>
                        </div>
                    </mat-tab>
                    <mat-tab label="Playground"></mat-tab>
                </mat-tab-group>
            </div>
            
            <div class="playground-container" *ngIf="currentTabIndex === 2">
                <div style="width: 100%; display: flex; flex-direction: column;">
                    <div class="playground-live-example-wrapper" style="height: 50%">
                        <ng-content select="[playground]"></ng-content>
                    </div>
                    <div style="height: 50%; overflow: auto; box-sizing: border-box">
                        <ng-content select="[code]"></ng-content>
                    </div>
                </div>
                <div class="props-container">
                    <ng-content select="[knobs]"></ng-content>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./scaffold.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ScaffoldComponent implements OnInit, OnDestroy {
    @Input() useDefaultDocs = true;
    @Input() mdFileName: string;
    @Input() md: string;
    currentTabIndex = 0;

    routeListener: Subscription;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _markdownService: MarkdownService,
        private readonly _viewportService: ViewportService
    ) {}

    ngOnInit(): void {
        if (this.mdFileName) {
            this._markdownService.getSource(`src/assets/md/${this.mdFileName}`).subscribe((data) => {
                this.md = data.replace('images/', 'src/assets/md/images/');
            });
        }
        const tab = this._getTabNameFromUrl();
        this.updateRouteFromTab(tab);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Enhance the first H2 -> H1
        if (changes.md && this.md) {
            this.md = this.md.replace('## ', '# ');
        }
    }

    ngOnDestroy(): void {
        if (this.routeListener) {
            this.routeListener.unsubscribe();
        }
    }

    /** Called when a user clicks a tab. */
    userChangeTab(event: MatTabChangeEvent): void {
        const tabName = this._tabIndexToName(event.index);
        this.updateRouteFromTab(tabName);
    }

    /** Updates the URL to reflect tab name. */
    updateRouteFromTab(tab: TabName): void {
        const routeMinusTab = this._getRouteMinusTab();
        void this._router.navigate([`${routeMinusTab}/${tab}`], {
            skipLocationChange: false,
            replaceUrl: true,
        });
        this.currentTabIndex = this._tabNameToIndex(tab);
    }

    /** Returns angular route, but without the TabName at the end. */
    private _getRouteMinusTab(): string {
        return this._router.url.substr(0, this._router.url.lastIndexOf('/'));
    }

    /** Returns current TabName */
    private _getTabNameFromUrl(): TabName {
        const route = this._router.url;
        const everythingElse = this._getRouteMinusTab();
        return route.replace(everythingElse, '').replace('/', '') as TabName;
    }

    private _tabIndexToName(index: number): TabName {
        return index === 0 ? 'examples' : index === 1 ? 'api-docs' : 'playground';
    }

    private _tabNameToIndex(name: TabName): number {
        return name === 'examples' ? 0 : name === 'api-docs' ? 1 : 2;
    }

    isSmall(): boolean {
        return this._viewportService.isSmall();
    }
}
