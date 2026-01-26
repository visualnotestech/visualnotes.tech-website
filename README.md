# VisualNotes

Visual engineering study platform for Infrastructure, Cloud, Security, and OSINT.

## 🚀 Features

- **Visual Study Guides**: Hand-drawn notes on DNS, Inter-VLAN Routing, Netflow, SNMP, STP
- **Blog Articles**: In-depth guides on Google Dorking, DNS, OSINT Tools, Cloud Platforms
- **Email Subscriptions**: Automated welcome emails and admin notifications
- **PDF Viewer**: Integrated PDF.js for seamless guide viewing
- **Responsive Design**: Mobile-first, works on all devices

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with Warm Academic Theme
- **PDF Rendering**: PDF.js
- **Email Integration**: Google Apps Script + Gmail API
- **Storage**: Supabase (for PDFs)
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4

## 📦 Project Structure

```
visualnotes.tech/
├── index.html              # Main landing page
├── blog/                   # Blog articles
│   ├── google-dorking-guide.html
│   ├── how-dns-works.html
│   └── images/            # Blog images
├── guides/                 # PDF study guides
├── privacy-policy.html     # Privacy policy
├── 404.html               # Custom 404 page
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Crawler instructions
├── vercel.json            # Deployment config
└── README.md              # This file
```

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/visualnotes.tech.git
cd visualnotes.tech
```

2. Start a local server:
```bash
python3 -m http.server 8000
```

3. Open browser:
```
http://localhost:8000
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure custom domain
4. Deploy automatically on push

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔒 Security

- OWASP Top 10 compliant
- Security headers configured (CSP, X-Frame-Options, etc.)
- HTTPS enforced
- Input validation on all forms
- No sensitive data in client-side code

## 📧 Email Integration

Email subscriptions powered by Google Apps Script:
- Welcome emails to new subscribers
- Admin notifications (email + WhatsApp)
- Duplicate prevention
- Data stored in Google Sheets

## 🎯 SEO

- Semantic HTML5
- Schema.org markup (Organization, FAQ, Article)
- Optimized meta tags
- Sitemap.xml
- Mobile-friendly
- Core Web Vitals optimized

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

© 2026 VisualNotes. All rights reserved.

## 📞 Contact

- Email: visualnotes.tech@gmail.com
- WhatsApp: [Join Channel](https://whatsapp.com/channel/0029Vb6z21DBqbr2xDU7Rc2P)
- Instagram: [@visualnotes.tech](https://www.instagram.com/visualnotes.tech/)
- LinkedIn: [Abhiney Sharma](https://www.linkedin.com/in/abhiney-sharma/)

## 🙏 Acknowledgments

Built with ❤️ for engineers and developers worldwide.
