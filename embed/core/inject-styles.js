export function injectStyles(css) {
  let style = document.getElementById("fluoce-styles");

  if (!style) {
    style = document.createElement("style");
    style.id = "fluoce-styles";
    document.head.appendChild(style);
  }

  style.innerHTML = css;
}
