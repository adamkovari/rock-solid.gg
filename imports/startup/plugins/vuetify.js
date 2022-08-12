import Vue from 'vue'

import Vuetify from 'vuetify/lib/framework'

import colors from 'vuetify/lib/util/colors'

import 'vuetify/lib/directives'

//import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

const opts = {
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: '#319197',
				secondary: '#fb7419',
				background: '#fff',
				text: '#000000',
				navbarText: '#fff',
				navbar: '#319197',
				navbarLogo: '#fff',
				navbarLogoGlowIn: '#2b7f84',
				navbarLogoGlowOut: '#4fbfc6',
			},
			dark: {
				primary: '#fb7419',
				secondary: '#319197',
				background: '#242424',
				text: '#fff',
				navbarText: '#fff',
				navbar: '#242424',
				navbarLogo: '#fb7419',
				navbarLogoGlowIn: '#DC6616',
				navbarLogoGlowOut: '#FC9753',
			}
		},
		dark: true
	},
	icons: {
		iconfont: 'mdiSvg'
	}
};

export default new Vuetify(opts)