// Auto-generated from CSV
const flashcardData = [
    {
        "question": "In the binary system, what does a value of 0 signify?",
        "answer": "Off"
    },
    {
        "question": "In the binary system, what does a value of 1 signify?",
        "answer": "On"
    },
    {
        "question": "What is the term for the bit on the far left side of a byte, which carries the highest value?",
        "answer": "Most Significant Bit (MSB)"
    },
    {
        "question": "What is the term for the bit on the far right side of a byte, which carries the lowest value?",
        "answer": "Least Significant Bit (LSB)"
    },
    {
        "question": "What is the highest decimal value that can be represented by a single 8-bit octet?",
        "answer": "255"
    },
    {
        "question": "How does the decimal value of a bit change as you move one position to the left in a binary sequence?",
        "answer": "The decimal value doubles."
    },
    {
        "question": "The sequence of numbers $2, 4, 8, 16, 32, 64, 128...$ is commonly referred to as the _____.",
        "answer": "Powers of 2"
    },
    {
        "question": "What is the primary purpose of an IP address on a network device?",
        "answer": "To identify every device with a unique number."
    },
    {
        "question": "Term: Byte",
        "answer": "Definition: A unit of digital information consisting of 8 bits."
    },
    {
        "question": "What is a 'nibble' in computer networking terminology?",
        "answer": "A group of 4 bits."
    },
    {
        "question": "Which address is used by routers to direct IP packets to the correct destination network?",
        "answer": "Network address"
    },
    {
        "question": "What is a subnet?",
        "answer": "A larger network that has been divided into multiple smaller sub-networks."
    },
    {
        "question": "The address used to send information to every device within a specific subnet is the _____.",
        "answer": "Broadcast address"
    },
    {
        "question": "How many total bits compose a standard IPv4 address?",
        "answer": "32 bits"
    },
    {
        "question": "An IPv4 address is divided into four 8-bit sections called _____.",
        "answer": "Octets"
    },
    {
        "question": "Unlike MAC addresses, IP addresses are considered _____ because they use a structured 'network, subnet, host' model.",
        "answer": "Hierarchical"
    },
    {
        "question": "What determines the 'network' and 'host' portions of an IP address in a hierarchical structure?",
        "answer": "The subnet mask"
    },
    {
        "question": "In a Class A network, how many octets are reserved for the network address?",
        "answer": "One octet"
    },
    {
        "question": "How many octets are reserved for host addresses in a Class B network?",
        "answer": "Two octets"
    },
    {
        "question": "In a Class C network, how many octets are reserved for the network portion?",
        "answer": "Three octets"
    },
    {
        "question": "What is the required starting bit value for any Class A network address?",
        "answer": "0"
    },
    {
        "question": "What is the decimal range of the first octet for Class A networks?",
        "answer": "0 to 127"
    },
    {
        "question": "What are the first two mandatory bit values for a Class B network address?",
        "answer": "1 and 0"
    },
    {
        "question": "What is the decimal range of the first octet for Class B networks?",
        "answer": "128 to 191"
    },
    {
        "question": "What are the first three mandatory bit values for a Class C network address?",
        "answer": "1, 1, and 0"
    },
    {
        "question": "What is the decimal range of the first octet for Class C networks?",
        "answer": "192 to 223"
    },
    {
        "question": "What is the intended use for Class D IP addresses?",
        "answer": "Multicast traffic"
    },
    {
        "question": "What is the purpose of Private IP addressing ranges?",
        "answer": "To provide non-routable addresses for internal networks that are not directly accessible from the internet."
    },
    {
        "question": "What technology allows multiple devices with private IP addresses to access the internet using a single public IP address?",
        "answer": "Network Address Translation (NAT)"
    },
    {
        "question": "What is the private IP address range for Class A?",
        "answer": "$10.0.0.0$ to $10.255.255.255$"
    },
    {
        "question": "What is the private IP address range for Class B?",
        "answer": "$172.16.0.0$ to $172.31.255.255$"
    },
    {
        "question": "What is the private IP address range for Class C?",
        "answer": "$192.168.0.0$ to $192.168.255.255$"
    },
    {
        "question": "In a subnet mask, what do binary 1s signify?",
        "answer": "The network portion of the address."
    },
    {
        "question": "In a subnet mask, what do binary 0s signify?",
        "answer": "The host portion of the address."
    },
    {
        "question": "What state are the host bits in when representing a Network Address?",
        "answer": "All host bits are set to 0."
    },
    {
        "question": "What state are the host bits in when representing a Broadcast Address?",
        "answer": "All host bits are set to 1."
    },
    {
        "question": "How do you determine the first usable host IP address in a subnet?",
        "answer": "It is the address immediately following the network address."
    },
    {
        "question": "How do you determine the last usable host IP address in a subnet?",
        "answer": "It is the address immediately preceding the broadcast address."
    },
    {
        "question": "How does borrowing bits from the host portion affect the number of subnets available?",
        "answer": "Each borrowed bit doubles the number of possible subnets."
    },
    {
        "question": "Concept: The Fast Way (Block Sizes)",
        "answer": "Definition: Calculating subnets using decimal 'blocks' of addresses instead of converting the entire address to binary."
    },
    {
        "question": "Formula: Subnet Mask from Block Size",
        "answer": "Subnet Mask Octet = $256 - \\text{Block Size}$"
    },
    {
        "question": "Formula: Number of Usable Hosts",
        "answer": "Usable Hosts = $(\\text{Total Block Size}) - 2$"
    },
    {
        "question": "If you borrow 1 bit from a Class C network, what is the resulting block size for each of the 2 subnets?",
        "answer": "128"
    },
    {
        "question": "If you borrow 2 bits from a Class C network, how many subnets are created?",
        "answer": "4"
    },
    {
        "question": "What is the block size of a subnet with a mask of $255.255.255.192$?",
        "answer": "64"
    },
    {
        "question": "What does CIDR stand for?",
        "answer": "Classless Inter-Domain Routing"
    },
    {
        "question": "What was the primary reason for the transition from classful to classless (CIDR) networking?",
        "answer": "To prevent the massive waste of IP addresses inherent in fixed Class A, B, and C masks."
    },
    {
        "question": "In CIDR notation, what does the number following the slash (e.g., /24) represent?",
        "answer": "The number of bits used for the subnet mask."
    },
    {
        "question": "CIDR: What is the / notation for the subnet mask $255.255.255.0$?",
        "answer": "/24"
    },
    {
        "question": "CIDR: What is the / notation for the subnet mask $255.255.0.0$?",
        "answer": "/16"
    },
    {
        "question": "CIDR: What is the / notation for the subnet mask $255.0.0.0$?",
        "answer": "/8"
    },
    {
        "question": "What does VLSM stand for?",
        "answer": "Variable Length Subnet Mask"
    },
    {
        "question": "What is the main advantage of using VLSM in network design?",
        "answer": "It allows for subnets of different sizes, ensuring maximum efficiency and minimal waste of IP addresses."
    },
    {
        "question": "When planning a VLSM scheme, which subnet requirement should you calculate first to avoid overlapping addresses?",
        "answer": "The largest subnet requirement."
    },
    {
        "question": "Why is a /30 subnet mask commonly used for point-to-point links?",
        "answer": "It provides a block size of 4, which yields exactly 2 usable host addresses."
    },
    {
        "question": "Concept: Summarisation (Supernetting)",
        "answer": "Definition: Combining multiple contiguous smaller networks into a single, shorter network prefix for route advertisements."
    },
    {
        "question": "What is the primary benefit of summarisation for a router's CPU and memory?",
        "answer": "It keeps the routing table small, reducing the processing power and memory needed for routing lookups."
    },
    {
        "question": "If you want to summarise four /24 networks into one route, what new CIDR mask would you use?",
        "answer": "/22"
    },
    {
        "question": "Summarising two /24 networks into one route results in a _____ mask.",
        "answer": "/23"
    },
    {
        "question": "How many /24 networks are combined when using a /21 summary mask?",
        "answer": "8"
    },
    {
        "question": "What characters are used in the hexadecimal system to represent decimal values 10 through 15?",
        "answer": "A, B, C, D, E, and F"
    },
    {
        "question": "What prefix is commonly used to indicate that a number is written in hexadecimal format?",
        "answer": "0x"
    },
    {
        "question": "How do you convert an 8-bit binary number to hexadecimal?",
        "answer": "Split the 8 bits into two 4-bit nibbles and convert each nibble separately."
    },
    {
        "question": "In hexadecimal, what is the value of a nibble where all four bits are set to 1 ($1111$)?",
        "answer": "F"
    },
    {
        "question": "Convert the decimal value 255 to its hexadecimal equivalent.",
        "answer": "0xFF"
    },
    {
        "question": "What is the decimal equivalent of the hexadecimal value 0xA?",
        "answer": "10"
    },
    {
        "question": "What is the decimal equivalent of the hexadecimal value 0xC?",
        "answer": "12"
    },
    {
        "question": "Formula: Finding host bits from CIDR",
        "answer": "Host bits = $32 - \\text{CIDR mask}$"
    },
    {
        "question": "Formula: Number of subnets possible from host bits",
        "answer": "Subnets = $2^{\\text{borrowed bits}}$"
    },
    {
        "question": "In a Class B network using a /24 mask, how many bits have been borrowed from the original host portion?",
        "answer": "8 bits"
    },
    {
        "question": "In a Class A network using a /12 mask, how many subnets can be created from the original /8 space?",
        "answer": "16 subnets ($2^4$)"
    },
    {
        "question": "Which address range was specifically reserved for 'research usage' and is generally not used in standard binary calculations?",
        "answer": "Class E"
    },
    {
        "question": "True or False: Devices within the same IP subnet can communicate without the need for a router.",
        "answer": "True"
    },
    {
        "question": "What is the total number of unique IP addresses possible with 32 bits?",
        "answer": "Approximately 4.3 billion ($4,294,967,296$)"
    },
    {
        "question": "How many hosts can be configured on a /24 network?",
        "answer": "254"
    },
    {
        "question": "Why is the address $127.x.x.x$ not typically found in the standard Class A host range examples?",
        "answer": "It is reserved for loopback testing (though technically part of the Class A range)."
    },
    {
        "question": "If a subnet mask is $255.255.255.248$, what is the CIDR notation?",
        "answer": "/29"
    },
    {
        "question": "A subnet mask of $255.255.240.0$ corresponds to which CIDR notation?",
        "answer": "/20"
    },
    {
        "question": "What block size is associated with a /27 subnet mask?",
        "answer": "32"
    },
    {
        "question": "If an IP address is $192.168.1.31/27$, what type of address is it?",
        "answer": "Broadcast address"
    },
    {
        "question": "If an IP address is $192.168.1.32/27$, what type of address is it?",
        "answer": "Network address"
    },
    {
        "question": "How many usable host addresses are available in a /28 subnet?",
        "answer": "14"
    },
    {
        "question": "During a Cisco exam, what is a recommended use for the initial 15-minute tutorial time?",
        "answer": "To create a subnetting 'cheat sheet' on the provided scratch paper."
    },
    {
        "question": "In hexadecimal conversion, the first nibble ($8-4-2-1$) of binary $1010$ results in which hex character?",
        "answer": "A"
    },
    {
        "question": "To accommodate 30 hosts in a single subnet, what is the smallest block size required?",
        "answer": "32"
    }
];
