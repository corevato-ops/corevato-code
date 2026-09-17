(function () {
    // Check if on the homepage
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

    if (isHomePage) {
        function injectFounderSection() {
            const targetElement = document.querySelector('.kw-search-block');
            
            // Prevent duplicated insertion
            if (!targetElement || document.querySelector('.founder-container')) return;

            // 1. Create and inject CSS Styles
            const style = document.createElement('style');
            style.textContent = `
                .founder-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 30px;
                    padding: 80px 20px;
                }
                .left-col, .right-col {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .icon-dot {
                    width: 8px;
                    height: 8px;
                    background-color: var(--red-color);
                    border-radius: 50%;
                    display: inline-block;
                }
                .founder-container h3 {
                    color: var(--black-color);
                    font-size: var(--font-size-48);
                    line-height: 1.15;
                    font-weight: var(--font-weight-400);
                    margin-top: 40px;
                }
                .founder-container h3 strong {
                    font-weight: var(--font-weight-700);
                }
                .founder-container h6 {
                    font-size: var(--font-size-18);
                    line-height: 1;
                    font-weight: var(--font-weight-700);
                    letter-spacing: var(--letter-spacing);
                    color: var(--black-color);
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .founder-container p {
                    font-size: var(--font-size-16);
                    line-height: 1.6;
                    color: var(--gary-color);
                    font-weight: var(--font-weight-400);
                }
                .btn-team {
                    background-color: var(--red-bg);
                    color: var(--wdark-color);
                    border: none;
                    padding: 12px 20px;
                    font-size: var(--font-size-16);
                    font-weight: var(--font-weight-700);
                    letter-spacing: var(--letter-spacing);
                    text-transform: uppercase;
                    cursor: pointer;
                    align-self: flex-start;
                    margin-top: 40px;
                    transition: background-color 0.2s ease;
                    text-decoration: none;
                    display: inline-block;
                }
                @media only screen and (max-width: 767px) {
                    .founder-container {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .founder-container h3, .btn-team {
                        margin-top: 20px;
                    }
                }
            `;
            document.head.appendChild(style);

            // 2. Build HTML Markup
            const sectionWrapper = document.createElement('div');
            sectionWrapper.className = 'light-section';
            sectionWrapper.innerHTML = `
                <div class="founder-container">
                    <div class="left-col">
                        <h6><span class="icon-dot"></span> MEET THE FOUNDER</h6>
                        <h3>Not Just Real Estate. Strategic <strong>Representation.</strong></h3>
                    </div>
                    <div class="center-col">
                        <img src="https://static.kw.com/77/cb/c0bbc2c04f24bd9c827c543b8b7a/945-0001.png" alt="Founder" />
                    </div>
                    <div class="right-col">
                        <p>Heart Strong Home Group operates at the intersection of luxury real estate and construction expertise. We do not just help clients buy or sell homes; we guide decisions that impact long-term value, lifestyle, and wealth.</p>
                        <a href="https://heartstrong.kw.com/homepage-support" class="btn-team">Meet The Team</a>
                    </div>
                </div>
            `;

            // 3. Inject directly after <kw-search-block>
            targetElement.parentNode.insertBefore(sectionWrapper, targetElement.nextSibling);
        }

        // Run when DOM loads
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectFounderSection);
        } else {
            injectFounderSection();
        }

        // Watch for dynamically loaded elements
        const observer = new MutationObserver(function () {
            if (document.querySelector('.kw-search-block') && !document.querySelector('.founder-container')) {
                injectFounderSection();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
