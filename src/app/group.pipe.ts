import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rbGroup'
})
export class GroupPipe implements PipeTransform {

  //transform(value: any, args?: any): any {
  //transform(value:any[], args:string[], additionl):any[] {
  transform(value:any, ...args:string[]):string {
    let text = "(";
    let lasArg = JSON.parse(args[args.length-1]);
    let isOmmit = Object.prototype.toString.call( lasArg ) === '[object Array]';

    for (var i = 0; i < args.length; i++) {
      if(value.hasOwnProperty(args[i]) && value[args[i]] != undefined) {
        if(isOmmit) {
          if(lasArg.indexOf(value[args[i]]) == -1) {
            if (i > 0) text+=" ";
            text+=value[args[i]];
          }
        } else {
          if (i > 0) text+=" ";
          text+=value[args[i]];
        }
      }
    }
    text+=")";
    // reset text just in case there are no properties available
    if(args.length == 0) {
      text = "";
    }
    return text;
  }

}
