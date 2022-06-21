<script lang="ts">
  import { FileDrop } from "svelte-droplet";
  
  export let handleFiles;
  const acceptedMimes = ["image/heic"];
</script>

<FileDrop {acceptedMimes} {handleFiles} let:droppable>
  <div class="zone" class:droppable>Select or drop HEIC files here</div>
</FileDrop>

<style>
  .zone {
    background-color: #676c7b;
    padding: 30px;
    border: 2px solid rgb(143, 134, 208);
    margin-bottom: 50px;
    font-weight: 250;
    border-radius: 5px;
  }
  .droppable {
    border-color: #1f79ff;
  }
</style>
