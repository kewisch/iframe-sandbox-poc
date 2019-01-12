/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2019 */

async function sha512(str) {
  const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

(async function() {
  let sandbox = document.getElementById("sandbox");
  let code = await fetch(browser.runtime.getURL("/playground/sandbox.js")).then(resp => resp.text());
  console.log("sha512-" + await sha512(code));


  let doc = `<html><head><script>${code}</script></head></html>`;
  sandbox.setAttribute("srcdoc", doc);

  window.addEventListener("message", (e) => {
    if (e.origin !== "null" || e.source !== sandbox.contentWindow || !e.data) {
      return;
    }
    let { action, args } = e.data;

    switch (action) {
      case "log":
        console.log(...args);
        break;
      case "openurl":
        // Security check, only open https urls
        if (args.length > 0 && args[0].match(/https?:/)) {
          browser.tabs.create({ url: args[0] });
        }
        break;
      case "result":
        if (e.data.error) {
          console.error(e.data.error);
        }
        break;
    }
  });

  document.getElementById("button").addEventListener("click", (e) => {
    let userscript = document.getElementById("textarea").value;
    sandbox.contentWindow.postMessage(userscript, "*");
  });
})();
