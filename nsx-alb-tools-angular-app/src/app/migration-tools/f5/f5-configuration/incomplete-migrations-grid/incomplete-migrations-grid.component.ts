import { Component, Input } from '@angular/core';
import { incompleteVsMigration } from '../f5-configuration.types';

@Component({
  selector: 'incomplete-migrations-grid',
  templateUrl: './incomplete-migrations-grid.component.html',
  styleUrls: ['./incomplete-migrations-grid.component.less']
})
export class IncompleteMigrationsGridComponent {
  @Input()
  public incompleteMigrationsData: incompleteVsMigration[] = [];

  public isOpenVsConfigEditorModal = false;

  public selectedMigrationForEditing: incompleteVsMigration;

  constructor() { }

  public handleOpenVsConfigEditorModal(incompleteVsMigration: incompleteVsMigration): void {
    this.selectedMigrationForEditing = incompleteVsMigration;
    this.isOpenVsConfigEditorModal = true;
  }

  public handleCloseVsConfigEditorModal(): void {
    this.isOpenVsConfigEditorModal = false;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
