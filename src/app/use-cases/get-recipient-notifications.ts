import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationRepositoy: NotificationRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const notifications =
      await this.notificationRepositoy.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
