import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'vs-config-editor-modal',
  templateUrl: './vs-config-editor-modal.component.html',
  styleUrls: ['./vs-config-editor-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VsConfigEditorModalComponent implements OnInit {

  public isOpen = true;

  public isOpenChildConfigEditorModal = false;

  public isVsConfigEditorValid = true;

  public childConfigEditorConfig: any;

  @Input()
  public vsConfig: any;

  @Output()
  public onCloseVsConfigEditorModal = new EventEmitter<void>();

  constructor(
  ) { }

  /** @override */
  public async ngOnInit(): Promise<void> {
  }

  public handleCloseChildConfigEditorModal(saveConfiguration: boolean) {
    this.isOpenChildConfigEditorModal = false;

    if (saveConfiguration) {
      // If saveConfiguration then send request to server and update the flagged object for that VS

      this.vsConfig.flaggedObjects = this.vsConfig.flaggedObjects.filter((element: any) => {
        return element.objectName !== this.childConfigEditorConfig.objectName;
      });
    }

    this.setChildConfigEditorConfig(undefined);
  }

  public handleVsConfigEditorValidationChange(isConfigEditorValid: boolean) {
    this.isVsConfigEditorValid = isConfigEditorValid;
  }

  public openChildConfigEditorModal(flaggedConfig: any): void {
    this.isOpenChildConfigEditorModal = true;

    this.setChildConfigEditorConfig(flaggedConfig);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public setChildConfigEditorConfig(config: any): void{
    this.childConfigEditorConfig = config;
  }

  public closeModal(): void {
    this.isOpen = false;

    this.onCloseVsConfigEditorModal.emit();
  }
}
