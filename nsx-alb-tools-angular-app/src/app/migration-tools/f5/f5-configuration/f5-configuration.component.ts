import { Component, OnInit } from '@angular/core';
import * as l10n from './f5-configuration.l10n';
import { ConfigurationTabService } from 'src/app/shared/configuration-tab-response-data/configuration-tab-response-data.service';
import { incompleteVsMigration } from './f5-configuration.types';
import { ClrFormLayout } from '@clr/angular';

const { ENGLISH: dictionary, ...l10nKeys } = l10n;

@Component({
  selector: 'f5-configuration',
  templateUrl: './f5-configuration.component.html',
  styleUrls: ['./f5-configuration.component.less'],
})
export class F5ConfigurationComponent implements OnInit {

  dictionary = dictionary;

  public incompleteMigrationsData: incompleteVsMigration[] = [];

  public readonly verticalLayout = ClrFormLayout.VERTICAL;

  constructor(
    private readonly configurationTabService: ConfigurationTabService,
  ) { }

  /** @override */
  public ngOnInit(): void {
    this.getAllIncompleteVSMigrationsData();
  }

  public refreshIncompleteMigrationsData(): void {
    this.getAllIncompleteVSMigrationsData();
  }

  private getAllIncompleteVSMigrationsData(): void {
    this.configurationTabService.getAllIncompleteVSMigrationsData().subscribe((data)=> {
      this.incompleteMigrationsData = data;
    });
  }
}
