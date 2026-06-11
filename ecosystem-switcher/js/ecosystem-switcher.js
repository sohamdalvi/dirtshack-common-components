(function () {
  "use strict";

  var portals = window.DIRTSHACK_ECOSYSTEM_PORTALS || [];
  var meta = window.DIRTSHACK_ECOSYSTEM_META || {};
  var mounts = document.querySelectorAll("[data-ecosystem-switcher]");

  if (!portals.length || !mounts.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileMq = window.matchMedia("(max-width: 760px)");

  function normalizeHost(hostname) {
    return (hostname || "").toLowerCase().replace(/^www\./, "");
  }

  function getCurrentPortalId(mount) {
    var override = mount.getAttribute("data-current-portal");
    if (override) return override;

    var hostname = normalizeHost(window.location.hostname);
    var matched = portals.find(function (portal) {
      return (portal.hostnames || []).some(function (host) {
        return normalizeHost(host) === hostname;
      });
    });

    return matched ? matched.id : "brand";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function createPortalCard(portal, currentPortalId) {
    var isActive = portal.id === currentPortalId;
    var cardClasses = "ecosystem-card" + (isActive ? " is-active" : "");
    var href = escapeHtml(portal.url);
    var extraAttrs = isActive ? ' aria-current="page"' : "";

    return (
      '<a class="' + cardClasses + '" href="' + href + '" role="listitem"' + extraAttrs + ">" +
        '<span class="ecosystem-card-icon" aria-hidden="true">' + escapeHtml(portal.icon) + "</span>" +
        '<span class="ecosystem-card-copy">' +
          '<span class="ecosystem-card-topline">' +
            '<span class="ecosystem-card-title">' + escapeHtml(portal.label) + "</span>" +
            (isActive ? '<span class="ecosystem-card-badge">Current Portal</span>' : "") +
          "</span>" +
          '<span class="ecosystem-card-description">' + escapeHtml(portal.description) + "</span>" +
          '<span class="ecosystem-card-url">' + escapeHtml(portal.url.replace(/^https?:\/\//, "")) + "</span>" +
        "</span>" +
      "</a>"
    );
  }

  function renderSwitcher(mount) {
    var currentPortalId = getCurrentPortalId(mount);
    var currentPortal = portals.find(function (portal) { return portal.id === currentPortalId; }) || portals[0];
    var listMarkup = portals.map(function (portal) {
      return createPortalCard(portal, currentPortalId);
    }).join("");

        mount.innerHTML =
      '<div class="ecosystem-switcher" data-state="closed">' +
        '<button class="ecosystem-switcher-trigger" type="button" aria-expanded="false" aria-haspopup="dialog" aria-controls="ecosystem-panel-' + escapeHtml(currentPortalId) + '">' +
          '<span class="visually-hidden">DirtShack ecosystem switcher</span>' +
          '<img class="ecosystem-trigger-mark ecosystem-trigger-mark--switch" src="/assets/img/ecosystem-switcher-map-switch.png" alt="" width="32" height="32" aria-hidden="true" />' +
          '<svg class="ecosystem-trigger-caret" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 7.5 5 5 5-5"/></svg>' +
        "</button>" +
        '<div class="ecosystem-backdrop" hidden></div>' +
        '<section class="ecosystem-panel" id="ecosystem-panel-' + escapeHtml(currentPortalId) + '" role="dialog" aria-label="' + escapeHtml(meta.title || "DirtShack Ecosystem") + '" hidden>' +
          '<div class="ecosystem-panel-head">' +
            '<p class="ecosystem-panel-eyebrow">Ecosystem</p>' +
            '<div class="ecosystem-panel-heading">' +
              '<h2>' + escapeHtml(meta.title || "DirtShack Ecosystem") + "</h2>" +
              '<p>' + escapeHtml(meta.subtitle || "") + "</p>" +
            "</div>" +
            '<button class="ecosystem-close" type="button" aria-label="Close ecosystem switcher">' +
              '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15"/></svg>' +
            "</button>" +
          "</div>" +
          '<div class="ecosystem-panel-grid" role="list">' + listMarkup + "</div>" +
          '<p class="ecosystem-panel-foot">Currently viewing <strong>' + escapeHtml(currentPortal.label) + "</strong>.</p>" +
        "</section>" +
      "</div>";
  }

  function closeSwitcher(root, trigger, panel, backdrop) {
    root.dataset.state = "closed";
    root.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    backdrop.hidden = true;
  }

  function openSwitcher(root, trigger, panel, backdrop) {
    root.dataset.state = "open";
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    backdrop.hidden = !mobileMq.matches;
  }

  function bindSwitcher(mount) {
    renderSwitcher(mount);

    var root = mount.querySelector(".ecosystem-switcher");
    var trigger = root.querySelector(".ecosystem-switcher-trigger");
    var panel = root.querySelector(".ecosystem-panel");
    var closeButton = root.querySelector(".ecosystem-close");
    var backdrop = root.querySelector(".ecosystem-backdrop");
    var hoverTimer = null;

    function isOpen() {
      return root.classList.contains("is-open");
    }

    function open(fromKeyboard) {
      if (isOpen()) return;
      openSwitcher(root, trigger, panel, backdrop);
      if (fromKeyboard && !mobileMq.matches) {
        window.requestAnimationFrame(function () {
          var firstCard = panel.querySelector(".ecosystem-card:not(.is-active)");
          if (firstCard) firstCard.focus();
        });
      }
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      closeSwitcher(root, trigger, panel, backdrop);
      if (returnFocus) trigger.focus();
    }

    trigger.addEventListener("click", function () {
      if (!mobileMq.matches) {
        open(false);
        return;
      }
      if (isOpen()) close(false);
      else open(false);
    });

    closeButton.addEventListener("click", function () {
      close(true);
    });

    backdrop.addEventListener("click", function () {
      close(false);
    });

    root.addEventListener("mouseenter", function () {
      if (mobileMq.matches) return;
      window.clearTimeout(hoverTimer);
      open(false);
    });

    root.addEventListener("mouseleave", function () {
      if (mobileMq.matches) return;
      hoverTimer = window.setTimeout(function () {
        close(false);
      }, reduceMotion ? 0 : 140);
    });

    root.addEventListener("focusin", function () {
      open(false);
    });

    root.addEventListener("focusout", function (event) {
      if (root.contains(event.relatedTarget)) return;
      close(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        close(true);
      }
    });

    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (!root.contains(event.target)) {
        close(false);
      }
    });

    if (mobileMq.addEventListener) {
      mobileMq.addEventListener("change", function () {
        if (!mobileMq.matches && backdrop) backdrop.hidden = true;
        if (mobileMq.matches && isOpen()) backdrop.hidden = false;
      });
    } else if (mobileMq.addListener) {
      mobileMq.addListener(function () {
        if (!mobileMq.matches && backdrop) backdrop.hidden = true;
        if (mobileMq.matches && isOpen()) backdrop.hidden = false;
      });
    }
  }

  mounts.forEach(bindSwitcher);
})();
