(function() {
    // Run only on the root homepage
    if (window.location.pathname === '/' || window.location.pathname === '') {
      fetch('https://heartstrong.kw.com/homepage-support')
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // Grab the section from the support page
          const founderContent = doc.querySelector('.light-section');
          const searchBlock = document.querySelector('kw-search-block');

          if (founderContent && searchBlock) {
            searchBlock.parentNode.insertBefore(founderContent, searchBlock.nextSibling);
          }
        })
        .catch(err => console.error('Error loading founder section:', err));
    }
})();
