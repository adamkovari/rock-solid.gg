import { createApp } from '../imports/startup/createApp'

Meteor.startup(() => {

  const { app } = createApp()

  app.$mount('#app')

})
