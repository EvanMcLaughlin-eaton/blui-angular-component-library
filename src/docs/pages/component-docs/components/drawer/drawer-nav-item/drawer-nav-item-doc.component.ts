import { Component } from '@angular/core';
import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { MarkdownService } from 'ngx-markdown';

@Component({
    selector: 'app-drawer-nav-item-doc',
    template: `
        <app-component-doc-scaffold [md]="md">
            <div examples>
                <app-coming-soon></app-coming-soon>
            </div>
            <div playground>
                <app-coming-soon></app-coming-soon>
            </div>
            <div knobs>
                <app-coming-soon></app-coming-soon>
            </div>
        </app-component-doc-scaffold>
    `,
    styleUrls: ['./drawer-nav-item-doc.component.scss'],
})
export class DrawerNavItemDocComponent {
    md: string;

    constructor(
        private readonly _splitService: MarkdownSplitService,
        private readonly _markdownService: MarkdownService
    ) {}

    ngOnInit(): void {
        this._markdownService.getSource(`src/assets/md/Drawer.md`).subscribe((data) => {
            const delimiterTop = '## Drawer Nav Item';
            const delimiterBottom = '## Drawer Footer';
            const subsection = this._splitService.subsection(data, delimiterTop, delimiterBottom);
            this.md = subsection.replace('images/', 'src/assets/md/images/');
        });
    }
}
