import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPipe } from "./list.pipe";
import { TranslationPipe } from "./translation/translation.pipe";
import { UploadComponent } from "./upload/upload.component";
import { PaginatorComponent } from './paginator/paginator.component';
import { DatexPipe } from './datex.pipe';
import { FileBrowserComponent } from "./file-browser/file-browser.component";
import { InputBrowserComponent } from "./input-browser/input-browser.component";

@NgModule({
    imports: [
        CommonModule
    ],
    exports : [ListPipe,TranslationPipe, UploadComponent, PaginatorComponent, DatexPipe, FileBrowserComponent,InputBrowserComponent],
    declarations: [ListPipe,TranslationPipe, UploadComponent, PaginatorComponent, DatexPipe, FileBrowserComponent,InputBrowserComponent]
})
export class SharedModule { }
