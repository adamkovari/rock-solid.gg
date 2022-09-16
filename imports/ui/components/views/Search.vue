<template>
	<v-container>
		<h1>
			Search
		</h1>
		<v-row justify="center">
			<v-col cols="6">
				<input-search label="your summoner name" @searchSummoner="searchSummoner"/>
			</v-col>
		</v-row>
		<div v-if="this.account">
			<v-row justify="center">
				<v-col cols="11">
					<search-profile-card v-if="this.account" :account="this.account" :league-entries="this.leagueEntries"/>
				</v-col>
			</v-row>
			
			<v-spacer></v-spacer>
			
			<v-row justify="center">
				<v-col cols="11">
					<search-current-game-card v-if="this.currentGame" />
				</v-col>
			</v-row>
			
			<v-spacer></v-spacer>
			
			<v-row justify="center" v-if="this.matchIds">
				<h3>
					Previous Matches:
				</h3>
				
				<v-col cols="11" v-for="(matchId, index) in this.matchIds">
					<search-previous-match-card :matchId="matchId" :region="getRegion" :index="index"  :account="getAccount"/>
				</v-col>
			</v-row>
		</div>
		<search-error-card :message="this.error" v-if="this.error" />
	</v-container>
</template>

<script lang="js">
import InputSearch from "../ui-components/input-search";
import SearchProfileCard from "../ui-components/search-profile-card";
import SearchCurrentGameCard from "../ui-components/search-current-game-card";
import SearchErrorCard from "/imports/ui/components/ui-components/search-error-card";
import SearchPreviousMatchCard from "../ui-components/search-previous-match-card";
import Test from "../ui-components/test"

import {mdiMagnify} from '@mdi/js'

const corsServer = 'https://cors-anywhere.herokuapp.com/';
const lolServer = 'https://eun1.api.riotgames.com/lol/';
//const xRiotToken = Meteor.settings.private;
//const header = {'X-Riot-Token': xRiotToken}

export default {
	name: "Search",
	components: {
		InputSearch,
		SearchErrorCard,
		SearchProfileCard,
		SearchCurrentGameCard,
		SearchPreviousMatchCard,
		Test,
	},
	data () {
		return {
			account: null,
			currentGame: null,
			error: null,
			leagueEntries: null,
			matchIds: null,
			matches: [],
			icons: {
				mdiMagnify,
			},
			region: null,
		}
	},
	mounted() {
		//lol/summoner/v4/summoners/by-name/{summonerName}
		/*
		axios.defaults.headers.common['X-Riot-Token'] = "RGAPI-0b041c91-35b2-4758-9d02-b0061088b328";
		
		if(Meteor.isDevelopment) {
			let request = corsServer + lolServer + 'league/v4/masterleagues/by-queue/RANKED_SOLO_5x5'
			axios
					.get(request )
					.then(response => (this.info = response))
					.catch(response => console.log(response))
		}else if(Meteor.isProduction){
			let request = lolServer + 'league/v4/masterleagues/by-queue/RANKED_SOLO_5x5';
			axios
					.get(request )
					.then(response => (this.info = response))
					.catch(response => console.log(response))
			
		}else {
			this.info = 'Not in development or production'
		}
		
		 */
	},
	computed: {
		getAccount: function() {
			return this.account;
		},
		getRegion: function() {
			return this.region;
		}
	},
	methods: {
		searchSummoner: async function (summonerName, region) {
			this.initializeVariables();
			this.region = region;
			console.log("SYSTEM - summonerName:" + summonerName + " region: " + region);
			await this.sendSearchSummonerRequest(summonerName, region);
			
			this.sendGetLeagueEntriesBySummonerId(this.account.id, region);
			this.sendCurrentGameInfoBySummonerId(this.account.id, region);
			this.matchIds = await this.sendGetListOfMatchesByPUUID(this.account.puuid, region);
			//await this.sendGetMatchesByMatchIds(this.matchIds, region);

		},
		sendSearchSummonerRequest: async function (summonerName, region) {
			let params = { "summonerName" : summonerName, "region": region }
			//console.log(reqSummonerName)
			/*
			return await Meteor.call('getSummonerbySummonerName', params, (error, result) => {
				if (this.handleAsyncMeteorCallResult(error, result)) {
					this.account = result;
				}
			});
			
			 */

			/*
			return await Meteor.wrapAsync(Meteor.call('getSummonerbySummonerName', params, async (error, result) => {
				if (this.handleAsyncMeteorCallResult(error, result)) {
					console.log(result)
					this.account = result;
					return result;
				}
			}));
			
			 */
			
			return await new Promise((resolve, reject) => {
				Meteor.call('getSummonerbySummonerName', params, (error, result) => {
					let response = this.handleAsyncMeteorCallResult(error, result);
					if (response) {
						this.account = result;
						resolve(result);
					} else if (!response) { //404
						this.error = "Summoner profile doesn't exist in the selected region!";
						reject(error);
					} else {
						reject(error);
					}
				});
			})
			
		},
		sendGetLeagueEntriesBySummonerId: function ( encryptedSummonerId, region ) {
			let params = { "encryptedSummonerId" : encryptedSummonerId, "region": region}
			
			Meteor.call("getLeagueEntriesBySummonerId", params, (error, result) => {
					if(this.handleAsyncMeteorCallResult(error, result)) {
						if (result) {
							this.leagueEntries = result;
						}
					}
			})
		},
		sendCurrentGameInfoBySummonerId: function ( encryptedSummonerId, region) {
			let params = { "encryptedSummonerId" : encryptedSummonerId, "region": region}
			//console.log(encryptedSummonerId)
			Meteor.call("getCurrentGameInfoBySummonerId", params, (error, result) => {
				if (this.handleAsyncMeteorCallResult(error, result)) {
					this.currentGame = result;
				}
			});
		},
		sendGetListOfMatchesByPUUID: async function (encryptedPUUID, region) {
			let params = { "encryptedPUUID" : encryptedPUUID, "region": region}
			//console.log(encryptedPUUID)
			return new Promise((resolve, reject) => {
				Meteor.call("getListOfMatchesByPUUID", params, (error, result) => {
					if (error) {
						return reject(error)
					}
					return resolve(result);
				});
			});
		},
		matchHttpReasonWithStatusCode: function (statusCode) {
			switch(statusCode) {
				case 400 : return 'Bad request';
				case 401 : return 'Unauthorized';
				case 403 : return 'Forbidden';
				case 404 : return 'Data not found';
				case 405 : return 'Method not allowed';
				case 415 : return 'Unsupported media type';
				case 429 : return 'Rate limit exceeded';
				case 500 : return 'Internal server error';
				case 502 : return 'Bad gateway';
				case 503 : return 'Service unavailable';
				case 504 : return 'Gateway timeout';
				default : return 'Unknown failure';
			}
		},
		sendToastNotification: function (type,msg) {
			switch(type) {
				case 'error' : this.$toast.error(msg); break;
				case 'info' : this.$toast.info(msg); break;
				case 'warning' : this.$toast.warning(msg); break;
				default : this.$toast.success(msg); break;
			}
		},
		handleAsyncMeteorCallResult: function (error, result) {
			if (error) {
				//console.log(error)
				if(error.error === 404)
					return false //Not found
				else {
					this.sendToastNotification("error", error.error + " - " + error.message)
				}
			} else if (result) {
					//console.log(result)
					return result;
			} else {
				this.sendToastNotification("error", "Server not responded")
			}
		},
		initializeVariables: function() {
				this.account = null
				this.currentGame = null
				this.error = null
				this.leagueEntries = null
				this.matchIds = null
				this.matches = []
				this.region = null
		},
		/*
		sendGetMatchesByMatchIds: async function (matchIds, region) {
			this.matches = [];
			for (const [index, matchId] of matchIds.entries()) {
				new Promise((resolve, reject) => {
					let params = { "matchId" : matchId, "region": region }
					Meteor.call("getMatchByMatchId", params, (error, result) => {
						if (error) {
							return reject(error)
						}
						this.matches.splice(index,0,result);
						return resolve(result);
					});
				});
			}
		}
		 */
},
}
</script>

<style lang="sass" scoped>

</style>