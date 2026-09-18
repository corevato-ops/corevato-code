(function ($) {
  function injectSection() {
    // 1. Homepage Validation Check
    const currentUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    const isHomepage = currentUrl === 'https://heartstrong.kw.com' || window.location.pathname === '/' || window.location.pathname === '';

    if (!isHomepage) return;

    // 2. Prevent Duplicate Injection
    if ($('.light-section').length > 0) return;

    // 3. Exact Target Element
    const $target =$('kw-search-block, main.Page-oneColumn > :first-child').first();

    if ($target.length) {
      // Direct HTML Template Injection
      const htmlContent = `
        <div class="light-section">
          <div class="founder-container">
            <div class="left-col">
              <h6><span class="icon-dot"></span> MEET THE FOUNDER</h6>
              <h3>Not Just Real Estate. Strategic <strong>Representation.</strong></h3>
            </div>
            <div class="center-col">
              <img src="https://static.kw.com/77/cb/c0bbc2c04f24bd9c827c543b8b7a/945-0001.png" alt="Meet the Founder" />
            </div>
            <div class="right-col">
              <p>Heart Strong Home Group operates at the intersection of luxury real estate and construction expertise. We do not just help clients buy or sell homes; we guide decisions that impact long-term value, lifestyle, and wealth.</p>
              <a href="#" class="btn-team">Meet The Team</a>
            </div>
          </div>
        </div>
      `;

      $target.after(htmlContent);
    }
  }

  // Execute on Window Load & DOM Observer
  $(window).on('load', function () {
    injectSection();
  });

  // Backup observer for slow SPA rendering
  const observer = new MutationObserver(function () {
    if ($('kw-search-block').length &&$('.light-section').length === 0) {
      injectSection();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})(jQuery);
