<template>
	<v-main app permanent :style="{background: $vuetify.theme.themes[theme].background}">
		<v-container fluid>
			<router-view></router-view>
		</v-container>
	</v-main>
</template>

<script lang="js">
import Hello from "./Hello";


export default {
	name: "Main",
	components: {
		Hello,
	},
	data: () => ({
	
	}),
	computed: {
		theme() {
			return this.$vuetify.theme.dark ? 'dark' : 'light'
		}
	}
}
</script>

<style lang="sass" scoped>
@import '../styles/imports'


</style>