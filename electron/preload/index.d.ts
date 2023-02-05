import { ChatGPT_API, Config_API } from "./index";
export {};
declare global {
  interface Window {
    ChatGPT_API: typeof ChatGPT_API;
    Config_API: typeof Config_API;
  }
}
