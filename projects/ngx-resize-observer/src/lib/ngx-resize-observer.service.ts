import { Injectable, NgZone, OnDestroy } from '@angular/core';

declare const ResizeObserver: ResizeObserverInterface;

export interface ResizeObserverBoxSize {
    blockSize: number; // height if horizontal writing mode, width otherwise
    inlineSize: number; // width if horizontal writing mode, height otherwise
}

export interface ResizeObserverEntry {
    borderBoxSize?: ResizeObserverBoxSize;
    contentBoxSize?: ResizeObserverBoxSize;
    contentRect?: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
    };
    target: Element;
}

export type ResizeObserverCallback = (resizes: ResizeObserverEntry[], observer: ResizeObserverInterface) => void;

export interface ResizeObserverConfig {
    box?: 'content-box' | 'border-box';
}

export interface ResizeObserverInterface {
    new (callback: ResizeObserverCallback);
    observe: (target: Element, config?: ResizeObserverConfig) => void;
    unobserve: (target: Element) => void;
    disconnect: () => void;
}

export type ResizeObserverServiceCallback = (resize: ResizeObserverEntry) => void;

@Injectable()
export class NgxResizeObserverService implements OnDestroy {
    private count = 0;
    private elementMap = new Map<Element, ResizeObserverServiceCallback>();
    private observer: ResizeObserverInterface = null;

    constructor(private readonly ngZone: NgZone) {}

    ngOnDestroy() {
        if (this.observer) {
            this.clearObserver();
        }
    }

    observe(
        element: Element,
        callback: ResizeObserverServiceCallback,
        boxModel: string
    ) {
        if (!this.observer) {
            this.observer = new ResizeObserver(resizes => {
                for (const resize of resizes) {
                    const cb = this.elementMap.get(resize.target);

                    if (cb) {
                        this.ngZone.run(() => {
                            cb(resize);
                        });
                    }
                }
            });
        }

        if (boxModel === 'border-box') {
            this.observer.observe(element, {
                box: 'border-box'
            });
        } else {
            this.observer.observe(element);
        }

        this.count += 1;
        this.elementMap.set(element, callback);
    }

    unobserve(element: Element) {
        const cb = this.elementMap.get(element);

        if (cb) {
            this.observer.unobserve(element);
            this.elementMap.delete(element);
            this.count -= 1;

            if (this.count === 0) {
                this.clearObserver();
            }
        }
    }

    private clearObserver() {
        this.observer.disconnect();
        this.observer = null;
        this.count = 0;
        this.elementMap = new Map<Element, ResizeObserverServiceCallback>();
    }
}
