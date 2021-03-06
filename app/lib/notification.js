const notifier = require('node-notifier')

class Notification {
  constructor () {
    this.active = false
    this.interval = setInterval(this.tick.bind(this), 100)
    this.queue = []
  }

  push (data) {
    return new Promise((resolve) => {
      this.queue.push(this._notification(data, resolve))
    })
  }

  _notification (data, callback) {
    const options = Object.assign({}, data, { wait: true })
    return () => {
      callback()
      this.active = true
      notifier.notify(options, () => {
        this.active = false
      })
    }
  }

  tick () {
    if (!this.active && this.queue.length > 0) {
      this.queue.shift()()
    }
  }
}

module.exports = new Notification()
