import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';

@NgModule({
    imports: [AppComponent, BrowserModule, FormsModule],
    bootstrap: [AppComponent],
    providers: [provideZonelessChangeDetection()],
})
export class AppModule {}
