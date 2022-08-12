<template>
  <v-app>
	  <Sidebar />
	  <Navbar />
	  <Main />
	  <Footing />
  </v-app>
</template>

<script lang="js">
import {
	mdiCheckCircle,
	mdiAccount,
	mdiPencil,
	mdiShareVariant,
	mdiDelete,
} from '@mdi/js'

import Footing from './components/Footing.vue'
import Hello from './components/Hello.vue'
import Info from './components/Info.vue'
import Main from './components/Main.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Test from './components/views/Test.vue'

const routes = {
	'/test': Test
}

export default {
  components: {
	  Footing,
    Hello,
    Info,
	  Main,
	  Navbar,
	  Sidebar,
	  Test
  },
	mounted() {
	},
	data: () => ({
		icons: {
			mdiAccount,
			mdiPencil,
			mdiShareVariant,
			mdiDelete,
			mdiCheckCircle
		},
	}),
}
</script>

<style lang="sass" scoped>
@import 'styles/imports'

body
	color: $dark-primary

</style>