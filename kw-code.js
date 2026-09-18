(function ($) {
  function injectFounderSection() {
    // 1. Full Absolute URL Matching
    const currentFullUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    const homepageFullUrl = 'https://heartstrong.kw.com';

    const isHomepage = (currentFullUrl === homepageFullUrl) || 
                       (window.location.pathname === '/') || 
                       (window.location.pathname === '');

    if (!isHomepage) return;

    // 2. Duplicate Check
    if ($('.light-section').length > 0) return;

    // 3. Target Element Selection (DevTools wala kw-search-block)
    const $target =$('kw-search-block, main.Page-oneColumn > :first-child').first();

    if ($target.length) {
      // Direct Injection with Full Absolute Image & Anchor Links
      const founderHTML = `
        <style>
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
            background-color: var(--red-color, #c00);
            border-radius: 50%;
            display: inline-block;
          }
          .founder-container h3 {
            color: var(--black-color, #000);
            font-size: var(--font-size-48, 36px);
            line-height: 1.15;
            font-weight: 400;
            margin-top: 40px;
          }
          .founder-container h3 strong {
            font-weight: 700;
          }
          .founder-container h6 {
            font-size: var(--font-size-18, 18px);
            line-height: 1;
            font-weight: 700;
            letter-spacing: var(--letter-spacing, 1px);
            color: var(--black-color, #000);
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .founder-container p {
            font-size: var(--font-size-16, 16px);
            line-height: 1.6;
            color: var(--gary-color, #555);
            font-weight: 400;
          }
          .btn-team {
            background-color: var(--red-bg, #c00);
            color: var(--wdark-color, #fff);
            border: none;
            padding: 12px 20px;
            font-size: var(--font-size-16, 16px);
            font-weight: 700;
            letter-spacing: var(--letter-spacing, 1px);
            text-transform: uppercase;
            cursor: pointer;
            align-self: flex-start;
            margin-top: 40px;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.2s ease;
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
        </style>

        <div class="light-section">
          <div class="founder-container">
            <div class="left-col">
              <h6><span class="icon-dot"></span> MEET THE FOUNDER</h6>
              <h3>Not Just Real Estate. Strategic <strong>Representation.</strong></h3>
            </div>
            <div class="center-col">
              <img src="https://static.kw.com/77/cb/c0bbc2c04f24bd9c827c543b8b7a/945-0001.png" alt="Meet the Founder" style="max-width:100%; height:auto;" />
            </div>
            <div class="right-col">
              <p>Heart Strong Home Group operates at the intersection of luxury real estate and construction expertise. We do not just help clients buy or sell homes; we guide decisions that impact long-term value, lifestyle, and wealth.</p>
              <a href="https://heartstrong.kw.com/homepage-support" class="btn-team">Meet The Team</a>
            </div>
          </div>
        </div>
      `;

      $target.after(founderHTML);
    }
  }

  // Target element (kw-search-block) ke DOM mein appear hotay hi instant trigger karne ke liye
  const observer = new MutationObserver(function () {
    const currentFullUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    if ((currentFullUrl === 'https://heartstrong.kw.com' || window.location.pathname === '/') && $('kw-search-block').length &&$('.light-section').length === 0) {
      injectFounderSection();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  $(document).ready(function () {
    injectFounderSection();
  });

  $(window).on('load', function () {
    injectFounderSection();
  });
})(jQuery);
