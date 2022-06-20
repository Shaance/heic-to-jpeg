<script lang="ts">
  import { totalFiles, processedFiles } from './stores';
  import { fade } from 'svelte/transition';
</script>

<p transition:fade>
  Converted {$processedFiles} out of {$totalFiles} images..
</p>