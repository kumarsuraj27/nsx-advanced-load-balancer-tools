import { Component, OnInit } from '@angular/core';
import * as l10n from './f5-configuration.l10n';
import { ConfigurationTabService } from 'src/app/shared/configuration-tab-response-data/configuration-tab-response-data.service';

const { ENGLISH: dictionary, ...l10nKeys } = l10n;

@Component({
  selector: 'f5-configuration',
  templateUrl: './f5-configuration.html',
})
export class F5ConfigurationComponent implements OnInit {

  dictionary = dictionary;

  public isOpenVsConfigEditorModal = false;

  public vsConfig: any;

  constructor(
    private readonly configurationTabService: ConfigurationTabService,
  ) { }

  /** @override */
  public async ngOnInit(): Promise<void> {
    this.vsConfig = await this.configurationTabService.getAllIncompleteVSMigrationData();
  }

  public refreshInIncompleteVSData(): void {

  }

  public openVsConfigEditorModal(): void {
    this.isOpenVsConfigEditorModal = true;
  }

  public closeVsConfigEditorModal(): void {
    this.isOpenVsConfigEditorModal = false;
  }

}
