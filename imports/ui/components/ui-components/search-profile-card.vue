<template>
	<v-card
			class="mx-auto"
			elevation="2"
	>
		<v-row>
			<v-col cols="3">
				<v-list-item three-line>
					<v-list-item-content>
						<div class="text-overline mb-4">
							Level: {{ account.summonerLevel }}
						</div>
						<v-list-item-title class="text-h5 mb-1" v-text="account.name">
						</v-list-item-title>
						<v-list-item-subtitle>
						
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-col>
			<v-col cols="6" align="center" class="d-flex justify-space-around">
				<v-hover
						v-slot="{ hover }"
						open-delay="200"
						v-for="entry in leagueEntries"
				>
					<v-card rounded :elevation="hover ? 16 : 2"
					        :class="{ 'on-hover': hover }"
					>
						<div>
							<div class="text-overline mb-4">
							</div>
							<v-list-item-title class="text-h10 mb-1">
								{{ entry.queueType }}
							</v-list-item-title>
							<v-card-title>
								{{ entry.tier }} -
								{{ entry.rank }}
							</v-card-title>
							<v-card-text>
								LeaguePoints : {{ entry.leaguePoints }}
								<v-divider class="mx-1"></v-divider>
								Wins: {{ entry.wins }}
								<v-divider class="mx-1"></v-divider>
								Losses: {{ entry.losses }}
							</v-card-text>
							<v-list-item-avatar
									tile
									size="80"
							>
								<img
										:src="getTierIcon(entry.tier,entry.rank)"
								>
							</v-list-item-avatar>
						</div>
					</v-card>
				</v-hover>
			</v-col>
			<v-col cols="3">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-avatar
								tile
								size="160"
						>
							<img
									v-bind:src="this.profileIcon"
							>
						</v-list-item-avatar>
					</v-list-item-content>
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
					<p class="font-weight-bold">accountId:</p><p>{{ account.accountId }}</p>
					<p class="font-weight-bold">puuid:</p><p>{{ account.puuid }}</p>
					<p class="font-weight-bold">revisionDate:</p><p>{{ new Date(account.revisionDate) }}</p>
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script lang="js">
export default {
	name: "search-profile-card",
	props: {
		account: Object,
		leagueEntries: Array,
	},
	data() {
		return {
			profileIcon: null,
			show: false,
		}
	},
	async mounted() {
		await this.$nextTick(function() {
			/*
				Meteor.call("getProfileIconAssetById", this.account.profileIconId, (error, path) => {
					console.log(path);
					this.profileIcon = path;
				})
				
			 */
			Meteor.call("getProfileIconAssetById",this.account.profileIconId, "profileicon", (error, result) => {
				this.profileIcon = result;
			});
			})
	},
	updated() {
		Meteor.call("getProfileIconAssetById",this.account.profileIconId, "profileicon", (error, result) => {
			this.profileIcon = result;
		});
	},
	methods: {
		getTierIcon: function (tier, rank) {
			return "/assets/tier-icons/" + tier.toLowerCase() + "_" + rank.toLowerCase() + ".png";
		}
	},
}
</script>

<style lang="sass" scoped>

</style>