import { NgModule } from '@angular/core';
import { TeamPipe } from './team.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TeamPipe
    ],
    exports: [
        CommonModule,
        TeamPipe
    ]
})
export class SharedModule {
}
