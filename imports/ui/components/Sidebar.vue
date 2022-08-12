<template>
		<v-navigation-drawer
					app
					mini-variant
					clipped
					expand-on-hover
			>
				<v-list>
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>
								{{ icons.mdiCog}}
							</v-icon>
						</v-list-item-icon>
						<v-list-item-title>
							<router-link :to="{name: 'settings'}"
								class="text-decoration-none"
							>
								Settings
							</router-link>
						</v-list-item-title>
					</v-list-item>
				</v-list>
				
				<v-divider></v-divider>
			</v-navigation-drawer>
</template>

<script lang="js">
import {
	mdiCog
}from '@mdi/js'



export default {
	name: "sidebar",
	data : () => ({
		icons: {
			mdiCog
		}
	})
}
</script>

<style scoped>

</style>