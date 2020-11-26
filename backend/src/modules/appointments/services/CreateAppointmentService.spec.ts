import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123456');
  });

  it('should not be able to create a new appointment at same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123456',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
