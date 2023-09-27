import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfigEditorModalComponent } from './general-config-editor-modal.component';

describe('ConfigEditorComponent', () => {
  let component: GeneralConfigEditorModalComponent;
  let fixture: ComponentFixture<GeneralConfigEditorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralConfigEditorModalComponent]
    });
    fixture = TestBed.createComponent(GeneralConfigEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
