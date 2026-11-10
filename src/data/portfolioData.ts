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
  category: "Systems & Cloud" | "Web Apps" | "Mobile" | "Security";
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
      "Experienced System Engineer at IT Solutions Private Limited, Coimbatore. Specialized in building high-performance custom PC workstations, hardware assembly, diagnostics, all-brand CCTV & IP camera surveillance infrastructure, T568B structured cabling, and biometric punch systems.",
    location: "Coimbatore, Tamil Nadu, India",
    status: "Open to new opportunities",
    email: "eswaran.techdev@gmail.com",
    phone: "+91 98765 43210",
    whatsapp: "https://wa.me/919876543210",
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
      company: "IT Solutions Private Limited, Coimbatore",
      location: "Coimbatore, Tamil Nadu",
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
      company: "IT Solutions Private Limited, Coimbatore",
      location: "Coimbatore, Tamil Nadu",
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
      company: "IT Solutions Private Limited, Coimbatore",
      location: "Coimbatore, Tamil Nadu",
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
      id: "surveillance-fleet-nvr",
      title: "All-Brand CCTV & IP Surveillance Grid",
      category: "Security" as const,
      tagline: "Commercial HD IP & Analog Surveillance Across All Major Brands",
      description:
        "Comprehensive surveillance deployment involving all-brand CCTV & IP cameras (Hikvision, CP Plus, Dahua, Honeywell & more), PoE managed switches, multi-channel NVR/DVR configuration, RAID storage arrays, and secure remote viewing client setups for commercial and industrial facilities.",
      tags: ["All-Brand CCTV", "IP Cameras", "NVR/DVR Setup", "PoE Switches", "Network Storage"],
      githubUrl: "https://github.com/eswaran-dev/surveillance-fleet-nvr",
      liveUrl: "https://github.com/eswaran-dev/surveillance-fleet-nvr",
      featured: true,
      metrics: "32+ IP Feeds Synchronized",
    },
    {
      id: "structured-cabling-rack",
      title: "Enterprise T568B Cabling & Server Rack Fabric",
      category: "Systems & Cloud" as const,
      tagline: "Clean Structured Cabling, Patch Panel Terminations & Rack Infrastructure",
      description:
        "Full-cycle networking infrastructure overhaul featuring certified T568B RJ45 cabling, cable management trays, patch panel terminations, gigabit uplink testing, and biometric access integration across multiple service departments.",
      tags: ["T568B RJ45", "Structured Cabling", "LAN/WAN", "Patch Panels", "Biometrics"],
      githubUrl: "https://github.com/eswaran-dev/structured-cabling-rack",
      liveUrl: "https://github.com/eswaran-dev/structured-cabling-rack",
      featured: true,
      metrics: "100% Signal Integrity Certified",
    },
    {
      id: "custom-workstation-rigs",
      title: "High-Compute Custom PC Workstations",
      category: "Systems & Cloud" as const,
      tagline: "Custom High-Performance Desktop Rigs & Thermal Engineering",
      description:
        "Specification, assembly, and testing of high-performance desktop workstation PCs. Tailored hardware component pairing, thermal stress-testing, BIOS optimization, and multimeter power delivery verification.",
      tags: ["PC Assembly", "Hardware Diagnostics", "Multimeter Testing", "BIOS/CMOS", "Thermal Tuning"],
      githubUrl: "https://github.com/eswaran-dev/custom-workstation-rigs",
      liveUrl: "https://github.com/eswaran-dev/custom-workstation-rigs",
      featured: true,
      metrics: "Sub-0.1% Failure Rate",
    },
    {
      id: "cloudnet-sentinel",
      title: "CloudNet Sentinel - Network Telemetry",
      category: "Web Apps" as const,
      tagline: "Real-Time Distributed Network Observability & Port Status Dashboard",
      description:
        "A network monitoring suite with Next.js 15, Tailwind CSS, and WebSockets providing live visual feedback for IP camera streams, switch port uptime, and automated outage alerting.",
      tags: ["Next.js 15", "Tailwind CSS", "JavaScript", "WebSockets", "Node.js"],
      githubUrl: "https://github.com/eswaran-dev/cloudnet-sentinel",
      liveUrl: "https://cloudnet-sentinel.demo.dev",
      featured: false,
      metrics: "< 15ms Latency",
    },
    {
      id: "aurapay-android",
      title: "AuraPay Mobile Biometric Client",
      category: "Mobile" as const,
      tagline: "Native Android App with Hardware Biometrics & Offline Cache",
      description:
        "A responsive native Android application built with Kotlin and Jetpack Compose incorporating biometric authentication, Room DB offline synchronization, and material glassmorphism UI.",
      tags: ["Kotlin", "Jetpack Compose", "Biometrics", "Room DB", "Android SDK"],
      githubUrl: "https://github.com/eswaran-dev/aurapay-android",
      liveUrl: "https://github.com/eswaran-dev/aurapay-android/releases",
      featured: false,
      metrics: "60 FPS Fluid",
    },
    {
      id: "biometric-logger-hub",
      title: "BioPunch - Attendance Management Portal",
      category: "Security" as const,
      tagline: "Automated Biometric Punch Sync & Reporting Console",
      description:
        "Internal automation utility that synchronizes punch logs from fingerprint biometric attendance terminals into a unified web portal for HR time tracking and automated PDF report generation.",
      tags: ["Biometric Terminals", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"],
      githubUrl: "https://github.com/eswaran-dev/biometric-logger-hub",
      liveUrl: "https://biopunch-demo.dev",
      featured: false,
      metrics: "Instant Sync",
    },
  ],
};
