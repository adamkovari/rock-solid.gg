import '../imports/api/fixtures'
import '../imports/api/methods'
import '../imports/api/publications'

import { fetch, Headers, Request, Response } from 'meteor/fetch';

console.log("SERVER - X-Riot-Token - " + Meteor.settings.XRiotToken);

Meteor.methods({

	/*
	 * @param {int} profileIconId
	 */
	getProfileIconAssetById(id) {
		const path = "/profileicon/" + id + ".png";
		//console.log(Assets.absoluteFilePath(path))
		return Assets.absoluteFilePath(path);
	},

	/*
	 * @param {string} summonerName
	 */
	getSummonerbySummonerName: function ({summonerName: summonerName, region: region}) {
		console.log("SERVER METHOD: summonerName: " + summonerName + " region: " + region )

		let request = gerCorsServerIfDevelopment() + getLolServerURLByRegion(region) + 'summoner/v4/summoners/by-name/'

		return getSummonerBySummonerName(request, summonerName)
			.then((results) => { console.log(results); return results })
			.catch((error) => { return error })
	},

	/*
	 * @param {string} encryptedSummonerId
	 */
	getCurrentGameInfoBySummonerId: function ({encryptedSummonerId: encryptedSummonerId, region: region}) {
		//console.log("SERVER METHOD: encryptedSummonerId(" + encryptedSummonerId + ")")
		let request = gerCorsServerIfDevelopment() + getLolServerURLByRegion(region) + 'spectator/v4/active-games/by-summoner/'

		return getCurrentGameInfoBySummonerId(request, encryptedSummonerId)
			.then((results) => { console.log(results); return results })
			.catch((error) => { return error })
	},

})

//lol/summoner/v4/summoners/by-name/{summonerName}
async function getSummonerBySummonerName (url, data) {
	console.log(url + data);
	return sendRequestToLolAPI(url, data)
}

//lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}
async function getCurrentGameInfoBySummonerId (url, data) {
	console.log(url + data)
	return sendRequestToLolAPI(url, data)
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

async function sendRequestToLolAPI(url, data) {
	return new Promise(function (resolve, reject) {
		fetch(url + data, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: new Headers({
				'X-Riot-Token': Meteor.settings.XRiotToken,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
