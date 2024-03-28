<script setup="">
import { ref, computed } from 'vue';

const props = defineProps(['article']);
const showAllTags = ref(false);

const isVideo = (url) => {
	const videoExtension = /\.mp4$/i;
	return videoExtension.test(url);
};

const toggleTagsDisplay = () => {
	showAllTags.value = !showAllTags.value;
};

const displayedTags = computed(() => {
	return showAllTags.value ? props.article.tags : props.article.tags.slice(0, 2);
});
</script>

<template>
	<article class="card">
		<figure v-if="article.cover" class="card__figure">
			<video v-if="isVideo(article.cover)" autoplay class="card__video" loop playsinline="" :src="article.cover"></video>
			<img v-else="" alt="" class="card__image" loading="lazy" :src="article.cover" />
		</figure>
		<!--<h3 class="link card__title">{{ article.title }}</h3>-->
		<h3 class="card__title">{{ article.title }}</h3>
		<ul v-if="article.tags.length > 0" class="card__tags-list">
			<li v-for="(tag, index) in displayedTags" :key="index" class="card__tags-item">
				<a class="button card__tags-button" href="!#">{{ tag }}</a>
			</li>
			<li v-if="article.tags.length > 2 && !showAllTags" class="card__tags-item">
				<button @click="toggleTagsDisplay" class="button card__tags-button" type="button">...</button>
			</li>
		</ul>
	</article>
</template>
