(function ($) {
  function initCustomSection() {
    // Relative path check for homepage (works on any domain/environment)
    const currentPath = window.location.pathname.replace(/\/$/, '');
    const isHomepage = currentPath === 'https://heartstrong.kw.com/';

    if (!isHomepage) return;

    // Target element on the homepage
    const targetSelector = '.Page-content .Page-oneColumn > :nth-child(1)';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // Poll for the target element until KW Builder renders it
    const checkExist = setInterval(function () {
      const $target = $(targetSelector);

      if ($target.length) {
        clearInterval(checkExist);

        // Prevent duplicate injections
        if ($('.light-section').length > 0) return;

        // Fetch custom page using relative path
        $.ajax({
          url: supportPageUrl,
          type: 'GET',
          dataType: 'html',
          success: function (response) {
            const $parsed = $($.parseHTML(response, document, true));
            const $content = $parsed.find('.light-section');

            if ($content.length) {
              $target.after($content);
            } else {
              const extracted = $(response).filter('.light-section').add($(response).find('.light-section'));
              if (extracted.length) {
                $target.after(extracted);
              }
            }
          },
          error: function (xhr, status, error) {
            console.error('KW Custom Injection Error:', error);
          }
        });
      }
    }, 200);

    // Stop polling after 10 seconds
    setTimeout(function () {
      clearInterval(checkExist);
    }, 10000);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCustomSection();
  } else {
    $(document).ready(initCustomSection);
  }
})(jQuery);
