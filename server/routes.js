import { logger } from './utils.js'

import config from './config.js'
import { Controller } from './Controller.js'

const {
    location,
    pages: {
        homeHTML,
        controllerHTML
    }
} = config

const controller = new Controller()
async function routes(request, response) {
    const { method, url } = request
    if(method === 'GET' && url === '/') {
        response.writeHead( 302, {
            'Location': location.home
        })

        return response.end()
    }

    if(method === 'GET' && url === '/home') {
        const {
            stream,
        } = await controller.getFileStream(homeHTML)

        // response.writeHead( 200, {
        //     'Content-Type': 'text/html'
        // })

        return stream.pipe(response)
    }

    if(method === 'GET' && url === '/controller') {
        const {
            stream,
        } = await controller.getFileStream(controllerHTML)

        // response.writeHead( 200, {
        //     'Content-Type': 'text/html'
        // })

        return stream.pipe(response)
    }

    if(method === 'GET') {
        const {
            stream
        } = await controller.getFileStream(url)

        return stream.pipe(response)
    }

    response.writeHead(404)
    return response.end()
}

export function handler(request, response) {
    return routes(request, response)
    .catch( error => logger.error(`Deu ruim: ${error.stack}`) && response.end())
}