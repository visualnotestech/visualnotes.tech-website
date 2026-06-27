/**
 * Shared Data for VisualNotes.tech
 * Used by index.html and Admin Dashboard
 */

// ===== VISUAL NOTES DATA =====
const visualNotes = [
    {
        id: "how-to-investigate-a-domain-osint-workflow",
        title: "How to Investigate Any Domain: A Practical OSINT Workflow",
        description: "A step-by-step domain OSINT methodology covering WHOIS, DNS, subdomain enumeration, historical recon, and breach correlation.",
        image: "blog/images/how-to-investigate-a-domain-osint-workflow.webp",
        tags: ["OSINT", "Security", "Infrastructure"],
        dateAdded: "2026-06-27"
    },
    {
        id: "ospf-timer-lab",
        title: "OSPF Timer Lab: Hello, Dead & Adjacency Rules",
        description: "Visual breakdown of OSPF Hello & Dead intervals, timer verification, and troubleshooting adjacency rules.",
        image: "visuals/images/ospf-timer-lab.webp",
        tags: ["Networking", "Infrastructure", "Routing", "OSPF"],
        dateAdded: "2026-03-05"
    },
    {
        id: "wifi-7-vs-ethernet",
        title: "Wi-Fi 7 vs Ethernet",
        description: "Is wireless finally replacing wired? A visual comparison of Flexible Access Layer vs Deterministic Backbone.",
        image: "visuals/images/wifi-7-vs-ethernet.webp",
        tags: ["Networking", "Wi-Fi", "Infrastructure"],
        dateAdded: "2026-03-05"
    },
    {
        id: "top-5-network-exploits",
        title: "Top 5 Network Exploits Still Misconfigured in 2026",
        description: "Deep dive into VLAN Hopping, ARP/DHCP Spoofing, IP Spoofing, Control Plane Abuse, and Management Plane Exposure.",
        image: "visuals/images/top-5-network-exploits.webp",
        tags: ["Security", "Networking", "Infrastructure"],
        dateAdded: "2026-03-05"
    },
    {
        id: "ospf-operations",
        title: "OSPF Operations: Choosing the Best Routes",
        description: "Visual guide to OSPF: Neighbor Discovery, LSA Exchange, LSDB synchronization, SPF Algorithm (Dijkstra's), and DR/BDR roles.",
        image: "visuals/images/ospf-operations.webp",
        tags: ["Networking", "Infrastructure", "Routing", "OSPF"],
        dateAdded: "2026-02-02"
    },
    {
        id: "ipsec-vpn",
        title: "IPsec VPN: The 5-Minute Technical Cheat Sheet",
        description: "Master IPsec VPNs in minutes. Visual breakdown of Core Concepts (IKE, ESP, AH), Phases 1 & 2 handshake, and Tunnel vs Transport modes.",
        image: "visuals/images/ipsec-vpn-cheat-sheet.webp",
        tags: ["Networking", "Security", "VPN", "Infrastructure"],
        dateAdded: "2026-02-02"
    },
    {
        id: "load-balancer-types",
        title: "Load Balancer Types: Quick Guide",
        description: "Visual comparison of Layer 4 vs Layer 7 load balancers, Hardware vs Software, and Global Load Balancing.",
        image: "visuals/images/load-balancer-types.webp",
        tags: ["Infrastructure", "Networking", "System Design"],
        dateAdded: "2026-01-31"
    },
    {
        id: "cors-explained",
        title: "CORS: The Bouncer of the Web",
        description: "Visual explanation of Cross-Origin Resource Sharing and how the preflight handshake works.",
        image: "visuals/images/cors-explained.webp",
        tags: ["Security", "Web Development", "API"],
        dateAdded: "2026-01-27"
    },
    {
        id: "encryption-decryption",
        title: "Encryption & Decryption",
        description: "The core process of securing data: symmetric vs asymmetric encryption, and real-world benefits.",
        image: "visuals/images/encryption-decryption.webp",
        tags: ["Security", "Cryptography", "Data Protection"],
        dateAdded: "2026-01-27"
    },
    {
        id: "wifi-7",
        title: "Wi-Fi 7 (802.11be): The Next Generation",
        description: "Multi-Link Operation, ultra-wide 320 MHz channels, 4K QAM, and blazing fast speeds up to 46 Gbps.",
        image: "visuals/images/wifi-7.webp",
        tags: ["Networking", "Wi-Fi", "Infrastructure"],
        dateAdded: "2026-01-27"
    },
    {
        id: "http-vs-https",
        title: "HTTP vs HTTPS: Why the 'S' Matters!",
        description: "Technical comparison of HTTP and HTTPS, SSL/TLS encryption, and real-world impact on security and SEO.",
        image: "visuals/images/http-vs-https.webp",
        tags: ["Security", "Web Development", "Networking"],
        dateAdded: "2026-01-27"
    },
    {
        id: "network-rack",
        title: "Network Rack Explained",
        description: "Visual breakdown of a standard network rack: Router, Firewall, Switch, Patch Panel, UPS, and PDU.",
        image: "visuals/images/network-rack-components.webp",
        tags: ["Networking", "Infrastructure", "Hardware"],
        dateAdded: "2026-02-08"
    },
    {
        id: "memory-subsystem",
        title: "Memory Subsystem: Dell PowerEdge",
        description: "Detailed look at server memory architecture, DIMM slots, channels, and population rules.",
        image: "visuals/images/memory-subsystem-architecture.webp",
        tags: ["Server", "Hardware", "Infrastructure"],
        dateAdded: "2026-02-08"
    },
    // Add more visual notes here as you create them
];

// ===== GUIDES DATA =====
const guides = [
    {
        id: "sd-wan-notes",
        title: "SD-WAN Fundamentals",
        category: "Networking",
        pages: "15 Pages",
        description: "Comprehensive handwritten notes on Software-Defined Wide Area Networking architecture and benefits.",
        pdfUrl: "guides/networking/sd-wan-study-notes.pdf",
        thumbnail: "guides/thumbnails/sd-wan-study-notes.webp"
    },
    {
        id: "dns-admin",
        title: "DNS Administration",
        category: "Infrastructure",
        pages: "16 Pages",
        description: "Complete guide to Domain Name System hierarchy, records, and administration.",
        pdfUrl: "guides/networking/dns-administration-guide.pdf",
        thumbnail: "guides/thumbnails/dns-administration-guide.webp"
    },
    {
        id: "inter-vlan",
        title: "Inter-VLAN Routing",
        category: "Infrastructure",
        pages: "17 Pages",
        description: "Complete guide to configuring and troubleshooting Inter-VLAN routing.",
        pdfUrl: "guides/networking/inter-vlan-routing-guide.pdf",
        thumbnail: "guides/thumbnails/inter-vlan-routing-guide.webp"
    },
    {
        id: "netflow",
        title: "Netflow Protocol",
        category: "Infrastructure",
        pages: "22 Pages",
        description: "Analyzing network traffic and visibility with Netflow architecture.",
        pdfUrl: "guides/networking/netflow-protocol-guide.pdf",
        thumbnail: "guides/thumbnails/netflow-protocol-guide.webp"
    },
    {
        id: "snmp",
        title: "SNMP Fundamentals",
        category: "Infrastructure",
        pages: "16 Pages",
        description: "Monitoring and managing network devices using Simple Network Management Protocol.",
        pdfUrl: "guides/networking/snmp-fundamentals-guide.pdf",
        thumbnail: "guides/thumbnails/snmp-fundamentals-guide.webp"
    },
    {
        id: "ntp-study-notes",
        title: "NTP Study Notes",
        category: "Infrastructure",
        pages: "15 Pages",
        description: "Handwritten study notes on Network Time Protocol (NTP), covering strata, synchronization, and configuration.",
        pdfUrl: "guides/networking/ntp-study-notes.pdf",
        thumbnail: "guides/thumbnails/ntp-study-notes.webp"
    },
    {
        id: "stp",
        title: "Spanning Tree (STP)",
        category: "Infrastructure",
        pages: "10 Pages",
        description: "Preventing loops in Layer 2 networks with Spanning Tree Protocol (STP).",
        pdfUrl: "guides/networking/stp-guide.pdf",
        thumbnail: "guides/thumbnails/stp-guide.webp"
    }
];

// Export for Node.js if needed (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { guides, visualNotes };
}
