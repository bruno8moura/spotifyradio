import { jest, 
    expect, 
    describe, 
    test, 
    beforeEach } from '@jest/globals'
import config from '../../../server/config.js'
import { Controller } from '../../../server/Controller.js'
import {
    handler
} from '../../../server/routes.js'
import TestUtil from '../_util/TestUtil.js'
const {
    pages,
    location,
    constants: {
        CONTENT_TYPE
    }
} = config
describe('#Routes', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('GET / - should redirect to home page', async () => {
        const params = TestUtil.defaultHandleParams()
        params.request.method = 'GET'
        params.request.url = '/'
        
        await handler(...params.values())

        expect(params.response.writeHead).toBeCalledWith( 
            302,
            {
                'Location': location.home
            })
        expect(params.response.end).toHaveBeenCalled()
    })
    test(`GET /home - should response with ${pages.homeHTML} file stream`, async () => {
        const params = TestUtil.defaultHandleParams()
        params.request.method = 'GET'
        params.request.url = '/home'
        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name,
        ).mockResolvedValue({
            stream: mockFileStream,            
        })
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })
    
    test(`GET /controller - should response with ${pages.controllerHTML} file stream`, async () => {
        const params = TestUtil.defaultHandleParams()
        params.request.method = 'GET'
        params.request.url = '/controller'
        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name,
        ).mockResolvedValue({
            stream: mockFileStream,            
        })
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })

    test(`GET /index.html - should response with file stream`, async () => {
        const params = TestUtil.defaultHandleParams()
        const filename = 'index.html'
        const requestUrl = `/${filename}`
        params.request.method = 'GET'
        params.request.url = requestUrl
        const expectedType = '.html'
        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name,
        ).mockResolvedValue({
            stream: mockFileStream,
            type: expectedType          
        })
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(requestUrl)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
        expect(params.response.writeHead).toHaveBeenCalledWith(
            200,
            {
                'Content-Type': CONTENT_TYPE[expectedType]
            }
        )
    })

    describe('exceptions', () => {
        test.todo('should respond with 404 when given inexistent file')
        test.todo('should respond with 404 when given an error')
    })
})