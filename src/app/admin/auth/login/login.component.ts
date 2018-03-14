import { Component, OnInit } from '@angular/core';
import { AppService} from "../../../shared/app.service";
import { Router} from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    constructor
    (
        private app: AppService,
        private router: Router,
        private _fb: FormBuilder
    ) {}

    public form;

    ngOnInit() {
        this.form = this._fb.group(
        {
            username:'',
            password:''
        });
    }

    login() {
        this.app.post('users/login',this.form.value).then(res => {
            if(res.status === 200) {
                let data = res.json();
                this.app.setConfig('AUTH_TOKEN', data.token);
                this.app.setConfig('CURRENT_USER', JSON.stringify(data.profile));
                this.app.curUser = JSON.parse(this.app.getConfig('CURRENT_USER',''));
                this.app.adminFlashSuccess('You are now logged in');
                this.router.navigate(['admin/user']);
            }
        });
    }
}
