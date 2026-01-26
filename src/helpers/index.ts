export const navigateTo = (path: string) => {
  window.location.href = `${window.location.pathname.replace(/\/$/, '')}/${path}`;
}