<script lang="ts">
  import { fade } from "svelte/transition";
  export let zipDataUrl: string;
  export let zipName: string;
  export let onClick = () => {};
</script>

<button transition:fade on:click={onClick}>
  <a href={zipDataUrl} download={zipName}>
    <p>Download converted files</p>
  </a>
</button>
