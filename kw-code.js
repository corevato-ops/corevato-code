(function() {
  // Only target the root homepage
  if (window.location.pathname !== '/' && window.location.pathname !== '') return;

  function loadFounderSection() {
    // Prevent duplicate injections
    if (document.querySelector('.light-section')) return;

    const searchBlock = document.querySelector('kw-search-block');
    if (!searchBlock) return;

    fetch('https://heartstrong.kw.com/homepage-support')
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const founderSection = doc.querySelector('.light-section');

        if (founderSection && searchBlock.parentNode) {
          searchBlock.parentNode.insertBefore(founderSection, searchBlock.nextSibling);
        }
      })
      .catch(err => console.error('Error fetching section:', err));
  }

  // Poll until <kw-search-block> is present in the DOM
  const interval = setInterval(() => {
    if (document.querySelector('kw-search-block')) {
      clearInterval(interval);
      loadFounderSection();
    }
  }, 200);

  setTimeout(() => clearInterval(interval), 10000);
})();
