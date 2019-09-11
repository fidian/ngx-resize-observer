import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxResizeObserverModule } from '../../../ngx-resize-observer/src/public-api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, FormsModule, NgxResizeObserverModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
