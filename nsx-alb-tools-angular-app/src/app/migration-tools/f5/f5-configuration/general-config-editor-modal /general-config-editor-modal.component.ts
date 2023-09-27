import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'general-config-editor-modal',
  templateUrl: './general-config-editor-modal.component.html',
  styleUrls: ['./general-config-editor-modal.component.less']
})
export class GeneralConfigEditorModalComponent {

  public isOpen = true;

  @Input()
  public vsName = "";

  @Input()
  public config: any

  public isConfigEditorValid = true;

  @Output()
  public onCloseGeneralConfigEditorModal = new EventEmitter<boolean>();

  constructor(
  ) {}

  public closeModal(saveConfiguration: boolean): void {
    this.isOpen = false;

    this.onCloseGeneralConfigEditorModal.emit(saveConfiguration);
  }

  public handleConfigEditorValidationChange(isConfigEditorValid: boolean) {
    this.isConfigEditorValid = isConfigEditorValid;
  }
}
