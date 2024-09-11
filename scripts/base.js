/**
 * Shortcut for document.write.
 * @param {any[]} args - The arguments to pass to document
 */
function dw(...args) {
  document.write(...args);
}

/**
 * Creates a div element.
 * @param {string} classes - The classes to add to the div
 * @param {string} styleOrContent - The style or content of the div
 * @param {string} content - The content of the div
 * @returns The div element
 */
function div(classes, styleOrContent, content) {
  const style = content != undefined ? styleOrContent : "";
  let innerHTML = content != undefined ? content : styleOrContent;
  if (Array.isArray(innerHTML)) {
    innerHTML = innerHTML.join("");
  }
  return `<div class="${classes}" style="${style}">${innerHTML}</div>`;
}

/**
 * Inits the base styles and scripts.
 */
function initBase() {
  dw(`
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
  `);
}

/**
 * Adds a Google Font to the page.
 * @param {string} fontLink - The link to the Google Font (e.g. https://fonts.googleapis.com/css2?family=XXXX:wght@400..900&display=swap)
 * @param {boolean} asBase - Whether to set the font as the base font (e.g. for the body)
 */
function addGoogleFont(fontLink, asBase = false) {
  dw(`<link rel="stylesheet" href="${fontLink}"/>`);

  // if asBase is true, set the font as the base font
  if (asBase) {
    const fontName = fontLink.split("?family=")[1].split(":")[0].split("&")[0];
    dw(`<style> body { font-family: '${fontName}', sans-serif; } </style>`);
  }
}

/**
 * Fetches a URL synchronously.
 * @param {string} url - The URL to fetch
 * @param {string} method - The method to use (e.g. GET, POST)
 * @param {string} body - The body of the request
 * @returns The response text
 */
function syncFetch(url, method = "GET", body = null) {
  const request = new XMLHttpRequest();
  request.open(method, url, false);
  request.send(body);

  if (request.status === 200) {
    return request.responseText;
  }

  throw new Error(`Failed to fetch ${url}: ${request.status}`);
}

initBase();

window._bigjk ??= {};
window._bigjk.base = true;

console.log("base.js loaded");
