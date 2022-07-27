import { Component } from '@angular/core';
import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { MarkdownService } from 'ngx-markdown';
import { BASIC } from './examples/basic.component';
import { WITH_CUSTOM_CONTENT } from './examples/with-custom-content.component';
import { WITH_SUBTITLE } from './examples/with-subtitle.component';
import { WITH_ICON } from './examples/with-icon.component';

@Component({
    selector: 'app-drawer-header-doc',
    template: `
        <app-component-doc-scaffold [md]="md">
            <div examples class="app-example">
                <div class="example-section">
                    <div class="example-heading">Basic Drawer Header</div>
                    <div class="example-description">
                        A <code>&lt;blui-drawer-header&gt;</code> appears at the top of a
                        <code>&lt;blui-drawer&gt;</code> can be used to provide context to an application through a
                        <code>title</code> input or a branding image.
                    </div>
                    <div class="example-demo-wrapper">
                        <app-basic-drawer-header-demo></app-basic-drawer-header-demo>
                    </div>
                    <app-example-code [snippet]="BASIC"></app-example-code>
                    <div class="example-actions">
                        <app-copy-code-button [code]="BASIC"></app-copy-code-button>
                    </div>
                </div>
            </div>
            <div examples class="app-example">
                <div class="example-section">
                    <div class="example-heading">Drawer Header with Subtitle</div>
                    <div class="example-description">
                        A <code>&lt;blui-drawer-header&gt;</code> accepts a <code>title</code> and
                        <code>subtitle</code> input.
                    </div>
                    <div class="example-demo-wrapper">
                        <app-with-subtitle-drawer-header-demo></app-with-subtitle-drawer-header-demo>
                    </div>
                    <app-example-code [snippet]="WITH_SUBTITLE"></app-example-code>
                    <div class="example-actions">
                        <app-copy-code-button [code]="WITH_SUBTITLE"></app-copy-code-button>
                    </div>
                </div>
            </div>
            <div examples class="app-example">
                <div class="example-section">
                    <div class="example-heading">Drawer Header with Icon</div>
                    <div class="example-description">
                        A <code>&lt;blui-drawer-header&gt;</code> accepts a <code>blui-icon</code> content child which
                        can be used to manage the <code>&lt;blui-drawer&gt;</code> opened state.
                    </div>
                    <div class="example-demo-wrapper">
                        <app-with-icon-drawer-header-demo></app-with-icon-drawer-header-demo>
                    </div>
                    <app-example-code [snippet]="WITH_ICON"></app-example-code>
                    <div class="example-actions">
                        <app-copy-code-button [code]="WITH_ICON"></app-copy-code-button>
                    </div>
                </div>
            </div>
            <div examples class="app-example">
                <div class="example-section">
                    <div class="example-heading">Drawer Header with Custom Content</div>
                    <div class="example-description">
                        Custom header content can be also be passed as a <code>blui-title-content</code> child.
                    </div>
                    <div class="example-demo-wrapper">
                        <app-with-custom-content-drawer-header-demo></app-with-custom-content-drawer-header-demo>
                    </div>
                    <app-example-code [snippet]="WITH_CUSTOM_CONTENT"></app-example-code>
                    <div class="example-actions">
                        <app-copy-code-button [code]="WITH_CUSTOM_CONTENT"></app-copy-code-button>
                    </div>
                </div>
            </div>
            <div playground></div>
        </app-component-doc-scaffold>
    `,
    styleUrls: ['./drawer-header-doc.component.scss'],
})
export class DrawerHeaderDocComponent {
    md: string;
    BASIC = BASIC;
    WITH_SUBTITLE = WITH_SUBTITLE;
    WITH_ICON = WITH_ICON;
    WITH_CUSTOM_CONTENT = WITH_CUSTOM_CONTENT;

    constructor(
        private readonly _splitService: MarkdownSplitService,
        private readonly _markdownService: MarkdownService
    ) {}

    ngOnInit(): void {
        this._markdownService.getSource(`src/assets/md/Drawer.md`).subscribe((data) => {
            const delimiterTop = '## Drawer Header';
            const delimiterBottom = '## Drawer Subheader';
            const subsection = this._splitService.subsection(data, delimiterTop, delimiterBottom);
            this.md = subsection.replace('images/', 'src/assets/md/images/');
        });
    }
}
