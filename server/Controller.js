import { Service } from './Service.js'

export class Controller {
    constructor() { 
        this.service = new Service()
    }

    async getFileStream(filename) {        
        return this.service.getFileStream(filename)
    }
}