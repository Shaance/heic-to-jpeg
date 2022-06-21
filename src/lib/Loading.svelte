<script lang="ts">
  import { totalFiles, processedFiles } from "./stores";
  import { fade } from "svelte/transition";
  import ProgressBar from "./ProgressBar.svelte";
</script>

{#if $processedFiles != $totalFiles}
  <p transition:fade>
    Converted {$processedFiles} out of {$totalFiles} images..
  </p>
  <ProgressBar />
{:else}
  <p transition:fade>Zipping your pictures..</p>
{/if}
