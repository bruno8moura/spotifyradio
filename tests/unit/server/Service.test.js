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

        await sut.createFileStream(expected)
        expect(fs.createReadStream).toHaveBeenCalledWith(expected)
    })

    test('should return a Readable object', async () => {
        const expected = TestUtil.generateReadableStream(['data'])
        const sut = new Service()

        jest.spyOn(
            fs,
            'createReadStream'
        ).mockReturnValue(expected)

        const result = await sut.createFileStream('any_filename')
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

    test('should throws exception when file path from param "file" doesnt exist', async () => {
        const sut = new Service()    
        const promise = sut.getFileInfo('file_not_exists')
        expect( promise ).rejects.toThrow()
    })

    test('should returns an object with properties type(file type), name(full file path)', async () => {
        const expectedFileType = '.ext'
        const file = 'file'.concat(expectedFileType)
        const expectedFileFullPath = publicDir.concat('/').concat(file)

        jest.spyOn( fsPromises, 'access' ).mockReturnValue(true)
        
        const sut = new Service()
        const result = await sut.getFileInfo(file)

        expect(result).toHaveProperty('name', expectedFileFullPath)
        expect(result).toHaveProperty('type', expectedFileType)
    })

    test('should use param "file" within function "getFileStream"', async () => {
        const stream = TestUtil.generateReadableStream(['data'])
        const file = 'file.ext'

        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileInfo.name
        ).mockResolvedValue({ name: 'file', type: '.ext'})

        jest.spyOn(
            Service.prototype,
            Service.prototype.createFileStream.name
        ).mockResolvedValue({ stream, type: '.ext'})

        const sut = new Service()
        const result = await sut.getFileStream(file)

        expect(Service.prototype.getFileInfo).toHaveBeenCalledWith(file)
    })

    test('should returns an object with properties type(file type), stream(readable stream)', async () => {
        const stream = TestUtil.generateReadableStream(['data'])
        const fileName = 'file'
        const fileType = '.ext'

        const expectedFileInfo = { name: fileName, type: fileType }

        const file = fileName.concat(fileType)

        const expectedResult = {
            stream,
            type: fileType
        }

        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileInfo.name
        ).mockResolvedValue(expectedFileInfo)

        jest.spyOn(
            Service.prototype,
            Service.prototype.createFileStream.name
        ).mockResolvedValue(stream)

        const sut = new Service()
        const result = await sut.getFileStream(file)

        expect(result).toBeDefined()
        expect(result).toStrictEqual(expectedResult)
    })
})