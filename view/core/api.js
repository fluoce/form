const baseUrl = "https://form-servise/form/public";

export async function fetchForm({ formId }) {
  if (!formId) return null;
  try {
    const res = await fetch(`${baseUrl}/${formId}`);
    if (res) {
      const data = await res.json();
      return data?.data?.form;
    }
  } catch (error) {
    alert("failed to load form");
  }
}
