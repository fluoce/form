import { fetchForm } from "./core/api.js";
import { getFormIdFrom } from "./core/form-id.js";
import { renderForm } from "./core/renderer.js";

const formId = getFormIdFrom();

const form = await fetchForm({
  formId,
});

const container = document.querySelector(".fluoce-form");

if (!form) {
  container.innerHTML = `
    <div style=" text-align: center">
      <strong>Unable to load the form.</strong><br />
      <small>If this problem persists, ensure the form exists and you have access. <a href="https://fluoce.com" target="_blank" style="color: var(--primary); text-decoration: underline;">Get Help</a></small>
    </div>
  `;
} else {
  renderForm(container, form);
}
