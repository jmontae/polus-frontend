<script>
	import Breadcrumbs from "../components/Breadcrumbs.vue"
	import CatalogItem from "../components/CatalogItem.vue"

	export default {
		name: 'CatalogComponent',
		data() {
			return {
				type: '',
				service: '',
				category: '',
				catalog: this.$hrcaseCatalog,
				service_level: false,
				cat_level: false,
				sub_level: false,
				tree: {}
			}
		}, 
		components: { CatalogItem, Breadcrumbs },
		created: function() {
			this.type = this.$route.params.type,
			this.service = this.$route.params.service,
			this.category = this.$route.params.category;

			if (this.type) {

				if(this.category) {
					this.cat_level = true;
					this.service_level = this.sub_level = !this.cat_level;

					switch(this.type.toLowerCase()) {
						case 'incident':
							this.tree = this.$incidentCatalog.get(this.category);
							break;

						case 'hrcase':
							this.tree = this.$hrcaseCatalog.get(this.category);
							break;

						default:
							break;

					}
				} else {
					this.service_level = true;
					this.cat_level = this.sub_level = !this.service_level;

					switch(this.type.toLowerCase()) {
						case 'incident':
							this.tree = this.$incidentCatalog.get(this.service);
							break;

						case 'hrcase':
							this.tree = this.$hrcaseCatalog.get(this.service);
							break;

						default:
							break;

					}
				}
			}
		},
		methods: {
			goTo(value, param) {
				switch(param) {
					case 'to_category': 
						this.tree = this.catalog.get(value);
						break;

					case 'to_subcategory':
						this.isSubLevel = true;
						this.tree = this.catalog.get(value);
						break;

					case "to_form":
						this.$router.push({ path: `/${this.service}/${this.category}/${value}`});
						break;
				}
			}
		}
	}
</script>

<template>
	<div class="page catalog_page">
		{{ this.$hrcaseCatalog }}
		<div v-if="isServiceLevel">
			<Breadcrumbs :root="this.$baseURL" :type="form.type" :service="service" />
		</div>
		<div else v-if="isCatLevel">
			<Breadcrumbs :root="this.$baseURL" :type="form.type" :service="service" :category="category" />
		</div>
			<div v-for="(item, index) in tree.children" class="catalog_item__service" :key="index">
				<CatalogItem :value='item.value' :click="goTo(item.value, 'to_category')" />
			</div>
	</div>
</template>

<style>
.catalog_page {
	min-width: 50%;
	display: flex;
	flex-flow: wrap;
	justify-content: space-around;
}
</style>