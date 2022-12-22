import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const notification = await this.notificationRepositoy.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();
    await this.notificationRepositoy.save(notification);
  }
}
