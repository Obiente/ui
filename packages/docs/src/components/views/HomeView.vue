<template>
  <Container>
    <Stack :gap="6">
      <HeroSection />
      <FeatureShowcase />
      <QuickStartGuide />
      <CommunitySection />
    </Stack>
  </Container>
</template>

<script setup lang="ts">
  import { Container, Stack } from "@obiente/ui";
  import HeroSection from "../home/HeroSection.vue";
  import FeatureShowcase from "../home/FeatureShowcase.vue";
  import QuickStartGuide from "../home/QuickStartGuide.vue";
  import CommunitySection from "../home/CommunitySection.vue";
</script>
