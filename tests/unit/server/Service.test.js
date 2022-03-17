import {
    jest,
    describe,
    test,
    beforeEach,
    expect
} from '@jest/globals'

import TestUtil from '../_util/TestUtil.js'

import fs from 'fs'

import { Service } from '../../../server/Service.js'

import { Readable } from 'stream'

describe('#Service', () => {
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

    test('should return a Readable object', async () => {
        const expected = TestUtil.generateReadableStream(['data'])
        const sut = new Service()

        jest.spyOn(
            fs,
            'createReadStream'
        ).mockReturnValue(expected)

        const result = sut.createFileStream('any_filename')
        expect(result).toBeInstanceOf(Readable)
    })

    test.todo('should use param "file" within function "getFileInfo"')
    test.todo('should throws exception when file path from param "file" doesnt exist')
    test.todo('should returns an object with properties type(file type), name(full file path) ')

    test.todo('should use param "file" within function "getFileStream"')
    test.todo('should returns an object with properties type(file type), stream(readable stream) ')
})