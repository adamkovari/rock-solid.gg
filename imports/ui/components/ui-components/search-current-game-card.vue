<template>
	<v-card
			class="mx-auto"
			elevation="2"
	>
		<v-list-item three-line>
			<v-list-item-content>
				<v-list-item-title class="text-h5 mb-1">
					Current Game
				</v-list-item-title>
				<v-list-item-subtitle>
				
				</v-list-item-subtitle>
			</v-list-item-content>
			
			<v-list-item-avatar
					tile
					size="160"
			>
			</v-list-item-avatar>
		</v-list-item>
		
		<v-card-actions>
			<v-btn
					outlined
					rounded
					text
					@click="show = !show"
			>
				Details
			</v-btn>
		</v-card-actions>
		
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				
				<v-card-text>
				
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script lang="js">
export default {
	name: "search-current-game-card",
	data() {
		return {
			show: false
		}
	}
}
</script>

<style lang="sass" scoped>

</style>