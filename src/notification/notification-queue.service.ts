import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationQueueService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('notification-queue', {
      connection: { host: 'localhost', port: 6379 },
    });
  }

  async addJob(data: any) {
    await this.queue.add('send-notification', data, {
      attempts: 3, // retry 3 times if fails
    });
  }
}