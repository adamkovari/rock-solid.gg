<template>
	<v-app-bar app clipped-left :style="{background:$vuetify.theme.themes[this.$vuetify.theme.dark ? 'dark' : 'light'].navbar}">
		<h1 id="app-bar-title">
			rock-solid
		</h1>
		<v-spacer></v-spacer>
		<v-app-bar-nav-icon>
			<router-link :to="{name: 'search'}">
				<v-icon
						color="navbarText"
				>
					{{ icons.mdiMagnify }}
				</v-icon>
			</router-link>
		</v-app-bar-nav-icon>
		<v-btn>
			<router-link :to="{name: 'champs'}"
			             class="text-decoration-none"
			>
				Champs
			</router-link>
		</v-btn>
	</v-app-bar>
</template>

<script lang="js">
import {
	mdiMagnify
} from '@mdi/js'

export default {
	name: "Navbar",
	computed: {
		theme() {
			return this.$vuetify.theme
		}
	},
	data: () => ({
		icons: {
			mdiMagnify,
		},
	}),
}
</script>

<style lang="sass" scoped>
@import '../styles/_imports'

#app-bar-title
	font-family: 'Codystar Regular', sans-serif
	font-size: 1.5rem
	font-weight: bold
	color:  var(--v-navbarLogo-base)
	animation: glow 1s ease-in-out infinite alternate


@-webkit-keyframes glow
	from
		text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--v-navbarLogoGlowIn-base), 0 0 40px var(--v-navbarLogoGlowIn-base), 0 0 50px var(--v-navbarLogoGlowIn-base), 0 0 60px var(--v-navbarLogoGlowIn-base), 0 0 70px var(--v-navbarLogoGlowIn-base)
	
	to
		text-shadow: 0 0 20px #fff, 0 0 30px var(--v-navbarLogoGlowOut-base), 0 0 40px var(--v-navbarLogoGlowOut-base), 0 0 50px var(--v-navbarLogoGlowOut-base), 0 0 60px var(--v-navbarLogoGlowOut-base), 0 0 70px var(--v-navbarLogoGlowOut-base), 0 0 80px var(--v-navbarLogoGlowOut-base)

</style>