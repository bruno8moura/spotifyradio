import { jest, 
    expect, 
    describe, 
    test, 
    beforeEach } from '@jest/globals'
import config from '../../../server/config.js'
const {
    pages
} = config
describe('#Routes', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test.todo('GET / - should redirect to home page')
    test.todo(`GET /home - should response with ${pages.homeHTML} file stream`)
    test.todo(`GET /controller - should response with ${pages.controllerHTML} file stream`)
    test.todo(`GET /file.ext - should response with file stream`)
    test.todo(`GET /unknown - should response with 404 when given an inexistent route`)

    describe('exceptions', () => {
        test.todo('should respond with 404 when given inexistent file')
        test.todo('should respond with 404 when given an error')
    })
})