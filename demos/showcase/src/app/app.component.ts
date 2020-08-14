import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as PXBColors from '@pxblue/colors';
import { ViewportService } from './services/viewport.service';
import { DrawerLayoutVariantType } from '@pxblue/angular-components';
import { StateService } from './services/state.service';

const iconSet = require('@pxblue/icons-svg/icons.svg');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    isDarkMode = false;
    isRtl = false;
    colors: Record<string, any>;
    variant: DrawerLayoutVariantType = 'persistent';
    dropdownToolbarSubtitle = 'Language';

    userMenuOpen = false;
    menuGroups = [
        {
            items: [
                {
                    title: 'Account Settings',
                    icon: 'settings',
                },
                {
                    title: 'Log Out',
                    icon: 'logout',
                },
            ],
        },
        {
            title: 'Contact Us',
            items: [
                {
                    title: 'eatonhelp@eaton.com',
                    icon: 'send',
                },
                {
                    title: '1-866-905-9988',
                    icon: 'mail',
                },
            ],
        },
    ];
    constructor(
        private readonly _stateService: StateService,
        private readonly _matIconRegistry: MatIconRegistry,
        private readonly _domSanitizer: DomSanitizer,
        private readonly _viewportService: ViewportService
    ) {
        this.colors = PXBColors;
        this._matIconRegistry.addSvgIconSetInNamespace(
            'px-icons',
            this._domSanitizer.bypassSecurityTrustResourceUrl(iconSet)
        );
    }

    test(): void {
        // eslint-disable-next-line no-alert
        alert('Hero component');
    }

    isMobile(): boolean {
        return this._viewportService.isSmall();
    }

    getVariant(): DrawerLayoutVariantType {
        if (this.variant === 'persistent' && this._viewportService.isSmall()) {
            this._stateService.setDrawerOpen(false);
        } else if (this.variant === 'temporary' && !this._viewportService.isSmall()) {
            this._stateService.setDrawerOpen(true);
        }

        this.variant = this._viewportService.isSmall() ? 'temporary' : 'persistent';
        return this.variant;
    }

    closeDrawer(): void {
        this._stateService.setDrawerOpen(false);
    }

    openDrawer(): void {
        this._stateService.setDrawerOpen(true);
    }

    updateDropdownToolbarSubtitle(string: string): void {
        this.dropdownToolbarSubtitle = string;
    }

    toggleTheme(): void {
        const body = document.querySelector('body') as HTMLElement;
        if (this.isDarkMode) {
            body.classList.remove('pxb-blue-dark');
            body.classList.add('pxb-blue');
        } else {
            body.classList.remove('pxb-blue');
            body.classList.add('pxb-blue-dark');
        }
        this.isDarkMode = !this.isDarkMode;
    }

    toggleDirectionality(): void {
        this.isRtl = !this.isRtl;
    }
}
