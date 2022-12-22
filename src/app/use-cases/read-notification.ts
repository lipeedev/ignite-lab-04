import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification = await this.notificationRepositoy.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();
    await this.notificationRepositoy.save(notification);
  }
}
