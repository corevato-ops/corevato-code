(function () {
    // Current URL check karne ke liye
    var currentPath = window.location.pathname.toLowerCase();

    function injectDynamicSection() {
        // Prevent duplicate insertion
        if (document.querySelector('.founder-container')) return;

        // Parent container find karein
        var parentContainer = document.querySelector('.Page-oneColumn');

        if (parentContainer && parentContainer.children.length > 0) {
            // Child elements ki list
            var children = parentContainer.children;
            var targetElement = null;

            // Page Link / Path ke mutabiq logic define karein
            if (currentPath === '/' || currentPath === '') {
                // HOMEPAGE: Agar pehla child (<kw-search-block>) hai, toh 1st child ke baad dikhayein
                targetElement = children[0]; 
            } else if (currentPath.includes('homepage-support')) {
                // ABOUT PAGE: Agar doosre element ke baad dikhana ho
                targetElement = children[1] || children[0];
            } else {
                // Default fallback
                targetElement = children[0];
            }

            if (targetElement) {
                // About page se content iframe ke zariye extract karein
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = '/homepage-support';

                iframe.onload = function () {
                    try {
                        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        var sourceNode = iframeDoc.querySelector('#founder-source-wrapper') || iframeDoc.querySelector('.light-section');

                        if (sourceNode) {
                            var clonedContent = document.importNode(sourceNode, true);
                            
                            // Determined target element ke baad insert karein
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

    // Interval to wait until .Page-oneColumn and its children load
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
