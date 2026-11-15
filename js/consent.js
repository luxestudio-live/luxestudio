/**
 * LuxeStudio — Privacy & Consent Management Architecture
 * Fully Compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act)
 * & Global Privacy Frameworks (GDPR / ePrivacy).
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'luxestudio_cookie_consent';
    const CLARITY_ID = 'ze7ccgevvt';

    // 1. Telemetry Loader (Only invoked upon explicit affirmative consent)
    function loadClarity() {
        if (window.clarityLoaded) return;
        window.clarityLoaded = true;
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", CLARITY_ID);
    }

    // 2. Read existing consent
    const existingConsent = localStorage.getItem(STORAGE_KEY);

    if (existingConsent === 'granted') {
        loadClarity();
    }

    // 3. Banner Injection Function
    function renderConsentBanner() {
        if (document.getElementById('luxeConsentBanner')) {
            const existing = document.getElementById('luxeConsentBanner');
            existing.classList.add('is-visible');
            return;
        }

        // Inject Stylesheet once
        if (!document.getElementById('luxeConsentStyle')) {
            const style = document.createElement('style');
            style.id = 'luxeConsentStyle';
            style.textContent = `
                .luxe-consent-card {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: calc(100% - 48px);
                    max-width: 440px;
                    background: rgba(18, 18, 18, 0.96);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 8px;
                    padding: 22px 24px;
                    z-index: 999999;
                    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
                    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    color: #e5e5e5;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .luxe-consent-card.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .luxe-consent-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: 'DM Mono', monospace;
                    font-size: 0.6875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #d4af37;
                    margin-bottom: 10px;
                }
                .luxe-consent-badge-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #d4af37;
                }
                .luxe-consent-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.01em;
                    line-height: 1.3;
                }
                .luxe-consent-desc {
                    font-size: 0.8125rem;
                    line-height: 1.55;
                    color: #a3a3a3;
                    margin: 0 0 16px 0;
                }
                .luxe-consent-desc a {
                    color: #e5e5e5;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .luxe-consent-desc a:hover {
                    color: #d4af37;
                }
                .luxe-consent-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .luxe-consent-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                }
                .luxe-consent-btn-accept {
                    background: #ffffff;
                    color: #111111;
                    border: 1px solid #ffffff;
                }
                .luxe-consent-btn-accept:hover {
                    background: #d4af37;
                    border-color: #d4af37;
                    color: #111111;
                }
                .luxe-consent-btn-essential {
                    background: transparent;
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                }
                .luxe-consent-btn-essential:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.5);
                }
                @media (max-width: 600px) {
                    .luxe-consent-card {
                        bottom: 16px;
                        right: 16px;
                        left: 16px;
                        width: auto;
                        padding: 18px 20px;
                    }
                    .luxe-consent-actions {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .luxe-consent-btn {
                        width: 100%;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const banner = document.createElement('div');
        banner.id = 'luxeConsentBanner';
        banner.className = 'luxe-consent-card';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'false');
        banner.setAttribute('aria-label', 'Data Privacy and Telemetry Preferences');
        banner.innerHTML = `
            <div class="luxe-consent-badge">
                <span class="luxe-consent-badge-dot" aria-hidden="true"></span>
                <span>DPDP ACT 2023 // PRIVACY PROTOCOL</span>
            </div>
            <h2 class="luxe-consent-title">Privacy &amp; Analytics Consent</h2>
            <p class="luxe-consent-desc">
                We use privacy-respecting session telemetry (Microsoft Clarity) to diagnose performance and enhance UX fidelity. Under India's <strong>DPDP Act 2023</strong>, we require your permission before activating analytics. We never deploy advertising cookies or monetize user telemetry. Read our <a href="cookies.html" target="_blank" rel="noopener">Cookie Protocol</a>.
            </p>
            <div class="luxe-consent-actions">
                <button type="button" class="luxe-consent-btn luxe-consent-btn-accept" id="luxeAcceptConsent">Accept Telemetry</button>
                <button type="button" class="luxe-consent-btn luxe-consent-btn-essential" id="luxeDeclineConsent">Essential Only</button>
            </div>
        `;

        document.body.appendChild(banner);

        // Force reflow and show
        requestAnimationFrame(() => {
            banner.classList.add('is-visible');
        });

        // Handlers
        document.getElementById('luxeAcceptConsent').addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, 'granted');
            loadClarity();
            closeBanner(banner);
            dispatchConsentEvent('granted');
        });

        document.getElementById('luxeDeclineConsent').addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, 'denied');
            closeBanner(banner);
            dispatchConsentEvent('denied');
        });
    }

    function closeBanner(banner) {
        banner.classList.remove('is-visible');
        setTimeout(() => {
            if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 350);
    }

    function dispatchConsentEvent(status) {
        window.dispatchEvent(new CustomEvent('luxestudio_consent_updated', { detail: { status: status } }));
    }

    // 4. Expose Global Helpers for reopening or withdrawing consent
    window.openLuxeConsent = function () {
        renderConsentBanner();
    };

    window.getLuxeConsentStatus = function () {
        return localStorage.getItem(STORAGE_KEY) || 'unprompted';
    };

    window.revokeLuxeConsent = function () {
        localStorage.setItem(STORAGE_KEY, 'denied');
        dispatchConsentEvent('denied');
    };

    // 5. Initial Trigger on page load if consent not established
    if (!existingConsent) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(renderConsentBanner, 800);
            });
        } else {
            setTimeout(renderConsentBanner, 800);
        }
    }
})();
