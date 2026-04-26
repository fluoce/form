export function getFormIdFrom() {
  const match = window.location.pathname.match(/^\/f\/([^/]+)/);
  return match ? match[1] : null;
}
