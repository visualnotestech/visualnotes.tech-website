// Auto-generated from CSV
const flashcardData = [
    {
        "question": "What is the primary objective of the Hot Standby Router Protocol (HSRP)?",
        "answer": "To provide network redundancy for IP networks by ensuring transparent recovery from first-hop failures."
    },
    {
        "question": "How do routers participating in HSRP appear to hosts on a local area network?",
        "answer": "They appear as a single virtual router sharing a single IP and MAC address."
    },
    {
        "question": "What is the limitation of using Proxy ARP for router redundancy if a router fails?",
        "answer": "The host continues sending packets to the failed router's MAC address until the ARP entry times out or the host reboots."
    },
    {
        "question": "Why is running dynamic routing protocols like RIP on every host often impractical?",
        "answer": "It involves high administrative and processing overhead, security issues, and lack of protocol support on all platforms."
    },
    {
        "question": "What is the main drawback of using RIP for host-level router discovery?",
        "answer": "It is slow to adapt to changes in the network topology."
    },
    {
        "question": "In ICMP Router Discovery Protocol (IRDP), how does a host detect that its configured router is unavailable?",
        "answer": "The host stops receiving periodic hello multicast messages from the router."
    },
    {
        "question": "Why is the default IRDP configuration unsuitable for rapid first-hop failure detection?",
        "answer": "The default advertisement rate is only every 7 to 10 minutes, with a 30-minute lifetime."
    },
    {
        "question": "What is the limitation of DHCP regarding router redundancy?",
        "answer": "DHCP provides a default gateway but lacks a mechanism to switch to an alternative if that gateway fails."
    },
    {
        "question": "In an HSRP group, what is the role of the 'Active' router?",
        "answer": "It is responsible for forwarding packets sent by hosts to the virtual router."
    },
    {
        "question": "What happens to the 'Standby' router if the 'Active' router fails?",
        "answer": "The Standby router assumes the packet-forwarding duties of the Active router."
    },
    {
        "question": "How does HSRP minimize network traffic after the election process is complete?",
        "answer": "Only the Active and Standby routers send periodic HSRP messages."
    },
    {
        "question": "What defines an HSRP 'standby group'?",
        "answer": "A set of routers working together to present the illusion of a single virtual router to LAN hosts."
    },
    {
        "question": "On most media types, what is the standard format for an HSRP virtual MAC address?",
        "answer": "$0000.0c07.ac**$, where $**$ represents the HSRP group number in hex."
    },
    {
        "question": "Under what hardware condition would a router use its burned-in MAC address instead of the HSRP MAC while Active?",
        "answer": "When the Ethernet controller only recognizes a single MAC address (e.g., Cisco 2500/4500 Lance controllers)."
    },
    {
        "question": "What does the HSRP 'preemption' feature allow a higher priority router to do?",
        "answer": "It allows the higher priority router to immediately take over the Active role from a lower priority router."
    },
    {
        "question": "How is HSRP priority determined when comparing two routers?",
        "answer": "By the configured priority value first, and then by the highest IP address as a tie-breaker."
    },
    {
        "question": "What message does a router send when it preempts a lower priority Active router?",
        "answer": "A coup message."
    },
    {
        "question": "What is the purpose of the 'preempt delay' feature in HSRP?",
        "answer": "To allow the router time to populate its routing table before assuming the Active role."
    },
    {
        "question": "In Cisco IOS 12.0(9) and later, when does the HSRP preempt delay timer begin?",
        "answer": "It begins as soon as preemption is first attempted."
    },
    {
        "question": "What HSRP feature allows the priority of a group to change based on the status of a router interface?",
        "answer": "Interface tracking."
    },
    {
        "question": "By default, by how much is the HSRP priority reduced when a tracked interface goes down?",
        "answer": "10"
    },
    {
        "question": "How does HSRP handle priority reduction when multiple tracked interfaces are down?",
        "answer": "The priority is reduced by the cumulative sum of the decrement values for all down interfaces."
    },
    {
        "question": "If a router has a priority of 110 and two tracked interfaces (default decrement) go down, what is its new priority?",
        "answer": "90"
    },
    {
        "question": "The 'use burned-in address' (use-bia) feature was primarily introduced to solve issues in which environment?",
        "answer": "Token Ring interfaces using functional addresses in a multiple-ring source-routed bridging environment."
    },
    {
        "question": "What is a major disadvantage for hosts when 'use-bia' is configured in HSRP?",
        "answer": "The virtual IP address moves to a different MAC address during failover, which some host ARP implementations cannot handle."
    },
    {
        "question": "Which router service specifically breaks when the HSRP 'use-bia' command is configured?",
        "answer": "Proxy ARP."
    },
    {
        "question": "What does the 'Multiple HSRP' (MHSRP) feature enable in a network?",
        "answer": "Redundancy and load-sharing by allowing routers to be Active for one group and Standby for another."
    },
    {
        "question": "For what purpose would an administrator use the 'standby mac-address' command?",
        "answer": "To specify a virtual MAC address for protocols like APPN that use MAC addresses for first-hop identification."
    },
    {
        "question": "What does the 'debug standby terse' command display?",
        "answer": "HSRP errors, events, and packets, excluding hello and advertisement packets."
    },
    {
        "question": "How can HSRP debug output be filtered to a specific group and interface?",
        "answer": "By using the 'debug condition standby <interface> <group>' command."
    },
    {
        "question": "In enhanced HSRP debugging, what do the lowercase letter codes (e.g., a/, b/, c/) represent?",
        "answer": "Events of the HSRP finite state machine as documented in RFC 2281."
    },
    {
        "question": "What is the function of the HSRP 'authentication' string?",
        "answer": "It is a shared clear-text key in HSRP packets that prevents low-priority routers from learning standby values from high-priority routers."
    },
    {
        "question": "What is the 'IP Redundancy' feature in HSRP designed to provide for client applications?",
        "answer": "A mechanism to implement stateful failover by providing HSRP state information to the application."
    },
    {
        "question": "Which application is a common implementation of HSRP IP Redundancy?",
        "answer": "Mobile IP Home Agents."
    },
    {
        "question": "What is the significance of the HSRP MIB 'ciscoMgmt 106'?",
        "answer": "It is the MIB module used to manage HSRP."
    },
    {
        "question": "Why is it necessary for HSRP group numbers to be unique across all sub-interfaces on the same main interface?",
        "answer": "Because sub-interfaces share a single SNMP interface index, making non-unique group numbers indistinguishable in the MIB."
    },
    {
        "question": "In an MPLS VPN environment, what does HSRP track to ensure PE-to-Provider connectivity redundancy?",
        "answer": "The interfaces connecting the Provider Edge (PE) routers to the rest of the provider network."
    },
    {
        "question": "Why are ICMP redirects typically disabled by default on HSRP-enabled interfaces?",
        "answer": "To prevent hosts from being redirected away from the HSRP virtual IP address to a physical IP that might fail."
    },
    {
        "question": "How can a network utilize both HSRP and ICMP redirects safely?",
        "answer": "By running multiple HSRP groups so that a redirect can point a host to another router's virtual HSRP IP instead of its physical IP."
    },
    {
        "question": "What is the result of a lower priority Active router receiving a 'coup' message?",
        "answer": "The router transitions to the speak state and sends a resign message."
    },
    {
        "question": "If no decrement value is specified in an HSRP interface tracking command, what value is used?",
        "answer": "10"
    },
    {
        "question": "What happens if a router starts up with a down interface in Cisco IOS versions prior to 12.1 regarding HSRP tracking?",
        "answer": "HSRP interface tracking incorrectly regards the down interface as being up."
    },
    {
        "question": "To which interface does the 'use-bia' command apply if configured on a sub-interface in Cisco IOS versions before 12.0(6.2)?",
        "answer": "It is applied to the main interface and all of its sub-interfaces."
    },
    {
        "question": "Which command allows HSRP 'use-bia' to be restricted to a single sub-interface in modern IOS?",
        "answer": "standby use-bia scope interface."
    },
    {
        "question": "Which HSRP state indicates a router is sending and receiving hello messages and contesting for the Active/Standby roles?",
        "answer": "Speak state."
    },
    {
        "question": "What is the HSRP 'Listen' state?",
        "answer": "The state where a router knows the virtual IP address but is neither the Active nor Standby router."
    },
    {
        "question": "What protocol does HSRP use to exchange status messages between group members?",
        "answer": "UDP (implied as it exchanges status messages to monitor peers)."
    },
    {
        "question": "How does HSRP ensure 'transparent' recovery for hosts?",
        "answer": "By maintaining a consistent IP and MAC address regardless of which physical router is currently forwarding traffic."
    },
    {
        "question": "What is the HSRP group number range?",
        "answer": "0 to 255."
    },
    {
        "question": "In HSRP debugging, what does 'SB1' typically represent in the output?",
        "answer": "It refers to the HSRP instance (Standby group 1)."
    },
    {
        "question": "What command is used to check if an HSRP virtual IP is in the correct VRF ARP table?",
        "answer": "show ip arp vrf <vrf-name>."
    },
    {
        "question": "What is the default HSRP group number if none is specified in the configuration?",
        "answer": "Group 0."
    },
    {
        "question": "Which feature allows HSRP to be used alongside DECnet and XNS on the same router?",
        "answer": "Use Burned-In Address (use-bia)."
    },
    {
        "question": "In HSRP, what is a 'gratuitous ARP'?",
        "answer": "A message sent by a newly Active router to update the ARP caches of hosts with its MAC address."
    }
];
