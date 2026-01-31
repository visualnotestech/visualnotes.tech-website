# 📧 Newsletter System - Setup Guide

Follow these steps to activate your new newsletter notification system.

## Phase 1: Update Google Apps Script

1.  **Open Your Google Sheet**: Go to the Google Sheet where your current subscribers are saved.
2.  **Open Script Editor**: Click on **Extensions** > **Apps Script** in the top menu.
3.  **Backup (Optional)**: If you have existing code, copy it to a notepad just in case.
4.  **Replace Code**:
    *   Delete all the code in the script editor (`Code.gs`).
    *   Open `google-apps-script-v2.js` from your project folder.
    *   **CRITICAL**: This file now contains YOUR original logic + the new features.
    *   Copy **ALL** the text and paste it into the Google Script editor.
5.  **Set Your Admin Password**:
    *   In the Google Script editor, look for `function setup()`.
    *   Change `"CHANGE_THIS_TO_YOUR_SECRET_PASSWORD"` to a secure password (e.g., `"MySecretKey123!"`).
    *   **Save** the file (Ctrl+S or Cmd+S).
6.  **Run Setup**:
    *   In the toolbar, select `setup` from the dropdown menu (it might say `doPost` by default).
    *   Click **Run**.
    *   Grant permissions if asked (Review Permissions > Choose Account > Advanced > Go to Untitled Project (unsafe) > Allow).
    *   *Note: This saves your password securely in the script settings.*

## Phase 2: Deploy New Version

1.  **Deploy**: Click the blue **Deploy** button (top right) > **New deployment**.
2.  **Configuration**:
    *   **Select type**: Click the gear icon ⚙️ > **Web app**.
    *   **Description**: "V2 with Newsletter".
    *   **Execute as**: `Me` (your email).
    *   **Who has access**: `Anyone` (Important! This is needed for your website forms to work).
3.  **Finish**: Click **Deploy**.
4.  **Copy URL**: Copy the **Web App URL** (starts with `https://script.google.com/macros/s/...`).

## Phase 3: Connect Admin Dashboard

1.  **Open Dashboard**: Double-click `admin/broadcast.html` in your project folder to open it in your browser.
2.  **One-Time Login**:
    *   **Script URL**: Paste the Web App URL you just copied.
    *   **Admin Key**: Enter the password you set in Phase 1.
3.  **Test It**:
    *   Write a test title and description.
    *   Click **Send**.
    *   *Tip: Add your own email to the Google Sheet manually to test if you receive it.*

## Phase 4: Verify Website Feature

Since this new script is backward-compatible, your existing website forms (Popup & Footer) should still work.
1.  Go to your local site (`http://localhost:8000`).
2.  Try subscribing with a dummy email (e.g., `test+1@example.com`).
3.  Check your Google Sheet to see if it appeared.

🎉 **You're all set!** You can now broadcast emails whenever you want using the Admin Dashboard.

## Phase 5: Sending Content Updates (Step-by-Step)

Whenever you add new notes (like the SD-WAN guide), follow this routine to notify your subscribers:

### 1. Sync "Welcome Email" Content
First, ensure that **new** subscribers getting the automatic welcome email see your latest stuff.
1.  Open `admin/broadcast.html`.
2.  Scroll to **Automation Tools**.
3.  Click **🔄 Sync Local Content to Welcome Email**.
    *(This acts mainly on the server to update the 'Latest Articles' list).*

### 2. Broadcast to Existing Subscribers
Now, tell everyone else about the new update.
1.  In `admin/broadcast.html`, go to the **Broadcast Newsletter** section.
2.  **Title**: Use a catchy subject line (e.g., "New Handwriten Guide: SD-WAN 🚀").
3.  **Description**: Write a short, personal message. (See sample below).
4.  **Button URL**: Paste the Deep Link to your new content.
    *   *Example:* `https://visualnotes.tech/#sd-wan-notes`
5.  Click **🚀 Send to All Subscribers**.

---

### 📝 Sample "SD-WAN & Load Balancer" Email

**Title:**
`New Visuals: SD-WAN & Load Balancers 🚀`

**Description:**
`Hey techies! 👋`

`We just dropped two high-demand resources to help you master networking concepts:`

`1. 📄 **SD-WAN Fundamentals (PDF Guide)**`
`Comprehensive 15-page handwritten notes covering architecture, transport independence, and security.`

`2. 🖼️ **Load Balancer Types (Visual)**`
`Quick reference guide comparing Layer 4 vs Layer 7, Hardware vs Software, and Global Load Balancing.`

`Check them out now! 👇`

**Button URL:**
`https://visualnotes.tech/#sd-wan-notes`
