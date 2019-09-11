import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';

import {
    NgxResizeObserverService,
    ResizeObserverEntry
} from './ngx-resize-observer.service';

@Directive({
    selector: '[onResize]'
})
export class NgxResizeObserverDirective
    implements AfterViewInit, OnChanges, OnDestroy {
    @Input() resizeBoxModel: string;
    @Output() onResize = new EventEmitter<ResizeObserverEntry>();
    private observing = false;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly ngxResizeObserverService: NgxResizeObserverService
    ) {}

    ngAfterViewInit() {
        this.observe();
    }

    ngOnChanges(changes) {
        if (this.observing && (changes.resizeBoxModel || changes.onResize)) {
            this.unobserve();
            this.observe();
        }
    }

    ngOnDestroy() {
        this.unobserve();
    }

    private observe() {
        if (!this.observing) {
            this.ngxResizeObserverService.observe(
                this.elementRef.nativeElement,
                resize => this.onResize.emit(resize),
                this.resizeBoxModel
            );
            this.observing = true;
        }
    }

    private unobserve() {
        if (this.observing) {
            this.ngxResizeObserverService.unobserve(this.elementRef.nativeElement);
            this.observing = false;
        }
    }
}
