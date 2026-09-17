(function () {
    // To check the current URL
    var currentPath = window.location.pathname.toLowerCase();

    function injectDynamicSection() {
        // Prevent duplicate insertion
        if (document.querySelector('.founder-container')) return;

        // Parent container finding
        var parentContainer = document.querySelector('.Page-oneColumn');

        if (parentContainer && parentContainer.children.length > 0) {
            // Child elements list
            var children = parentContainer.children;
            var targetElement = null;

            // Define the logic according to the page link/path
            if (currentPath === '/' || currentPath === '') {
                targetElement = children[0]; 
            } else if (currentPath.includes('homepage-support')) {
                // ABOUT PAGE: If it needs to be displayed after the second element
                targetElement = children[1] || children[0];
            } else {
                // Default fallback
                targetElement = children[0];
            }

            if (targetElement) {
                // Extract the content from the About page using an iframe.
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = '/homepage-support';

                iframe.onload = function () {
                    try {
                        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        var sourceNode = iframeDoc.querySelector('#founder-source-wrapper') || iframeDoc.querySelector('.light-section');

                        if (sourceNode) {
                            var clonedContent = document.importNode(sourceNode, true);
                            
                            // Insert it after the determined target element.
                            targetElement.parentNode.insertBefore(clonedContent, targetElement.nextSibling);
                        }
                    } catch (e) {
                        console.error('Extraction error:', e);
                    } final {
                        if (iframe.parentNode) {
                            document.body.removeChild(iframe);
                        }
                    }
                };

                document.body.appendChild(iframe);
            }
        }
    }

    // Interval to wait until .Page-oneColumn and its child elements are fully loaded.
    function checkAndRun() {
        var container = document.querySelector('.Page-oneColumn');
        if (container && container.children.length > 0) {
            injectDynamicSection();
        } else {
            setTimeout(checkAndRun, 200);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        checkAndRun();
    } else {
        document.addEventListener('DOMContentLoaded', checkAndRun);
    }
})();
