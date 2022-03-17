import {
    jest,
    describe,
    test,
    beforeEach,
    expect
} from '@jest/globals'

import fs from 'fs'

import { Service } from '../../../server/Service.js'

describe.only('#Service', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('should use param "filename" within function "createFileStream"', async () => {
        const expected = 'any_filename'
        const sut = new Service()

        jest.spyOn(
            fs,
            'createReadStream'
        ).mockReturnValue()

        sut.createFileStream(expected)
        expect(fs.createReadStream).toHaveBeenCalledWith(expected)
    })

    test.todo('should return a ReadableStream - function "createFileStream"')

    test.todo('should use param "file" within function "getFileInfo"')
    test.todo('should throws exception when file path from param "file" doesnt exist')
    test.todo('should returns an object with properties type(file type), name(full file path) ')

    test.todo('should use param "file" within function "getFileStream"')
    test.todo('should returns an object with properties type(file type), stream(readable stream) ')
})