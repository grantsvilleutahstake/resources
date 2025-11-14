class EventListener {
    parent
    callbacks = []

    constructor(parent) {
        this.parent = parent
    }

    subscribe = (callback) =>
    {
        if(!this.callbacks.includes(callback))
        {
            this.callbacks.push(callback)

            console.log('callback added')
            console.log(this.callbacks.length)
            console.log(callback)
        }
    }

    unsubscribe(callback)
    {
        this.callbacks = this.callbacks.filter(call => call != callback)
    }

    raise(data) {
        this.callbacks.forEach(callback => callback(data))
    }

}