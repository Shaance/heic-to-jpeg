<script lang="ts">
  import { fade } from "svelte/transition";
  export let zipDataUrl: string;
  export let zipName: string;
  export let onClick = () => {};
</script>

<button transition:fade on:click={onClick}>
  <a href={zipDataUrl} download={zipName}>
    <p>Download</p>
  </a>
</button>

<style>
  button {
    border: 2px solid rgb(143, 134, 208);
    background-color: #676c7b;
    border-radius: 5px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  p {
    font-weight: 100;
    font-size: medium;
  }
</style>