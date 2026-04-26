import { formPageField } from "./form-page-field.js";

export function formPage({ page }) {
  const wrapper = document.createElement("div");
  wrapper.classList = "fluoce-form-page";
  wrapper.id = `${page?.id}`;

  if (page?.formField?.length) {
    page?.formField?.forEach((field) => {
      const fieldElement = formPageField({ field });
      if (fieldElement) wrapper.appendChild(fieldElement);
    });
  }

  return wrapper?.childNodes?.length ? wrapper : null;
}
