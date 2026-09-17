(function () {
    // 1. Strictly target Homepage
    var isHome = window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname === '/index.html';
    if (!isHome) return;

    function injectSection() {
        // Prevent multiple insertions
        if (document.querySelector('.founder-container')) return true;

        // Target .Page-oneColumn OR kw-search-block directly
        var targetBlock = document.querySelector('kw-search-block') || document.querySelector('.KW-Search-Block') || document.querySelector('.Page-oneColumn > *:first-child');

        if (targetBlock && targetBlock.parentNode) {
            // Create CSS Style Tag
            var style = document.createElement('style');
            style.id = 'founder-section-styles';
            style.textContent = `
                .light-section {
                    width: 100%;
                    background-color: #fff;
                    display: block;
                    clear: both;
                }
                .founder-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 30px;
                    padding: 80px 20px;
                    box-sizing: border-box;
                }
                .left-col, .right-col {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .icon-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #e31837;
                    border-radius: 50%;
                    display: inline-block;
                }
                .founder-container h3 {
                    color: #000;
                    font-size: 48px;
                    line-height: 1.15;
                    font-weight: 400;
                    margin-top: 40px;
                }
                .founder-container h3 strong {
                    font-weight: 700;
                }
                .founder-container h6 {
                    font-size: 18px;
                    line-height: 1;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #000;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .founder-container p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #666;
                    font-weight: 400;
                }
                .btn-team {
                    background-color: #e31837;
                    color: #fff;
                    border: none;
                    padding: 12px 20px;
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: 1px;
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
            
            if (!document.getElementById('founder-section-styles')) {
                document.head.appendChild(style);
            }

            // Create Section Wrapper
            var sectionWrapper = document.createElement('div');
            sectionWrapper.className = 'light-section';
            sectionWrapper.innerHTML = `
                <div class="founder-container">
                    <div class="left-col">
                        <h6><span class="icon-dot"></span> MEET THE FOUNDER</h6>
                        <h3>Not Just Real Estate. Strategic <strong>Representation.</strong></h3>
                    </div>
                    <div class="center-col">
                        <img src="https://static.kw.com/77/cb/c0bbc2c04f24bd9c827c543b8b7a/945-0001.png" alt="Founder" style="max-width: 100%; height: auto;" />
                    </div>
                    <div class="right-col">
                        <p>Heart Strong Home Group operates at the intersection of luxury real estate and construction expertise. We do not just help clients buy or sell homes; we guide decisions that impact long-term value, lifestyle, and wealth.</p>
                        <a href="https://heartstrong.kw.com/homepage-support" class="btn-team">Meet The Team</a>
                    </div>
                </div>
            `;

            // Insert directly after target block
            targetBlock.parentNode.insertBefore(sectionWrapper, targetBlock.nextSibling);
            console.log("Founder Section Successfully Injected!");
            return true;
        }
        return false;
    }

    // Observer setup for continuous DOM detection
    var observer = new MutationObserver(function (mutations, obs) {
        if (injectSection()) {
            obs.disconnect(); // Stop observing once injected
        }
    });

    // Start watching DOM
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    // Backup execution
    setTimeout(injectSection, 1000);
    setTimeout(injectSection, 3000);
})();
