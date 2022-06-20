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
    background-color: #eeeeee;
    padding: 30px;
    border: 2px solid #dddddd;
    margin-bottom: 50px;
  }
  .droppable {
    border-color: #1f79ff;
  }
</style>
