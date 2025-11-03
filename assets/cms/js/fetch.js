;(function(global) {
    'use strict'

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
            try {
                request = global.structuredClone(request)
            } catch {}
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
        return request
    }

    /**
     * Check a JSON response for errors.
     *
     * @param {any} responseData
     *
     * @throws {Error} If the response data contains errors (the thrown error will have a responseData property)
     */
    function checkJsonResponse(responseData) {
        if (responseData?.errors?.length) {
            const error = new Error(responseData.errors[0])
            error.responseData = responseData
            throw error
        }
        if (responseData?.error) {
            const error = new Error(responseData.error)
            error.responseData = responseData
            throw error
        }
    }

    /**
     * Fetch JSON data from a URL.
     *
     * @param {string} url The URL to fetch data from
     * @param {RequestInit|Record<string, any>|null|undefined} request The request options and body
     *
     * @throws {Error} If the response contains an error or is not ok
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
        const response = await fetch(url, request)
        const responseText = await response.text()
        let responseData
        try {
            responseData = JSON.parse(responseText)
        } catch {
            throw new Error(responseText)
        }
        checkJsonResponse(responseData)
        if (!response.ok) {
            throw new Error(responseText)
        }
        return responseData
    }

    /**
     * Fetch an HTML chunk from a URL.
     *
     * @param {string} url The URL to fetch data from
     * @param {RequestInit|Record<string, any>|undefined} request The request options and body
     *
     * @throws {Error} If the response contains an error or is not ok
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
        const response = await fetch(url, request)
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
            checkJsonResponse(responseData)
        }

        if (!response.ok) {
            throw new Error(responseText)
        }
        return responseText
    }

    global.ConcreteFetch = {
        buildRequestBody,
        json: fetchJson,
        html: fetchHtml
    }
})(global)
