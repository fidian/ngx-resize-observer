import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    signal,
} from '@angular/core';
import { NgxResizeObserverModule } from '../../../ngx-resize-observer/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [NgxResizeObserverModule],
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild('resizingElement', { static: false })
    resizingElement: ElementRef | null = null;
    heightDesired = signal(100);
    heightReported = signal<number | null>(null);
    triggeredBy = signal('constructor');
    widthDesired = signal(100);
    widthReported = signal<number | null>(null);

    ngOnInit() {
        setInterval(() => {
            this.heightDesired.set(Math.floor(80 * Math.random()) + 20);
            this.widthDesired.set(Math.floor(80 * Math.random()) + 20);
        }, 5000);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateSize('afterViewInit');
        });
    }

    handleResize(resize: ResizeObserverEntry) {
        console.log('onResize', resize);
        this.updateSize('onResize');
    }

    private updateSize(triggeredBy: string) {
        if (!this.resizingElement) {
            return;
        }

        this.heightReported.set(
            this.resizingElement.nativeElement.clientHeight,
        );
        this.widthReported.set(this.resizingElement.nativeElement.clientWidth);
        console.log(this.heightReported(), this.widthReported());
        this.triggeredBy.set(triggeredBy);
    }
}
