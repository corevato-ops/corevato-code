(function ($) {
  $(window).on('load', function () {
    const currentUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    if (currentUrl !== 'https://heartstrong.kw.com' && window.location.pathname !== '/') return;

    if ($('.light-section').length > 0) return;

    const $target = $('kw-search-block, main.Page-oneColumn > :first-child').first();

    if ($target.length) {
      // Hidden iframe create karke support page load karna
      const $iframe = $('<iframe>', {
        src: 'https://heartstrong.kw.com/homepage-support',
        style: 'display:none; width:0; height:0;'
      }).appendTo('body');

      $iframe.on('load', function () {
        const iframeDocument = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
        const $fetchedContent = $(iframeDocument).find('.light-section');

        if ($fetchedContent.length) {
          $target.after($fetchedContent.clone());
          $iframe.remove(); // Cleanup
        }
      });
    }
  });
})(jQuery);
