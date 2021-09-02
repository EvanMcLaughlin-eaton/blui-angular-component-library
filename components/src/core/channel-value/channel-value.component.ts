import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { requireInput } from '../../utils/utils';

type UnitSpaceType = 'show' | 'hide' | 'auto';
/** [ChannelValue Component](https://pxblue-components.github.io/angular/?path=/info/components-channel-value--readme)
 *
 * Displays a value/unit combination.
 * These are used as part of the HeroComponent but can also be used inline.
 * */
@Component({
    selector: 'pxb-channel-value',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <span class="pxb-channel-value-content" [style.color]="color">
            <span class="pxb-channel-value-icon-wrapper">
                <ng-content></ng-content>
            </span>
            <div *ngIf="units && prefix" class="pxb-channel-value-units pxb-channel-value-units-prefix">{{ units }}</div>
            <div 
                *ngIf="value"
                class="pxb-channel-value-value"
                [class.pxb-channel-value-with-space]="unitSpace === 'auto' || unitSpace === 'show'"
                [class.pxb-channel-value-without-space]="unitSpace === 'hide'"
            >
                {{ value }}
            </div>
            <div *ngIf="units && !prefix" class="pxb-channel-value-units pxb-channel-value-units-suffix">{{ units }}</div>
        </span>
    `,
    styleUrls: ['./channel-value.component.scss'],
    host: {
        class: 'pxb-channel-value',
    },
})
export class ChannelValueComponent implements OnChanges {
    /** If true, shows units before the value
     *
     * @default false
     * */
    @Input() prefix = false;
    /** The text to display for the units (light text) */
    @Input() units: string;
    /** The text to display for the value (bold text)*/
    @Input() value: string | number;
    /** Text color */
    @Input() color: string;
    /** Show a space between the value and units. Can be `show` | `hide` | `auto`
     *
     * `show` - Show a space between the value and units.
     *
     * `hide` - Hide a space between the value and units.
     *
     * `auto` - Shows space except for white list items.
     * 
     * prefixUnitWhitelist: ['$']
     * 
     * suffixUnitWhitelist: ['%', '℉','°F','℃','°C','°']
     * 
     * @default auto;
     * */
     @Input() unitSpace: UnitSpaceType = 'auto';

     prefixUnitWhitelist = ['$'];
     suffixUnitWhitelist = ['%', '℉','°F','℃','°C','°'];

    
    ngOnChanges(): void {
        requireInput<ChannelValueComponent>(['value'], this);
    }

    checkWhiteListUnits(): boolean {
        if(this.prefix) {
            console.log('prefix', this.units);
            console.log('prefix bool', this.prefixUnitWhitelist.includes(this.units));
            return this.prefixUnitWhitelist.includes(this.units);
        } else {
            console.log('suffix', this.units);
            console.log('suffix bool', this.suffixUnitWhitelist.includes(this.units));
            return this.suffixUnitWhitelist.includes(this.units);
        }
    }
}
