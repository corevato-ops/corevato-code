jQuery(document).ready(function ($) {
  // Full target URL verification
  const currentFullUrl = window.location.href.split('?')[0].replace(/\/$/, '');
  const targetHomepageUrl = 'https://heartstrong.kw.com';

  // Check if current page is the homepage
  if (currentFullUrl === targetHomepageUrl || window.location.pathname === '/') {
    const targetSelector = '.Page-content .Page-oneColumn > :nth-child(1)';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // Prevent duplicate fetching if already present
    if ($('.founder-container').length === 0) {
      $.get(supportPageUrl, function (data) {
        // Parse the returned HTML to extract .light-section
        const $fetchedContent = $(data).find('.light-section');

        if ($fetchedContent.length && $(targetSelector).length) {
          // Inject content immediately after the specified element
          $(targetSelector).after($fetchedContent);
        }
      });
    }
  }
});
