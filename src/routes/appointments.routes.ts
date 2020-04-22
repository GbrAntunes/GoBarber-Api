import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body

    // Recebe a timestamp em uma string vinda do body
    // Converte em date e coloca a hora no minuto 0 e sg 0
    const parsedDate = startOfHour(parseISO(date))

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

    if (findAppointmentInSameDate) {
        return response
        .status(400)
        .json({ message: 'This appointment is already booked' })
    }

    const appointment = appointmentsRepository.create(provider, parsedDate)

    return response.json(appointment)
})

export default appointmentsRouter;
