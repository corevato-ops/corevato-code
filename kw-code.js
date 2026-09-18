(function ($) {
  function forceInjectSection() {
    // 1. Check if already injected
    if ($('.light-section').length > 0) return;

    // 2. Exact Target Element from DevTools (<kw-search-block>)
    var $target =$('kw-search-block, .Page-oneColumn > :first-child').first();

    if ($target.length) {
      // 3. Pure HTML and CSS payload
      var htmlPayload = `
        <style>
          .light-section {
            width: 100%;
            background-color: #f9f9f9;
            box-sizing: border-box;
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
            background-color: #c00;
            border-radius: 50%;
            display: inline-block;
          }
          .founder-container h3 {
            color: #000;
            font-size: 36px;
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
            color: #555;
            font-weight: 400;
          }
          .btn-team {
            background-color: #c00;
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

      $target.after(htmlPayload);
    }
  }

  // Continuously check until target element appears in DOM
  var checkInterval = setInterval(function () {
    if ($('kw-search-block, .Page-oneColumn > :first-child').length) {
      forceInjectSection();
    }
    if ($('.light-section').length > 0) {
      clearInterval(checkInterval);
    }
  }, 100);

  // Stop interval after 15 seconds
  setTimeout(function () {
    clearInterval(checkInterval);
  }, 15000);

})(jQuery);
