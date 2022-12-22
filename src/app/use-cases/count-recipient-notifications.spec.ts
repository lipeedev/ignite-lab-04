import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications';

describe('count recipient notifications use case', () => {
  it('should count all recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepositoy();
    const countRecipientNotificationUseCase =
      new CountRecipientNotificationsUseCase(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recipientId: 'fake-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'fake-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'diff-fake-recipient-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'diff-fake-recipient-id-2' }),
    );

    const { count } = await countRecipientNotificationUseCase.execute({
      recipientId: 'fake-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
