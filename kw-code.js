(function () {
    // Only execute on the Heart Strong Home Group homepage
    const isHomePage = window.location.href.replace(/\/$/, '') === 'https://heartstrong.kw.com';

    if (isHomePage) {
        function injectFounderSection() {
            const targetElement = document.querySelector('.kw-search-block');
            
            // Prevent duplicate injections
            if (!targetElement || document.querySelector('.founder-container')) return;

            // Fetch the entire light-section and styles using the full URL
            fetch('https://heartstrong.kw.com/homepage-support')
                .then(response => response.text())
                .then(htmlText => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    
                    const founderSection = doc.querySelector('.light-section');
                    const styleBlock = doc.querySelector('style');

                    if (founderSection && targetElement.parentNode) {
                        // Append the extracted CSS style block to head
                        if (styleBlock) {
                            document.head.appendChild(styleBlock.cloneNode(true));
                        }
                        
                        // Insert the section right after .kw-search-block
                        targetElement.parentNode.insertBefore(founderSection, targetElement.nextSibling);
                    }
                })
                .catch(err => console.error('Error loading section from About Page:', err));
        }

        // Trigger insertion once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectFounderSection);
        } else {
            injectFounderSection();
        }

        // Observer to handle delayed rendering of .kw-search-block
        const observer = new MutationObserver(function () {
            if (document.querySelector('.kw-search-block') && !document.querySelector('.founder-container')) {
                injectFounderSection();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
