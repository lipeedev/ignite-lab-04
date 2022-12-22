import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    notificationId,
  }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationRepositoy.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();
    await this.notificationRepositoy.save(notification);
  }
}
