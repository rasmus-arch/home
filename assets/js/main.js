(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Stäng meny" : "Öppna meny");
    });
  }

  // Magnetic buttons: nudge toward the cursor within their own bounds. Pointer devices only.
  if (!reduceMotion && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty("--tx", (x * 0.18).toFixed(1) + "px");
        btn.style.setProperty("--ty", (y * 0.35).toFixed(1) + "px");
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.setProperty("--tx", "0px");
        btn.style.setProperty("--ty", "0px");
      });
    });
  }

  // Case study cards: floating "Se detaljer" tag that follows the cursor.
  document.querySelectorAll(".case-card").forEach(function (card) {
    var tag = card.querySelector(".case-follow-tag");
    if (!tag) return;
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      tag.style.left = e.clientX - rect.left + "px";
      tag.style.top = e.clientY - rect.top + "px";
    });
  });

  // Case study category filters
  var filterButtons = document.querySelectorAll(".case-filter");
  var caseCards = document.querySelectorAll(".case-card");
  if (filterButtons.length && caseCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) {
          b.setAttribute("aria-pressed", "false");
        });
        btn.setAttribute("aria-pressed", "true");
        var category = btn.dataset.filter;
        caseCards.forEach(function (card) {
          var match = category === "alla" || card.dataset.category === category;
          card.hidden = !match;
        });
      });
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
            "Något gick fel när meddelandet skulle skickas. Försök gärna igen om en stund."
          );
        }
      })
      .catch(function () {
        showStatus(
          "error",
          "Något gick fel när meddelandet skulle skickas. Försök gärna igen om en stund."
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
