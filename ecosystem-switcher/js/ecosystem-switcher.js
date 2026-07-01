(function () {
  "use strict";

  var portals = window.DIRTSHACK_ECOSYSTEM_PORTALS || [];
  var meta = window.DIRTSHACK_ECOSYSTEM_META || {};
  var mounts = document.querySelectorAll("[data-ecosystem-switcher]");

  if (!portals.length || !mounts.length) return;

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

    return matched ? matched.id : portals[0].id;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function createPortalItem(portal, currentPortalId) {
    var isActive = portal.id === currentPortalId;
    var itemClasses = "ecosystem-item" + (isActive ? " is-active" : "");
    var href = escapeHtml(portal.url);
    var extraAttrs = isActive ? ' aria-current="page"' : "";
    var label = escapeHtml(portal.label);
    var shortLabel = escapeHtml(portal.shortLabel || portal.label);

    return (
      '<a class="' + itemClasses + '" href="' + href + '"' + extraAttrs + ">" +
        '<span class="ecosystem-item-icon" aria-hidden="true">' + portal.icon + "</span>" +
        '<span class="ecosystem-item-label ecosystem-item-label--desktop">' + label + "</span>" +
        '<span class="ecosystem-item-label ecosystem-item-label--mobile">' + shortLabel + "</span>" +
      "</a>"
    );
  }

  function renderSwitcher(mount) {
    var currentPortalId = getCurrentPortalId(mount);
    var itemsMarkup = portals.map(function (portal) {
      return createPortalItem(portal, currentPortalId);
    }).join("");

    mount.innerHTML =
      '<nav class="ecosystem-nav" aria-label="' + escapeHtml(meta.title || "DirtShack Ecosystem") + '">' +
        itemsMarkup +
      "</nav>";
  }

  mounts.forEach(renderSwitcher);
})();
