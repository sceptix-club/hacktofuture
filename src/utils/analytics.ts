declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_ID = "G-26PQ42Z45J";

export const pageview = (url: string, title: string) => {
  window.gtag("config", GA_ID, {
    page_path: url,
    page_title: title,
  });
};
