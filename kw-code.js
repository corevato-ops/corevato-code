(function ($) {
  // Page ke poori tarah load hone ke baad hi execution hogi
  $(window).on('load', function () {
    
    // 1. Full Homepage URL Validation
    const currentUrl = window.location.href.split('?')[0].replace(/\/$/, '');
    const homepageUrl = 'https://heartstrong.kw.com';

    // Sirf tab chalay ga jab current page exact homepage URL ho
    if (currentUrl !== homepageUrl) return;

    // 2. Exact Target Selector aur Full Support Page URL
    const targetSelector = 'main.Page-oneColumn > kw-search-block, .Page-oneColumn > :first-child';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // 3. Target element Check
    const $target = $(targetSelector).first();

    if ($target.length) {
      // Duplicate insertion rokne ke liye check
      if ($('.light-section').length > 0) return;

      // 4. Absolute URL se AJAX Fetch
      $.get(supportPageUrl, function (htmlData) {
        if (!htmlData) return;

        // DOMParser se full HTML body se target section extract karna
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');
        const lightSection = doc.querySelector('.light-section');

        if (lightSection) {
          $target.after(lightSection.outerHTML);
        } else {
          // Fallback parsing agar parser work na kare
          const $parsed = $($.parseHTML(htmlData));
          const $found = $parsed.find('.light-section').add($parsed.filter('.light-section'));
          if ($found.length) {
            $target.after($found);
          }
        }
      }).fail(function (xhr, status, error) {
        console.error('AJAX Fetch Failed:', status, error);
      });
    }
  });
})(jQuery);
