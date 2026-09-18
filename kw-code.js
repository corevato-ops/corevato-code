jQuery(document).ready(function($) {
    // 1. Inject CSS styles into the document head
    var customCSS = `
        <style id="founder-section-styles">
            .founder-container {
                max-width: 1280px;
                margin: 0 auto;
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 30px;
                padding: 80px 20px;
            }
            .left-col {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .right-col {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .icon-dot {
                width: 8px;
                height: 8px;
                background-color: var(--red-color, #e31837);
                border-radius: 50%;
                display: inline-block;
            }
            .founder-container h3 {
                color: var(--black-color, #000000);
                font-size: var(--font-size-48, 48px);
                line-height: 1.15;
                font-weight: var(--font-weight-400, 400);
                margin-top: 40px;
            }
            .founder-container h3 strong {
                font-weight: var(--font-weight-700, 700);
            }
            .founder-container h6 {
                font-size: var(--font-size-18, 18px);
                line-height: 1;
                font-weight: var(--font-weight-700, 700);
                letter-spacing: var(--letter-spacing, normal);
                color: var(--black-color, #000000);
                text-transform: uppercase;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .founder-container p {
                font-size: var(--font-size-16, 16px);
                line-height: 1.6;
                color: var(--gary-color, #666666);
                font-weight: var(--font-weight-400, 400);
            }
            .btn-team {
                background-color: var(--red-bg, #e31837);
                color: var(--wdark-color, #ffffff);
                border: none;
                padding: 12px 20px;
                font-size: var(--font-size-16, 16px);
                font-weight: var(--font-weight-700, 700);
                letter-spacing: var(--letter-spacing, normal);
                text-transform: uppercase;
                cursor: pointer;
                align-self: flex-start;
                margin-top: 40px;
                transition: background-color 0.2s ease;
                display: inline-block;
                text-decoration: none;
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
    `;
    
    if ($('#founder-section-styles').length === 0) {
        $('head').append(customCSS);
    }

    // 2. Define the HTML markup structure
    var founderHTML = `
        <div class="light-section custom-founder-section">
            <div class="founder-container">
                <div class="left-col">
                  <h6><span class="icon-dot"></span> MEET THE FOUNDER</h6>
                  <h3>Not Just Real Estate. Strategic <strong>Representation.</strong></h3>
                </div>

                <div class="center-col">
                  <img src="https://static.kw.com/77/cb/c0bbc2c04f24bd9c827c543b8b7a/945-0001.png" alt="Meet the Founder" />
                </div>

                <div class="right-col">
                  <p>Heart Strong Home Group operates at the intersection of luxury real estate and construction expertise. We do not just help clients buy or sell homes; we guide decisions that impact long-term value, lifestyle, and wealth.</p>
                  <a href="#" class="btn-team">Meet The Team</a>
                </div>
            </div>
        </div>
    `;

    // 3. Target position and insert content after first child
    var $targetElement =$('.Page-content .Page-oneColumn > :nth-child(1)');

    if ($targetElement.length && $('.custom-founder-section').length === 0) {$targetElement.after(founderHTML);

        // 4. Load external GitHub JS script dynamically after section insertion
        $.getScript('https://corevato-ops.github.io/corevato-code/kw-code.js')
            .done(function(script, textStatus) {
                console.log('KW external script loaded successfully.');
            })
            .fail(function(jqxhr, settings, exception) {
                console.error('Failed to load external KW script:', exception);
            });
    }
});
