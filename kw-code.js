(function ($) {
  function injectFounderSection() {
    // Duplicate check
    if ($('.light-section').length > 0) return;

    // Homepage URL matching check (trailing slash handle karne ke liye)
    const currentUrl = window.location.href.toLowerCase();
    const isHomepage = currentUrl === 'https://heartstrong.kw.com' || 
                      currentUrl === 'https://heartstrong.kw.com/' || 
                      window.location.pathname === '/' || 
                      window.location.pathname === '';

    if (!isHomepage) return;

    // Target selector directly from DevTools
    const targetSelector = 'kw-search-block, main.Page-oneColumn > :first-child';
    const $target = $(targetSelector).first();

    if ($target.length) {
      const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

      $.get(supportPageUrl, function (htmlData) {
        if (!htmlData) return;

        // Extract using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');
        const lightSection = doc.querySelector('.light-section');

        if (lightSection && $('.light-section').length === 0) {
          $target.after(lightSection.outerHTML);
        } else if ($('.light-section').length === 0) {
          // Fallback parsing
          const $parsed = $($.parseHTML(htmlData));
          const $found = $parsed.find('.light-section').add($parsed.filter('.light-section'));
          if ($found.length) {
            $target.after($found);
          }
        }
      });
    }
  }

  // MutationObserver to watch DOM rendering dynamically
  const observer = new MutationObserver(function (mutations, obs) {
    const target = document.querySelector('kw-search-block');
    if (target) {
      injectFounderSection();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Fallback direct execution
  $(document).ready(injectFounderSection);
  $(window).on('load', injectFounderSection);

})(jQuery);
