<template>
	<v-card
			class="mx-auto"
			elevation="2"
	>
		<v-list-item three-line>
			<v-list-item-content>
				<v-list-item-title align="center" class="text-h5 my-3">
					Not found
				</v-list-item-title>
				<v-list-item-subtitle align="center" v-text="this.message">
				
				</v-list-item-subtitle>
			</v-list-item-content>
			
			
		</v-list-item>
	</v-card>
</template>

<script lang="js">
export default {
	name: "search-error-card",
	props: {
		message: {
			type: String,
			default: null,
		}
	},
	data() {
		return {

		}
	},
}
</script>

<style lang="sass" scoped>

</style>