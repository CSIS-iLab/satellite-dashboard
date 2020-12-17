class CesiumService {
  cesiumInstance = null

  timelineInstance = null

  awaiters = {
    cesium: [],
    timeline: []
  }

  registerInstance(cesiumInstance) {
    this.cesiumInstance = cesiumInstance
    this.awaiters.cesium.forEach((f) => f(cesiumInstance))
  }

  getInstance() {
    return new Promise((resolve, reject) => {
      try {
        if (this.cesiumInstance) {
          resolve(this.cesiumInstance)
        } else {
          this.awaiters.cesium.push((instance) => resolve(instance))
        }
      } catch {
        reject(new Error('Failed to obtain Cesium instance'))
      }
    })
  }

  registerTimeline(timelineInstance) {
    this.timelineInstance = timelineInstance
    this.awaiters.timeline.forEach((f) => f(timelineInstance))
  }

  getTimeline() {
    return new Promise((resolve, reject) => {
      try {
        if (this.timelineInstance) {
          resolve(this.timelineInstance)
        } else {
          this.awaiters.timeline.push((instance) => resolve(instance))
        }
      } catch {
        reject(new Error('Failed to obtain timeline instance'))
      }
    })
  }
}

const cesiumInstanceProvider = (function() {
  const serviceInstance = new CesiumService()
  return function() {
    return serviceInstance
  }
})()

export default cesiumInstanceProvider
