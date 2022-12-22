import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications';

describe('get recipient notifications use case', () => {
  it('should get all recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const getRecipientNotificationUseCase =
      new GetRecipientNotificationsUseCase(notificationRepository);

    notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'recipient-id',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id' }),
        expect.objectContaining({ recipientId: 'recipient-id' }),
        expect.objectContaining({ recipientId: 'recipient-id' }),
      ]),
    );
  });
});
