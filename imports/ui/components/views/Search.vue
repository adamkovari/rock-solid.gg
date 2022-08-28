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
		<v-row justify="center">
			<v-col cols="11">
				<search-profile-card v-if="this.account" :account="this.account"/>
			</v-col>
		</v-row>
		
		<v-spacer></v-spacer>
		
		<v-row justify="center">
			<v-col cols="11">
				<search-current-game-card v-if="this.currentGame" />
			</v-col>
		</v-row>
		
		<v-spacer></v-spacer>
		
		<v-row justify="center" v-if="this.matches.length">
			<h3>
				Previous Matches:
			</h3>
			
			<v-col cols="11" v-for="(match, index) in this.matches">
				<search-previous-match-card :match="match" :index="index"  :account="getAccount"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="js">
import axios from "axios";
import InputSearch from "../ui-components/input-search";
import SearchProfileCard from "../ui-components/search-profile-card";
import SearchCurrentGameCard from "../ui-components/search-current-game-card";
import SearchPreviousMatchCard from "../ui-components/search-previous-match-card";

import {
	mdiMagnify
} from '@mdi/js'

const corsServer = 'https://cors-anywhere.herokuapp.com/';
const lolServer = 'https://eun1.api.riotgames.com/lol/';
//const xRiotToken = Meteor.settings.private;
//const header = {'X-Riot-Token': xRiotToken}

export default {
	name: "Search",
	components: {
		InputSearch,
		SearchProfileCard,
		SearchCurrentGameCard,
		SearchPreviousMatchCard,
	},
	data () {
		return {
			account: null,
			currentGame: null,
			matchIds: null,
			matches: [],
			icons: {
				mdiMagnify,
			},
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
		}
	},
	methods: {
		searchSummoner: async function (summonerName, region) {
			console.log("SYSTEM - summonerName:" + summonerName + " region: " + region);
			await this.sendSearchSummonerRequest(summonerName, region);
			this.sendCurrentGameInfoBySummonerId(this.account.id, region);
			this.matchIds = await this.sendGetListOfMatchesByPUUID(this.account.puuid, region);
			await this.sendGetMatchesByMatchIds(this.matchIds, region);
		},
		sendSearchSummonerRequest: async function (summonerName, region) {
			let params = { "summonerName" : summonerName, "region": region }
			//console.log(reqSummonerName)
			return new Promise((resolve, reject) => {
				Meteor.call('getSummonerbySummonerName', params, async (error, result) => {
					if(error) {
						return reject(error)
					}
					this.account = result;
					return resolve(result)
				});
			})
		},
		sendCurrentGameInfoBySummonerId: function ( encryptedSummonerId, region) {
			let params = { "encryptedSummonerId" : encryptedSummonerId, "region": region}
			//console.log(encryptedSummonerId)
			Meteor.call("getCurrentGameInfoBySummonerId", params, (error, result) => {
				if( result.status.status_code === 404)
					return "Hiba";
				else
					this.currentGame = result;
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
},
}
</script>

<style lang="sass" scoped>

</style>