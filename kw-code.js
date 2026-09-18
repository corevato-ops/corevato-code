(function ($) {
  function injectToHomepage() {
    // Top document (Main Window) context target karna
    var topWindow = window.top || window;
    var topDoc = topWindow.document;

    // Direct Homepage Check
    var currentUrl = topWindow.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    var targetHomepage = 'https://heartstrong.kw.com';

    var isHomepage = (currentUrl === targetHomepage) || 
                     (topWindow.location.pathname === '/') || 
                     (topWindow.location.pathname === '');

    if (!isHomepage) return;

    // Prevent Duplicates
    if ($(topDoc).find('.light-section').length > 0) return;

    // Target selector directly from DevTools
    var targetSelector = 'kw-search-block, .Page-oneColumn > :nth-child(1)';
    var supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    var checkExist = setInterval(function () {
      var $target = $(topDoc).find(targetSelector).first();

      if ($target.length) {
        clearInterval(checkExist);

        if ($(topDoc).find('.light-section').length > 0) return;

        // Fetch support page HTML
        $.ajax({
          url: supportPageUrl,
          type: 'GET',
          dataType: 'html',
          success: function (htmlData) {
            if (!htmlData) return;

            var parser = new DOMParser();
            var doc = parser.parseFromString(htmlData, 'text/html');
            var lightSection = doc.querySelector('.light-section');

            if (lightSection && $(topDoc).find('.light-section').length === 0) {
              $target.after(lightSection.outerHTML);
            } else if ($(topDoc).find('.light-section').length === 0) {
              var match = htmlData.match(/<div class="light-section"[\s\S]*?<\/div>\s*<\/div>/i);
              if (match && match[0]) {
                $target.after(match[0]);
              }
            }
          }
        });
      }
    }, 250);

    setTimeout(function () {
      clearInterval(checkExist);
    }, 10000);
  }

  $(document).ready(injectToHomepage);
  $(window).on('load', injectToHomepage);
})(jQuery);
