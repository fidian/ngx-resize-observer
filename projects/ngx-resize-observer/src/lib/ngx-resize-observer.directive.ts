import {
    afterNextRender,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges
} from '@angular/core';

import {
    NgxResizeObserverService,
} from './ngx-resize-observer.service';

@Directive({
    selector: '[onResize]'
})
export class NgxResizeObserverDirective
    implements OnChanges, OnDestroy {
    @Input() resizeBoxModel = '';
    @Output() onResize = new EventEmitter<ResizeObserverEntry>();
    private observing = false;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly ngxResizeObserverService: NgxResizeObserverService
    ) {
        afterNextRender(() => {
            this.observe();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.observing && (changes['resizeBoxModel'] || changes['onResize'])) {
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
