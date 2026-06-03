<template>
  <div class="news-feed-wrapper">
    <div class="header-container d-flex align-center px-4">
      <slot name="header" />
    </div>

    <div class=" pa-4">
      <v-row no-gutters>
        <slot name="content" />
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.news-feed-wrapper {
  background-color: #0f141c;
  border: 4px solid #1e293b;
  width: 100%;
}

.header-container {
  height: 65px;
  border-bottom: 1px solid #1e293b;
}

:deep(.header-title) {
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1.5px;
  font-size: 1.15rem;
}
</style>
