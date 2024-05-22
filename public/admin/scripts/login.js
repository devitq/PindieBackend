import { showTooltip } from "./dom-creators.js";

const form = document.querySelector(".auth-form");
form &&
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (response.status !== 200) {
        throw new Error((await response.json()).message);
      }
      const result = await response.json();

      if (!result.admin) {
        showTooltip("Недостаточно прав");
        return;
      }

      document.cookie = `jwt=${result.jwt}; path=/admin;`;
      window.location.href = "/admin";
    } catch (error) {
      showTooltip(error.message);
      return error;
    }
  });

const logoutButton = document.querySelector(".logout-button");
logoutButton &&
  logoutButton.addEventListener("click", async () => {
    document.cookie =
      "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
    window.location.href = "/admin/login";
  });

window.onload = function () {
  var urlParams = new URLSearchParams(window.location.search);
  var notAdminParam = urlParams.get("not_admin");
  if (notAdminParam === "true") {
    showTooltip("Недостаточно прав");
    var url = new URL(window.location.href);
    url.searchParams.delete("not_admin");
    history.replaceState({}, document.title, url.pathname + url.search);
  }
};
