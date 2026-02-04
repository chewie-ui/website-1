export default function initNotif() {
  const publicationNames = document.querySelectorAll(
    ".notification .post-name",
  );

  publicationNames.forEach((publication) => {
    publication.addEventListener("click", () => {
      const publicationId = publication.getAttribute("data-post-id");
    });
  });
}
