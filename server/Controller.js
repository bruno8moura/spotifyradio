import { Service } from './Service.js'

export class Controller {
    constructor() { 
        this.service = new Service()
    }

    async getFileStream(filename) {
        const { stream, type } = await this.service.getFileStream(filename)
        return {
            stream,
            type
        }
    }
}