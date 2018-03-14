import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'list'
})

export class ListPipe implements PipeTransform {
    transform(value, defaultItem?: string) : any {
        let keys = [];
        keys.push({key: null, value: `--- ${defaultItem} ---`});
        for (let key in value) {
            keys.push({key, value: value[key]});
        }
        return keys;
    }
}
