import '../imports/api/fixtures'
import '../imports/api/methods'
import '../imports/api/publications'

import { fetch, Headers, Request, Response } from 'meteor/fetch';

console.log("SERVER - X-Riot-Token - " + Meteor.settings.XRiotToken);

if(Meteor.isDevelopment)
	console.log("SERVER - Development - True")
if(Meteor.isProduction)
	console.log("SERVER - Production - True")

Meteor.methods({

	/* DEPRECATED
	 * @param {int} profileIconId
	 */
	_dep_getProfileIconAssetById(id) {
		const path = "/profileicon/" + id + ".png";
		//console.log(Assets.absoluteFilePath(path))
		return Assets.absoluteFilePath(path);
	},

	/*
	 * @param {int} profileIconId
	 */
	getProfileIconAssetById(id, category) {
		//console.log(Meteor.settings.public.assetURL + category + "/" + id + ".png");
		return Meteor.settings.public.assetURL + category + "/" + id + ".png";
	},

	/*
	 * @param {int} mapId
	 */
	getMapIconAssetById(id) {
		return Meteor.settings.public.assetURL + "map" + "/map" + id + ".png";
	},

	/*
	 * @param {string} summonerName
	 * @param {string} region
	 */
	getSummonerbySummonerName: function ({summonerName: summonerName, region: region}) {
		console.log("SERVER METHOD: summonerName: " + summonerName + " region: " + region )

		let request = gerCorsServerIfDevelopment() + getLolServerURLByRegion(region) + 'summoner/v4/summoners/by-name/' + encodeURIComponent(summonerName);

		return getSummonerBySummonerName(request)
			.then((results) => {
				 console.log(results);
				 return results })
			.catch((error) => { return error })
	},

	/*
	 * @param {string} encryptedSummonerId
	 * @param {string} region
	 */
	getCurrentGameInfoBySummonerId: function ({encryptedSummonerId: encryptedSummonerId, region: region}) {
		//console.log("SERVER METHOD: encryptedSummonerId(" + encryptedSummonerId + ")")
		let request = gerCorsServerIfDevelopment() + getLolServerURLByRegion(region) + 'spectator/v4/active-games/by-summoner/' + encryptedSummonerId;

		return getCurrentGameInfoBySummonerId(request)
			.then((results) => { //console.log(results);
				 return results })
			.catch((error) => { return error })
	},

	/*
	 * @param {string} encryptedPUUID
	 * @param {string} region
	 */
	getListOfMatchesByPUUID: function ({encryptedPUUID: encryptedPUUID, region: region, count: count=10}) {
		//console.log("SERVER METHOD: encryptedPUUID(" + encryptedPUUID + ")")
		let request = gerCorsServerIfDevelopment() + getLolServerRegionURLByRegion(region) + 'match/v5/matches/by-puuid/' +  encryptedPUUID + '/ids?count=' + count;

		return getListOfMatchesByPUUID(request)
			.then((results) => { //console.log(results);
				return results })
			.catch((error) => { return error })
	},

	getMatchByMatchId: function ({matchId: matchId, region: region}) {
		//console.log("SERVER METHOD: matchId(" + matchId + ")")
		let request = gerCorsServerIfDevelopment() + getLolServerRegionURLByRegion(region) + 'match/v5/matches/' +  matchId;

		return getMatchByMatchId(request)
			.then((results) => { //console.log(results);
				 return results })
			.catch((error) => { return error })
	}
})

//lol/summoner/v4/summoners/by-name/{summonerName}
async function getSummonerBySummonerName (url) {
	console.log(url);
	return sendRequestToLolAPI(url)
}

//lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}
async function getCurrentGameInfoBySummonerId (url) {
	console.log(url)
	return sendRequestToLolAPI(url)
}

//lol/match/v5/matches/by-puuid/{puuid}/ids
async function getListOfMatchesByPUUID (url) {
	console.log(url)
	return sendRequestToLolAPI(url)
}

//lol/match/v5/matches/{matchId}
async function getMatchByMatchId (url) {
	console.log(url)
	return sendRequestToLolAPI(url)
}

function gerCorsServerIfDevelopment() {
	if(Meteor.isDevelopment) {
		return 'https://cors-anywhere.herokuapp.com/';
	}
	else {
		return '';
	}
}

function getLolServerURLByRegion(region = 'br1') {
	return 'https://' + region.toLowerCase() + '.api.riotgames.com/lol/';
}

function getLolServerRegionURLByRegion(region = 'br1') {
	region = region.toLowerCase();
	if(region.includes('br'))
		region = Meteor.settings.public.regions.BR
	if(region.includes('na'))
		region = Meteor.settings.public.regions.NA
	if(region.includes('la'))
		region = Meteor.settings.public.regions.LAS
	if(region.includes('kr'))
		region = Meteor.settings.public.regions.KR
	if(region.includes('jp'))
		region = Meteor.settings.public.regions.JS
	if(region.includes('eu'))
		region = Meteor.settings.public.regions.EUNE
	if(region.includes('tr'))
		region = Meteor.settings.public.regions.TR
	if(region.includes('ru'))
		region = Meteor.settings.public.regions.RU
	if(region.includes('oce'))
		region = Meteor.settings.public.regions.OCE

	return 'https://' + region + '.api.riotgames.com/lol/';
}

async function sendRequestToLolAPI(url) {
	return new Promise(function (resolve, reject) {
		fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: new Headers({
				'X-Riot-Token': Meteor.settings.XRiotToken,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'X-Requested-With': 'XMLHttpRequest',

			}),
			referrerPolicy: 'origin'
		}).then(async (serverPromise) => {
			if (serverPromise.ok) {
				serverPromise.json().then((json) => resolve(json));
			} else {
				serverPromise.json().then((json) => reject(json));
			}
		}).catch(async (error) => {
			reject(error)
		});

	})
}
