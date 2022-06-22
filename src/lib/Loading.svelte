<script lang="ts">
  import { totalFiles, processedFiles } from "./stores";
  import { fade } from "svelte/transition";
  import ProgressBar from "./ProgressBar.svelte";
</script>

{#if $processedFiles != $totalFiles}
  <p transition:fade class="labelText"> Image conversion status</p>
  <ProgressBar />
  <p transition:fade class="helperText">
    Converted {$processedFiles} out of {$totalFiles} images..
  </p>
{:else}
  <p transition:fade>Zipping your pictures..</p>
{/if}

<style>
  .labelText {
    color: #d1d0d0;
    font-weight: 400;
  }

  .helperText {
    color: #9d9c9d;
    font-size: 12px;
  }
</style>