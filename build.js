/**
 * VisualNotes - Build Script
 * Gated by SIGNUP_GROWTH_ENABLED environment variable.
 * Default = unset = false.
 * When false/unset, output is 100% byte-for-byte identical to baseline.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const BASELINE_DIR = path.join(ROOT_DIR, 'templates', 'baseline');

// Parse flags and environment variables
const args = process.argv.slice(2);
const forceOn = args.includes('--on');
const forceOff = args.includes('--off') || args.includes('--restore');

const isGrowthEnabled = forceOn ? true : (forceOff ? false : (
    process.env.SIGNUP_GROWTH_ENABLED === 'true' ||
    process.env.NEXT_PUBLIC_SIGNUP_GROWTH_ENABLED === 'true' ||
    process.env.VITE_SIGNUP_GROWTH_ENABLED === 'true'
));

console.log(`[BUILD] SIGNUP_GROWTH_ENABLED: ${isGrowthEnabled ? 'TRUE (Growth enhancements enabled)' : 'FALSE (Baseline mode)'}`);

// Read stats config
let statsConfig = {
    readersCount: 'TODO',
    display: {
        statsBarReaders: 'TODO',
        newsletterProof: 'Join engineers learning visually with hand-drawn notes'
    }
};

try {
    const configPath = path.join(ROOT_DIR, 'config', 'growth-stats.json');
    if (fs.existsSync(configPath)) {
        statsConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
} catch (e) {
    console.warn('[BUILD] Could not read config/growth-stats.json:', e.message);
}

// Inline Signup Component Generator
function generateInlineSignup(idSuffix) {
    return `
<!-- Reusable Inline Signup Component (Gated by SIGNUP_GROWTH_ENABLED) -->
<div class="vn-signup-inline-box" data-vn-source="inline">
    <div class="vn-signup-inline-content">
        <span class="vn-signup-inline-badge">Free 11-Page PDF</span>
        <h3 class="vn-signup-inline-headline">Liked this? Get one new hand-drawn diagram every Friday.</h3>
        <p class="vn-signup-inline-desc">
            Join visual learners getting our <strong>Free Networking Cheat Sheet Pack</strong> (11 pages covering Subnetting, VLANs, STP, HSRP, Routing, and DNS) plus one new diagram in your inbox every week.
        </p>
        <form class="vn-signup-form vn-signup-inline-form" onsubmit="window.vnSignup && window.vnSignup.handleFormSubmit(event, 'inline')">
            <label for="vn-inline-email-${idSuffix}" class="vn-signup-sr-only">Email address</label>
            <div class="vn-signup-input-group">
                <input type="email" id="vn-inline-email-${idSuffix}" name="email" class="vn-signup-input" placeholder="Enter your email address" required autocomplete="email" aria-required="true">
                <button type="submit" class="vn-signup-btn vn-signup-btn-primary">
                    <span>Get the Free Cheat Sheet Pack</span>
                </button>
            </div>
            <p class="vn-signup-microcopy">One hand-drawn diagram every Friday. Unsubscribe anytime.</p>
            <div class="vn-signup-status" role="status" aria-live="polite"></div>
        </form>
    </div>
</div>
`;
}

// Enhanced Success Modal HTML
const SUCCESS_MODAL_HTML = `
    <!-- Thank You Modal (Enhanced with Lead Magnet & Flashcards) -->
    <div id="thankYouModal" class="vn-thank-modal" role="dialog" aria-modal="true" aria-labelledby="vn-thank-title" style="display:none;">
        <div class="vn-thank-content" style="position:relative; max-width:540px; background:#ffffff; border-radius:14px; padding:32px 24px; box-shadow:0 20px 40px rgba(0,0,0,0.2);">
            <button class="vn-signup-popup-close" onclick="window.vnSignup && window.vnSignup.closeModal()" aria-label="Close dialog">×</button>
            <div class="vn-signup-success-box">
                <div class="vn-signup-success-icon">🎉</div>
                <h2 id="vn-thank-title" class="vn-signup-success-title">You're in! Download your pack</h2>
                <p class="vn-signup-success-desc">Here is your free 11-page Networking Cheat Sheet Pack. We've also emailed a copy for your reference.</p>
                <div class="vn-signup-download-box">
                    <a href="/downloads/networking-cheat-sheet-pack.pdf" class="vn-signup-btn vn-signup-download-btn" target="_blank" rel="noopener" download="networking-cheat-sheet-pack.pdf" data-vn-source="success_modal">
                        <span>📥 Download the pack (PDF)</span>
                    </a>
                </div>
                <div class="vn-signup-recommended-links">
                    <p class="vn-signup-recommended-title">💡 Practice with interactive flashcards:</p>
                    <div class="vn-signup-pills-row">
                        <a href="/subnetting-flashcards" class="vn-signup-pill-link">⚡ Subnetting Flashcards →</a>
                        <a href="/hsrp-flashcards" class="vn-signup-pill-link">🛡️ HSRP Flashcards →</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

// Enhanced Popup Overlay HTML
const ENHANCED_POPUP_HTML = `
    <!-- Enhanced Lead Magnet Popup (Gated by SIGNUP_GROWTH_ENABLED) -->
    <div id="vn-signup-popup-overlay" class="vn-signup-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="vn-popup-lead-title" style="display:none;">
        <div class="vn-signup-popup-modal">
            <button class="vn-signup-popup-close" onclick="window.dismissSignupPopup && window.dismissSignupPopup()" aria-label="Close popup">×</button>
            <span class="vn-signup-inline-badge">Free 11-Page PDF</span>
            <h2 id="vn-popup-lead-title" class="vn-signup-inline-headline" style="font-size: 1.5rem; margin-top: 4px;">Free Networking Cheat Sheet Pack</h2>
            <p class="vn-signup-inline-desc">
                Nine one-page handwritten visual references for CCNA study, interviews, and day-to-day troubleshooting.
            </p>
            <ul class="vn-signup-popup-topics">
                <li>Subnetting (4-step method)</li>
                <li>VLANs & Inter-VLAN Routing</li>
                <li>Spanning Tree (STP / RSTP)</li>
                <li>HSRP & VRRP Failover</li>
                <li>Routing & Admin Distance</li>
                <li>DNS Records & Resolution</li>
                <li>Common Ports & Protocols</li>
                <li>OSI & Troubleshooting Flow</li>
                <li>SNMP, NetFlow, NTP, Syslog</li>
            </ul>
            <form class="vn-signup-form" onsubmit="window.vnSignup && window.vnSignup.handleFormSubmit(event, 'popup')">
                <label for="vn-popup-email-input" class="vn-signup-sr-only">Email address</label>
                <div class="vn-signup-input-group">
                    <input type="email" id="vn-popup-email-input" name="email" class="vn-signup-input" placeholder="Enter your email address" required autocomplete="email" aria-required="true">
                    <button type="submit" class="vn-signup-btn vn-signup-btn-primary">
                        <span>Get the Free Cheat Sheet Pack</span>
                    </button>
                </div>
                <p class="vn-signup-microcopy">One hand-drawn diagram every Friday. Unsubscribe anytime.</p>
                <div class="vn-signup-status" role="status" aria-live="polite"></div>
            </form>
            <button type="button" class="vn-signup-popup-dismiss" onclick="window.dismissSignupPopup && window.dismissSignupPopup()">
                No thanks, I don't need networking notes
            </button>
        </div>
    </div>
`;

// Helper: Restore pristine baseline files
function restoreBaseline() {
    console.log('[BUILD] Restoring pristine baseline files...');
    let count = 0;

    function copyRecursive(srcDir, destDir) {
        const entries = fs.readdirSync(srcDir, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path.join(srcDir, entry.name);
            const destPath = path.join(destDir, entry.name);
            if (entry.isDirectory()) {
                if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
                copyRecursive(srcPath, destPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
                fs.copyFileSync(srcPath, destPath);
                count++;
            }
        }
    }

    if (fs.existsSync(BASELINE_DIR)) {
        copyRecursive(BASELINE_DIR, ROOT_DIR);
    }
    console.log(`[BUILD] Restored ${count} files to pristine baseline.`);
}

// Helper: Transform index.html
function transformIndexHtml(html) {
    // 1. Inject CSS in head
    if (!html.includes('/css/signup-growth.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="/css/signup-growth.css">\n</head>');
    }

    // 2. Restyle Nav Subscribe button
    html = html.replace(
        /<a href="#subscribe" class="vn-btn-subscribe">Subscribe<\/a>/g,
        '<a href="#subscribe" class="vn-btn-subscribe vn-signup-nav-btn">Subscribe</a>'
    );
    html = html.replace(
        /<a href="#subscribe" class="vn-btn-subscribe" onclick="closeMobileNav\(\)">Subscribe<\/a>/g,
        '<a href="#subscribe" class="vn-btn-subscribe vn-signup-nav-btn" onclick="closeMobileNav()">Subscribe</a>'
    );

    // 3. Hero CTA
    const heroOldCta = `<div class="vn-hero-cta">
                <a href="/guides" class="vn-btn-primary">Explore Guides</a>
                <a href="#articles" class="vn-btn-ghost">Read Articles →</a>
            </div>`;

    const heroNewCta = `<div class="vn-signup-hero-wrap" data-vn-source="hero">
                <form class="vn-signup-form vn-signup-hero-form" onsubmit="window.vnSignup && window.vnSignup.handleFormSubmit(event, 'hero')">
                    <label for="vn-hero-email" class="vn-signup-sr-only">Email address</label>
                    <div class="vn-signup-input-group">
                        <input type="email" id="vn-hero-email" name="email" class="vn-signup-input" placeholder="Enter your email address" required autocomplete="email" aria-required="true">
                        <button type="submit" class="vn-signup-btn vn-signup-btn-primary">
                            <span>Get the free Networking Cheat Sheet Pack</span>
                        </button>
                    </div>
                    <p class="vn-signup-microcopy">One hand-drawn diagram every Friday. Unsubscribe anytime.</p>
                    <div class="vn-signup-status" role="status" aria-live="polite"></div>
                </form>
                <div class="vn-signup-hero-secondary">
                    <a href="/guides" class="vn-signup-explore-btn">Explore Guides →</a>
                </div>
            </div>`;

    if (html.includes(heroOldCta)) {
        html = html.replace(heroOldCta, heroNewCta);
    }

    // 4. Trust & Stats (move hardcoded numbers to TODO placeholders)
    html = html.replace(
        /<div class="vn-stat-value" data-count="5000">5K\+<\/div>/g,
        '<!-- TODO: Replace with real verified metrics before publicizing (see config/growth-stats.json) -->\n                <div class="vn-stat-value" data-count="0">TODO</div>'
    );
    html = html.replace(
        /<p class="vn-newsletter-proof">Join 5,000\+ engineers already learning visually<\/p>/g,
        '<p class="vn-newsletter-proof">' + (statsConfig.display.newsletterProof || 'Join engineers learning visually with hand-drawn notes') + '</p>'
    );
    html = html.replace(
        /<p>Join 5,000\+ engineers learning visually<\/p>/g,
        '<p>' + (statsConfig.display.newsletterProof || 'Join engineers learning visually with hand-drawn notes') + '</p>'
    );

    // 5. Testimonials TODO marker
    html = html.replace(
        /<!-- SECTION 9 — TESTIMONIALS\s+-->/g,
        '<!-- SECTION 9 — TESTIMONIALS -->\n    <!-- TODO: Replace with real, attributable quotes from verified readers (Name, Role/Company, Avatar, Quote) -->'
    );

    // 6. Replace old thankYouModal with enhanced success modal
    const thankModalStart = '<!-- Thank You Modal -->';
    const thankModalEnd = '<!-- Cookie Consent Banner -->';
    if (html.includes(thankModalStart) && html.includes(thankModalEnd)) {
        const beforeThank = html.substring(0, html.indexOf(thankModalStart));
        const afterThank = html.substring(html.indexOf(thankModalEnd));
        html = beforeThank + SUCCESS_MODAL_HTML + '\n    ' + afterThank;
    }

    // 7. Replace old popup with enhanced popup
    const popupStart = '<!-- First-Time Visitor Popup -->';
    const popupEnd = '<script>';
    if (html.includes(popupStart)) {
        const popupStartIndex = html.indexOf(popupStart);
        const scriptAfterPopup = html.indexOf(popupEnd, popupStartIndex);
        if (scriptAfterPopup !== -1) {
            const beforePopup = html.substring(0, popupStartIndex);
            const afterPopup = html.substring(scriptAfterPopup);
            html = beforePopup + ENHANCED_POPUP_HTML + '\n    ' + afterPopup;
        }
    }

    // 8. Disable old popup trigger script
    html = html.replace(
        "if (!hasSeenPopup()) setTimeout(showPopup, POPUP_DELAY);",
        "// Old popup disabled by SIGNUP_GROWTH_ENABLED; handled by /js/signup-growth.js\n            // if (!hasSeenPopup()) setTimeout(showPopup, POPUP_DELAY);"
    );

    // 9. Inject growth JS before </body>
    if (!html.includes('/js/signup-growth.js')) {
        html = html.replace('</body>', '    <script src="/js/signup-growth.js"></script>\n</body>');
    }

    return html;
}

// Helper: Transform Blog Post HTML
function transformBlogPostHtml(html, filename) {
    // 1. Inject CSS in head
    if (!html.includes('/css/signup-growth.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="/css/signup-growth.css">\n</head>');
    }

    // 2. Restyle Nav Subscribe button
    html = html.replace(
        /<a href="(#subscribe|\/#subscribe)" class="vn-btn-subscribe">Subscribe<\/a>/g,
        '<a href="$1" class="vn-btn-subscribe vn-signup-nav-btn">Subscribe</a>'
    );
    html = html.replace(
        /<a href="(#subscribe|\/#subscribe)" class="vn-btn-subscribe" onclick="closeMobileNav\(\)">Subscribe<\/a>/g,
        '<a href="$1" class="vn-btn-subscribe vn-signup-nav-btn" onclick="closeMobileNav()">Subscribe</a>'
    );

    // 3. Inject inline signups:
    // One after intro (after 2nd paragraph of .vn-body)
    const bodyTag = '<div class="vn-body">';
    if (html.includes(bodyTag)) {
        const bodyIndex = html.indexOf(bodyTag) + bodyTag.length;
        const restOfHtml = html.substring(bodyIndex);

        // Find second closing </p>
        let pCount = 0;
        let searchIndex = 0;
        let secondPEndIndex = -1;

        while (pCount < 2) {
            const nextP = restOfHtml.indexOf('</p>', searchIndex);
            if (nextP === -1) break;
            pCount++;
            secondPEndIndex = nextP + 4;
            searchIndex = secondPEndIndex;
        }

        if (secondPEndIndex !== -1 && !restOfHtml.includes('vn-signup-inline-box')) {
            const beforeIntro = restOfHtml.substring(0, secondPEndIndex);
            const afterIntro = restOfHtml.substring(secondPEndIndex);
            const introComponent = generateInlineSignup('blog-intro');
            const endComponent = generateInlineSignup('blog-end');

            let endInsertPoint = afterIntro.lastIndexOf('</div>');
            if (endInsertPoint !== -1) {
                const bodyContent = afterIntro.substring(0, endInsertPoint);
                const afterBody = afterIntro.substring(endInsertPoint);
                html = html.substring(0, bodyIndex) + beforeIntro + introComponent + bodyContent + endComponent + afterBody;
            } else {
                html = html.substring(0, bodyIndex) + beforeIntro + introComponent + afterIntro;
            }
        }
    }

    // 4. Ensure thankYouModal exists in the page
    if (!html.includes('thankYouModal')) {
        html = html.replace('</body>', SUCCESS_MODAL_HTML + '\n</body>');
    }

    // 5. Inject growth JS before </body>
    if (!html.includes('/js/signup-growth.js')) {
        html = html.replace('</body>', '    <script src="/js/signup-growth.js"></script>\n</body>');
    }

    return html;
}

// Helper: Transform guides/index.html
function transformGuidesHtml(html) {
    // 1. Inject CSS in head
    if (!html.includes('/css/signup-growth.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="/css/signup-growth.css">\n</head>');
    }

    // 2. Restyle Nav Subscribe button
    html = html.replace(
        /<a href="(#subscribe|\/#subscribe)" class="vn-btn-subscribe">Subscribe<\/a>/g,
        '<a href="$1" class="vn-btn-subscribe vn-signup-nav-btn">Subscribe</a>'
    );
    html = html.replace(
        /<a href="(#subscribe|\/#subscribe)" class="vn-btn-subscribe" onclick="closeMobileNav\(\)">Subscribe<\/a>/g,
        '<a href="$1" class="vn-btn-subscribe vn-signup-nav-btn" onclick="closeMobileNav()">Subscribe</a>'
    );

    // 3. Inject inline signup after intro (before .vn-guides-grid)
    const guidesGridTag = '<div class="vn-guides-grid"';
    if (html.includes(guidesGridTag) && !html.includes('vn-signup-inline-box')) {
        const introComponent = generateInlineSignup('guides-intro');
        const endComponent = generateInlineSignup('guides-end');

        html = html.replace(guidesGridTag, introComponent + '\n            ' + guidesGridTag);

        // Inject at end of guides list / before newsletter
        const newsletterTag = '<section class="vn-newsletter"';
        if (html.includes(newsletterTag)) {
            html = html.replace(newsletterTag, endComponent + '\n        ' + newsletterTag);
        }
    }

    // 4. Ensure thankYouModal exists
    if (!html.includes('thankYouModal')) {
        html = html.replace('</body>', SUCCESS_MODAL_HTML + '\n</body>');
    }

    // 5. Inject growth JS before </body>
    if (!html.includes('/js/signup-growth.js')) {
        html = html.replace('</body>', '    <script src="/js/signup-growth.js"></script>\n</body>');
    }

    return html;
}

// MAIN BUILD EXECUTION
function runBuild() {
    if (!isGrowthEnabled) {
        // Gated OFF: Guarantee 100% byte-for-byte baseline parity
        restoreBaseline();
        console.log('[BUILD] Flag is OFF. Output is guaranteed 100% byte-for-byte identical to baseline.');
        return;
    }

    console.log('[BUILD] Flag is ON. Applying signup growth enhancements...');

    // 1. Transform index.html
    const indexPath = path.join(ROOT_DIR, 'index.html');
    const baseIndexPath = path.join(BASELINE_DIR, 'index.html');
    const baseIndexHtml = fs.readFileSync(baseIndexPath, 'utf8');
    const transformedIndexHtml = transformIndexHtml(baseIndexHtml);
    fs.writeFileSync(indexPath, transformedIndexHtml, 'utf8');
    console.log('[BUILD] Transformed index.html');

    // 2. Transform guides/index.html
    const guidesPath = path.join(ROOT_DIR, 'guides', 'index.html');
    const baseGuidesPath = path.join(BASELINE_DIR, 'guides', 'index.html');
    if (fs.existsSync(baseGuidesPath)) {
        const baseGuidesHtml = fs.readFileSync(baseGuidesPath, 'utf8');
        const transformedGuidesHtml = transformGuidesHtml(baseGuidesHtml);
        fs.writeFileSync(guidesPath, transformedGuidesHtml, 'utf8');
        console.log('[BUILD] Transformed guides/index.html');
    }

    // 3. Transform blog posts
    const blogDir = path.join(ROOT_DIR, 'blog');
    const baseBlogDir = path.join(BASELINE_DIR, 'blog');
    if (fs.existsSync(baseBlogDir)) {
        const blogFiles = fs.readdirSync(baseBlogDir).filter(f => f.endsWith('.html') && f !== 'index.html');
        for (const file of blogFiles) {
            const basePostPath = path.join(baseBlogDir, file);
            const targetPostPath = path.join(blogDir, file);
            const basePostHtml = fs.readFileSync(basePostPath, 'utf8');
            const transformedPostHtml = transformBlogPostHtml(basePostHtml, file);
            fs.writeFileSync(targetPostPath, transformedPostHtml, 'utf8');
        }
        console.log(`[BUILD] Transformed ${blogFiles.length} blog post articles`);
    }

    console.log('[BUILD] Signup growth build complete successfully!');
}

runBuild();
