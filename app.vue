<script setup="" lang="ts">
import { ref, onMounted } from 'vue';
import CardComponent from '@/components/Card.vue';

useHead({
	htmlAttrs: {
		lang: 'ru',
	},
	title: 'It’s Nice That Articles',
	meta: [
		{
			name: 'title',
			content: 'It’s Nice That Articles',
		},
		{
			property: 'og:type',
			content: 'website',
		},
		{
			property: 'og:url',
			content: 'https://example.com/',
		},
		{
			property: 'og:title',
			content: 'It’s Nice That Articles',
		},
		{
			property: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			property: 'twitter:url',
			content: 'https://example.com/',
		},
		{
			property: 'twitter:title',
			content: 'It’s Nice That Articles',
		},
	],
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossorigin: '',
		},
		{
			href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap',
			rel: 'stylesheet',
		},
	],
});

const projects = ref([]);

const fetchProjects = async () => {
	try {
		const response = await fetch('/api/notion');
		const data = await response.json();
		projects.value = data.projects;
	} catch (error) {
		console.error(error);
	}
};

onMounted(fetchProjects);
</script>

<template>
	<main class="main">
		<section class="section">
			<h1 class="section__title">It’s Nice That Articles</h1>
			<ul class="article-list">
				<li v-for="(project, index) in projects" :key="index" class="article-list__item">
					<card-component :project="project"></card-component>
				</li>
			</ul>
		</section>
	</main>
</template>
