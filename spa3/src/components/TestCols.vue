<template>
	<div class="container mt-4">
		#TESTCOLS
		<div class="row">
			<!-- First Column -->
			<div ref="col1Ref" class="col bg-light border p-3" :style="{ flexBasis: col1Width + 'px' }">
				Column 1
			</div>

			<!-- Resizer Handle -->
			<div class="resizer" @mousedown="startResize">

			</div>

			<!-- Second Column -->
			<div ref="col2Ref" class="col bg-light border p-3" :style="{ flexBasis: col2Width + 'px' }">
				Column 2
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const colsWidth = ref(0);
const col1Ref = ref<HTMLDivElement | null>(null);
const col2Ref = ref<HTMLDivElement | null>(null);
const col1Width = ref(0);
const col2Width = ref(0);
let startX = 0;
let startWidth1 = 0;
let startWidth2 = 0;

onMounted(() => {
	if (col1Ref.value && col2Ref.value) {
		col1Width.value = col1Ref.value.clientWidth ?? 0;
		col2Width.value = col2Ref.value.clientWidth ?? 0;

		colsWidth.value = col1Width.value + col2Width.value;
	}
});

const startResize = (event: MouseEvent) => {
	startX = event.clientX;
	startWidth1 = col1Width.value;
	startWidth2 = col2Width.value;

	document.addEventListener('mousemove', doResize);
	document.addEventListener('mouseup', stopResize);
};

const doResize = (event: MouseEvent) => {
	const deltaX = event.clientX - startX;

	// Calculate new widths with a maximum width of 150px for each column to prevent overflow
	const newCol1Width = Math.max(150, startWidth1 + deltaX);
	const newCol2Width = Math.max(150, startWidth2 - deltaX);

	// Ensure columns stay within their minimum widths and prevent overflow
	if (newCol1Width + newCol2Width <= startWidth1 + startWidth2) {
		col1Width.value = newCol1Width;
		col2Width.value = newCol2Width;
	}

	console.log('NEW> startWidth:', (startWidth1 + startWidth2) + ' / ' + (newCol1Width + newCol2Width), 'col1Width', col1Width.value, 'col2Width', col2Width.value, 'startWidth1', startWidth1, 'startWidth2', startWidth2, 'deltaX', deltaX, 'startX', startX, 'event.clientX', event.clientX);
};

const stopResize = () => {
	document.removeEventListener('mousemove', doResize);
	document.removeEventListener('mouseup', stopResize);
};
</script>

<style scoped>
.row {
	display: flex;
	align-items: stretch;
}

.col {
	transition: flex-basis 0.1s;
}

.resizer {
	width: 8px;
	cursor: ew-resize;
	background: #007bff;
	margin: 0 4px;
	position: relative;
	height: auto;
}
</style>
