<template>
		<v-switch
				v-on:click="darkMode"
				inset
				:label="this.$vuetify.theme.dark ? 'Dark Mode' : 'Light Mode'"
		>
			{{ this.$vuetify.theme.dark }}
		</v-switch>
</template>

<script lang="js">
export default {
	name: "theme-toggler",
	methods: {
		darkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		}
	}
}
</script>

<style lang="sass" scoped>

</style>