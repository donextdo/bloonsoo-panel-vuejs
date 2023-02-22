<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const CENTER_X = 100;
  const CENTER_Y = 100;
  const RADIUS = 30;

  const positionOnCircle = (radius, angle, center) => {
    return {
      x: center.x + (radius * Math.cos(toRadians(angle))),
      y: center.y + (radius * Math.sin(toRadians(angle)))
    }
  }

  const toRadians = (angle) => {
    return angle * Math.PI / 180;
  }

  const circles = ref([
    {color: '#dbeafe', radius: 0},
    {color: '#bfdbfe', radius: 0},
    {color: '#93c5fd', radius: 0},
    {color: '#60a5fa', radius: 0},
    {color: '#3b82f6', radius: 0},
    {color: '#2563eb', radius: 0},
    {color: '#1d4ed8', radius: 0},
    {color: '#1e40af', radius: 0},
    {color: '#1e3a8a', radius: 0},
  ])

  const calculatePositions = () => {
    let angleIncrement = 360 / circles.value.length;
    let positions = [];
    circles.value.forEach((circle, index) => {
      positions.push(positionOnCircle(
        RADIUS,
        angleIncrement * index,
        {x: CENTER_X, y: CENTER_Y}
      ));
    });
    return positions;
  }

  const counter = ref(0)
  const interval = ref(null)

  const circlePositions = computed(() => {
    return calculatePositions(this)
  })

  onMounted(() => {
    interval.value = setInterval(() => {
      counter.value++;
      circles.value = circles.value.map((item, index) => ({
        ...item,
        radius: (counter.value + index) % 8
      }));
    }, 70)
  })

  onUnmounted(() => {
    clearInterval(interval.value)
  })

</script>

<template>
  <svg class="loading-spinner">
    <circle
      :cx="circlePositions[index] && circlePositions[index].x"
      :cy="circlePositions[index] && circlePositions[index].y"
      :r="item.radius"
      :fill="item.color"
      v-for="(item, index) in circles"
      :key="index"/>
  </svg>
</template>

<style scoped>
.loading-spinner {
  width: 200px;
  height: 200px;
}
</style>
