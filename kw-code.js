(function () {
    // Exact Full URLs
    var homePageUrl = 'https://heartstrong.kw.com/';
    var aboutPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // Normalize URL for comparison
    var currentUrl = window.location.href.split('?')[0].split('#')[0];
    if (!currentUrl.endsWith('/')) {
        currentUrl += '/';
    }

    function injectSection() {
        if (document.querySelector('.founder-container')) return;

        var parentContainer = document.querySelector('.Page-oneColumn');

        if (parentContainer && parentContainer.children.length > 0) {
            // Target first child (<kw-search-block>) under .Page-oneColumn
            var targetElement = parentContainer.children[0];

            if (targetElement) {
                // Fetch content using hidden iframe to prevent CORS errors
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = aboutPageUrl;

                iframe.onload = function () {
                    try {
                        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        var sourceNode = iframeDoc.querySelector('#founder-source-wrapper') || iframeDoc.querySelector('.light-section');

                        if (sourceNode) {
                            var clonedNode = document.importNode(sourceNode, true);
                            targetElement.parentNode.insertBefore(clonedNode, targetElement.nextSibling);
                        }
                    } catch (err) {
                        console.error('DOM Clone Error:', err);
                    } finally {
                        if (iframe.parentNode) {
                            document.body.removeChild(iframe);
                        }
                    }
                };

                document.body.appendChild(iframe);
            }
        }
    }

    // Run only on Homepage
    if (currentUrl === homePageUrl) {
        function checkAndExecute() {
            var parent = document.querySelector('.Page-oneColumn');
            if (parent && parent.children.length > 0) {
                injectSection();
            } else {
                setTimeout(checkAndExecute, 250);
            }
        }

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            checkAndExecute();
        } else {
            document.addEventListener('DOMContentLoaded', checkAndExecute);
        }
    }
})();
