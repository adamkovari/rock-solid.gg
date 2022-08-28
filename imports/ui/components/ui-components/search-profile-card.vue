<template>
	<v-card
			class="mx-auto"
			elevation="2"
	>
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
			
			<v-list-item-avatar
					tile
					size="160"
			>
				<img
					v-bind:src="this.profileIcon"
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
	}
}
</script>

<style lang="sass" scoped>

</style>