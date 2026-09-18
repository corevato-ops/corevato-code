jQuery(document).ready(function ($) {
  // Target homepage check using full URL and path
  const currentUrl = window.location.href.split('?')[0].replace(/\/$/, '');
  const homepageUrl = 'https://heartstrong.kw.com';

  if (currentUrl === homepageUrl || window.location.pathname === '/') {
    const targetSelector = '.Page-content .Page-oneColumn > :nth-child(1)';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // Prevent duplicate injections
    if ($('.founder-container').length === 0) {
      $.get(supportPageUrl, function (data) {
        // Extract the section block from the fetched page
        const $fetchedSection = $(data).find('.light-section');

        if ($fetchedSection.length && $(targetSelector).length) {
          $(targetSelector).after($fetchedSection);
        }
      });
    }
  }
});
