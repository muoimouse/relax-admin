import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationPipe } from './translation/translation.pipe';
import { constant } from './constant';
import { storage } from './localStorageAsCookie';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
    public curUser: any;
    public curLang: string;
    public curParam: any;

    public constant = constant;
    public filesUpload: any = [];

    constructor
    (
        public http: Http,
        private route: ActivatedRoute,
        private router: Router
    ) {
        window.scrollTo(0, 0);
        if (this.getConfig('CURRENT_USER', '')) {
            this.curUser = JSON.parse(this.getConfig('CURRENT_USER', ''));
        }

        this.curLang = this.getConfig('LANG', 'us');
    }

    /* ---------- API { ---------- */
    get(url, data?) {
        if (typeof(data) === 'undefined') {
            data = {};
        }

        data['token'] = this.getConfig('AUTH_TOKEN', '');

        let params = this.convertQueryString(data);
        url += '?' + params;
        $('.loadingRequest').show();
        return this.http.get(this.constant.BASE_API + url).toPromise().then(this.handleSuccess).catch(this.handleError);
    }

    post(url, data, listFileFields:any = []) {
        $('small.help-block').remove();
        $('.has-error').removeClass('has-error');
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let formData:FormData = new FormData();
        formData.append('token', this.getConfig('AUTH_TOKEN', ''));

        //confirm = false
        if ((!data['form_confirm'] || data['form_confirm'] === 'false') && listFileFields) {
            for (var field of listFileFields) {
                if (typeof this.filesUpload[field] !== 'undefined') {
                    for (let i = 0; i < this.filesUpload[field].length; i++) {
                        let file = this.filesUpload[field][i];
                        formData.append(field + "[]", file, file.name);
                    }
                }
                if (typeof this.filesUpload[field] === 'undefined' || !this.filesUpload[field] || (this.filesUpload[field] && !this.filesUpload[field].length)) {
                    formData.append(field, '');
                }
                this.filesUpload[field] = false;
            }
        }
        //confirm = true
        if (data['form_confirm']) {
            for (var field of listFileFields) {
                if (typeof this.filesUpload[field] === 'undefined' || !this.filesUpload[field] || (this.filesUpload[field] && !this.filesUpload[field].length)) {

                    if (typeof data['id'] !== 'undefined' && data['id']) {
                        formData.append(field, 'confirm_file');
                    } else {
                        formData.append(field, '');
                    }
                } else {
                    formData.append(field, 'confirm_file');
                }
            }
        }

        for (let key in data) {
            /* Data transform { */
            if(data[key] === true) data[key] = 1;
            if(data[key] === false) data[key] = 0;
            if(data[key] === null) data[key] = '';

            // Convert array to json obj
            if(Object.prototype.toString.call(data[key]) === '[object Array]' && data[key].length > 0) {
                data[key] = JSON.stringify(data[key]);
            }
            /* Data transform } */
            formData.append(key, data[key]);
        }

        $('.loadingRequest').show();
        let currentService = this;
        return this.http.post(this.constant.BASE_API + url, formData, {headers: headers}).toPromise().then(function(res) {
            if (typeof currentService.filesUpload[field] !== 'undefined') {
                currentService.filesUpload[field] = false;
            }
            return currentService.handleSuccess(res);
        }).catch(this.handleError);
    }

    handleSuccess(res:any) {
        $('.loadingRequest').hide();
        return res;
    }

    handleError(res:any) {
        $('.loadingRequest').hide();
        if (res.status === 400) {
            this.router.navigate(['page/not-found']);
        }
        else if (res.status === 422) {
            // Remove error
            let messageAlert = res.json().message;
            if (!messageAlert) {messageAlert = 'Please check your input data!'}

            if (!$('.alertCustom').length) {
                $('#content').not('.page-login').prepend(`
                    <div class="alert alert-block alertCustom alert-danger">
                        <button class="close" data-dismiss="alert">×</button>${messageAlert}
                    </div>`);
            }
            else {
                $('.alertCustom').removeClass('alert-success').addClass('alert-danger');
                $('.alertCustom').html(messageAlert);
            }
            $('.has-error').removeClass('has-error');
            $('small.help-block').remove();
            $('#error-message').remove();

            // Add error
            $.each(res.json(), function (key, obj) {
                let eleInput = $(`[formControlName=${key}]`);
                if (key === 'error-message') {
                    let trans = new TranslationPipe().transform(obj);
                    $('[role="content"]').prepend(`<div id="error-message" class="alert alert-block alert-danger"><p>${trans}</p></div>`);
                }
                else if (eleInput) {
                    eleInput.closest('div').addClass('has-error');

                    let trans = new TranslationPipe().transform(obj[0]);
                    if (eleInput.parent('.input-group').length === 1) {
                        eleInput.parent().after(`<small class="help-block">${trans}</small>`);
                    }
                    else {
                        eleInput.after(`<small class="help-block">${trans}</small>`);
                    }
                }
            });
        }

        return res;
    }

    /* ---------- API } ---------- */

    /* ---------- Flash { ---------- */
    adminFlashSuccess(message,onPage:boolean = false) {
        if(onPage) {
            // Remove all error
            $('.has-error').removeClass('has-error');
            $('small.help-block').remove();
            $('#error-message').remove();
            $('admin-flash').html('');

            if (!$('.alertCustom').length) {
                $('#content').prepend(`<div class="alert alert-block alertCustom alert-success"><button class="close" data-dismiss="alert">×</button><i class="fa-fw fa fa-check"></i>${message}</div>`);
            }
            else {
                $('.alertCustom').removeClass('alert-danger').addClass('alert-success');
                $('.alertCustom').html(message);
            }
        }
        else {
            this.setConfig('ADMIN-FLASH',JSON.stringify( {
                type : 'alert-success',
                message : message
            }));
        }
    }

    adminFlashError(message,onPage:boolean = false) {
        if(onPage) {
            $('admin-flash').html('');
            if (!$('.alertCustom').length) {
                $('#content').prepend(`<div class="alert alert-block alertCustom alert-danger"><button class="close" data-dismiss="alert">×</button><i class="fa-fw fa fa-check"></i>${message}</div>`);
            }
            else {
                $('.alertCustom').removeClass('alert-success').addClass('alert-danger');
                $('.alertCustom').html(message);
            }
        }
        else {
            this.setConfig('ADMIN-FLASH', JSON.stringify
            ({
                type: 'alert-danger',
                message: message
            }));
        }
    }
    /* ---------- Flash } ---------- */

    /* ---------- Config { ---------- */
    getConfig(key,defaultValue?) {
        if(storage.isSupported()) {
            if (localStorage.getItem(key) !== null) {
                return  localStorage.getItem(key);
            }
            else {
                return defaultValue;
            }
        } else {
            return storage.getItem(key, defaultValue);
        }
    }

    setConfig(key,value) {
        if(storage.isSupported()) {
            localStorage.setItem(key, value);
        }
        else {
            storage.setItem(key,value);
        }
    }

    delConfig(key) {
        if(storage.isSupported()) {
            localStorage.removeItem(key);
        }
        else {
            storage.removeItem(key);
        }
    }
    /* ---------- Config } ---------- */


    arrToList(data, key, value) {
        var result = {};
        for (var index in data) {
            result[data[index][key]] = data[index][value];
        };
        return result;
    }

    convertQueryString(data) {
        var str = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
        }
        return str.join("&");
    }

    trans(str) {
        return new TranslationPipe().transform(str);
    }
}
