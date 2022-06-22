<script lang="ts">
  import { fade } from "svelte/transition";
  export let zipDataUrl: string;
  export let zipName: string;
  export let onClick = () => {};
</script>

<button class= "tertiary" transition:fade on:click={onClick}>
  <a href={zipDataUrl} download={zipName}>
    <p>Download</p>
  </a>
</button>

<style>
  button {
    border: 2px solid rgb(69,64,104);
    background-color: #373b45;

    font-size: .875rem;
    line-height: 1.28572;
    letter-spacing: .16px;
    position: relative;
    display: inline-flex;
    max-width: 20rem;
    min-height: 3rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    border-radius: 0;
    cursor: pointer;
    outline: none;
    text-align: left;
    text-decoration: none;
    /* transition: background 70ms cubic-bezier(0, 0, 0.38, 0.9),box-shadow 70ms cubic-bezier(0, 0, 0.38, 0.9),border-color 70ms cubic-bezier(0, 0, 0.38, 0.9),outline 70ms cubic-bezier(0, 0, 0.38, 0.9); */
    /* vertical-align: top; */
  }

.tertiary {
    min-height: 2rem;
    border-width: 1px;
    border-style: solid;
    border-color: #fff;
    background-color: rgba(0,0,0,0);
    color: #fff;
    height: 20px;
    padding: 12px;
    /* padding-right: 10px; */
}

  a {
    text-decoration: none;
    color: #fff;
  }

  p {
    font-weight: 100;
    font-size: 13px;
  }
</style>