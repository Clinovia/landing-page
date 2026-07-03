export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;

  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};