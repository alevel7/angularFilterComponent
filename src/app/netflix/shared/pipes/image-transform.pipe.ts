import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageTransform'
})
export class ImageTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `https://image.tmdb.org/t/p/w500/${value}`;
  }

}
