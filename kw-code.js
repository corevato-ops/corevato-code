(function () {
    // Check if current page is the Homepage
    var isHomePage = window.location.pathname === '/' || window.location.pathname === '';

    if (isHomePage) {
        function loadjQueryAndInject() {
            // Load jQuery if it is not already present on the page
            if (typeof jQuery === 'undefined') {
                var script = document.createElement('script');
                script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                script.type = 'text/javascript';
                script.onload = function () {
                    executeInjection(jQuery);
                };
                document.head.appendChild(script);
            } else {
                executeInjection(jQuery);
            }
        }

        function executeInjection($) {
            $(document).ready(function () {
                var target = $('.kw-search-block');
                
                // Prevent double injection
                if (target.length && $('.founder-container').length === 0) {
                    $.ajax({
                        url: 'https://heartstrong.kw.com/homepage-support',
                        type: 'GET',
                        dataType: 'html',
                        success: function (data) {
                            var $parsed = $(data);
                            var founderContent = $parsed.find('.light-section');
                            var styles = $parsed.find('style');

                            // Append styles to head
                            if (styles.length) {
                                $('head').append(styles);
                            }

                            // Insert section directly after .kw-search-block
                            if (founderContent.length) {
                                target.after(founderContent);
                            }
                        },
                        error: function (err) {
                            console.error('Failed to load section from About page:', err);
                        }
                    });
                }
            });
        }

        // Initialize execution
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            loadjQueryAndInject();
        } else {
            document.addEventListener('DOMContentLoaded', loadjQueryAndInject);
        }
    }
})();
