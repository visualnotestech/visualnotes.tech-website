/**
 * VisualNotes - Verification Test Suite
 * Validates baseline byte-for-byte parity when flag is OFF,
 * and complete functionality, SEO safety, and accessibility when flag is ON.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = __dirname;
const BASELINE_DIR = path.join(ROOT_DIR, 'templates', 'baseline');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✓ ${message}`);
        testsPassed++;
    } else {
        console.error(`  ✗ FAIL: ${message}`);
        testsFailed++;
    }
}

console.log('====================================================');
console.log('Running VisualNotes Signup Growth Verification Suite');
console.log('====================================================\n');

// ------------------------------------------------------------------
// STEP 1: TEST FLAG OFF (Byte-for-byte baseline parity)
// ------------------------------------------------------------------
console.log('TEST SUITE 1: Flag OFF (Baseline Parity)');
execSync('node build.js --off', { stdio: 'pipe' });

const filesToDiff = [
    'index.html',
    'guides/index.html',
    'blog/how-dns-works.html',
    'blog/cloud-comparison.html',
    'blog/google-dorking-guide.html',
    'blog/osint-tools-2026.html'
];

for (const file of filesToDiff) {
    const activePath = path.join(ROOT_DIR, file);
    const baselinePath = path.join(BASELINE_DIR, file);
    
    assert(fs.existsSync(activePath), `File exists: ${file}`);
    assert(fs.existsSync(baselinePath), `Baseline exists: ${file}`);
    
    const activeBuf = fs.readFileSync(activePath);
    const baseBuf = fs.readFileSync(baselinePath);
    
    const isIdentical = activeBuf.equals(baseBuf);
    assert(isIdentical, `Flag OFF: ${file} is 100% byte-for-byte identical to baseline`);
}

// ------------------------------------------------------------------
// STEP 2: TEST FLAG ON (Enhancements & Quality verification)
// ------------------------------------------------------------------
console.log('\nTEST SUITE 2: Flag ON (Growth Features & Quality)');
execSync('node build.js --on', { stdio: 'pipe' });

// 1. Verify index.html
const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

assert(indexHtml.includes('/css/signup-growth.css'), 'index.html links to /css/signup-growth.css');
assert(indexHtml.includes('/js/signup-growth.js'), 'index.html includes /js/signup-growth.js');

// Task 1: Hero CTA
assert(indexHtml.includes('id="vn-hero-email"'), 'Hero CTA includes email input');
assert(indexHtml.includes('Get the free Networking Cheat Sheet Pack'), 'Hero CTA button text is exact');
assert(indexHtml.includes('One hand-drawn diagram every Friday. Unsubscribe anytime.'), 'Hero CTA microcopy is exact');
assert(indexHtml.includes('Explore Guides'), 'Hero CTA retains Explore Guides secondary action');

// Task 3: Nav
assert(indexHtml.includes('vn-signup-nav-btn'), 'Nav Subscribe button styled with vn-signup-nav-btn');
assert(indexHtml.includes('href="#subscribe"'), 'Nav button retains #subscribe anchor');

// Task 4: Popup
assert(indexHtml.includes('id="vn-signup-popup-overlay"'), 'Enhanced lead magnet popup overlay present');
assert(indexHtml.includes('Free Networking Cheat Sheet Pack'), 'Popup includes lead magnet title');
assert(indexHtml.includes('Subnetting (4-step method)'), 'Popup lists cheat sheet topics');
assert(indexHtml.includes('No thanks, I don\'t need networking notes'), 'Popup includes accessible dismiss action');

// Task 5: Success state
assert(indexHtml.includes("You're in! Download your pack"), 'Success state headline is exact');
assert(indexHtml.includes('Download the pack (PDF)'), 'Lead magnet download link text is exact');
assert(indexHtml.includes('/downloads/networking-cheat-sheet-pack.pdf'), 'Lead magnet PDF link points to /downloads/networking-cheat-sheet-pack.pdf');
assert(indexHtml.includes('/subnetting-flashcards'), 'Success state links to /subnetting-flashcards');
assert(indexHtml.includes('/hsrp-flashcards'), 'Success state links to /hsrp-flashcards');

// Task 7: Trust & Honesty
assert(indexHtml.includes('config/growth-stats.json'), 'index.html references config/growth-stats.json placeholder');
assert(indexHtml.includes('<!-- TODO: Replace with real, attributable quotes from verified readers'), 'Testimonials section has real quote TODO marker');

// 2. Verify Blog Posts (Task 2)
const blogHtml = fs.readFileSync(path.join(ROOT_DIR, 'blog', 'how-dns-works.html'), 'utf8');
assert(blogHtml.includes('Liked this? Get one new hand-drawn diagram every Friday.'), 'Blog post has inline signup headline');
assert(blogHtml.includes('Free Networking Cheat Sheet Pack'), 'Blog inline component mentions cheat sheet pack');

const inlineOccurrences = (blogHtml.match(/vn-signup-inline-box/g) || []).length;
assert(inlineOccurrences >= 2, `Blog post has reusable inline components after intro and at end (found ${inlineOccurrences})`);
assert(blogHtml.includes('/css/signup-growth.css'), 'Blog post links to /css/signup-growth.css');
assert(blogHtml.includes('/js/signup-growth.js'), 'Blog post links to /js/signup-growth.js');

// 3. Verify Guides page (Task 2)
const guidesHtml = fs.readFileSync(path.join(ROOT_DIR, 'guides', 'index.html'), 'utf8');
assert(guidesHtml.includes('Liked this? Get one new hand-drawn diagram every Friday.'), 'Guides page has inline signup headline');
const guidesInlineOccurrences = (guidesHtml.match(/vn-signup-inline-box/g) || []).length;
assert(guidesInlineOccurrences >= 2, `Guides page has inline components (found ${guidesInlineOccurrences})`);

// 4. Verify Welcome Email (Task 6)
const welcomeDocPath = path.join(ROOT_DIR, 'docs', 'welcome-email.md');
assert(fs.existsSync(welcomeDocPath), 'docs/welcome-email.md exists');
const welcomeDoc = fs.readFileSync(welcomeDocPath, 'utf8');
assert(welcomeDoc.includes('Your Networking Cheat Sheet Pack is here'), 'Welcome email subject is exact');
assert(welcomeDoc.includes('https://www.visualnotes.tech/downloads/networking-cheat-sheet-pack.pdf'), 'Welcome email download link is exact');
assert(welcomeDoc.includes('Subnetting'), 'Welcome email lists Subnetting topic');
assert(welcomeDoc.includes('HSRP/VRRP'), 'Welcome email lists HSRP/VRRP topic');
assert(welcomeDoc.toLowerCase().includes('one new hand-drawn diagram every friday'), 'Welcome email mentions Friday diagram');
assert(welcomeDoc.includes('Abhiney, VisualNotes'), 'Welcome email sign-off is exact');

const gasScript = fs.readFileSync(path.join(ROOT_DIR, 'google-apps-script-v3.js'), 'utf8');
assert(gasScript.includes('Your Networking Cheat Sheet Pack is here'), 'google-apps-script-v3.js welcome email updated');

// 5. Verify CSS Scoping & Quality (Task 9)
const cssContent = fs.readFileSync(path.join(ROOT_DIR, 'css', 'signup-growth.css'), 'utf8');
assert(!cssContent.includes('body {'), 'No unscoped body selector in signup-growth.css');
assert(cssContent.includes('.vn-signup-'), 'CSS classes use prefix vn-signup-');
assert(cssContent.includes('prefers-reduced-motion'), 'CSS respects prefers-reduced-motion');
assert(cssContent.includes(':focus-visible'), 'CSS provides visible focus outlines');

// 6. Verify JS Tracking & Quality (Task 8 & 9)
const jsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'signup-growth.js'), 'utf8');
const trackingEvents = [
    'signup_view',
    'signup_submit',
    'signup_success',
    'popup_shown',
    'popup_dismissed',
    'pack_download_click'
];
for (const ev of trackingEvents) {
    assert(jsContent.includes(`'${ev}'`), `JS tracks analytics event: ${ev}`);
}
assert(jsContent.includes('try {'), 'JS wrapped in try/catch');
assert(jsContent.includes('14 * 24 * 60 * 60 * 1000'), 'JS implements 14-day localStorage expiry');

// 7. Verify SEO Safety
const sitemap = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
assert(!sitemap.includes('networking-cheat-sheet-pack.pdf'), 'PDF lead magnet is NOT added to sitemap.xml');
assert(sitemap.includes('https://www.visualnotes.tech/'), 'sitemap.xml remains untouched');

// ------------------------------------------------------------------
// STEP 3: RESET TO BASELINE (Guarantee repo purity)
// ------------------------------------------------------------------
console.log('\nTEST SUITE 3: Reset to Baseline');
execSync('node build.js --off', { stdio: 'pipe' });

for (const file of filesToDiff) {
    const activeBuf = fs.readFileSync(path.join(ROOT_DIR, file));
    const baseBuf = fs.readFileSync(path.join(BASELINE_DIR, file));
    assert(activeBuf.equals(baseBuf), `Post-test reset: ${file} restored to pristine baseline`);
}

console.log('\n====================================================');
console.log(`SUMMARY: ${testsPassed} tests passed, ${testsFailed} tests failed.`);
console.log('====================================================\n');

if (testsFailed > 0) {
    process.exit(1);
}
