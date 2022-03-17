import fs from 'fs'
import fsPromises from 'fs/promises'
import config from './config.js'
import path from 'path'

const { dir:{
    publicDir
} } = config

export class Service {
    async createFileStream(filename) {
        return fs.createReadStream(filename)
    }

    async getFileInfo(file) { 
        // home/index.html
        const fullFilePath = path.join(publicDir, file)
        
        // if there isn't a file, throws exception
        await fsPromises.access(fullFilePath)

        const fileType = path.extname(fullFilePath)

        return {
            type: fileType,
            name: fullFilePath
        }
    }

    async getFileStream(file) {
        const {
            name,
            type
          } = await this.getFileInfo(file)

        return {
            stream: await this.createFileStream(name),
            type
        }
    }
}