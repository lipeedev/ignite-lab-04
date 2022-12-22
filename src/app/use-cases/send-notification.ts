import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

interface SendNotificationRequest {
  content: string;
  category: string;
  recipientId: string;
}

type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    category,
    content,
    recipientId,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    this.notificationRepositoy.create(notification);

    return { notification };
  }
}
