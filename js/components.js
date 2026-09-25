window.COMPONENTS = {
  header: `<!-- Top utility bar -->
<div class="topbar d-none d-lg-block">
  <div class="container">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-4">
        <a href="mailto:hello@hireflow.com" class="topbar-link">
          <svg class="tb-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          hello@hireflow.com
        </a>
        <a href="tel:+15550123456" class="topbar-link">
          <svg class="tb-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +1 (555) 012-3456
        </a>
      </div>
      <div class="d-flex align-items-center gap-4">
        <span class="topbar-text">Hiring? <a href="employers.html#post-job" class="topbar-cta">Post a job</a></span>
        <div class="d-flex align-items-center gap-2">
          <a href="#" class="topbar-social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
          </a>
          <a href="#" class="topbar-social" aria-label="X">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.4l7.24-8.28L2.6 2h6.39l4.41 5.83L18.9 2zm-1.09 18h1.72L7.86 3.9H6.02L17.81 20z"/></svg>
          </a>
          <a href="#" class="topbar-social" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3-.04-1.3-.13-2.4-.13-2.4 0-4 1.45-4 4.13v2.3H7.6V14h2.7v8h3.2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`,
  navbar: `<!-- Main Navigation -->
<nav class="navbar navbar-expand-lg main-nav" id="mainNav">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <span class="brand-mark">
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="hfGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#4f46e5"/>
              <stop offset="1" stop-color="#7c3aed"/>
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill="url(#hfGrad)"/>
          <path d="M11 14h18M11 20h18M11 26h12" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          <circle cx="28" cy="26" r="3" fill="#ffffff"/>
        </svg>
      </span>
      <span class="brand-text">Hire<span class="brand-sub">Flow</span></span>
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="toggler-line"></span>
      <span class="toggler-line"></span>
      <span class="toggler-line"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav mx-auto align-items-lg-center">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="jobs.html">Jobs</a></li>
        <li class="nav-item"><a class="nav-link" href="employers.html">For Employers</a></li>
        <li class="nav-item"><a class="nav-link" href="candidates.html">For Candidates</a></li>
        <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
        <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <a class="btn btn-ghost" href="employers.html#post-job">Post a Job</a>
        <a class="btn btn-primary" href="jobs.html">Find a Job</a>
      </div>
    </div>
  </div>
</nav>`,
  footer: `<!-- Footer -->
<footer class="site-footer">
  <div class="footer-top">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <a class="footer-brand" href="index.html">
            <span class="brand-mark">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
                <rect width="40" height="40" rx="11" fill="#4f46e5"/>
                <path d="M11 14h18M11 20h18M11 26h12" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                <circle cx="28" cy="26" r="3" fill="#ffffff"/>
              </svg>
            </span>
            <span class="brand-text">Hire<span class="brand-sub">Flow</span></span>
          </a>
          <p class="footer-about">
            HireFlow is a modern IT recruitment and job marketplace connecting skilled technology
            professionals with the companies that need them.
          </p>
          <div class="footer-social">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.4l7.24-8.28L2.6 2h6.39l4.41 5.83L18.9 2zm-1.09 18h1.72L7.86 3.9H6.02L17.81 20z"/></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3-.04-1.3-.13-2.4-.13-2.4 0-4 1.45-4 4.13v2.3H7.6V14h2.7v8h3.2z"/></svg></a>
          </div>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="footer-title">Company</h6>
          <ul class="footer-links">
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="jobs.html">Browse Jobs</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="footer-title">For Employers</h6>
          <ul class="footer-links">
            <li><a href="employers.html">Post a Job</a></li>
            <li><a href="employers.html">Access Talent</a></li>
            <li><a href="services.html">Staff Augmentation</a></li>
            <li><a href="services.html">Executive Search</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="footer-title">For Candidates</h6>
          <ul class="footer-links">
            <li><a href="candidates.html">Upload Resume</a></li>
            <li><a href="jobs.html">Find Jobs</a></li>
            <li><a href="candidates.html">Career Support</a></li>
            <li><a href="candidates.html">Job Alerts</a></li>
          </ul>
        </div>

        <div class="col-6 col-lg-2">
          <h6 class="footer-title">Get in touch</h6>
          <ul class="footer-contact">
            <li><a href="mailto:hello@hireflow.com">hello@hireflow.com</a></li>
            <li><a href="tel:+15550123456">+1 (555) 012-3456</a></li>
            <li>500 Market Street, Suite 900, San Francisco, CA</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <p class="mb-0">© <span id="year">2026</span> HireFlow. All rights reserved.</p>
      <ul class="footer-legal mb-0">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Cookie Policy</a></li>
      </ul>
    </div>
  </div>
</footer>`
};
