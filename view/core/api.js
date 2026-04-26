const baseUrl = "https://form-servise/form/public";

// Create a beautiful loader element and center it in the parent with min-h-screen
function createBeautifulLoader() {
  const loader = document.createElement("div");
  loader.className = "fluoce-beautiful-loader";
  loader.innerHTML = `
    <div class="loader-spinner">
      <div></div><div></div><div></div><div></div>
    </div>
    <style>
      .fluoce-form {
        min-height: 100vh !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        /* This ensures the loader centers with min-h-screen (min-height: 100vh) */
      }
      .fluoce-beautiful-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: none;
      }
      .loader-spinner {
        display: inline-block;
        position: relative;
        width: 60px;
        height: 60px;
      }
      .loader-spinner div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 48px;
        height: 48px;
        margin: 6px;
        border: 4px solid rgb(16, 0, 255);
        border-radius: 50%;
        animation: fluoce-loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: rgb(16, 0, 255) transparent transparent transparent;
      }
      .loader-spinner div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .loader-spinner div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .loader-spinner div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes fluoce-loader-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
  `;
  return loader;
}

export async function fetchForm({ formId }) {
  if (!formId) return null;
  const targetDiv = document.querySelector(".fluoce-form");
  let loaderEl;
  if (targetDiv) {
    loaderEl = createBeautifulLoader();
    // Remove all children to ensure only loader is present during loading/centering
    targetDiv.innerHTML = "";
    targetDiv.appendChild(loaderEl);

    // Ensure parent is flex (for vertical centering, in case min-h-screen matters)
    targetDiv.style.minHeight = "100vh";
    targetDiv.style.display = "flex";
    targetDiv.style.justifyContent = "center";
    targetDiv.style.alignItems = "center";
  }
  try {
    const res = await fetch(`${baseUrl}/${formId}`);
    if (res) {
      const data = await res.json();
      return data?.data?.form;
    }
  } catch (error) {
    console.log("form load error", error);
  } finally {
    if (loaderEl && loaderEl.parentNode) {
      loaderEl.parentNode.removeChild(loaderEl);
    }
    // Optionally, remove the inline styles after loader is removed
    if (targetDiv) {
      targetDiv.style.removeProperty("display");
      targetDiv.style.removeProperty("justify-content");
      targetDiv.style.removeProperty("align-items");
      targetDiv.style.removeProperty("min-height");
    }
  }
}
