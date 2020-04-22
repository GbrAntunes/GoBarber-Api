import { uuid } from 'uuidv4'

class Appointment {
    id: string

    provider: string

    date: Date

    // Tipo Appointment mas sem o id, já que será criado dentro do método
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid()
        this.provider = provider
        this.date = date
    }
}

export default Appointment
