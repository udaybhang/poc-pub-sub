import { Module } from '@nestjs/common';
import { PubMessageActionController } from './pub-message-action/pub-message-action.controller';
import { PubMessageService } from './pub-message.service';

@Module({
    controllers:[PubMessageActionController],
    providers:[PubMessageService],
    exports:[PubMessageService]
})
export class PubMessageModule {}
