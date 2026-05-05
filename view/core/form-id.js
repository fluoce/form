export function getFormIdFrom() {
  // Extracts the first segment after the domain as the form ID
  const path = window.location.pathname.replace(/^\/+/, ""); // remove any leading slashes
  const segments = path.split("/");
  return segments.length > 0 && segments[0] !== "" ? segments[0] : null;
}
