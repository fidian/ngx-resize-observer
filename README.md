# NgxResizeObserver

Angular 15.x library to monitor changes to elements. Uses ResizeObserver to do the work.

If you would like to simply know when elements are visible, check out [ngx-visibility](https://github.com/fidian/ngx-visibility/).

If you want to be notified when DOM elements change properties, [ngx-mutation-observer](https://github.com/fidian/ngx-mutation-observer/) would be a good pick.


## Demonstration

There's a [live demo](https://codesandbox.io/s/github/fidian/ngx-resize-observer-demo/tree/master/) over at CodeSandbox.io.


## Installation

Install like other Angular libraries. First run a command to download the module.

    npm install ngx-resize-observer

Next, add the module to your project.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';

    // Import the module
    import { NgxResizeObserverModule } from 'ngx-resize-observer';

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [AppComponent, ItemComponent],

        // Include the module.
        imports: [BrowserModule, FormsModule, NgxResizeObserverModule],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule {}

Finally, you leverage the service directly or use some directives for common uses.


## NgxResizeObserverDirective

Emits `ResizeObserverEntry` when a resize is detected for that element.

    <div (onResize)="handleResize($event)"></div>

Only one property is configurable, which is the box model. When not specified, it defaults to "content-box". To change this, use the `resizeBoxModel` directive. The only allowed values are "content-box" and "border-box".

    <div (onResize)="handleResize($event)" resizeBoxModel="border-box"></div>


## License

This project is licensed under an [MIT license](LICENSE.md).
