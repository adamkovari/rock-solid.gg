// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

import Search from '../imports/ui/components/views/Search'
import Settings from '../imports/ui/components/views/Settings'
import Champs from '../imports/ui/components/views/Champs'

// Create router instance
const routerFactory = new RouterFactory({
	mode: 'history',
	scrollBehavior: nativeScrollBehavior
});

RouterFactory.configure(factory => {
	// Simple routes
	factory.addRoutes([
		{
			path: '/search',
			name: 'search',
			component: Search,
		},
		{
			path: '/champs',
			name: 'champs',
			component: Champs,
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings
		},
	])
})

// Not found
import NotFound from '../imports/ui/components/NotFound.vue';

RouterFactory.configure(router => {
	router.addRoute({
		path: '*',
		component: NotFound,
	});
}, -1);

export default routerFactory;