(function () {
  "use strict";

  /* ---------- Rok v patičce ---------- */
  var rokEl = document.getElementById("rok");
  if (rokEl) {
    rokEl.textContent = new Date().getFullYear();
  }

  /* ---------- Navbar: stín při scrollu ---------- */
  var navbar = document.getElementById("navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Hero: scroll na "Objevte gym" bez změny URL ---------- */
  var heroScroll = document.querySelector(".hero__scroll");
  if (heroScroll) {
    heroScroll.addEventListener("click", function (event) {
      var target = document.querySelector(heroScroll.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ---------- Mobilní menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navMobile.hidden = isOpen;
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMobile.hidden = true;
      });
    });
  }

  /* ---------- Trenéři: zaseknutá sekce, scroll dolů = horizontální scroll ---------- */
  var trainersPin = document.getElementById("trainersPin");
  var trainersTrack = document.getElementById("trainersTrack");
  var trainersCarousel = trainersPin ? trainersPin.querySelector(".trainers-carousel") : null;

  if (trainersPin && trainersTrack && trainersCarousel) {
    var trainersExtraScroll = 0;
    var trainersTopOffset = 0;

    // Zaseknutý carousel vycentrujeme přesně na střed viewportu, ať je displej
    // jakkoliv vysoký; pod fixní navbar ale nikdy nesmí zajet. Musí jít o
    // stejnou hodnotu, na které se řádek reálně vizuálně zasekne (žádný
    // transform navrch) — jinak by se v momentě zaseknutí "teleportoval"
    // přes obsah, který ještě neodscrolloval pryč.
    var setupTrainersPin = function () {
      trainersExtraScroll = Math.max(0, trainersTrack.scrollWidth - trainersTrack.clientWidth);

      var navbar = document.getElementById("navbar");
      var navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      var carouselHeight = trainersCarousel.offsetHeight;
      var centeredTop = (window.innerHeight - carouselHeight) / 2;
      trainersTopOffset = Math.max(navbarHeight + 16, centeredTop);
      trainersCarousel.style.top = trainersTopOffset + "px";

      trainersPin.style.height = trainersExtraScroll > 0 ? carouselHeight + trainersExtraScroll + "px" : "";
    };

    // Horizontální posun probíhá jen přesně v okně, kdy je carousel "zaseknutý"
    // (sticky) na trainersTopOffset — mimo toto okno by se karty stíhaly a
    // useklo by se jejich zobrazení, ať se scrolluje nahoru, nebo dolů.
    var updateTrainersPin = function () {
      if (trainersExtraScroll <= 0) return;
      var rect = trainersPin.getBoundingClientRect();
      var progress = Math.min(Math.max((trainersTopOffset - rect.top) / trainersExtraScroll, 0), 1);
      trainersTrack.scrollLeft = progress * trainersExtraScroll;
    };

    setupTrainersPin();
    updateTrainersPin();

    window.addEventListener("scroll", updateTrainersPin, { passive: true });

    // Na mobilu schování/zobrazení adresního řádku při scrollu vyvolá "resize"
    // se stejnou šířkou — přepočet za běhu by zaseknutému řádku trhnul pozicí.
    // Přepočítáváme proto jen při skutečné změně šířky okna.
    var trainersLastWidth = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth === trainersLastWidth) return;
      trainersLastWidth = window.innerWidth;
      setupTrainersPin();
      updateTrainersPin();
    });
  }

  /* ---------- Jemné oživení: fade-in při scrollu ---------- */
  var revealTargets = document.querySelectorAll(
    ".feature-card, .lesson-card, .trainer-card, .pricing-card, .faq-item, .values__item, .contact-info__item"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Kontaktní formulář (Formspree + honeypot) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot — pokud je vyplněný, jde o bota, formulář potichu "odešleme"
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        status.textContent = "Děkujeme za zprávu.";
        status.dataset.state = "success";
        form.reset();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      status.textContent = "Odesílám…";
      status.removeAttribute("data-state");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Děkujeme, ozveme se vám co nejdřív.";
            status.dataset.state = "success";
            form.reset();
          } else {
            status.textContent = "Zprávu se nepodařilo odeslat, zkuste to prosím znovu nebo napište na hsgymcz@gmail.com.";
            status.dataset.state = "error";
          }
        })
        .catch(function () {
          status.textContent = "Zprávu se nepodařilo odeslat, zkuste to prosím znovu nebo napište na hsgymcz@gmail.com.";
          status.dataset.state = "error";
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------- Cookie lišta ---------- */
  var CONSENT_KEY = "hsgym-cookie-consent";
  var banner = document.getElementById("cookieBanner");
  var modal = document.getElementById("cookieModal");
  var statsToggle = document.getElementById("cookieStats");
  var marketingToggle = document.getElementById("cookieMarketing");

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(CONSENT_KEY));
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify(Object.assign({ necessary: true, timestamp: Date.now() }, consent))
    );
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    if (banner) banner.hidden = false;
  }

  function openModal() {
    if (!modal) return;
    var existing = readConsent();
    if (statsToggle) statsToggle.checked = !!(existing && existing.stats);
    if (marketingToggle) marketingToggle.checked = !!(existing && existing.marketing);
    modal.hidden = false;
  }

  function closeModal() {
    if (modal) modal.hidden = true;
  }

  if (!readConsent()) {
    showBanner();
  }

  var acceptBtn = document.getElementById("cookieAcceptBtn");
  var rejectBtn = document.getElementById("cookieRejectBtn");
  var settingsBtn = document.getElementById("cookieSettingsBtn");
  var saveBtn = document.getElementById("cookieSaveBtn");
  var closeBtn = document.getElementById("cookieModalClose");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      saveConsent({ stats: true, marketing: true });
      hideBanner();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      saveConsent({ stats: false, marketing: false });
      hideBanner();
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", openModal);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      saveConsent({
        stats: !!(statsToggle && statsToggle.checked),
        marketing: !!(marketingToggle && marketingToggle.checked),
      });
      closeModal();
      hideBanner();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
})();
