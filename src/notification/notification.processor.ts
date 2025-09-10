import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notification-queue')
export class NotificationProcessor extends WorkerHost {
  async process(job: Job<any, any, string>) {
    console.log(`Processing job ${job.name} with data:`, job.data);
    return true;
  }
}