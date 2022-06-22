import { writable } from 'svelte/store';
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

export const totalFiles = writable(0);
export const processedFiles = writable(0);
export const converting = writable(false);
export const progress = tweened(0, {
  duration: 400,
  easing: cubicOut,
});
