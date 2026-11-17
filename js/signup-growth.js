/**
 * VisualNotes - Signup Growth Client Script
 * Strictly wrapped in try/catch to ensure zero disruption to production.
 */
(function () {
    'use strict';

    try {
        // Backend endpoint (reuses visualnotes existing Google Apps Script)
        var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwYxzHdMiTy0Q8O-dURdyERoag-iak2lJuQ3TEv6gL57txAGe--VItTvGfkXzjv9tOmPA/exec';
        var STORAGE_KEY = 'vn_signup_lead_magnet_v1';
        var FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

        // ===== ANALYTICS HELPER =====
        function trackEvent(eventName, params) {
            try {
                var eventParams = Object.assign({
                    page_path: window.location.pathname || '/'
                }, params || {});

                if (typeof window.gtag === 'function') {
                    window.gtag('event', eventName, eventParams);
                } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
                    window.dataLayer.push(Object.assign({ event: eventName }, eventParams));
                }
            } catch (err) {
                // Fail silently to never impact user experience
            }
        }

        // ===== LOCALSTORAGE EXPIRY HELPER =====
        function getStoredState() {
            try {
                var raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return null;
                var data = JSON.parse(raw);
                if (data && data.expires && Date.now() > data.expires) {
                    localStorage.removeItem(STORAGE_KEY);
                    return null;
                }
                return data;
            } catch (err) {
                return null;
            }
        }

        function setStoredState(status) {
            try {
                var data = {
                    status: status, // 'subscribed' or 'dismissed'
                    timestamp: Date.now(),
                    expires: Date.now() + FOURTEEN_DAYS_MS
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (err) {
                // Ignore private browsing quota errors
            }
        }

        // ===== SUCCESS MODAL GENERATION & DISPLAY =====
        function showSuccessModal(source, submittedEmail) {
            try {
                trackEvent('signup_success', { source: source || 'unknown' });

                var modal = document.getElementById('thankYouModal');
                if (modal) {
                    var content = modal.querySelector('.vn-thank-content');
                    if (content) {
                        var displayEmail = submittedEmail ? ('<strong>' + submittedEmail.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</strong>') : 'your email address';
                        content.innerHTML = [
                            '<button class="vn-signup-popup-close" style="top:10px;right:10px;" onclick="window.vnSignup && window.vnSignup.closeModal()" aria-label="Close dialog">×</button>',
                            '<div class="vn-signup-success-box">',
                            '  <div class="vn-signup-success-icon">📬</div>',
                            '  <h2 class="vn-signup-success-title">Check your inbox!</h2>',
                            '  <p class="vn-signup-success-desc">We just sent your free <strong>11-page Networking Cheat Sheet Pack</strong> to ' + displayEmail + '.</p>',
                            '  <div class="vn-signup-inbox-tip" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px 20px; margin:20px 0; text-align:left;">',
                            '    <p style="margin:0 0 8px 0; font-weight:700; color:#0f172a; font-size:0.95rem;">📥 How to get your pack:</p>',
                            '    <ol style="margin:0; padding-left:20px; color:#475569; font-size:0.88rem; line-height:1.6;">',
                            '      <li>Open your email app and look for an email from <strong>VisualNotes</strong>.</li>',
                            '      <li>Click the green <strong>"Download the pack (PDF)"</strong> button inside.</li>',
                            '      <li><em>(If you don\'t see it in 1-2 minutes, check your Promotions or Spam folder).</em></li>',
                            '    </ol>',
                            '  </div>',
                            '  <div class="vn-signup-recommended-links">',
                            '    <p class="vn-signup-recommended-title">💡 While you wait, test your networking skills:</p>',
                            '    <div class="vn-signup-pills-row">',
                            '      <a href="/subnetting-flashcards" class="vn-signup-pill-link">⚡ Subnetting Flashcards →</a>',
                            '      <a href="/hsrp-flashcards" class="vn-signup-pill-link">🛡️ HSRP Flashcards →</a>',
                            '    </div>',
                            '  </div>',
                            '</div>'
                        ].join('\n');
                    }
                    modal.style.display = 'flex';
                }
            } catch (err) {
                console.error('Error showing success modal:', err);
            }
        }

        function closeModal() {
            try {
                var modal = document.getElementById('thankYouModal');
                if (modal) modal.style.display = 'none';
                var popupOverlay = document.getElementById('vn-signup-popup-overlay');
                if (popupOverlay) popupOverlay.style.display = 'none';
                document.body.style.overflow = '';
            } catch (err) {
                // Ignore
            }
        }

        // ===== FORM SUBMISSION HANDLER =====
        async function handleFormSubmit(event, source) {
            try {
                if (event) event.preventDefault();
                var form = event ? event.target : null;
                if (!form) return;

                var emailInput = form.querySelector('input[type="email"]');
                var submitBtn = form.querySelector('button[type="submit"]');
                var statusEl = form.querySelector('.vn-signup-status');

                if (!emailInput || !submitBtn) return;

                var email = (emailInput.value || '').trim().toLowerCase();
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                function showStatus(msg, isError) {
                    if (statusEl) {
                        statusEl.textContent = msg;
                        statusEl.className = 'vn-signup-status ' + (isError ? 'vn-signup-error' : 'vn-signup-success');
                    }
                    if (isError) {
                        emailInput.classList.add('vn-signup-input-error');
                        emailInput.focus();
                    } else {
                        emailInput.classList.remove('vn-signup-input-error');
                    }
                }

                if (!email || !emailRegex.test(email)) {
                    showStatus('Please enter a valid email address.', true);
                    return;
                }

                var junkList = ['abc@gmail.com', 'test@gmail.com', 'test@test.com', 'admin@gmail.com', 'user@gmail.com'];
                if (junkList.indexOf(email) !== -1 || email.length < 6) {
                    showStatus('Please enter a real work or personal email address.', true);
                    return;
                }

                // Clear error
                showStatus('', false);

                // Double submit prevention
                submitBtn.disabled = true;
                var originalBtnHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span>';

                trackEvent('signup_submit', { source: source || 'unknown' });

                // Dispatch to Google Apps Script backend (non-blocking so modal opens immediately)
                try {
                    fetch(SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify({
                            email: email,
                            country: 'detect-server-side',
                            source: source || 'growth_form'
                        })
                    }).catch(function (fetchErr) {
                        console.warn('Backend notification caught:', fetchErr);
                    });
                } catch (dispatchErr) {}

                setStoredState('subscribed');

                // If submitted from popup, hide popup first
                var popupOverlay = document.getElementById('vn-signup-popup-overlay');
                if (popupOverlay) popupOverlay.style.display = 'none';

                // Display success UI immediately with inbox verification instructions
                showSuccessModal(source, email);

                // Reset form button after brief delay
                setTimeout(function () {
                    try {
                        emailInput.value = '';
                        submitBtn.innerHTML = originalBtnHtml;
                        submitBtn.disabled = false;
                        if (statusEl) statusEl.textContent = '';
                    } catch (e) {}
                }, 800);

            } catch (err) {
                console.error('Signup error:', err);
            }
        }

        // ===== POPUP LOGIC: EXIT INTENT & MOBILE SCROLL =====
        function setupPopup() {
            try {
                var state = getStoredState();
                if (state) {
                    // User already subscribed or dismissed within 14 days
                    return;
                }

                var popupOverlay = document.getElementById('vn-signup-popup-overlay');
                if (!popupOverlay) return;

                var popupTriggered = false;

                function triggerPopup() {
                    if (popupTriggered) return;
                    if (getStoredState()) return;

                    popupTriggered = true;
                    popupOverlay.style.display = 'block';
                    document.body.style.overflow = 'hidden';

                    trackEvent('popup_shown', { source: 'popup' });

                    // Remove listeners once shown
                    document.removeEventListener('mouseleave', handleDesktopExitIntent);
                    window.removeEventListener('scroll', handleMobileScroll);
                }

                // Desktop: Exit intent when cursor leaves window through top boundary
                function handleDesktopExitIntent(e) {
                    try {
                        if (e.clientY <= 0) {
                            triggerPopup();
                        }
                    } catch (err) {}
                }

                // Mobile: 60% scroll depth
                function handleMobileScroll() {
                    try {
                        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        if (scrollHeight > 0 && (scrollTop / scrollHeight) >= 0.6) {
                            triggerPopup();
                        }
                    } catch (err) {}
                }

                // Only attach exit intent on devices with hover/pointer capability
                var isDesktop = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
                if (isDesktop) {
                    document.addEventListener('mouseleave', handleDesktopExitIntent);
                } else {
                    window.addEventListener('scroll', handleMobileScroll, { passive: true });
                }

                // Setup dismiss handlers
                window.dismissSignupPopup = function () {
                    try {
                        setStoredState('dismissed');
                        popupOverlay.style.display = 'none';
                        document.body.style.overflow = '';
                        trackEvent('popup_dismissed', { source: 'popup' });
                    } catch (err) {}
                };

                // Close on backdrop click
                popupOverlay.addEventListener('click', function (e) {
                    if (e.target === popupOverlay) {
                        window.dismissSignupPopup();
                    }
                });

                // Close on Escape key
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape' && popupOverlay.style.display === 'block') {
                        window.dismissSignupPopup();
                    }
                });

            } catch (err) {
                console.error('Popup setup error:', err);
            }
        }

        // ===== VIEWPORT TRACKING FOR SIGNUP VIEWS =====
        function setupViewTracking() {
            try {
                if (!('IntersectionObserver' in window)) return;

                var observer = new IntersectionObserver(function (entries, obs) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var form = entry.target;
                            var source = form.getAttribute('data-vn-source') || 'unknown';
                            trackEvent('signup_view', { source: source });
                            obs.unobserve(form);
                        }
                    });
                }, { threshold: 0.25 });

                document.querySelectorAll('.vn-signup-hero-wrap, .vn-signup-inline-box, section.vn-newsletter').forEach(function (el) {
                    observer.observe(el);
                });
            } catch (err) {}
        }

        // ===== DEEP LINK & QUERY STRING PRESERVATION =====
        function handleDeepLinks() {
            try {
                // Ensure #subscribe anchor works even when UTM parameters are present
                if (window.location.hash === '#subscribe') {
                    var target = document.getElementById('subscribe');
                    if (target) {
                        setTimeout(function () {
                            target.scrollIntoView({ behavior: 'smooth' });
                            var input = target.querySelector('input[type="email"]');
                            if (input) input.focus();
                        }, 100);
                    }
                }

                // Setup nav buttons to scroll to form
                document.querySelectorAll('.vn-signup-nav-btn').forEach(function (btn) {
                    btn.addEventListener('click', function (e) {
                        var subscribeEl = document.getElementById('subscribe') || document.querySelector('.vn-signup-inline-box') || document.querySelector('.vn-signup-hero-wrap');
                        if (subscribeEl) {
                            e.preventDefault();
                            subscribeEl.scrollIntoView({ behavior: 'smooth' });
                            var input = subscribeEl.querySelector('input[type="email"]');
                            if (input) input.focus();
                            trackEvent('signup_view', { source: 'nav' });
                        }
                    });
                });
            } catch (err) {}
        }

        // ===== LEAD MAGNET DOWNLOAD CLICK TRACKING =====
        function setupDownloadTracking() {
            try {
                document.addEventListener('click', function (e) {
                    var link = e.target.closest('a');
                    if (link && link.href && link.href.indexOf('networking-cheat-sheet-pack.pdf') !== -1) {
                        var source = link.getAttribute('data-vn-source') || 'pack_link';
                        trackEvent('pack_download_click', { source: source });
                    }
                });
            } catch (err) {}
        }

        // ===== AUTO-PREFILL FROM URL & ATTACH FORM LISTENERS =====
        function setupFormListeners() {
            try {
                // Prefill ?email= if present in URL
                var urlParams = new URLSearchParams(window.location.search);
                var emailParam = urlParams.get('email');
                if (emailParam) {
                    var inputs = document.querySelectorAll('.vn-signup-input');
                    inputs.forEach(function (inp) {
                        if (!inp.value) inp.value = emailParam;
                    });
                }

                // Attach robust submit handlers
                var forms = document.querySelectorAll('.vn-signup-form');
                forms.forEach(function (f) {
                    if (!f.hasAttribute('data-vn-bound')) {
                        f.setAttribute('data-vn-bound', 'true');
                        f.addEventListener('submit', function (ev) {
                            var src = f.closest('[data-vn-source]') ? f.closest('[data-vn-source]').getAttribute('data-vn-source') : (f.closest('#vn-signup-popup-overlay') ? 'popup' : 'hero');
                            handleFormSubmit(ev, src);
                        });
                    }
                });
            } catch (err) {}
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                setupFormListeners();
                setupPopup();
                setupViewTracking();
                handleDeepLinks();
                setupDownloadTracking();
            });
        } else {
            setupFormListeners();
            setupPopup();
            setupViewTracking();
            handleDeepLinks();
            setupDownloadTracking();
        }

        // Export public API
        window.vnSignup = {
            handleFormSubmit: handleFormSubmit,
            trackEvent: trackEvent,
            closeModal: closeModal,
            showSuccessModal: showSuccessModal
        };

    } catch (globalErr) {
        console.error('VisualNotes Signup Growth Script init error:', globalErr);
    }
})();
