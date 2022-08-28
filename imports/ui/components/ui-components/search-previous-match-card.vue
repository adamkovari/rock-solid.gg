<template>
	<v-card
			class="mx-auto"
			elevation="2"
	>
		<v-list-item three-line>
			<v-list-item-content>
				<v-list-item-title class="text-h5 mb-1" v-text="match.info.gameMode">
				</v-list-item-title>
				<div class="text-overline mb-4" v-if="this.participant">
					{{ this.participant.kills }} / {{ this.participant.deaths }} / {{ this.participant.assists }}
				</div>
				<v-list-item-subtitle>
					{{ this.getMatchDuration }}
					{{ this.index }}
				</v-list-item-subtitle>
				<v-list-item-subtitle v-text="getMapName(match.info.mapId)">
				
				</v-list-item-subtitle>
			</v-list-item-content>
			
			<v-list-item-avatar
					tile
					size="160"
			>
				<img
						:src="this.getMapIcon"
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
import json from '../../../../public/assets/maps.json'

export default {
	name: "search-match-card",
	props: {
		match: Object,
		account: Object,
		index: Number,
	},
	data() {
		return {
			show: false,
			maps: json,
			mapIcon: null,
			participant: null,
			
		}
	},
	async mounted() {
		await this.$nextTick(function() {
			//this.getMapIcon(this.match.info.mapId);
			this.getPlayerFromMatchByPUUID(this.account.puuid);
		});
	},
	computed: {
		getMatchDuration: function () {
			const difference = this.match.info.gameEndTimestamp - this.match.info.gameStartTimestamp
			
			var hoursDifference = Math.floor(difference/1000/60/60);
			var minutesDifference = Math.floor(difference/1000/60);
			var secondsDifference = Math.floor(difference/1000) % 60;
			
			return hoursDifference + " : " + minutesDifference + " : " + secondsDifference;
		},
		getMapIcon: function () {
			return Meteor.call("getMapIconAssetById", this.match.info.mapId, (error,result) => {
				return result;
			})
		}
	},
	methods: {
		getMapName: function (mapId) {
			//console.log(this.index.toString() + " - " + mapId)
			for(const map of this.maps){
				if(map.mapId === mapId)
					return map.mapName;
			}
		},
		getPlayerFromMatchByPUUID: function (encryptedPUUID) {
			//console.log(this.match.info.participants);
			//console.log(encryptedPUUID);
			for(const participant of this.match.info.participants) {
				if(participant.puuid === encryptedPUUID) {
					this.participant = participant;
					//console.log(this.participant)
				}
			}
		}
	}
}
</script>

<style lang="sass" scoped>

</style>