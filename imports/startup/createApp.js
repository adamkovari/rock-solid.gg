import Vue from 'vue'

import vuetify from './plugins/vuetify'

import routerFactory  from '../../client/routes'

import App from '../ui/App.vue'

function createApp () {
	const router = routerFactory.create();

	return {
		app: new Vue({
			router,
			vuetify,
			render: h => h(App),
		}).$mount('#app'),
	}
}

export default createApp