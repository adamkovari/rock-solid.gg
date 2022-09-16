<template>
	<v-card
			class="mx-auto"
			elevation="2"
			v-if="this.match"
	>
		<v-row>
			<v-col cols="4" align="start">
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="text-h5 mb-1" v-text="this.match.info.gameMode">
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ this.getMatchDuration() }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-col>
			<v-col cols="4" align="center">
				<v-list-item>
					<v-list-item-avatar
							size="160"
							class="mx-auto"
					>
						<img
								:src="this.championIcon"
						>
					</v-list-item-avatar>
				</v-list-item>
				<div v-if="this.participant">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								{{ this.participant.kills }} / {{ this.participant.deaths }} / {{ this.participant.assists }}
							</v-list-item-title>
							<v-list-item-title class="text-h5 mt-1 blue--text" v-if="this.participant.win">
								WIN
							</v-list-item-title>
							<v-list-item-title class="text-h5 mt-1 red--text" v-else>
								LOSE
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</div>
			</v-col>
			<v-col cols="4" class="align-end">
				<v-list-item class="float-end">
					<v-list-item-avatar
							tile
							size="160"
					>
						<img
								:src="this.mapIcon"
						>
					</v-list-item-avatar>
				</v-list-item>
			</v-col>
		</v-row>
		
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
import maps from '../../../../public/assets/maps.json'
import champions from '../../../../public/assets/champions.json'

export default {
	name: "search-match-card",
	props: {
		account: Object,
		index: Number,
		matchId: String,
		region: String,
	},
	data() {
		return {
			championIcon: null,
			show: false,
			maps: maps,
			champions: champions,
			mapIcon: null,
			match: null,
			participant: null,
			
		}
	},
	async mounted() {
		await this.$nextTick(async function () {
				this.refresh();
		});
	},
	computed: {
	},
	methods: {
		refresh: async function() {
			this.match = await this.getMatchByMatchId(this.matchId, this.region);
			this.getMapIcon(this.match.info.mapId);
			this.participant = this.getPlayerFromMatchByPUUID(this.account.puuid);
			this.getChampionIcon(this.participant.championId);
		},
		getMatchDuration: function () {
			const difference = this.match.info.gameEndTimestamp - this.match.info.gameStartTimestamp
			
			var hoursDifference = Math.floor(difference/1000/60/60);
			var minutesDifference = Math.floor(difference/1000/60);
			var secondsDifference = Math.floor(difference/1000) % 60;
			
			return hoursDifference + " : " + minutesDifference + " : " + secondsDifference;
		},
		getMapIcon: function () {
			return Meteor.call("getMapIconAssetById", this.match.info.mapId, (error,result) => {
				//sconsole.log(result)
				this.mapIcon = result;
			})
		},
		getChampionIcon: function (championId) {
			let championName = this.getChampionName(championId);
			//console.log("championName: " + championName)
			return Meteor.call("getChampionIconAssetById", championName, (error,result) => {
				this.championIcon = result;
			})
		},
		getMatchByMatchId: async function (matchId, region) {
			return new Promise((resolve, reject) => {
				let params = { "matchId" : matchId, "region": region }
				Meteor.call("getMatchByMatchId", params, (error, result) => {
					if (error) {
						return reject(error)
					}
					return resolve(result);
				});
			});
		},
		getChampionName: function (championId) {
			//console.log("championId: " + championId)
			for (const champion of Object.entries(this.champions.data)) {
				if(champion[1].key === championId.toString()) {
					//console.log(champion[1].id)
					return champion[1].id;
				}
			}
		},
		getMapName: function (mapId) {
			//console.log(this.index.toString() + " - " + mapId)
			for(const map of this.maps) {
				if(map.mapId === mapId)
					return map.mapName;
			}
		},
		getPlayerFromMatchByPUUID: function (encryptedPUUID) {
			//console.log(this.match.info.participants);
			//console.log(encryptedPUUID);
			for(const participant of this.match.info.participants) {
				if(participant.puuid === encryptedPUUID) {
					return participant;
					//console.log(this.participant)
				}
			}
		}
	}
}
</script>

<style lang="sass" scoped>

</style>