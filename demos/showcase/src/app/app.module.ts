import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
//pxblue modules
import { NgProgressIconsModule } from '@pxblue/ng-progress-icons';
import {
    HeroModule,
    ChannelValueModule,
    EmptyStateModule,
    ScoreCardModule,
    InfoListItemModule,
    DrawerModule,
    ListItemTagModule,
    DropdownToolbarModule,
    UserMenuModule,
} from '@pxblue/angular-components';

//material modules
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DrawerComponent } from './drawer/drawer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [AppComponent, DrawerComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        HttpClientModule,
        MatToolbarModule,
        MatMenuModule,
        //pxblue
        UserMenuModule,
        NgProgressIconsModule,
        ChannelValueModule,
        EmptyStateModule,
        ScoreCardModule,
        HeroModule,
        InfoListItemModule,
        DrawerModule,
        ListItemTagModule,
        DropdownToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
