declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_ID = "G-R5JWHN2VLN";

export const pageview = (url: string) => {
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};
