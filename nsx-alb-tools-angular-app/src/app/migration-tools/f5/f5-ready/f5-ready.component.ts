import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClrFormLayout } from '@clr/angular';
import * as l10n from './f5-ready.l10n';
import { HttpService } from 'src/app/shared/http/http.service';
import { ClrWizard } from "@clr/angular";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


const { ENGLISH: dictionary, ...l10nKeys } = l10n;

@Component({
  selector: 'f5-ready',
  templateUrl: './f5-ready.html',
  styleUrls: ['./f5-ready.less'],
})
export class F5ReadyComponent implements OnInit {

  dictionary = dictionary;
  f5LoginError = '';
  @ViewChild("wizard") wizard: ClrWizard;

  loadingFlag: boolean;
  data;
  vsStatusGridData;
  destinationCtrlForm: FormGroup;
  mapDestinationForm: FormGroup;
  playbookForm: FormGroup;

  f5DestinationData: any;
  selected;

  open = false;
  playbookModalOpened = false;

  constructor(
      private http: HttpService,
      private router: Router,
  ) {
    this.destinationCtrlForm = new FormGroup({
      ipAddr: new FormControl('', [Validators.required,
          Validators.pattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.mapDestinationForm = new FormGroup({
      tenant: new FormControl('', Validators.required),
      cloud: new FormControl('', Validators.required),
      vrf: new FormControl('', Validators.required),
      seGroup: new FormControl('', Validators.required),
    });
    this.playbookForm = new FormGroup({
      playbookName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.open = true;
    this.http.get('f5ready').subscribe((data)=> {
      this.data = data;
      this.vsStatusGridData = data.vsStatusData;
    });
    this.http.get('f5destination').subscribe((data)=> {
      this.f5DestinationData = data;
      this.mapDestinationForm.patchValue({
        tenant: this.f5DestinationData.tenant[0],
        cloud: this.f5DestinationData.cloud[0],
        vrf: this.f5DestinationData.vrf[0],
        seGroup: this.f5DestinationData.seGroup[0],
      });
    });
  }

  doCancel(): void {
    this.open = false;
  }

  doFinish(): void {
    this.wizard.close();
  }

  editMappingDetails(): void {
    this.setCurrentModalValues();
    this.open = true;
    this.wizard.forceNext();
  }

  editDestDetails(): void {
    this.setCurrentModalValues();
    this.open = true;
  }

  setCurrentModalValues(): void {
    this.mapDestinationForm.patchValue({
      tenant: this.data?.mapping?.tenant,
      cloud: this.data?.mapping?.cloud,
      vrf: this.data?.mapping?.vrf,
      seGroup: this.data?.mapping?.seGroup,
    });
    this.destinationCtrlForm.patchValue({
      ipAddr: this.data?.destinationController?.ipAddr,
      username: this.data?.destinationController?.username,
      password: this.data?.destinationController?.password,
    });
  }

  pageCustomNext(): void {
    this.loadingFlag = true;
    this.http.post('f5login', this.destinationCtrlForm.value).subscribe((data)=> {
        setTimeout(()=> {
            this.loadingFlag = false;
            this.wizard.forceNext();
            // this.open = false;
        }, 1000)
    }, (error) => {
        this.loadingFlag = false;
        this.f5LoginError = error.error.message;
    });
  }

}
