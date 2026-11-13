(() => {
  "use strict";
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const colorScheme = matchMedia("(prefers-color-scheme: dark)");
  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${dark ? "light" : "dark"} theme`,
    );
    document.querySelector('meta[name="theme-color"]').content = dark
      ? "#0b0b0e"
      : "#fbfbfd";
  }
  setTheme(root.dataset.theme || (colorScheme.matches ? "dark" : "light"));
  themeToggle.hidden = false;
  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("ming-theme", next);
    } catch (_) {
      /* Theme still works without storage. */
    }
  });
  colorScheme.addEventListener("change", (event) => {
    try {
      if (localStorage.getItem("ming-theme")) return;
    } catch (_) {}
    setTheme(event.matches ? "dark" : "light");
  });

  // Type, pause, erase, and rotate the research interests beside the email.
  const focusText = document.getElementById("research-focus");
  if (focusText) {
    const interests = [
      "Multimodal LLMs.",
      "Agentic RL.",
      "Visual Grounding.",
      "Video Understanding.",
      "Agentic Search.",
    ];
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let interestIndex = 0;
    let letterCount = interests[0].length;
    let deleting = true;
    let focusTimer;

    function typeInterest() {
      if (reducedMotion.matches || document.hidden) return;
      const word = interests[interestIndex];
      letterCount += deleting ? -1 : 1;
      focusText.textContent = word.slice(0, letterCount);
      let delay = deleting ? 38 : 78;
      if (!deleting && letterCount === word.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && letterCount === 0) {
        deleting = false;
        interestIndex = (interestIndex + 1) % interests.length;
        delay = 380;
      }
      focusTimer = setTimeout(typeInterest, delay);
    }

    function syncFocusAnimation() {
      clearTimeout(focusTimer);
      focusText.classList.toggle("is-animated", !reducedMotion.matches && !document.hidden);
      if (reducedMotion.matches) {
        interestIndex = 0;
        letterCount = interests[0].length;
        deleting = true;
        focusText.textContent = interests[0];
      } else if (!document.hidden) {
        focusTimer = setTimeout(typeInterest, 1900);
      }
    }
    reducedMotion.addEventListener("change", syncFocusAnimation);
    document.addEventListener("visibilitychange", syncFocusAnimation);
    syncFocusAnimation();
  }

  const publications = [...document.querySelectorAll(".publication")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  function filterPublications(key) {
    let count = 0;
    publications.forEach((paper) => {
      const visible =
        key === "all" ||
        (key === "selected"
          ? paper.dataset.selected === "true"
          : paper.dataset.category === key);
      paper.hidden = !visible;
      if (visible) count++;
    });
    document.querySelectorAll(".publication-group").forEach((group) => {
      const visible = group.querySelectorAll(".publication:not([hidden])").length;
      group.hidden = visible === 0;
      group.querySelector(".group-count").textContent = visible;
    });
    filters.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === key),
      ),
    );
    document.getElementById("publication-count").textContent =
      `${count} / ${publications.length} papers`;
  }
  filters.forEach((button) =>
    button.addEventListener("click", () =>
      filterPublications(button.dataset.filter),
    ),
  );
  document.querySelector(".publication-toolbar").hidden = false;
  filterPublications("all");

  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks.map((link) =>
    document.querySelector(link.getAttribute("href")),
  );
  const progress = document.querySelector(".reading-progress");
  let ticking = false;
  function updateScroll() {
    const max = root.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 0}%`;
    const marker = document.querySelector(".site-header").offsetHeight + 90;
    let current = null;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    if (max > 0 && scrollY >= max - 4) current = sections[sections.length - 1];
    navLinks.forEach((link) => {
      if (current && link.getAttribute("href") === `#${current.id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    ticking = false;
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    },
    { passive: true },
  );
  addEventListener("resize", updateScroll);
  updateScroll();

  // Keep earlier homepage bookmarks useful after the redesign.
  const legacyAnchors = {
    "about-me": "about",
    "-news": "news",
    "-publications": "publications",
    "-honors-and-awards": "recognition",
    "-educations": "about",
    "-internships": "journey",
    "-services": "recognition",
  };
  function restoreLegacyAnchor() {
    let hash;
    try {
      hash = decodeURIComponent(location.hash.slice(1));
    } catch (_) {
      return;
    }
    if (!legacyAnchors[hash]) return;
    const target = legacyAnchors[hash];
    history.replaceState(null, "", `#${target}`);
    document.getElementById(target).scrollIntoView({ behavior: "instant" });
  }
  restoreLegacyAnchor();
  addEventListener("hashchange", restoreLegacyAnchor);

  const dialog = document.querySelector(".figure-dialog");
  if (typeof dialog.showModal === "function") {
    const expanded = dialog.querySelector("img");
    let originalOverflow = "";
    document.querySelectorAll("[data-lightbox]").forEach((link) =>
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const image = link.querySelector("img");
        expanded.src = link.href;
        expanded.alt = image.alt;
        dialog.querySelector(".figure-caption").textContent = image.alt;
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
      }),
    );
    dialog
      .querySelector("button")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = originalOverflow;
    });
  }
})();
