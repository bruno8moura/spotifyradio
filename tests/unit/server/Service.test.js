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

import path from 'path'
import fsPromises from 'fs/promises'

import config from '../../../server/config.js'

const {
    dir: {
        publicDir
    }
} = config

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

    test('should use param "file" within function "getFileInfo"', async () => {
        const expected = 'any_file'
        
        const joinSpy = jest.spyOn(path, 'join')
        jest.spyOn(path, 'extname')
        jest.spyOn( fsPromises, 'access' ).mockReturnValue(true)
        
        const sut = new Service()
        await sut.getFileInfo(expected)

        expect(joinSpy).toHaveBeenCalledWith( publicDir, expected )
    })

    test.only('should throws exception when file path from param "file" doesnt exist', async () => {
        const sut = new Service()        
        const promise = sut.getFileInfo('file_not_exists')
        expect( promise ).rejects.toThrow()
    })

    test.todo('should returns an object with properties type(file type), name(full file path) ')

    test.todo('should use param "file" within function "getFileStream"')
    test.todo('should returns an object with properties type(file type), stream(readable stream) ')
})