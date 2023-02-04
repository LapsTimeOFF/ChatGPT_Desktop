import { api } from "../electron/preload/index";
export {};
declare global {
  interface Window {
    ChatGPT_API: typeof api;
  }
}
