/* ==========================================================================
   HireFlow — app.js
   Shared component loader + marketplace UI (jQuery)
   ========================================================================== */

(function ($) {
  "use strict";

  /* ------------------------------------------------------------------
     0. Small helpers
     ------------------------------------------------------------------ */
  var escapeHtml = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  var ICONS = {
    heart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
  };

  /* ------------------------------------------------------------------
     1. Load shared components (header, navbar, footer)
     ------------------------------------------------------------------
     Primary path uses window.COMPONENTS (bundled by build.py) so the
     site works over BOTH http:// and file://. jQuery .load() is kept as
     a fallback only (it uses AJAX and is blocked by browsers on file://).
     ------------------------------------------------------------------ */
  var loadComponents = function () {
    var afterLoad = function () {
      bindNavbar();
      highlightActiveNav();
      setYear();
    };
    if (window.COMPONENTS) {
      $("#header").html(window.COMPONENTS.header);
      $("#navbar").html(window.COMPONENTS.navbar);
      $("#footer").html(window.COMPONENTS.footer);
      afterLoad();
    } else {
      var remaining = 3;
      var done = function () { if (--remaining === 0) { afterLoad(); } };
      $("#header").load("components/header.html", done);
      $("#navbar").load("components/navbar.html", done);
      $("#footer").load("components/footer.html", done);
    }
  };

  var highlightActiveNav = function () {
    var path = window.location.pathname.split("/").pop() || "index.html";
    $("#mainNav .nav-link").each(function () {
      var href = $(this).attr("href");
      if (href && href.indexOf(path) === 0) {
        $(this).addClass("active");
      }
    });
    if (!path || path === "") {
      $('#mainNav .nav-link[href="index.html"]').addClass("active");
    }
  };

  var bindNavbar = function () {
    var nav = $("#mainNav");
    var updateNav = function () {
      if ($(window).scrollTop() > 30) { nav.addClass("is-scrolled"); }
      else { nav.removeClass("is-scrolled"); }
    };
    updateNav();
    $(window).on("scroll.nav", updateNav);

    nav.find(".nav-link").on("click", function () {
      var collapse = $("#navMenu");
      if (collapse.hasClass("show")) {
        var bs = window.bootstrap && bootstrap.Collapse.getOrCreateInstance(collapse[0]);
        if (bs) { bs.hide(); }
      }
    });
  };

  var setYear = function () {
    $("#year").text(new Date().getFullYear());
  };

  /* ------------------------------------------------------------------
     2. Reveal on scroll
     ------------------------------------------------------------------ */
  var revealElements = function () {
    var items = $(".reveal");
    if (!items.length) { return; }
    var onScroll = function () {
      var vh = $(window).height();
      items.each(function () {
        var el = $(this);
        if (!el.hasClass("is-visible")) {
          if (el.offset().top < $(window).scrollTop() + vh - 70) {
            el.addClass("is-visible");
          }
        }
      });
    };
    onScroll();
    $(window).on("scroll.reveal", onScroll);
  };

  /* ------------------------------------------------------------------
     3. Animated counters
     ------------------------------------------------------------------ */
  var initCounters = function () {
    var counters = $("[data-count]");
    if (!counters.length) { return; }
    var started = {};
    var runCounter = function (el) {
      var $el = $(el);
      var id = $el.attr("data-count");
      if (started[id]) { return; }
      started[id] = true;
      var target = parseFloat($el.data("count"));
      var duration = parseInt($el.data("duration"), 10) || 1800;
      var start = null;
      var step = function (ts) {
        if (!start) { start = ts; }
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        $el.text(Math.floor(target * eased).toLocaleString());
        if (progress < 1) { requestAnimationFrame(step); }
        else { $el.text(target.toLocaleString()); }
      };
      requestAnimationFrame(step);
    };
    var check = function () {
      var vh = $(window).height();
      counters.each(function () {
        if (!started[$(this).attr("data-count")]) {
          if ($(this).offset().top < $(window).scrollTop() + vh - 60) {
            runCounter(this);
          }
        }
      });
    };
    check();
    $(window).on("scroll.counters", check);
  };

  /* ------------------------------------------------------------------
     4. Back to top
     ------------------------------------------------------------------ */
  var initBackToTop = function () {
    var btn = $(
      '<button class="back-to-top" aria-label="Back to top">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>' +
      "</button>"
    );
    $("body").append(btn);
    $(window).on("scroll.totop", function () {
      if ($(window).scrollTop() > 480) { btn.addClass("show"); }
      else { btn.removeClass("show"); }
    });
    btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  };

  /* ------------------------------------------------------------------
     5. Job marketplace
     ------------------------------------------------------------------ */
  var Marketplace = {
    jobs: [],
    saved: [],

    init: function () {
      var self = this;
      try {
        self.saved = JSON.parse(localStorage.getItem("hireflow_saved") || "[]");
      } catch (e) { self.saved = []; }

      this.loadJobs(function (jobs) {
        self.jobs = jobs || [];

        if ($("#homeJobs").length) { self.renderHome(); }
        if ($("#jobGrid").length) { self.renderGrid(); self.bindFilters(); }
        if ($("#relatedJobs").length) { self.renderRelated(); }

        self.bindSaveButtons();
        self.initSuggestions();
      });
    },

    loadJobs: function (done) {
      if (window.JOBS && window.JOBS.length) {
        done(window.JOBS);
      } else {
        $.getJSON("data/jobs.json", function (data) {
          done(data);
        }).fail(function () {
          done([]);
        });
      }
    },

    isSaved: function (id) {
      return this.saved.indexOf(id) !== -1;
    },

    cardHtml: function (job) {
      var modeSlug = job.workMode.toLowerCase();
      var tech = job.technology.map(function (t) {
        return '<span class="tech-tag">' + escapeHtml(t) + "</span>";
      }).join("");
      var saved = this.isSaved(job.id) ? " saved" : "";
      var pressed = this.isSaved(job.id) ? "true" : "false";
      return "" +
        '<div class="col-md-6 col-lg-4 job-col">' +
          '<article class="job-card" data-id="' + job.id + '">' +
            '<div class="job-card-top">' +
              '<div class="company-logo ' + escapeHtml(job.logoClass) + '">' + escapeHtml(job.initials) + "</div>" +
              '<button class="save-btn' + saved + '" type="button" data-id="' + job.id + '" aria-label="Save job" aria-pressed="' + pressed + '">' + ICONS.heart + "</button>" +
            "</div>" +
            '<h3 class="job-title">' + escapeHtml(job.title) + "</h3>" +
            '<p class="company-name">' + escapeHtml(job.company) + "</p>" +
            '<div class="job-meta">' +
              "<span>" + ICONS.pin + escapeHtml(job.location) + "</span>" +
              '<span class="job-salary">' + escapeHtml(job.salary) + "</span>" +
              "<span>" + ICONS.briefcase + escapeHtml(job.type) + "</span>" +
            "</div>" +
            '<div class="job-tags">' + tech + '<span class="work-mode-badge ' + modeSlug + '">' + escapeHtml(job.workMode) + "</span></div>" +
            '<div class="job-card-foot">' +
              '<a class="btn btn-primary btn-sm" href="job-details.html?id=' + job.id + '">Apply</a>' +
              '<span class="job-posted">' + escapeHtml(job.posted) + "</span>" +
            "</div>" +
          "</article>" +
        "</div>";
    },

    renderHome: function () {
      var items = this.jobs.slice(0, 6).map(function (j) { return this.cardHtml(j); }, this).join("");
      $("#homeJobs").html(items);
    },

    renderRelated: function () {
      var items = this.jobs.slice(0, 3).map(function (j) { return this.cardHtml(j); }, this).join("");
      $("#relatedJobs").html(items);
    },

    /* --- filtering / sorting for the jobs page --- */
    filtered: function () {
      var kw = ($("#jobSearch").val() || "").toLowerCase().trim();
      var loc = ($("#locationSearch").val() || "").toLowerCase().trim();
      var cat = $("#filterCategory").val();
      var exp = $("#filterExperience").val();
      var sal = $("#filterSalary").val();
      var typ = $("#filterType").val();
      var mode = $("#filterMode").val();

      var list = this.jobs.filter(function (job) {
        if (kw) {
          var hay = (job.title + " " + job.company + " " + job.technology.join(" ")).toLowerCase();
          if (hay.indexOf(kw) === -1) { return false; }
        }
        if (loc && job.location.toLowerCase().indexOf(loc) === -1) { return false; }
        if (cat !== "all" && job.category !== cat) { return false; }
        if (exp !== "all" && job.expLevel !== exp) { return false; }
        if (typ !== "all" && job.type.toLowerCase() !== typ) { return false; }
        if (mode !== "all" && job.workMode.toLowerCase() !== mode) { return false; }
        if (sal !== "all") {
          var parts = sal.split("-");
          var lo = parseInt(parts[0], 10) * 1000;
          var hi = parseInt(parts[1], 10) * 1000;
          if (job.salaryMax < lo || job.salaryMin > hi) { return false; }
        }
        return true;
      });

      var sort = $("#sortJobs").val();
      if (sort === "salary-desc") { list.sort(function (a, b) { return b.salaryMax - a.salaryMax; }); }
      else if (sort === "salary-asc") { list.sort(function (a, b) { return a.salaryMin - b.salaryMin; }); }
      else if (sort === "title") { list.sort(function (a, b) { return a.title.localeCompare(b.title); }); }

      return list;
    },

    renderGrid: function () {
      var list = this.filtered();
      var html = list.map(function (j) { return this.cardHtml(j); }, this).join("");
      $("#jobGrid").html(html);
      $("#resultCount").text(list.length);
      $("#noResults").toggle(list.length === 0);
      this.bindSaveButtons();
    },

    bindFilters: function () {
      var self = this;
      $("#jobSearch, #locationSearch").on("keyup", function () { self.renderGrid(); });
      $("#filterCategory, #filterExperience, #filterSalary, #filterType, #filterMode, #sortJobs")
        .on("change", function () { self.renderGrid(); });
      $("#resetFilters").on("click", function () {
        $("#jobSearch, #locationSearch").val("");
        $("#filterCategory, #filterExperience, #filterSalary, #filterType, #filterMode").val("all");
        $("#sortJobs").val("newest");
        self.renderGrid();
      });
    },

    bindSaveButtons: function () {
      var self = this;
      $(".save-btn").off("click").on("click", function () {
        var btn = $(this);
        var id = parseInt(btn.data("id"), 10);
        var idx = self.saved.indexOf(id);
        if (idx === -1) { self.saved.push(id); btn.addClass("saved").attr("aria-pressed", "true"); }
        else { self.saved.splice(idx, 1); btn.removeClass("saved").attr("aria-pressed", "false"); }
        try { localStorage.setItem("hireflow_saved", JSON.stringify(self.saved)); } catch (e) {}
      });
    },

    /* --- search suggestions (autocomplete) --- */
    initSuggestions: function () {
      var self = this;
      $(".search-suggest input").each(function () {
        var input = $(this);
        var wrap = input.closest(".search-suggest");
        var list = $('<div class="suggestions" role="listbox"></div>');
        wrap.append(list);

        input.on("input", function () {
          var val = input.val().toLowerCase().trim();
          if (!val) { list.hide(); return; }
          var terms = {};
          self.jobs.forEach(function (j) {
            [j.title, j.company].concat(j.technology).forEach(function (t) {
              if (t.toLowerCase().indexOf(val) === 0) { terms[t] = true; }
            });
          });
          var keys = Object.keys(terms).slice(0, 6);
          if (!keys.length) { list.hide(); return; }
          list.empty();
          keys.forEach(function (k) {
            $('<button type="button" class="suggestion-item" role="option"></button>')
              .html(ICONS.search + " " + escapeHtml(k))
              .on("mousedown", function () {
                input.val(k);
                list.hide();
                input.trigger("keyup");
              })
              .appendTo(list);
          });
          list.show();
        });
        input.on("blur", function () { setTimeout(function () { list.hide(); }, 150); });
      });
    }
  };

  /* ------------------------------------------------------------------
     6. Home search box
     ------------------------------------------------------------------ */
  var initHomeSearch = function () {
    $("#homeSearchForm").on("submit", function (e) {
      e.preventDefault();
      var kw = encodeURIComponent($("#homeKeyword").val().trim());
      var loc = encodeURIComponent($("#homeLocation").val().trim());
      window.location.href = "jobs.html?q=" + kw + "&loc=" + loc;
    });
    $(".search-tag[data-q]").on("click", function () {
      var q = encodeURIComponent($(this).data("q"));
      window.location.href = "jobs.html?q=" + q;
    });
  };

  /* ------------------------------------------------------------------
     7. Form validation + dynamic success alert
     ------------------------------------------------------------------ */
  var showAlert = function (context, message, type) {
    var color = type === "success" ? "alert-success" : "alert-danger";
    var alert = $(
      '<div class="alert ' + color + ' alert-dismissible fade show mt-3" role="alert">' +
      message +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
      "</div>"
    );
    var host = context.closest(".form-wrap");
    host.find(".form-success").remove();
    if (host.length) { host.append(alert); } else { context.after(alert); }
    setTimeout(function () { alert.alert("close"); }, 6000);
  };

  var initValidation = function () {
    $("form[data-validate]").each(function () {
      var form = $(this);

      var setError = function (field, show, message) {
        var group = field.closest(".form-group");
        var errorEl = group.find(".form-error");
        if (show) {
          field.addClass("is-invalid");
          errorEl.text(message || "This field is required.").show();
        } else {
          field.removeClass("is-invalid");
          errorEl.hide();
        }
      };

      var validateField = function (field) {
        var val = field.val();
        var required = field.data("required") !== undefined || field.is("[required]");
        var type = field.data("validate") || "";
        if (required && !val) {
          setError(field, true, "This field is required.");
          return false;
        }
        if (val && type === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setError(field, true, "Please enter a valid email address.");
            return false;
          }
        }
        if (val && type === "phone") {
          if (!/^[+()\-.\s\d]{7,20}$/.test(val)) {
            setError(field, true, "Please enter a valid phone number.");
            return false;
          }
        }
        setError(field, false);
        return true;
      };

      form.find("input, select, textarea").on("blur", function () {
        validateField($(this));
      }).on("input change", function () {
        if ($(this).hasClass("is-invalid")) { validateField($(this)); }
      });

      form.on("submit", function (e) {
        e.preventDefault();
        var valid = true;
        form.find("input, select, textarea").each(function () {
          if (!validateField($(this))) { valid = false; }
        });
        if (!valid) {
          form.find(".is-invalid").first().trigger("focus");
          return;
        }
        var btn = form.find('button[type="submit"]');
        var original = btn.html();
        btn.prop("disabled", true).html(
          '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending…'
        );
        setTimeout(function () {
          btn.prop("disabled", false).html(original);
          form[0].reset();
          showAlert(form, "Thank you! Your message has been sent. Our team will be in touch shortly.", "success");
        }, 900);
      });
    });
  };

  /* ------------------------------------------------------------------
     8. Smooth scroll for in-page anchors
     ------------------------------------------------------------------ */
  var initSmoothScroll = function () {
    $(document).on("click", 'a[href^="#"]', function (e) {
      var hash = $(this).attr("href");
      if (hash.length > 1) {
        var target = $(hash);
        if (target.length) {
          e.preventDefault();
          var offset = target.offset().top - 82;
          $("html, body").animate({ scrollTop: offset }, 620);
        }
      }
    });
  };

  /* ------------------------------------------------------------------
     9. Init
     ------------------------------------------------------------------ */
  $(function () {
    loadComponents();
    revealElements();
    initCounters();
    initBackToTop();
    initValidation();
    initSmoothScroll();
    initHomeSearch();
    setYear();

    // Mobile filter collapse toggle (jobs page)
    $("#filterToggle").on("click", function () {
      $("#filterBody").toggleClass("open");
    });

    // Marketplace (jobs data) — only where a jobs container exists.
    if ($("#homeJobs, #jobGrid, #relatedJobs").length) {
      Marketplace.init();
    }
  });
})(jQuery);
