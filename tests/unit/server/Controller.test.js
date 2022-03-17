import { 
    jest, 
    expect, 
    describe, 
    test, 
    beforeEach,
} from '@jest/globals'
import { Controller } from '../../../server/Controller'
import { Service } from '../../../server/Service'
import TestUtil from '../_util/TestUtil'

import config from '../../../server/config.js'

const {
    constants: {
        CONTENT_TYPE
    }
} = config
describe.only('#Controller', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('should call getFileStream function', async () => {
        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: TestUtil.generateReadableStream()
        })

        await new Controller().getFileStream('any file')

        expect(Service.prototype.getFileStream).toHaveBeenCalled()
    })
    test('should call "service.getFileStream" function with para "filename"', async () => {
        const expected = 'any file'
        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: TestUtil.generateReadableStream()
        })

        await new Controller().getFileStream(expected)

        expect(Service.prototype.getFileStream).toHaveBeenCalled()
        expect(Service.prototype.getFileStream).toHaveBeenCalledWith(expected)
    })
    test('should return objects "stream" and "type"', async () => {
        const anyContentType = '.html'
        const expected = 'any file'
        
        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: TestUtil.generateReadableStream(),
            type: CONTENT_TYPE[anyContentType]
        })

        const result = await new Controller().getFileStream(expected)

        expect(result).toBeDefined()
        expect(result).toHaveProperty('stream')
        expect(result).toHaveProperty('type')
    })
})