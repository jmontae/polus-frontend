<script>
export default {
	name: "QueryComponent",
	props: ['text', 'options', 'type'],
	data() {
		return { value: null }
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
	},
	mounted() {
		//if the query is a checkbox, make the value an array type
		this.value = this.isCheck ? [] : null;
	},
	methods: {
		//when the query is updated, it'll emit an event to the parent for recording the value
		sendData(value, text) {
			this.$emit('update', { value, text });
		}
	}
}
</script>

<template>
	<div class="query" v-if="isCheck || isRadio">
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<div class='option' v-for="(option, index) in options" :key="index">
				<input :type="type" :id="index" :value="option" v-on:change="sendData(value, text)" v-model='value'>
				<label :for="option"> {{ option }}</label>
			</div>
		</div>
	</div>
	<div class="query" v-else-if="isTextArea">
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<textarea class='textarea' rows="10" v-model="value" v-on:keyup="sendData(value, text)" placeholder="type here..."></textarea>
		</div>
	</div>
	<div class="query" v-else>
		<h4 class="query_text">{{ text }}</h4>
		<div class="query_value">
			<input :type="type" v-model="value" v-on:keyup="sendData(value, text)" placeholder="...">
		</div>
	</div>
</template>


<style>
.query {
	padding: 10px 0;
	margin-bottom: 20px;
}

input[type=text] {
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
</style>