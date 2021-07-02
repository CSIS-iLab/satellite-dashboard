class TimeEvents {
  listeners = {
    dateChanged: []
  }

  time = new Date()

  timeIndex = 0

  init(time) {
    this.time = time
    this.timeIndex = 0
  }

  setTime(time) {
    const lastTime = this.time
    const lastDate = lastTime.getDate()
    const thisDate = time.getDate()
    this.time = time
    if (thisDate !== lastDate) {
      this.timeIndex =
        lastTime.valueOf() < time.valueOf()
          ? this.timeIndex + 1
          : this.timeIndex - 1
      this.dispatchEvent('dateChanged')
    }
  }

  addListener(event, func) {
    this.listeners[event]
      ? this.listeners[event].push(func)
      : console.log('No such event type')
  }

  removeListener(event, func) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((f) => f !== func)
    }
  }

  dispatchEvent(event) {
    console.log(event, this.timeIndex)
    if (this.listeners[event]) {
      this.listeners[event].forEach((func) => func(this.timeIndex))
    }
  }
}

const timeEventsProvider = (function() {
  const serviceInstance = new TimeEvents()
  return function() {
    return serviceInstance
  }
})()

export default timeEventsProvider
