(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Contact form: Web3Forms submission with honeypot + minimum-time spam checks.
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var renderedAt = Date.now();
  var statusEl = form.querySelector(".form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  function showStatus(kind, message) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status is-visible " + kind;
  }

  form.addEventListener("submit", function (event) {
    var honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.checked) {
      // Silently drop likely-bot submissions.
      event.preventDefault();
      showStatus("success", "Tack för ditt meddelande! Jag återkommer så snart jag kan.");
      form.reset();
      return;
    }

    var elapsed = Date.now() - renderedAt;
    if (elapsed < 2500) {
      event.preventDefault();
      showStatus("error", "Formuläret skickades in väldigt snabbt — vänta ett par sekunder och försök igen.");
      return;
    }

    // Progressive enhancement: submit via fetch so the visitor doesn't leave the page.
    event.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = "Skickar...";
    }

    var formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { success: response.ok };
        });
      })
      .then(function (data) {
        if (data && data.success) {
          showStatus("success", "Tack för ditt meddelande! Jag återkommer så snart jag kan.");
          form.reset();
          renderedAt = Date.now();
        } else {
          showStatus(
            "error",
            "Något gick fel när meddelandet skulle skickas. Ring gärna istället, eller försök igen om en stund."
          );
        }
      })
      .catch(function () {
        showStatus(
          "error",
          "Något gick fel när meddelandet skulle skickas. Ring gärna istället, eller försök igen om en stund."
        );
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || "Skicka meddelande";
        }
      });
  });
})();
