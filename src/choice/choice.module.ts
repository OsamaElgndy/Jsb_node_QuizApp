import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';

@Module({
  providers: [ChoiceService]
})
export class ChoiceModule {}
