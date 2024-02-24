// modal.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../components/form/form.component';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openFormModal(): void {
    this.dialog.open(FormComponent, {
      width: '400px', // ajusta el ancho según tus necesidades
    });
  }
}
