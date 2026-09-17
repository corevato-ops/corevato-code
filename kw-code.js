(function() {
  // Direct domain link set kiya gaya hai
  const homepageUrl = "https://heartstrong.kw.com/";
  const currentUrl = window.location.href.split('?')[0].split('#')[0];

  // Exact comparison for full domain/homepage URL
  if (currentUrl === homepageUrl || currentUrl === homepageUrl.slice(0, -1)) {

    function loadFounderSection() {
      // Direct duplicate injection prevention
      if (document.querySelector('.light-section')) return;

      const searchBlock = document.querySelector('kw-search-block');
      if (!searchBlock) return;

      fetch('https://heartstrong.kw.com/homepage-support')
        .then(res => {
          if (!res.ok) throw new Error('Network error: ' + res.status);
          return res.text();
        })
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const founderSection = doc.querySelector('.light-section');

          if (founderSection && searchBlock.parentNode) {
            searchBlock.parentNode.insertBefore(founderSection, searchBlock.nextSibling);
          }
        })
        .catch(err => console.error('Error fetching support section:', err));
    }

    // Interval DOM check for <kw-search-block>
    const interval = setInterval(() => {
      if (document.querySelector('kw-search-block')) {
        clearInterval(interval);
        loadFounderSection();
      }
    }, 200);

    setTimeout(() => clearInterval(interval), 10000);
  }
})();
