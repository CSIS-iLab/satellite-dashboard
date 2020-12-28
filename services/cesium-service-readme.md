# How the Cesium Service works

This is simply a lightweight way of sharing a single instance of the Cesium objects (Cesium itself, the viewer, etc) between Vue components. You could probably do the same with the Vuex store, but you'd probably end up with unwanted bloat / side-effects.

The CesiumService class itself is designed to be used as a singleton - so the class itself is not exposed, only the 'providerService', which is just a function that returns the same instantiated class to whatever components call it. So in the module, cesiumInstanceProvider is assigned the function returned by an immediately invoked function expression. Inside that IIFE, a new CesiumService is created in the scope of the returned function.

Since the CesiumService itself has no direct access to Cesium, it depends upon a component registering it, and this task is performed by the CesiumViewer, as you would expect. It does this by passing the Cesium instance ot registerInstance.

Any other component seeking to access some part of Cesium or (more likely) something within the viewer object (e.g. the entity collection) can call getInstance, but this returns a Promise, so you must either use 'await' or getInstance().then(cesiumInstance => ...do stuff).

The reason for this is that you don't necessarily know when the Cesium instance is going to be available, since Cesium is threaded, and Vue component initialisation order should not have to concern itself with such matters. So if you call getInstance and it isn't available, then your promise is only resolved when it is.

At the moment, the same thing exists for the Timeline, since I needed to create a custom timeline and destroy the default. This approach did not quite work, however, so we just keep the same viewer.timeline object, so this will probably be ditched.