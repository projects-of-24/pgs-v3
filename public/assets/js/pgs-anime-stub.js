/**
 * Chrome hygiene: Hostinger main.js calls global `anime` but anime.js is not shipped.
 * No-op stub stops ReferenceError without pulling theme animation into modular bodies.
 * Motion stays deferred (figma-modular-own-css).
 */
(function (w) {
  if (typeof w.anime !== "undefined") return;

  function chainable() {
    return {
      add: function () {
        return this;
      },
      finished: Promise.resolve()
    };
  }

  function anime() {
    return chainable();
  }

  anime.timeline = function () {
    return chainable();
  };
  anime.stagger = function () {
    return 0;
  };

  w.anime = anime;
})(typeof window !== "undefined" ? window : globalThis);
