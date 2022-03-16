import fs from 'fs'
import fsPromises from 'fs/promises'
import config from './config.js'
import { join, extname } from 'path'

const { dir:{
    publicDir
} } = config

export class Service {
    createFileStream(filename) {
        return fs.createReadStream(filename)
    }

    async getFileInfo(file) { 
        // home/index.html
        const fullFilePath = join(publicDir, file)

        // if there isn't a file, throws exception
        await fsPromises.access(fullFilePath)

        const fileType = extname(fullFilePath)

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
            stream: this.createFileStream(name)
        }
    }
}