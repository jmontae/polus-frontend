<script>
export default {
	name: "QueryComponent",
	props: ['text', 'options', 'type', 'subqries'],
	data() {
		return { value: null, subqueries: [] }
	},
	//check the type for the query's input type
	computed: {
		isCheck: function() {
			return this.type == "checkbox";
		},
		isRadio: function() {
			return this.type == "radio";
		},
		isTextArea: function() {
			return this.type == "textarea";
		},
		toggle: function() {
			let choice = (this.value != null) ? this.value.toLowerCase() : this.value
			if(choice == "no") { 
				this.subqueries.forEach( sqry => {
					delete sqry.value;
				});
			}
			if(this.type == 'radio' && this.subqueries ) {
				return (choice == "yes") ? true : false;
			}
			return false;
		}
	},
	mounted() {
		//if the query is a checkbox, make the value an array type
		this.value = this.isCheck ? [] : null;
		this.subqueries = this.subqries;
	},
	methods: {
		//when the query is updated, it'll emit an event to the parent for recording the value
		updateData(text, value = null) {
			if( value ) {
				this.$emit('update', { text, value });
			} else {
				this.$emit('update', { text, subqueries: this.subqueries });
			}
		}
	}
}
</script>

<template>
	<div class="query" v-if="isCheck || isRadio">
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<div class='option' v-for="(option, index) in options" :key="index">
				<input :type="type" :id="index" :value="option" v-on:change="updateData(text, value)" v-model='value'>
				<label :for="option"> {{ option }}</label>
			</div>
		</div>
		<div class="subqueries" v-show="toggle" v-if="subqueries">
			<div v-for="(qry, index) in subqueries" :key="index">
				<div class="subquery" v-if="qry.type === ('checkbox' || 'radio')">
					<h4 class="query_text">{{ qry.text }}</h4>
					<div class='query_value'>
						<div class='option' v-for="(option, index) in qry.options" :key="index">
							<input :type="qry.type" :id="index" :value="option" v-on:change="updateData(text)" v-model='qry.value'>
							<label :for="option"> {{ option }}</label>
						</div>
					</div>
				</div>
				<div class="subquery" v-else-if="qry.type === 'textarea'">
					<h4 class="query_text">{{ qry.text }}</h4>
					<div class="query_value">
						<textarea class='textarea' rows="10" v-model="qry.value" v-on:keyup="updateData(text)" placeholder="type here..."></textarea>
					</div>
				</div>
				<div class="subquery" v-else>
					<h4 class="query_text">{{ qry.text }}</h4>
					<div class="query_value">
						<input :type="qry.type" v-model="qry.value" v-on:keyup="updateData(text)" placeholder="...">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="query" v-else-if="isTextArea">
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<textarea class='textarea' rows="10" v-model="value" v-on:keyup="updateData(text, value)" placeholder="type here..."></textarea>
		</div>
	</div>
	<div class="query" v-else>
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<input :type="type" v-model="value" v-on:keyup="updateData(text, value)" placeholder="...">
		</div>
	</div>
</template>


<style>
.query, .subqueries, .subquery {
	padding: 10px 0;
	margin-bottom: 20px;
}

input[type=text], input[type=password] {
	font-size: 1rem;
	width: 300px;
	padding: 10px 5px;
}

.textarea {
	width: 80%;
	font-size: 1em;
}

.query_text {
	margin-bottom: 10px;
}

.option {
	margin: 5px 0;
}

@media screen and (max-width: 600px) {
	.textarea {
		width: 100%;
	}

}

.subqueries {
	margin-left: 30px;
}
</style>