import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class Keys implements PipeTransform{
  transform(value: Object): any{
    let keyValue:any = [];
    for(let key in value){
      keyValue.push({key: key, value: value[key]});
    }
    return keyValue;
  }
}
