import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationQueueService } from './notification-queue.service';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost', // or Redis container host
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  providers: [NotificationQueueService, NotificationProcessor],
  exports: [NotificationQueueService],
})
export class NotificationModule {}