import { InMemoryNotificationRepositoy } from '@test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification';

describe('send notification use case', () => {
  it('should send a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepositoy();

    const sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      category: 'social',
      content: 'Essa é uma notificação',
      recipientId: 'recipient-id',
    });

    expect(inMemoryNotificationRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
