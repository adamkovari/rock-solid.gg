<template>
	<v-container fluid>
		<v-row align="center">
			<v-col
				cols="2"
			>
				<v-select
						v-model="region"
						:items="regions"
						label="your region"
						hide-details="auto"
				>
				
				</v-select>
			</v-col>
			
			<v-col
				cols="10"
			>
				<v-text-field
						:label="label"
						:rules="rules"
						v-model="summonerName"
						:append-icon="icons.mdiMagnify"
						@click:append="searchSummoner"
						hide-details="auto"
				>
				
				</v-text-field>
			</v-col>
	</v-row>
	</v-container>
</template>

<script lang="js">
import {
	mdiMagnify
} from '@mdi/js'

export default {
	name: "input-search",
	props: {
		label: String
	},
	methods: {
		searchSummoner() {
			this.$emit('searchSummoner', this.summonerName, this.region )
		}
	},
	data() {
		return {
			region: 'BR1',
			regions: ['BR1','EUN1','EUW1','JP1','KR','LA1','LA2','NA1', 'OC1', 'RU', 'TR1'],
			icons: {
				mdiMagnify
			},
			rules: [
					value => !!value|| 'Required.'
			],
			summonerName: '',
			
		}
	}
}
</script>

<style lang="sass" scoped>

</style>