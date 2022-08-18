import Vue from 'vue'

import vuetify from './plugins/vuetify'

import routerFactory  from '../../client/routes'

import App from '../ui/App.vue'

export function createApp () {
	const router = routerFactory.create();

	const app = new Vue({
		router,
		vuetify,
		render: h => h(App),
	})

	return {
		app,
		router,
	};
}
