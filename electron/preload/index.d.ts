import { api } from "./index";
export {};
declare global {
  interface Window {
    ChatGPT_API: typeof api;
  }
}
