<template>
	<v-footer app clipped-left>
		<v-card
				class="flex"
				flat
				tile
		>
			<v-card-title class="">
				<strong class="subheading">Get connected with us on social networks!</strong>
				
				<v-spacer></v-spacer>
				
				<v-btn
						v-for="icon in icons"
						:key="icon"
						class="mx-4"
						dark
						icon
				>
					<v-icon size="24px">
						{{ icon }}
					</v-icon>
				</v-btn>
			</v-card-title>
			
			<v-card-text class="py-2 white--text text-center">
				{{ new Date().getFullYear() }} — <strong>Rock-Solid.gg</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script lang="js">
import {
	mdiFacebook,
	mdiTwitter,
	mdiLinkedin,
	mdiInstagram,
} from '@mdi/js'

export default {
	name: "footing",
	data: () => ({
		icons: {
			mdiFacebook,
			mdiTwitter,
			mdiLinkedin,
			mdiInstagram,
		},
	}),
}
</script>

<style scoped>

</style>