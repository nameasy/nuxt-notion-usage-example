<script setup="">
import { ref, computed } from 'vue';

const props = defineProps(['project']);
const showAllTags = ref(false);

const isVideo = (url) => {
	const videoExtension = /\.mp4$/i;
	return videoExtension.test(url);
};

const toggleTagsDisplay = () => {
	showAllTags.value = !showAllTags.value;
};

const displayedTags = computed(() => {
	return showAllTags.value ? props.project.tags : props.project.tags.slice(0, 2);
});
</script>

<template>
	<article class="card">
		<figure v-if="project.cover" class="card__figure">
			<video v-if="isVideo(project.cover)" autoplay class="card__video" loop playsinline="" :src="project.cover"></video>
			<img v-else="" alt="" class="card__image" loading="lazy" :src="project.cover" />
		</figure>
		<!--<h3 class="link card__title">{{ project.title }}</h3>-->
		<h3 class="card__title">{{ project.title }}</h3>
		<ul v-if="project.tags.length > 0" class="card__tags-list">
			<li v-for="(tag, index) in displayedTags" :key="index" class="card__tags-item">
				<a class="button card__tags-button" href="!#">{{ tag }}</a>
			</li>
			<li v-if="project.tags.length > 2 && !showAllTags" class="card__tags-item">
				<button @click="toggleTagsDisplay" class="button card__tags-button" type="button">...</button>
			</li>
		</ul>
	</article>
</template>
