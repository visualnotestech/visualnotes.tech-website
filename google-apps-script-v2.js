/**
 * VISUALNOTES.TECH - PRODUCTION SCRIPT V2 (MERGED)
 * 
 * INSTRUCTIONS:
 * 1. Copy ALL this code into your Google Apps Script editor.
 * 2. Run the 'setup' function once to set your Admin Key.
 * 3. Deploy as Web App (User: Me, Access: Anyone).
 */

// ===== CONFIGURATION =====
const ADMIN_EMAIL = 'visualnotes.tech@gmail.com';
const WEBSITE_URL = 'https://visualnotes.tech';
const INSTAGRAM_URL = 'https://www.instagram.com/visualnotes.tech/';
const WHATSAPP_URL = 'https://whatsapp.com/channel/0029Vb6z21DBqbr2xDU7Rc2P';
const SCRIPT_PROPERTY_ADMIN_KEY = "ADMIN_KEY";

// Data Keys for Properties Service
const PROP_LATEST_ARTICLES = "LATEST_ARTICLES";
const PROP_LATEST_GUIDES = "LATEST_GUIDES";

// Fallback Content
const DEFAULT_ARTICLES = [
    {
        title: 'Google Dorking: The Complete Guide',
        url: 'https://visualnotes.tech/blog/google-dorking-guide.html',
        description: 'Master advanced search operators and ethical hacking techniques'
    },
    {
        title: 'How DNS Actually Works',
        url: 'https://visualnotes.tech/blog/how-dns-works.html',
        description: 'Visual guide to understanding DNS with real-world examples'
    }
];

const DEFAULT_GUIDES = [
    { title: 'DNS Administration', category: 'Infrastructure' },
    { title: 'Inter-VLAN Routing', category: 'Networking' },
    { title: 'SNMP Deep Dive', category: 'Monitoring' }
];

// ===== MAIN HANDLER =====
function doPost(e) {
    let requestData = null;
    try {
        if (e.postData && e.postData.contents) {
            requestData = JSON.parse(e.postData.contents);
        }
    } catch (err) { }

    // 1. BROADCAST ACTION
    if (requestData && requestData.action === 'broadcast') {
        return handleBroadcastRequest(requestData);
    }

    // 2. UPDATE CONTENT ACTION (New)
    if (requestData && requestData.action === 'update_content') {
        return handleContentUpdate(requestData);
    }

    // 3. SUBSCRIPTION LOGIC
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        let email;

        if (requestData && requestData.email) {
            email = requestData.email;
        } else if (e.parameter.email) {
            email = e.parameter.email;
        }

        if (!email || !isValidEmail(email)) {
            return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid email' })).setMimeType(ContentService.MimeType.JSON);
        }

        // Check duplicates
        const emailColumn = sheet.getRange('A:A').getValues();
        const isDuplicate = emailColumn.some(row => row[0].toString().toLowerCase() === email.toLowerCase());

        if (isDuplicate) {
            return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Already subscribed!' })).setMimeType(ContentService.MimeType.JSON);
        }

        // Country Detection
        let country = 'Unknown';
        try {
            if (requestData && requestData.country && requestData.country !== 'detect-server-side') {
                country = requestData.country;
            } else {
                country = detectCountryFromRequest(e);
            }
        } catch (error) { country = 'Unknown'; }

        // Add to Sheet
        const timestamp = new Date();
        sheet.appendRow([email, timestamp, 'Active', country]);

        // Send Welcome Email
        sendEnhancedWelcomeEmail(email);
        notifyAdmin(email, timestamp, country);

        return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Subscribed!', country: country })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Error: ' + error.toString() })).setMimeType(ContentService.MimeType.JSON);
    }
}

// ===== CONTENT UPDATE HANDLER =====
function handleContentUpdate(data) {
    // Security Check
    const providedKey = data.adminKey;
    const scriptProperties = PropertiesService.getScriptProperties();
    const storedKey = scriptProperties.getProperty(SCRIPT_PROPERTY_ADMIN_KEY);

    if (!storedKey || providedKey !== storedKey) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Invalid Admin Key' })).setMimeType(ContentService.MimeType.JSON);
    }

    // Update Properties
    if (data.latestArticles) {
        scriptProperties.setProperty(PROP_LATEST_ARTICLES, JSON.stringify(data.latestArticles));
    }
    if (data.latestGuides) {
        scriptProperties.setProperty(PROP_LATEST_GUIDES, JSON.stringify(data.latestGuides));
    }

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', message: 'Content updated successfully' })).setMimeType(ContentService.MimeType.JSON);
}

// ===== BROADCAST HANDLER =====
function handleBroadcastRequest(data) {
    const providedKey = data.adminKey;
    const scriptProperties = PropertiesService.getScriptProperties();
    const storedKey = scriptProperties.getProperty(SCRIPT_PROPERTY_ADMIN_KEY);

    if (!storedKey || providedKey !== storedKey) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Invalid Admin Key' })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!data.title || !data.description || !data.url) {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Missing fields' })).setMimeType(ContentService.MimeType.JSON);
    }

    const resultMsg = sendNewContentNotification(data.title, "New Update", data.url, data.description);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success', message: resultMsg })).setMimeType(ContentService.MimeType.JSON);
}

// ... (Country Helper Functions - No Change) ... 

// ===== ENHANCED WELCOME EMAIL =====
function sendEnhancedWelcomeEmail(email) {
    const scriptProperties = PropertiesService.getScriptProperties();

    // Fetch Dynamic Content (or fallback)
    let articles = DEFAULT_ARTICLES;
    let guides = DEFAULT_GUIDES;

    try {
        const storedArticles = scriptProperties.getProperty(PROP_LATEST_ARTICLES);
        if (storedArticles) articles = JSON.parse(storedArticles);

        const storedGuides = scriptProperties.getProperty(PROP_LATEST_GUIDES);
        if (storedGuides) guides = JSON.parse(storedGuides);
    } catch (e) { Logger.log('Error parsing dynamic content: ' + e); }

    const subject = "Welcome to VisualNotes - Your Learning Journey Starts Here!";

    let articlesHTML = '';
    articles.forEach(article => {
        articlesHTML += `
      <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid #FF6B6B;">
        <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px;">${article.title}</h3>
        <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">${article.description}</p>
        <a href="${article.url}" style="color: #FF6B6B; text-decoration: none; font-weight: 600; font-size: 14px;">Read Article →</a>
      </div>
    `;
    });

    let guidesHTML = '';
    guides.forEach(guide => {
        guidesHTML += `
      <div style="display: inline-block; background: #ecfdf5; color: #10b981; padding: 8px 16px; border-radius: 20px; margin: 5px; font-size: 13px; font-weight: 600;">
        ${guide.title}
      </div>
    `;
    });

    const htmlBody = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to VisualNotes!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your visual learning journey starts now</p>
      </div>
      
      <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
        
        <h2 style="color: #FF6B6B; margin-top: 0; font-size: 22px;">Thanks for subscribing!</h2>
        <p style="color: #475569; margin-bottom: 30px;">
          You've joined <strong>1000+ engineers</strong> who are learning Infrastructure, Cloud, Security & OSINT with visual guides that actually make sense.
        </p>
        <div style="margin: 30px 0;">
          <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
            Latest Articles
          </h3>
          ${articlesHTML}
        </div>
        <div style="margin: 30px 0;">
          <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 15px;">
            Popular Study Guides
          </h3>
          <div style="margin-bottom: 20px;">
            ${guidesHTML}
          </div>
          <a href="${WEBSITE_URL}" 
             style="display: inline-block; background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 15px;">
            Explore All Study Guides →
          </a>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; border: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">Join Our Community</h3>
          <p style="color: #64748b; margin-bottom: 20px;">Connect with fellow learners and get instant updates!</p>
          <div style="display: flex; gap: 15px;">
            <a href="${INSTAGRAM_URL}" 
               style="flex: 1; background: #E1306C; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
              Instagram
            </a>
            <a href="${WHATSAPP_URL}" 
               style="flex: 1; background: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
              WhatsApp
            </a>
          </div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          Happy learning!<br>
          <strong style="color: #475569;">The VisualNotes Team</strong>
        </p>
      </div>
    </div>
  `;
    try {
        GmailApp.sendEmail(email, subject, 'Welcome to VisualNotes!', {
            htmlBody: htmlBody,
            name: 'VisualNotes'
        });
    } catch (e) {
        Logger.log('Welcome email error: ' + e);
    }
}

// ===== NEWSLETTER FUNCTION (Used by Broadcast) =====
function sendNewContentNotification(contentTitle, contentType, contentURL, contentDescription) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const subscribers = [];

    // START FROM ROW 1 (Skip Header)
    // SCHEMA: Col 0=Email, Col 1=Date, Col 2=Status, Col 3=Country
    for (let i = 1; i < data.length; i++) {
        const email = data[i][0]; // Column A
        const status = data[i][2]; // Column C

        // Basic check: Status is Active OR undefined (legacy), valid email
        if ((!status || status === 'Active') && isValidEmail(email)) {
            subscribers.push(email);
        }
    }

    const subject = `New ${contentType}: ${contentTitle}`;
    const htmlBody = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">New on VisualNotes</div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 700;">${contentTitle}</h1>
      </div>
      
      <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #4ECDC4; margin-bottom: 30px;">
          <div style="color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">${contentType}</div>
          <p style="color: #1e293b; font-size: 16px; margin: 0; line-height: 1.6;">
            ${contentDescription}
          </p>
        </div>
        <a href="${contentURL}" 
           style="display: inline-block; background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); color: white; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          Read Now →
        </a>
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-top: 30px;">
          <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px;">Stay connected with our community:</p>
          <div style="display: flex; gap: 15px;">
            <a href="${INSTAGRAM_URL}" style="flex: 1; background: #E1306C; color: white; padding: 10px; text-decoration: none; border-radius: 6px; text-align: center; font-weight: 600; font-size: 14px;">Instagram</a>
            <a href="${WHATSAPP_URL}" style="flex: 1; background: #25D366; color: white; padding: 10px; text-decoration: none; border-radius: 6px; text-align: center; font-weight: 600; font-size: 14px;">WhatsApp</a>
          </div>
        </div>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          You received this because you subscribed to VisualNotes updates.
        </p>
      </div>
    </div>
  `;

    // Send in Loop
    subscribers.forEach(email => {
        try {
            GmailApp.sendEmail(email, subject, contentTitle, {
                htmlBody: htmlBody,
                name: 'VisualNotes'
            });
            // Sleep slightly to avoid hitting rate limits too fast if list is large
            Utilities.sleep(100);
        } catch (e) {
            Logger.log('Error sending to ' + email + ': ' + e);
        }
    });

    return 'Sent to ' + subscribers.length + ' subscribers';
}

// ===== SETUP FUNCTION =====
function setup() {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty(SCRIPT_PROPERTY_ADMIN_KEY, "CHANGE_THIS_TO_YOUR_SECRET_PASSWORD");
    Logger.log("Admin Key Set! Don't forget to update it.");
}
