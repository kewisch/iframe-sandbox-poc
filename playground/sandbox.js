/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2019 */

/* exported log, openurl */

var log, openurl;

window.addEventListener("message", (e) => {
  function createForwarder(action) {
    return function(...args) {
      e.source.postMessage({ action, args }, e.origin);
    };
  }

  log = createForwarder("log");
  openurl = createForwarder("openurl");

  try {
    result = eval(e.data);
    e.source.postMessage({ action: "result", result: result }, e.origin);
  } catch (ex) {
    e.source.postMessage({ action: "result", error: ex.toString() }, e.origin);
  }
});
