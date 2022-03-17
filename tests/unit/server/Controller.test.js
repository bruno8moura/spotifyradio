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
    test.todo('should return objects "stream" and "types"')
})