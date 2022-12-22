import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationRepositoy.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
