(function () {
    // Sirf Homepage par execute karein
    var isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    if (!isHomePage) return;

    function injectSectionFromAbout() {
        if (document.querySelector('.founder-container')) return;

        // Hidden iframe ke zariye About page load karein (bypass fetch/CORS blocks)
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '/homepage-support';

        iframe.onload = function () {
            try {
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                var sourceNode = iframeDoc.querySelector('#founder-source-wrapper');

                if (sourceNode) {
                    var clonedContent = document.importNode(sourceNode, true);
                    
                    // Placement Target Find karein
                    var targetElement = document.querySelector('kw-search-block') || document.querySelector('.kw-search-block');

                    if (targetElement && targetElement.parentNode) {
                        targetElement.parentNode.insertBefore(clonedContent, targetElement.nextSibling);
                    }
                }
            } catch (e) {
                console.error("Iframe extraction failed: ", e);
            } finally {
                // Clean up iframe
                document.body.removeChild(iframe);
            }
        };

        document.body.appendChild(iframe);
    }

    // Dynamic Element Watcher
    function waitForElement() {
        var target = document.querySelector('kw-search-block') || document.querySelector('.kw-search-block');
        if (target && !document.querySelector('.founder-container')) {
            injectSectionFromAbout();
        } else {
            setTimeout(waitForElement, 300);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        waitForElement();
    } else {
        document.addEventListener('DOMContentLoaded', waitForElement);
    }
})();
