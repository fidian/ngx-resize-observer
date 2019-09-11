import { NgModule } from '@angular/core';

import { NgxResizeObserverDirective } from './ngx-resize-observer.directive';
import { NgxResizeObserverService } from './ngx-resize-observer.service';

@NgModule({
    declarations: [NgxResizeObserverDirective],
    exports: [NgxResizeObserverDirective],
    providers: [NgxResizeObserverService]
})
export class NgxResizeObserverModule {}
