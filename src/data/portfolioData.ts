export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level: number; highlight?: boolean }[];
  accentColor: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "CCTV & Surveillance" | "Hardware & Systems" | "Networking & IT";
  tagline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics?: string;
}

export const portfolioData = {
  personal: {
    name: "ESWARAN K",
    title: "System Engineer",
    tagline:
      "Specializing in Hardware Engineering, Surveillance Infrastructure, Enterprise Networking & Technical Support.",
    shortBio:
      "Experienced System Engineer at Victinet IT Solutions Pvt Ltd, Madurai. Specialized in building high-performance custom PC workstations, hardware assembly, diagnostics, all-brand CCTV & IP camera surveillance infrastructure, T568B structured cabling, and biometric punch systems.",
    location: "Madurai, Tamil Nadu, India",
    status: "Open to new opportunities",
    email: "eswaranppm88@gmail.com",
    phone: "+91 63697 16479",
    whatsapp: "https://wa.me/916369716479",
    github: "https://github.com/eswaran-dev",
    linkedin: "https://linkedin.com/in/eswaran-dev",
    twitter: "https://twitter.com/eswaran_dev",
    resumeUrl: "#resume-section",
  },

  skillCategories: [
    {
      title: "Hardware & System Building",
      icon: "Cpu",
      accentColor: "from-cyan-500 to-blue-600",
      description:
        "Building high-performance custom PC workstations, precision hardware assembly, desktop/laptop diagnostics, and multimeter component testing.",
      skills: [
        { name: "Custom PC Workstations", level: 98, highlight: true },
        { name: "Hardware Assembly & Integration", level: 96, highlight: true },
        { name: "Desktop & Laptop Diagnostics", level: 95, highlight: true },
        { name: "Multimeter Component Testing", level: 90, highlight: true },
        { name: "CMOS / BIOS Setup & Tuning", level: 92 },
        { name: "Thermal Management & SMPS Repair", level: 88 },
      ],
    },
    {
      title: "Security & Surveillance",
      icon: "Camera",
      accentColor: "from-blue-500 to-indigo-600",
      description:
        "End-to-end commercial security deployments, all-brand CCTV & IP camera configurations (Hikvision, CP Plus, Dahua, etc.), NVR/DVR recording units, and biometric attendance infrastructure.",
      skills: [
        { name: "All-Brand CCTV Installation", level: 98, highlight: true },
        { name: "IP & Analog Cameras (All Brands)", level: 96, highlight: true },
        { name: "NVR & DVR Multi-Channel Setup", level: 95, highlight: true },
        { name: "Biometric Punch Machines", level: 92, highlight: true },
        { name: "Surveillance Remote Monitoring", level: 90 },
        { name: "Storage Retention & Footage Backup", level: 88 },
      ],
    },
    {
      title: "Networking & IT Support",
      icon: "Network",
      accentColor: "from-violet-500 to-purple-600",
      description:
        "Enterprise networking, structured cabling with T568B RJ45 wiring standards, LAN/WAN routing, and responsive on-site hardware/software technical support.",
      skills: [
        { name: "Structured Cabling (T568B RJ45)", level: 98, highlight: true },
        { name: "LAN / WAN Setup & Configuration", level: 94, highlight: true },
        { name: "Troubleshooting & Problem Isolation", level: 96, highlight: true },
        { name: "Technical Support & Complaint Resolution", level: 95, highlight: true },
        { name: "Managed Switches & Access Points", level: 90 },
        { name: "Patch Panel Crimping & Testing", level: 95 },
      ],
    },
    {
      title: "System Engineering & IT Infrastructure",
      icon: "Server",
      accentColor: "from-purple-500 to-pink-600",
      description:
        "Professional expertise in hardware assembly, CCTV surveillance systems, and enterprise networking.",
      skills: [
        { name: "Hardware Assembly & Custom Workstations", level: 98, highlight: true },
        { name: "CCTV & IP Surveillance Deployment", level: 96, highlight: true },
        { name: "Enterprise Networking (T568B RJ45)", level: 96, highlight: true },
        { name: "NVR/DVR & Storage Systems", level: 94, highlight: true },
        { name: "Biometric Attendance Terminals", level: 92 },
        { name: "Rapid On-Site IT Complaint Resolution", level: 95 },
      ],
    },
  ],

  experiences: [
    {
      period: "2022 - Present",
      role: "System Engineer",
      company: "Victinet IT Solutions Pvt Ltd, Madurai",
      location: "Madurai, Tamil Nadu",
      type: "Full-time",
      description: [
        "Specialized in hardware assembly, desktop/laptop troubleshooting, and building high-performance custom PC workstations tailored for business and high-compute workloads.",
        "Deployed and configured complete security and surveillance infrastructure including all-brand CCTV & IP cameras (Hikvision, CP Plus, Dahua, etc.), NVR/DVR systems, and CMOS setups.",
        "Managed enterprise networking infrastructure, structured cabling using the T568B RJ45 wiring standard, and fingerprint punch biometric attendance machines across multiple service sectors.",
        "Provided robust on-site technical support and hardware/software complaint resolution, ensuring minimal downtime and reliable operations.",
      ],
      technologies: [
        "Custom PC Building",
        "All-Brand CCTV & IP Cameras",
        "NVR & DVR Systems",
        "T568B RJ45 Cabling",
        "Biometric Punch Machines",
        "Multimeter Testing",
        "LAN/WAN Setup",
        "Hardware Diagnostics",
      ],
    },
    {
      period: "2021 - 2022",
      role: "Hardware & Surveillance Support Specialist",
      company: "Victinet IT Solutions Pvt Ltd, Madurai",
      location: "Madurai, Tamil Nadu",
      type: "Full-time",
      description: [
        "Executed structured network cabling, patch panel crimping, and wall-jack terminations adhering strictly to T568B standards.",
        "Installed and calibrated commercial CCTV and IP surveillance systems, coaxial/CAT6 runs, and power supply distributions.",
        "Diagnosed motherboard issues, power supply failures (SMPS), and component faults using digital multimeters.",
        "Resolved daily client tickets covering OS installations, driver conflicts, peripheral troubleshooting, and LAN connectivity.",
      ],
      technologies: [
        "Structured Cabling",
        "CCTV Installation",
        "Multimeter Testing",
        "SMPS & Motherboard Repair",
        "Desktop Troubleshooting",
      ],
    },
    {
      period: "2020 - 2021",
      role: "Desktop & Field Support Associate",
      company: "Victinet IT Solutions Pvt Ltd, Madurai",
      location: "Madurai, Tamil Nadu",
      type: "Full-time",
      description: [
        "Conducted initial diagnostic checks on customer desktops, laptops, and workstation hardware.",
        "Assisted in configuring biometric punch attendance units, registering staff credentials, and backing up attendance logs.",
        "Delivered quick turnaround repairs for display, RAM, storage upgrades, and thermal paste re-application.",
      ],
      technologies: [
        "Hardware Assembly",
        "Laptop Repair",
        "Biometric Setup",
        "Preventative Maintenance",
        "Customer Support",
      ],
    },
  ],

  projects: [
    {
      id: "enterprise-cctv-nvr-surveillance",
      title: "Enterprise CCTV & NVR Surveillance Deployment",
      category: "CCTV & Surveillance" as const,
      tagline: "Commercial Multi-Channel IP & Analog Surveillance Architecture",
      description:
        "Deployed and configured multi-channel IP security cameras, NVR network video recorders, and CMOS system setups for comprehensive office surveillance and live monitoring.",
      tags: ["Hikvision NVR", "IP Cameras", "Coaxial/Cat6 Wiring", "Motion Detection Setup"],
      githubUrl: "#enterprise-cctv-nvr-surveillance",
      liveUrl: "#enterprise-cctv-nvr-surveillance",
      featured: true,
      metrics: "32+ IP Feeds Live",
    },
    {
      id: "high-performance-custom-pc-builds",
      title: "High-Performance Custom PC Workstation Builds",
      category: "Hardware & Systems" as const,
      tagline: "Custom Workstation Engineering & Precision Multimeter Diagnostics",
      description:
        "Assembled and tested custom desktop workstations and server rigs with advanced component-level troubleshooting, precise BIOS configuration, and multimeter diagnostics.",
      tags: ["Hardware Assembly", "SMPS Testing", "Thermal Management", "BIOS Setup"],
      githubUrl: "#high-performance-custom-pc-builds",
      liveUrl: "#high-performance-custom-pc-builds",
      featured: true,
      metrics: "Sub-0.1% Failure Rate",
    },
    {
      id: "structured-cabling-enterprise-networking",
      title: "Structured Cabling & Enterprise Networking Setup",
      category: "Networking & IT" as const,
      tagline: "Certified T568B Structured Cabling & Rack Patch Panel Fabric",
      description:
        "Executed clean structured cabling installations using the T568B RJ45 wiring standard, punch-down blocks, LAN/WAN routing, and fingerprint biometric attendance terminal integration.",
      tags: ["T568B RJ45 Crimping", "Biometric Punch Machines", "Network Routing", "LAN Setup"],
      githubUrl: "#structured-cabling-enterprise-networking",
      liveUrl: "#structured-cabling-enterprise-networking",
      featured: true,
      metrics: "100% Signal Certified",
    },
  ],

  education: [
    {
      degree: "Diploma in Computer Science & Engineering",
      institution: "Government Polytechnic College",
      grade: "First Class",
      description:
        "Comprehensive technical foundation and hands-on laboratory training covering computer hardware architecture, microprocessors, networking fundamentals, digital logic, and system maintenance.",
      coursework: [
        "Computer Hardware & Peripherals",
        "Networking Fundamentals",
        "Digital Electronics",
        "System Maintenance & Diagnostics Lab",
      ],
    },
  ],

  certifications: [
    {
      name: "All-Brand CCTV & IP Surveillance Specialist",
      issuer: "Industrial Surveillance & Security Training",
      focus: "NVR/DVR, Multi-Brand IP Cameras, POE & CMOS setups",
    },
    {
      name: "T568B Structured Cabling & Termination Standard",
      issuer: "Enterprise Cabling & Network Infrastructure",
      focus: "RJ45 Crimping, Patch Panels & LAN/WAN Architecture",
    },
    {
      name: "Custom Workstation Assembly & Hardware Diagnostics",
      issuer: "PC Engineering & Component Diagnostics",
      focus: "Component-Level Troubleshooting & Multimeter Testing",
    },
  ],
};
