/**
 * Represents the context for a particular Vue instance. Contexts can be custom, but the default ones are
 * `frontend`, `cms` and `backend` just like the core.
 */
class Context {
    constructor(context, components) {
        this.context = context
        this.components = components
    }
}
export default Context
