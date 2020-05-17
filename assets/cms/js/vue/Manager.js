/* eslint-disable no-new */
/* global Vue */
import Context from './Context'

class Manager {
    /**
     * Ensures that our Concrete.Vue manager is available on the window object.
     * Note: Do NOT call this before the global Concrete object is created in the CMS context.
     *
     * @param window
     */
    static bindToWindow(window) {
        if (!window.Concrete) {
            window.Concrete = {}
        }
        if (!window.Concrete.Vue) {
            window.Concrete.Vue = new Manager()
            window.Concrete.Vue.contexts = []
        }
    }

    /**
     * Returns the Vue Context object for the current string `context`
     *
     * @param context
     * @returns {*}
     */
    getContext(context) {
        return window.Concrete.Vue.contexts.filter(obj => obj.context === context)[0]
    }

    /**
     * Actives a particular context (and its components) for a particular selector.
     *
     * @param context
     * @param selector
     * @param parent
     */
    activateContext(context, selector, parent) {
        var contextObject = this.getContext(context)
        var selectors = parent.querySelectorAll(selector)
        selectors.forEach(function (element) {
            new Vue({
                el: element,
                components: contextObject.components
            })
        })
    }

    /**
     * For a given string `context`, adds the passed components to make them available within that context.
     *
     * @param context
     * @param components
     */
    extendContext(context, components) {
        var contextObject = this.getContext(context)
        var newComponents = Object.assign(contextObject.components, components)
        contextObject.components = newComponents
    }

    /**
     * Creates a Context object that has access to the specified components. If `fromContext` is passed, the new
     * context object will be created with the same components as the `fromContext` object.
     *
     * @param context
     * @param components
     * @param fromContext
     */
    createContext(context, components, fromContext) {
        if (fromContext) {
            // Merge the fromContext components into this array
            var fromContextObject = this.getContext(fromContext)
            components = Object.assign(fromContextObject.components, components)
        }
        var contextObject = new Context(context, components)
        window.Concrete.Vue.contexts.push(contextObject)
    }
}
export default Manager
