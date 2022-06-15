import { RefObject } from 'react';

interface PostMessageParams {
  webview: RefObject<any>;
  config: { type: string; [x: string]: any };
}

async function postMessage({ webview, config }: PostMessageParams) {
  if (webview?.current) {
    webview.current.postMessage(JSON.stringify(config));
  }
  return false;
}

export { postMessage };
