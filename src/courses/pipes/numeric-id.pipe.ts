import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NumericIdPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    const id = parseInt(value, 10);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException(`Validation failed: ID (${value}) is not a positive integer.`);
    }

    return id;
  }
}
// TODO : You must add it to each controller for each route

