export function formPageField({ field }) {
  if (!field) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "fluoce-field";
  wrapper.id = `${field?.id}`;

  let el = null;

  switch (field?.config?.type) {
    case "text": {
      el = document.createElement("input");
      el.type = "text";
      el.className = "fluoce-field-input";
      break;
    }

    case "textarea": {
      el = document.createElement("textarea");
      el.className = "fluoce-field-textarea";
      break;
    }

    case "number": {
      el = document.createElement("input");
      el.type = "number";
      el.className = "fluoce-field-input";
      break;
    }

    case "email": {
      el = document.createElement("input");
      el.type = "email";
      el.className = "fluoce-field-input";
      break;
    }

    case "phone": {
      el = document.createElement("input");
      el.type = "number";
      el.className = "fluoce-field-input";
      break;
    }

    case "url": {
      el = document.createElement("input");
      el.type = "text";
      el.className = "fluoce-field-input";
      break;
    }

    case "date": {
      el = document.createElement("input");
      el.type = "date";
      el.className = "fluoce-field-input";
      break;
    }

    case "dropdown": {
      el = document.createElement("select");
      el.className = "fluoce-field-select";

      if (Array.isArray(field?.config?.options)) {
        field.config.options.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option.value;
          opt.textContent = option.label;
          el.appendChild(opt);
        });
      }
      break;
    }

    case "radio": {
      el = document.createElement("div");
      el.className = "fluoce-field-radio-group";
      if (Array.isArray(field?.config?.options)) {
        field.config.options.forEach((option, idx) => {
          const radioWrapper = document.createElement("label");
          radioWrapper.className = "fluoce-field-radio-label";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = field?.id;
          input.value = option.value;
          input.className = "fluoce-field-radio";
          const inputId = field?.id + "-option-" + idx;
          input.id = inputId;
          radioWrapper.htmlFor = inputId;
          radioWrapper.appendChild(input);
          const radioText = document.createElement("span");
          radioText.textContent = option.label;
          radioWrapper.appendChild(radioText);
          el.appendChild(radioWrapper);
        });
      }
      break;
    }

    case "checkbox": {
      el = document.createElement("div");
      el.className = "fluoce-field-checkbox-group";
      if (Array.isArray(field?.config?.options)) {
        field.config.options.forEach((option, idx) => {
          const checkboxWrapper = document.createElement("label");
          checkboxWrapper.className = "fluoce-field-checkbox-label";
          const input = document.createElement("input");
          input.type = "checkbox";
          input.name = field?.id;
          input.value = option.value;
          input.className = "fluoce-field-checkbox";
          const inputId = field?.id + "-option-" + idx;
          input.id = inputId;
          checkboxWrapper.htmlFor = inputId;
          checkboxWrapper.appendChild(input);
          const checkboxText = document.createElement("span");
          checkboxText.textContent = option.label;
          checkboxWrapper.appendChild(checkboxText);
          el.appendChild(checkboxWrapper);
        });
      }
      break;
    }

    default:
      return;
  }

  el.name = field?.id;
  el.id = field?.config?.label;
  el.placeholder = field?.config?.placeholder || "";
  if (field?.config?.required) {
    el.required = true;
  }

  if (field?.config?.label || field?.config?.helpText) {
    const metaWrapper = document.createElement("div");
    metaWrapper.className = "fluoce-field-meta";

    if (field?.config?.label) {
      const label = document.createElement("label");
      label.className = "fluoce-field-label";
      label.htmlFor = field.id;

      const text = document.createElement("span");
      text.textContent = field.config.label;
      label.appendChild(text);

      if (field?.config?.required) {
        const star = document.createElement("span");
        star.className = "fluoce-field-required";
        star.textContent = " *";

        label.appendChild(star);
      }

      metaWrapper.appendChild(label);
    }

    if (field?.config?.helpText) {
      const helpText = document.createElement("span");
      helpText.className = "fluoce-field-helptext";
      helpText.textContent = field.config.helpText;
      metaWrapper.appendChild(helpText);
    }

    wrapper.appendChild(metaWrapper);
  }

  wrapper.appendChild(el);

  return wrapper.childNodes && wrapper.childNodes.length ? wrapper : null;
}
