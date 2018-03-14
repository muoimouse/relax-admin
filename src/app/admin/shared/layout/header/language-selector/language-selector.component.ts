import { Component, OnInit } from '@angular/core';
import { AppService } from "../../../../../shared/app.service";

@Component({
  selector: 'sa-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: [
    './language-selector.component.css'
  ]
})
export class LanguageSelectorComponent implements OnInit {

  public languages: any = [
    {
      "key": "us",
      "alt": "English",
      "title": "English"
    },
    {
      "key": "jp",
      "alt": "Japan",
      "title": "日本語"
    }
  ];

  public currentLanguage: any;
  private showselectlanguage = false;

  constructor(private app:AppService) {}

  ngOnInit() {
    let curLang = this.app.getConfig('LANG','us');

    this.currentLanguage = this.languages.find((it)=>
    {
      return it.key == curLang;
    });
  }

  setLanguage(language)
  {
    this.showselectlanguage = false;
    this.currentLanguage = language;
    this.app.setConfig('LANG',language.key);
    this.app.curLang = language.key;
  }

  showSelect() {
    this.showselectlanguage = true;
  }

}
