<script lang="ts">
  import HeicFileDrop from "./lib/HeicFileDrop.svelte";
  import heic2any from "heic2any";
  import JSZip from "JSZip";
  import DownloadBtn from "./lib/DownloadBtn.svelte";
  import Loading from "./lib/Loading.svelte";
  import { totalFiles, processedFiles, progress } from './lib/stores';
  import ProgressBar from "./lib/ProgressBar.svelte";

  let zipDataUrl: string;
  let converting = false;
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

    console.time("handle1");

    var zip = new JSZip();
    const folderName = "converted";
    zip.folder(folderName);

    processedFiles.set(0);
    totalFiles.set(files.length);
    converting = true;
    for (const file of files) {
      const newName = changeExtension(file, ".heic", ".jpeg");
      console.log(newName);
      const converted = (await heic2any({
        blob: file,
        toType: "image/jpeg",
      })) as Blob;
      zip.file(`${folderName}/${newName}`, converted, { binary: true });
      processedFiles.update(n => n + 1);
      progress.set($processedFiles / $totalFiles);
    }

    zip.generateAsync({ type: "base64" }).then((base64) => {
      zipDataUrl = `data:image/zip;base64,` + base64;
      console.timeEnd("handle1");
      converting = false;
    });
  }
</script>

<main>
  <h1> HEIC converter </h1>
  <HeicFileDrop {handleFiles} />

  {#if zipDataUrl}
    <DownloadBtn {zipDataUrl} {zipName}/>
  {:else if converting}
    <Loading />
    <ProgressBar />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 30rem;
  }

  @media (max-width: 480px) {
    h1 {
      max-width: none;
      font-size: 2.5rem;
    }
  }
</style>
