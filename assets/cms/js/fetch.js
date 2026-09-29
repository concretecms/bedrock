;(function(global) {
    'use strict'

    if (global.ConcreteFetch) {
        return
    }

    /**
     * The error thrown when a request fails.
     *
     * It's a regular Error (with the same message as before), with a few additional properties.
     */
    class FetchError extends Error {
        /**
         * @param {FetchErrorKind} kind
         * @param {string} message
         * @param {{status?: number, responseText?: string, responseData?: any, cause?: any}} [details]
         */
        constructor(kind, message, details) {
            super(message)
            this.name = 'FetchError'
            /**
             * @type {FetchErrorKind}
             */
            this.kind = kind
            /**
             * The HTTP status code (0 if we got no response at all).
             *
             * @type {number}
             */
            this.status = details?.status || 0
            /**
             * The body of the response, if we received one.
             *
             * @type {string|undefined}
             */
            this.responseText = details?.responseText
            /**
             * The parsed body of the response, if it was parseable.
             *
             * @type {any}
             */
            this.responseData = details?.responseData
            if (details?.cause !== undefined) {
                this.cause = details.cause
            }
        }
    }

    /**
     * The reason why a request failed.
     *
     * @example
     * try {
     *     await ConcreteFetch.json('/api/data', { timeout: 30000 })
     * } catch (error) {
     *     if (error.kind === ConcreteFetch.FetchError.KIND.TIMEOUT) {
     *         window.alert('The server is taking too long, please try again later.')
     *     }
     * }
     */
    FetchError.KIND = Object.freeze({
        /**
         * The request never got an answer (offline, DNS problems, CORS, connection reset, ...).
         */
        NETWORK: 'network',
        /**
         * The request took longer than the timeout option.
         */
        TIMEOUT: 'timeout',
        /**
         * The request has been aborted with an AbortSignal.
         */
        ABORTED: 'aborted',
        /**
         * The response told us about an error (see the responseData property).
         */
        SERVER: 'server',
        /**
         * The response has an error HTTP status, but no details about the error.
         */
        HTTP: 'http',
        /**
         * The response was not in the expected format (for example: JSON was expected).
         */
        INVALID_RESPONSE: 'invalid-response'
    })

    /**
     * The reason why a request failed: one of the values of FetchError.KIND.
     *
     * @typedef {typeof FetchError.KIND[keyof typeof FetchError.KIND]} FetchErrorKind
     */

    /**
     * Recursively add fields to URLSearchParams.
     * Used by buildRequestBody().
     *
     * @param {string} prefix
     * @param {Record|Array|any} value
     * @param {URLSearchParams} urlSearchParams
     *
     * @returns {void}
     */
    function addToUrlSearchParams(prefix, value, urlSearchParams) {
        if (value === null || value === undefined || typeof value !== 'object') {
            return
        }
        if (!prefix && Array.isArray(value)) {
            return
        }
        for (const [key, val] of Object.entries(value)) {
            if (val === null || val === undefined) {
                continue
            }
            const fieldName = prefix ? `${prefix}[${key}]` : key
            if (typeof val === 'object') {
                addToUrlSearchParams(fieldName, val, urlSearchParams)
            } else {
                urlSearchParams.append(fieldName, String(val))
            }
        }
    }

    /**
     * Build the request body for an AJAX request.
     *
     * @param {Record|any} data The object to build the body from
     *
     * @returns {URLSearchParams} The request body
     *
     * @example
     * buildRequestBody({key: 'value', arr: [1, 2, 3], nested: {a: 'b'}})
     */
    function buildRequestBody(data) {
        const urlSearchParams = new URLSearchParams()
        addToUrlSearchParams('', data, urlSearchParams)
        return urlSearchParams
    }

    /**
     * Prepare the request options for window.fetch().
     *
     * @param {RequestInit|Record<string, any>|null|undefined} request
     * @param {Record<string, string>|null|undefined} headers Additional headers to add (will not override existing ones)
     *
     * @returns {RequestInit}
     */
    function prepareRequest(request, headers) {
        if (request) {
            // An AbortSignal does not survive structuredClone(): let's keep the one we received
            const signal = request.signal
            try {
                request = global.structuredClone(request)
            } catch {}
            if (signal) {
                request.signal = signal
            }
        } else {
            request = {}
        }
        // Default to GET if no method is specified
        request.method = String(request.method || 'GET').toUpperCase()
        if (request.body?.constructor === Object) {
            // Convert body object to URLSearchParams
            request.body = buildRequestBody(request.body)
        }
        if (!request.headers) {
            request.headers = {}
        }
        if (!request.cache && request.method !== 'GET') {
            // Disable caching for non-GET requests by default
            request.cache = 'no-cache'
        }
        const existingHeaderKeys = Object.keys(request.headers).map((key) => key.toLowerCase())
        if (headers) {
            for (const [name, value] of Object.entries(headers)) {
                const lowerCaseName = name.toLowerCase()
                if (!existingHeaderKeys.includes(lowerCaseName)) {
                    request.headers[name] = value
                    existingHeaderKeys.push(lowerCaseName)
                }
            }
        }
        if (!existingHeaderKeys.includes('x-requested-with')) {
            // Just to let the server know this is an AJAX request
            request.headers['X-Requested-With'] = 'XMLHttpRequest'
        }
        if (request.method !== 'GET' && request.body && !existingHeaderKeys.includes('content-type')) {
            // We want to use $_POST on the server side
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        if (typeof request.timeout === 'number' && request.timeout > 0) {
            // Not a fetch() option: let's turn it into a signal, so that callers don't have to
            const timeoutSignal = AbortSignal.timeout(request.timeout)
            request.signal = request.signal ? AbortSignal.any([request.signal, timeoutSignal]) : timeoutSignal
        }
        delete request.timeout
        return request
    }

    /**
     * Perform a request, telling apart the reasons why we may not get a response at all.
     *
     * @param {string} url
     * @param {RequestInit} request
     *
     * @throws {FetchError}
     *
     * @returns {Promise<Response>}
     */
    async function performRequest(url, request) {
        try {
            return await fetch(url, request)
        } catch (error) {
            if (error?.name === 'TimeoutError') {
                throw new FetchError(FetchError.KIND.TIMEOUT, 'The request took too long to complete.', { cause: error })
            }
            if (error?.name === 'AbortError') {
                throw new FetchError(FetchError.KIND.ABORTED, 'The request has been canceled.', { cause: error })
            }
            throw new FetchError(FetchError.KIND.NETWORK, error?.message || 'Unable to contact the server.', { cause: error })
        }
    }

    /**
     * Build the error to be thrown when we received a response with an error HTTP status.
     *
     * @param {Response} response
     * @param {string} responseText
     * @param {any} [responseData]
     *
     * @returns {FetchError}
     */
    function buildHttpError(response, responseText, responseData) {
        return new FetchError(FetchError.KIND.HTTP, responseText, { status: response.status, responseText, responseData })
    }

    /**
     * Check a JSON response for errors.
     *
     * @param {any} responseData
     * @param {Response} response
     * @param {string} responseText
     *
     * @throws {FetchError} If the response data contains errors (the thrown error will have a responseData property)
     */
    function checkJsonResponse(responseData, response, responseText) {
        const details = { status: response.status, responseText, responseData }
        if (responseData?.errors?.length) {
            throw new FetchError(FetchError.KIND.SERVER, responseData.errors[0], details)
        }
        if (responseData?.error) {
            throw new FetchError(FetchError.KIND.SERVER, responseData.error, details)
        }
    }

    /**
     * Fetch JSON data from a URL.
     *
     * @param {string} url The URL to fetch data from
     * @param {RequestInit|Record<string, any>|null|undefined} request The request options and body (plus an optional timeout, in milliseconds)
     *
     * @throws {FetchError} If the request failed, if the response contains an error, or if it is not ok
     *
     * @returns {Promise<any>} The JSON response
     *
     * @example
     * try {
     *     const data = await fetchJson('/api/data', {
     *         method: 'POST',
     *         body: {
     *             key: 'value'
     *         }
     *     });
     * } catch (error) {
     *     window.alert(error.message);
     * }
     */
    async function fetchJson(url, request) {
        request = prepareRequest(request, { Accept: 'application/json' })
        const response = await performRequest(url, request)
        const responseText = await response.text()
        let responseData
        try {
            responseData = JSON.parse(responseText)
        } catch {
            if (!response.ok) {
                throw buildHttpError(response, responseText)
            }
            throw new FetchError(FetchError.KIND.INVALID_RESPONSE, responseText, { status: response.status, responseText })
        }
        checkJsonResponse(responseData, response, responseText)
        if (!response.ok) {
            throw buildHttpError(response, responseText, responseData)
        }
        return responseData
    }

    /**
     * Fetch an HTML chunk from a URL.
     *
     * @param {string} url The URL to fetch data from
     * @param {RequestInit|Record<string, any>|undefined} request The request options and body (plus an optional timeout, in milliseconds)
     *
     * @throws {FetchError} If the request failed, if the response contains an error, or if it is not ok
     *
     * @returns {Promise<string>} The HTML response
     *
     * @example
     * try {
     *     const data = await fetchHtml('/api/render', {
     *         method: 'POST',
     *         body: {
     *             key: 'value'
     *         }
     *     });
     * } catch (error) {
     *     window.alert(error.message);
     * }
     */
    async function fetchHtml(url, request) {
        request = prepareRequest(
            request,
            {
                Accept: [
                    // Prefer HTML
                    'text/html',
                    // ... but accept JSON in case of errors
                    'application/json;q=0.9',
                    // ... or plain text as a last resort fallback
                    'text/plain;q=0.8'
                ].join(', ')
            }
        )
        const response = await performRequest(url, request)
        const responseText = await response.text()
        let responseData
        try {
            // Try to see if it's JSON with errors
            responseData = JSON.parse(responseText)
        } catch {
            // Not JSON, that's fine
            responseData = null
        }
        if (responseData) {
            checkJsonResponse(responseData, response, responseText)
        }

        if (!response.ok) {
            throw buildHttpError(response, responseText, responseData)
        }
        return responseText
    }

    global.ConcreteFetch = {
        buildRequestBody,
        json: fetchJson,
        html: fetchHtml,
        FetchError
    }
})(global)
