<script lang="ts">
  import HeicFileDrop from "./lib/HeicFileDrop.svelte";
  import heic2any from "heic2any";
  import JSZip from "jszip";
  import DownloadBtn from "./lib/DownloadBtn.svelte";
  import Loading from "./lib/Loading.svelte";
  import { totalFiles, processedFiles, progress, converting } from "./lib/stores";
  import AboutFooter from "./lib/AboutFooter.svelte";

  let zipDataUrl: string;
  const zipName = "converted.zip";

  function changeExtension(
    file: File,
    oldExtension: string,
    newExtension: string
  ): string {
    return file.name.replace(oldExtension, newExtension);
  }

  async function handleFiles(files: File[]) {
    if (!files) {
      return;
    }

    // new zip
    if (zipDataUrl) {
      zipDataUrl = null;
      progress.set(0);
    }

    var zip = new JSZip();
    const folderName = "converted";
    zip.folder(folderName);

    processedFiles.set(0);
    totalFiles.set(files.length);
    converting.set(true);
    for (const file of files) {
      const newName = changeExtension(file, ".heic", ".jpeg");
      const converted = (await heic2any({
        blob: file,
        toType: "image/jpeg",
      })) as Blob;
      zip.file(`${folderName}/${newName}`, converted, { binary: true });
      processedFiles.update((n) => n + 1);
      progress.set($processedFiles / $totalFiles);
    }

    zip.generateAsync({ type: "base64" }).then((base64) => {
      zipDataUrl = `data:image/zip;base64,` + base64;
      converting.set(false);
    });
  }
</script>

<main>
  <h1>HEIC converter</h1>
  <HeicFileDrop {handleFiles} />

  {#if zipDataUrl}
    <DownloadBtn {zipDataUrl} {zipName} />
  {:else if $converting}
    <Loading />
  {/if}

  <AboutFooter />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  :global(body) {
    background-color: rgb(57, 57, 57);
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #082233;
    text-transform: uppercase;
    font-size: 3.5rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 30rem;
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    h1 {
      max-width: none;
      font-size: 2.5rem;
    }
  }
</style>
