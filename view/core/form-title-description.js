export function formTitleDescription({ formTitle = "", formDescription = "" }) {
  const wrapper = document.createElement("div");
  wrapper.className = "fluoce-form-header";

  if (formTitle) {
    const title = document.createElement("h2");
    title.className = "fluoce-form-title";
    title.innerText = formTitle;
    wrapper.appendChild(title);
  }

  if (formDescription) {
    const description = document.createElement("p");
    description.className = "fluoce-form-description";
    description.innerText = formDescription;
    wrapper.appendChild(description);
  }

  return wrapper.childNodes.length ? wrapper : null;
}
