import { formPage as renderPage } from "./form-page.js";
import { formTitleDescription } from "./form-title-description.js";

export function renderForm(container, form) {
  const wrapper = document.createElement("form");

  wrapper.classList.add("form");
  document.body.classList.add(`${form?.theme}` || "BLUE");

  const formHeading = formTitleDescription({
    formTitle: form?.title ?? "",
    formDescription: form?.description ?? "",
  });

  if (formHeading) {
    wrapper.appendChild(formHeading);
  }

  let currentPageIdx = 0;

  const totalPages = Array.isArray(form?.formPage) ? form.formPage.length : 0;

  let currentPage = form?.formPage?.[currentPageIdx];

  if (!currentPage) return null;

  const formPage = renderPage({ page: currentPage });

  if (formPage) {
    wrapper.appendChild(formPage);
  }

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "fluoce-form-buttons";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear";
  clearBtn.className = "fluoce-form-clear-button";
  btnWrapper.appendChild(clearBtn);

  clearBtn.addEventListener("click", () => {
    wrapper.reset();
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = totalPages > currentPageIdx + 1 ? "Next" : "Submit";
  submitBtn.className = "fluoce-form-submit-button";

  function renderCurrentPage() {
    const oldPage = wrapper.querySelector(".fluoce-form-page");
    if (oldPage) oldPage.remove();

    const page = form.formPage[currentPageIdx];
    if (!page) return;

    const newPage = renderPage({ page });

    if (newPage) {
      wrapper.insertBefore(newPage, btnWrapper);
    }
    submitBtn.textContent = currentPageIdx < totalPages - 1 ? "Next" : "Submit";
  }

  const pagesData = {};

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!wrapper.checkValidity()) {
      wrapper.reportValidity();
      return;
    }
    const formData = new FormData(wrapper);
    const data = Object.fromEntries(formData.entries());
    const pageId =
      form?.formPage?.[currentPageIdx]?.id ?? `page_${currentPageIdx}`;
    pagesData[pageId] = data;
    if (currentPageIdx < totalPages - 1) {
      currentPageIdx++;
      renderCurrentPage();
    } else {
      const formData = new FormData(wrapper);
      const data = Object.fromEntries(formData.entries());
      const pageId =
        form?.formPage?.[currentPageIdx]?.id ?? `page_${currentPageIdx}`;
      pagesData[pageId] = data;
      console.log("Collected data by pages:", pagesData);
      // Prevent form reload by not calling wrapper.submit();
      // Instead, handle the form submission here (e.g., send data via fetch or trigger a custom event)
      // Example: dispatch a custom event with the collected data
      const submitEvent = new CustomEvent("fluoceFormSubmit", {
        detail: { allPagesData: pagesData },
      });
      wrapper.dispatchEvent(submitEvent);
    }
  });

  btnWrapper.appendChild(submitBtn);

  wrapper.appendChild(btnWrapper);

  const brandDiv = document.createElement("div");
  brandDiv.className = "fluoce-brand";
  brandDiv.innerHTML = `
    <span class="form-powered-by">Powered by -</span>
    <a class="fluoce-link" target="_blank" rel="noopener noreferrer" href="https://fluoce.com">Fluoce</a>
  `;
  wrapper.appendChild(brandDiv);

  container.appendChild(wrapper);
}
