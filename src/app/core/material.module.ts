import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatInputModule, MatTableModule, MatIconModule, MatTabsModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatTabsModule,
        MatSnackBarModule
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatTabsModule,
        MatSnackBarModule
    ],
})
export class MaterialModule { }
