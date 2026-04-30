import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Cpu, TrendingDown, TrendingUp, ExternalLink, Activity, Clock, 
  Thermometer, Zap, Database, Layers, Monitor, HardDrive, Info,
  Unlock, MonitorPlay, Box, Server, ShieldCheck, Usb, Settings,
  CheckCircle2, Network, Terminal, HelpCircle
} from 'lucide-react';

const App = () => {
  // Merged and expanded JSON State based on official spec sheets
  const [lastUpdated, setLastUpdated] = useState("30/04/2026 13:13");
  const [historyDays, setHistoryDays] = useState(['26/04', '27/04', '28/04', '29/04']);
  
  const [data, setData] = useState({
    processor: {
      model: "AMD Ryzen 9 9950X3D2 Dual Edition",
      product_image_url: "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/4270752-amd-ryzen-9000-series-x3d2/4270752-amd-ryzen-9000-series-x3d2-product-1.jpg",
      tagline: "The World's First Dual AMD 3D V-Cache™ Technology-Based Desktop Processor to Unlock a New Future of Computing for Developers and Creators.",
      description: "Built for demanding developers, the AMD Ryzen 9 9950X3D2 Dual Edition processor combines high-performance “Zen 5” core technology with dual 2nd Gen AMD 3D V-Cache technology across all 16 cores, delivering 208MB of total cache for expanded cache capacity and low latency. The result is exceptional responsiveness, increased throughput and flexibility to power next-generation development and creation workflows.",
      
      // Core Architecture
      architecture: "Zen 5 (Granite Ridge)",
      socket: "AM5",
      core_count: 16,
      thread_count: 32,
      base_clock_ghz: 4.3,
      boost_clock_ghz: 5.6,
      cache: {
        l1: "1280 KB",
        l2: "16 MB",
        l3: "192 MB (Dual 3D V-Cache)",
        total: "208 MB"
      },
      tdp_w: 200,
      max_temp_c: 95, 
      lithography_cpu: "TSMC 4 nm FinFET",
      package_die_count: 3,
      
      // General Specifications
      smt: "Supported",
      lithography_io: "TSMC 6 nm FinFET",
      expo: "Supported",
      curve_optimizer: "Supported",
      ryzen_master: "Supported",
      chipsets: "X870E, X870, X670E, X670, B650E, B650, A620",
      extensions: "AES, AMD-V, AVX, AVX-512, AVX2, FMA3, MMX(+), SHA, SSE, SSE2, SSE3, SSE4.1, SSE4.2, SSE4A, SSSE3, x86-64",
      unlocked: "Yes (Precision Boost Overdrive)",
      os_support: "Windows 10/11 x64, RHEL, Ubuntu",
      
      // Connectivity & Memory
      ram_generation: "DDR5 (ECC Supported)",
      max_memory: "256 GB (Dual Channel)",
      memory_subtype: "UDIMM",
      usb_3_2_gen2: "4 Ports (10Gbps)",
      usb_2_0: "1 Port (480Mbps)",
      pcie: "PCIe 5.0",
      pcie_lanes: "28 / 24 (Total/Usable)",
      nvme: "Boot, RAID0, RAID1, RAID10",
      
      // Graphics Capabilities
      graphics_model: "AMD Radeon™ Graphics",
      graphics_cores: "2",
      graphics_frequency: "2200 MHz",
      dp_alt_mode: "Supported",

      // Security & Virtualization Flags
      security_features: [
        "AMD Secure Processor",
        "AMD Platform Secure Boot",
        "Windows Secure Boot",
        "UEFI Secure Boot",
        "Windows Device Guard",
        "Supervisor Mode Execution Prevention (SMEP)",
        "Guest Mode Execution (GMET) Trap",
        "Virtualization-Based Security (VBS)",
        "Windows Secured-Core PC",
        "Firmware TPM",
        "AMD-V (SVM)",
        "AMD AVIC (Interrupt Virtualization)",
        "AMD-Vi (I/O MMU Virtualization)",
        "Second Level Address Translation (SLAT)",
        "Advanced Encryption Standard New Instructions (AES-NI)",
        "AMD Enhanced Virus Protection (NX bit)",
        "AMD Shadow Stack"
      ]
    },
    retailers: [
      { retailer: "Amazon Sweden", price_sek: 10390, url: "https://www.amazon.se/-/en/AMD-100-100001978WOF/dp/B0GTRTJSNZ/", history: [10500, 10450, 10420, 10390] },
      { retailer: "CDON", price_sek: 14804, url: "https://cdon.se/produkt/processor-amd-ryzentm-9-9950x3d2-16-karnor-32-tradar-boostfrekvens-upp-till-560-ghz-8740e716c6dc5ff4/", history: [17362, 16623, 15500, 14804] },
      { retailer: "Elgiganten", price_sek: 10390, url: "https://www.elgiganten.se/product/gaming/datorkomponenter/processor-cpu/amd-ryzen-9-9950x3d2-processor/1083223", history: [10390, 10390, 10390, 10390] },
      { retailer: "Inet", price_sek: 10399, url: "https://www.inet.se/produkt/5307669/amd-ryzen-9-9950x3d2-4-3ghz-208mb", history: [10599, 10499, 10449, 10399] },
      { retailer: "Komplett", price_sek: 10390, url: "https://www.komplett.se/product/1338752/datorutrustning/datorkomponenter/processor/amd-ryzen-9-9950x3d2-dual-edition-cpu", history: [99999, 99999, 99999, 10390] },
      { retailer: "NetOnNet", price_sek: 10390, url: "https://www.netonnet.se/art/datorkomponenter/processor/amd-am5-socket/amd-ryzen-9-9950x3d2-16c32t-5-6ghz-box/1065195.19286/", history: [10490, 10450, 10390, 10390] },
      { retailer: "Proshop", price_sek: 10390, url: "https://www.proshop.se/CPU/AMD-Ryzen-9-9950X3D2-Dual-Edition-CPU-16-kaernor-43-GHz-AMD-AM5-AMD-Boxed-utan-kylare/3456874", history: [10450, 10450, 10390, 10390] },
      { retailer: "Webhallen", price_sek: 10390, url: "https://www.webhallen.com/se/product/397499-AMD-Ryzen-9-9950X3D2-Dual-Edition-16-Cores-32-Threads-5-6GHz", history: [10390, 10390, 10390, 10390] }
    ]
  });

  const exchangeRate = 0.091; 

  // Definitions mapping for technical features
  const techDefinitions = {
    // General Specifications
    "smt": "Simultaneous Multithreading (SMT) allows a single physical CPU core to execute two threads simultaneously, doubling total thread count to improve multitasking and parallel performance.",
    "lithography_io": "The manufacturing process node used for the Input/Output (I/O) die, a separate chiplet that handles PCIe communication, USB ports, and memory controllers.",
    "expo": "Extended Profiles for Overclocking (EXPO) provides one-click, built-in memory profiles optimized specifically for AMD AM5 platforms to safely overclock DDR5 RAM.",
    "curve_optimizer": "An advanced firmware tool that allows users to dynamically adjust the processor's voltage/frequency curve, enabling precise undervolting to increase performance and lower temperatures.",
    "ryzen_master": "AMD's official Windows-based software utility for real-time hardware monitoring, fine-tuning, and processor overclocking.",
    "chipsets": "The motherboard architectures containing the system logic that are electrically and physically compatible with this specific processor.",
    "extensions": "Hardware-level instruction sets embedded in the CPU (such as AVX-512) that accelerate specific workloads like AI inferencing, complex cryptography, and multimedia rendering.",
    
    // Connectivity & Storage
    "usb_3_2_gen2": "High-speed Universal Serial Bus ports wired directly into the CPU rather than the motherboard chipset, supporting 10 Gbps data transfer speeds.",
    "usb_2_0": "Legacy USB ports routed directly to the CPU, typically used for lower bandwidth peripherals like keyboards, mice, or BIOS flashback tools.",
    "pcie_lanes": "High-speed serial data pathways connecting the CPU to the GPU and storage. 'Total' includes lanes reserved for communicating with the chipset; 'Usable' are free for user components.",
    "nvme": "Native CPU support for Non-Volatile Memory Express protocols, allowing NVMe solid-state drives (SSDs) to communicate directly with the processor without bottlenecks.",
    "memory_subtype": "Unbuffered Dual Inline Memory Module (UDIMM). This is the standard, non-registered memory format used in consumer desktop computers.",
    
    // Graphics
    "graphics_model": "The integrated graphics processor (IGP) built into the CPU die, providing display output capabilities without requiring a dedicated discrete graphics card.",
    "graphics_cores": "The number of independent graphics processing units (Compute Units) contained within the integrated Radeon graphics module.",
    "dp_alt_mode": "Allows the processor's integrated graphics to output native DisplayPort video and audio signals through a compatible motherboard USB Type-C connector.",

    // Security & Virtualization
    "AMD Secure Processor": "A dedicated, isolated hardware co-processor integrated directly into the CPU die. It handles secure cryptographic key generation and trusted execution environments.",
    "AMD Platform Secure Boot": "A hardware-based root of trust that cryptographically verifies the integrity of the system firmware before it is allowed to load.",
    "Windows Secure Boot": "A security standard verifying that the device boots using only software that is trusted by the Original Equipment Manufacturer (OEM).",
    "UEFI Secure Boot": "Ensures that bootloaders and operating system kernels are cryptographically signed, preventing rootkits and bootkits from hijacking the startup process.",
    "Windows Device Guard": "Uses hardware-based virtualization features to isolate code integrity services from the main Windows kernel, making it harder for malware to tamper with the system.",
    "Supervisor Mode Execution Prevention (SMEP)": "A CPU feature that prevents the operating system kernel from executing code that resides in less privileged user-mode memory, mitigating privilege escalation exploits.",
    "Guest Mode Execution (GMET) Trap": "A security feature that intercepts and manages execution inside virtual machines, stopping malware that attempts to exploit hypervisor environments.",
    "Virtualization-Based Security (VBS)": "Uses hardware virtualization features to create an isolated, highly secure memory region to host critical OS security solutions away from the main system.",
    "Windows Secured-Core PC": "Indicates hardware compliance with Microsoft's highest security standards, combining identity protection, virtualization, and firmware-level exploit defenses.",
    "Firmware TPM": "A Trusted Platform Module implemented via the CPU's firmware (fTPM). It eliminates the need for a physical TPM chip while providing the same cryptographic key storage functionality.",
    "AMD-V (SVM)": "Secure Virtual Machine (AMD-V) provides hardware-level virtualization extensions, allowing the system to efficiently run multiple virtual operating systems (VMs) simultaneously.",
    "AMD AVIC (Interrupt Virtualization)": "Advanced Virtual Interrupt Controller accelerates virtual machine performance by routing hardware interrupts directly to the VM, reducing hypervisor overhead.",
    "AMD-Vi (I/O MMU Virtualization)": "Input/Output Memory Management Unit virtualization allows guest operating systems to directly and securely interface with physical hardware devices (like GPUs or network cards).",
    "Second Level Address Translation (SLAT)": "Also known as Rapid Virtualization Indexing (RVI), this hardware feature reduces virtualization overhead by translating guest physical memory addresses to host physical addresses.",
    "Advanced Encryption Standard New Instructions (AES-NI)": "Hardware acceleration embedded in the CPU designed to execute AES encryption and decryption operations significantly faster and more securely.",
    "AMD Enhanced Virus Protection (NX bit)": "The No-Execute (NX) bit designates certain memory areas as non-executable. If malware attempts to run code in these areas (e.g., buffer overflow attacks), the CPU halts execution.",
    "AMD Shadow Stack": "A hardware protection mechanism that maintains a secondary, hidden stack to verify return addresses, effectively mitigating Return-Oriented Programming (ROP) malware attacks."
  };

  const sortedRetailers = useMemo(() => {
    return [...data.retailers].sort((a, b) => a.price_sek - b.price_sek); 
  }, [data.retailers]);

  const chartData = useMemo(() => {
    return historyDays.map((day, index) => {
      const entry = { name: day };
      data.retailers.forEach(r => {
        entry[r.retailer] = r.history[index];
      });
      return entry;
    });
  }, [data.retailers, historyDays]);

  const simulateUpdate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); 
    const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    const newDayStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    setHistoryDays(prev => {
      const next = [...prev.slice(1), newDayStr];
      return next[next.length - 1] === next[next.length - 2] 
        ? [...prev.slice(1), formattedTime] 
        : next;
    });

    setLastUpdated(`${formattedDate} ${formattedTime}`);
    
    setData(prev => ({
      ...prev,
      retailers: prev.retailers.map(r => {
        const change = Math.floor(Math.random() * 300) - 200;
        const newPrice = Math.max(9900, r.price_sek + change);
        return {
          ...r,
          price_sek: newPrice,
          history: [...r.history.slice(1), newPrice]
        };
      })
    }));
  };

  const formatPrice = (sek) => {
    const usd = (sek * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', 'US$');
    return `${usd} (${sek.toLocaleString('sv-SE')} SEK)`;
  };

  const getLowestPrice = () => Math.min(...data.retailers.map(r => r.price_sek));

  // Updated SpecItem: Now supports hover descriptions via tooltips
  const SpecItem = ({ label, value, icon: Icon, span = 1, description }) => (
    <div className={`p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col gap-2 relative group ${span > 1 ? `md:col-span-${span}` : ''}`}>
      <div className="text-zinc-500 flex items-center justify-between text-sm font-medium uppercase tracking-wider">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-zinc-400" />}
          {label}
        </div>
        {description && (
          <div className="text-zinc-600 cursor-help hover:text-zinc-300 transition-colors">
            <HelpCircle size={14} />
          </div>
        )}
      </div>
      <div className="text-zinc-100 font-semibold leading-snug">{value}</div>
      
      {/* CSS Tooltip for SpecItem */}
      {description && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[280px] p-4 bg-zinc-800 text-zinc-200 text-sm font-normal normal-case tracking-normal rounded-xl shadow-2xl border border-zinc-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 pointer-events-none">
          {description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-700"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-zinc-800 -mt-[1px]"></div>
        </div>
      )}
    </div>
  );

  // Updated FeatureTag: Now supports hover descriptions via tooltips for security features
  const FeatureTag = ({ label, description }) => (
    <div className="relative group">
      <div className="px-3 py-2 bg-black rounded-xl border border-zinc-800 text-sm flex justify-between items-center gap-2 text-zinc-300 hover:bg-zinc-800/50 transition-colors cursor-help">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          <span className="leading-tight">{label}</span>
        </div>
        {description && <HelpCircle size={14} className="text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />}
      </div>
      
      {/* CSS Tooltip for FeatureTag */}
      {description && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[280px] p-4 bg-zinc-800 text-zinc-200 text-sm font-normal rounded-xl shadow-2xl border border-zinc-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50 pointer-events-none">
          {description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-700"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-zinc-800 -mt-[1px]"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              AMD Price Dashboard
            </h1>
            <p className="text-zinc-500 flex items-center gap-2 mt-2">
              <Clock size={14} />
              Last updated: {lastUpdated}
            </p>
          </div>
          <button 
            onClick={simulateUpdate}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl font-semibold transition-all flex items-center gap-2 group active:scale-95"
          >
            <Activity size={18} className="text-orange-500 group-hover:animate-pulse" />
            Simulate Market Update
          </button>
        </div>

        {/* Hero Product Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-8 items-center shadow-2xl">
          <div className="w-full md:w-56 h-56 bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800 p-4 shrink-0">
             <img src={data.processor.product_image_url} alt="CPU" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2 block">
              {data.processor.architecture}
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-3">{data.processor.model}</h2>
            <p className="text-zinc-300 font-medium text-lg mb-3">
              {data.processor.tagline}
            </p>
            <p className="text-zinc-500 text-sm md:text-base mb-6 max-w-3xl leading-relaxed border-l-2 border-orange-500 pl-4">
              {data.processor.description}
            </p>
            <div className="flex flex-wrap gap-3">
               <div className="px-4 py-2 bg-black rounded-lg border border-zinc-800 text-sm flex items-center gap-2 font-medium">
                 <Cpu size={16} className="text-zinc-500" />
                 Socket {data.processor.socket}
               </div>
               <div className="px-4 py-2 bg-black rounded-lg border border-zinc-800 text-sm flex items-center gap-2 font-medium">
                 <Layers size={16} className="text-zinc-500" />
                 {data.processor.core_count} Cores / {data.processor.thread_count} Threads
               </div>
               <div className="px-4 py-2 bg-black rounded-lg border border-zinc-800 text-sm flex items-center gap-2 font-medium">
                 <TrendingUp size={16} className="text-green-500" />
                 Lowest Market Price: {formatPrice(getLowestPrice())}
               </div>
            </div>
          </div>
        </div>

        {/* --- EXPANDED HARDWARE SPECIFICATIONS --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2 pl-2">
            <Database size={24} className="text-orange-500" />
            Expanded Hardware Specifications
          </h3>
          
          {/* Section 1: Core Architecture */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-lg font-bold mb-4 text-zinc-300 border-b border-zinc-800 pb-2">Core Architecture & Thermals</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               <SpecItem label="Base Clock" value={`${data.processor.base_clock_ghz} GHz`} icon={Activity} />
               <SpecItem label="Boost Clock" value={`Up to ${data.processor.boost_clock_ghz} GHz`} icon={Zap} />
               <SpecItem label="Total Cache" value={data.processor.cache.total} icon={Database} />
               <SpecItem label="L3 Cache" value={data.processor.cache.l3} icon={Layers} />
               <SpecItem label="L2 Cache" value={data.processor.cache.l2} icon={Layers} />
               <SpecItem label="L1 Cache" value={data.processor.cache.l1} icon={Layers} />
               <SpecItem label="Default TDP" value={`${data.processor.tdp_w} W`} icon={Zap} />
               <SpecItem label="Max Temp (Tjmax)" value={`${data.processor.max_temp_c} °C`} icon={Thermometer} />
               <SpecItem label="CPU Lithography" value={data.processor.lithography_cpu} icon={Cpu} />
               <SpecItem label="Package Die Count" value={data.processor.package_die_count} icon={Box} />
             </div>
          </div>

          {/* Section 2: General Specifications */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-lg font-bold mb-4 text-zinc-300 border-b border-zinc-800 pb-2">General Specifications</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               <SpecItem label="Multithreading (SMT)" value={data.processor.smt} icon={Layers} description={techDefinitions.smt} />
               <SpecItem label="I/O Die Technology" value={data.processor.lithography_io} icon={Cpu} description={techDefinitions.lithography_io} />
               <SpecItem label="AMD EXPO Memory" value={data.processor.expo} icon={Settings} description={techDefinitions.expo} />
               <SpecItem label="Curve Optimizer" value={data.processor.curve_optimizer} icon={Activity} description={techDefinitions.curve_optimizer} />
               <SpecItem label="Ryzen Master Support" value={data.processor.ryzen_master} icon={Settings} description={techDefinitions.ryzen_master} />
               <SpecItem label="Overclocking" value={data.processor.unlocked} icon={Unlock} />
               <SpecItem label="Supported Chipsets" value={data.processor.chipsets} icon={Layers} span={2} description={techDefinitions.chipsets} />
               <SpecItem label="OS Support" value={data.processor.os_support} icon={MonitorPlay} span={2} />
               <SpecItem label="Supported Extensions" value={data.processor.extensions} icon={Terminal} span={4} description={techDefinitions.extensions} />
             </div>
          </div>

          {/* Section 3: Connectivity & Memory */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-lg font-bold mb-4 text-zinc-300 border-b border-zinc-800 pb-2">Connectivity & Memory Storage</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               <SpecItem label="RAM Generation" value={data.processor.ram_generation} icon={HardDrive} />
               <SpecItem label="Max Memory" value={data.processor.max_memory} icon={HardDrive} />
               <SpecItem label="Memory Subtype" value={data.processor.memory_subtype} icon={HardDrive} description={techDefinitions.memory_subtype} />
               <SpecItem label="NVMe Support" value={data.processor.nvme} icon={Database} description={techDefinitions.nvme} />
               <SpecItem label="PCI Express" value={data.processor.pcie} icon={Activity} />
               <SpecItem label="Native PCIe Lanes" value={data.processor.pcie_lanes} icon={Network} description={techDefinitions.pcie_lanes} />
               <SpecItem label="USB 3.2 Gen 2" value={data.processor.usb_3_2_gen2} icon={Usb} description={techDefinitions.usb_3_2_gen2} />
               <SpecItem label="USB 2.0" value={data.processor.usb_2_0} icon={Usb} description={techDefinitions.usb_2_0} />
             </div>
          </div>

          {/* Section 4: Graphics Capabilities */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-lg font-bold mb-4 text-zinc-300 border-b border-zinc-800 pb-2">Graphics Capabilities</h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               <SpecItem label="Graphics Model" value={data.processor.graphics_model} icon={Monitor} span={1} description={techDefinitions.graphics_model} />
               <SpecItem label="Graphics Cores" value={data.processor.graphics_cores} icon={Cpu} span={1} description={techDefinitions.graphics_cores} />
               <SpecItem label="Graphics Frequency" value={data.processor.graphics_frequency} icon={Activity} span={1} />
               <SpecItem label="Type-C DP Alt Mode" value={data.processor.dp_alt_mode} icon={MonitorPlay} span={1} description={techDefinitions.dp_alt_mode} />
             </div>
          </div>

          {/* Section 5: Security & Virtualization */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
             <h4 className="text-lg font-bold mb-4 text-zinc-300 border-b border-zinc-800 pb-2 flex items-center gap-2">
               <ShieldCheck size={20} className="text-emerald-500" />
               Security & Virtualization Features
             </h4>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
               {data.processor.security_features.map((feature, index) => (
                 <FeatureTag 
                   key={index} 
                   label={feature} 
                   description={techDefinitions[feature]} 
                 />
               ))}
             </div>
          </div>
        </div>

        {/* --- CHART & PRICING SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingDown size={20} className="text-orange-500" />
              Dynamic Price History (SEK)
            </h3>
            
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl flex items-start gap-3 mb-6">
              <Info size={20} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-300 mb-1">Price History Anomaly Notice:</strong> 
                Komplett's previous price was <strong>99 999 SEK</strong> in the price history. This exceptionally high value was a temporary placeholder before the retailer adjusted it down to the official MSRP. This anomaly is visible as a massive spike in the historical chart data.
              </div>
            </div>

            <div className="h-[350px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={['dataMin - 500', 'dataMax + 500']} stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val} kr`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  {data.retailers.map((r, i) => (
                    <Area 
                      key={r.retailer}
                      type="monotone" 
                      dataKey={r.retailer} 
                      stroke={
                        r.retailer === "Komplett" ? "#ef4444" : 
                        i === 0 ? "#f97316" : 
                        i === 1 ? "#3b82f6" : 
                        "#10b981"
                      } 
                      fillOpacity={i === 0 ? 1 : 0}
                      fill={i === 0 ? "url(#colorPrice)" : "transparent"}
                      strokeWidth={r.retailer === "Komplett" ? 3 : 2}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4">
             <h3 className="text-xl font-bold mb-2">Market Sentiment</h3>
             <div className="p-4 rounded-2xl bg-black border border-zinc-800">
               <span className="text-zinc-500 text-sm">Best Current Price</span>
               <p className="text-2xl font-black text-white mt-1">{formatPrice(getLowestPrice())}</p>
             </div>
             <div className="p-4 rounded-2xl bg-black border border-zinc-800">
               <span className="text-zinc-500 text-sm">Target MSRP (Estimated)</span>
               <p className="text-2xl font-black text-zinc-400 mt-1">{formatPrice(10390)}</p>
             </div>
             <div className="mt-auto">
               <p className="text-xs text-zinc-600 mb-4 italic">
                 State simulation applies realistic pricing volatility across active retailers.
               </p>
             </div>
          </div>
        </div>

        {/* CDON Reseller Warning */}
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm p-4 rounded-xl flex items-start gap-3 mb-2">
          <Info size={20} className="shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300 mb-1">Consumer Advisory: Third-Party Reseller Pricing</strong>
            The current listed price at CDON is significantly higher than the standard market range. Customers are strongly advised to exercise caution and verify the reputation of the third-party reseller on the platform, as unusually high prices can sometimes indicate price gouging or potentially fraudulent listings.
          </div>
        </div>

        {/* Sorted Retailer Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
           <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
             <h3 className="text-xl font-bold">Live Swedish Retailers</h3>
             <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700">{data.retailers.length} Active Sources</span>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-zinc-500 text-sm uppercase tracking-wider bg-black/40">
                   <th className="px-6 py-4 font-semibold">Retailer</th>
                   <th className="px-6 py-4 font-semibold">Stock Status</th>
                   <th className="px-6 py-4 font-semibold text-right">Price (USD/SEK)</th>
                   <th className="px-6 py-4 font-semibold text-center w-24">Link</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-800">
                 {sortedRetailers.map((r, idx) => (
                   <tr key={r.retailer} className="hover:bg-zinc-800/30 transition-colors group">
                     <td className="px-6 py-5 font-bold text-lg flex items-center gap-3">
                        {r.retailer}
                     </td>
                     <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${r.price_sek > 11000 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${r.price_sek > 11000 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                          {r.price_sek > 11000 ? 'ELEVATED PRICE' : 'NORMAL RANGE'}
                        </span>
                     </td>
                     <td className="px-6 py-5 font-mono font-medium text-zinc-300 text-right">
                        {formatPrice(r.price_sek)}
                     </td>
                     <td className="px-6 py-5 text-center">
                        <a 
                          href={r.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-zinc-500 hover:text-white transition-colors bg-zinc-800 w-10 h-10 rounded-xl group-hover:bg-orange-600 group-hover:shadow-lg group-hover:shadow-orange-500/20"
                        >
                          <ExternalLink size={18} />
                        </a>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        <footer className="text-center text-zinc-600 text-sm pb-12 space-y-6 mt-8">
           <p>Currency conversion fixed at 1 SEK = 0.091 USD</p>
           
           <div className="inline-block text-left bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 max-w-2xl mx-auto">
             <strong className="block text-zinc-400 mb-3 uppercase tracking-wider text-xs">Sources & Citations</strong>
             <ul className="list-none space-y-2 text-xs text-zinc-500">
               <li className="flex items-start gap-2">
                 <span className="text-zinc-700 font-mono mt-0.5">[1]</span>
                 <a href="https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d2-dual-edition.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline inline-flex items-center gap-1">
                   AMD Official Product Page: AMD Ryzen™ 9 9950X3D2 Dual Edition <ExternalLink size={10} />
                 </a>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-zinc-700 font-mono mt-0.5">[2]</span>
                 <a href="https://shop-eu-en.amd.com/amd-ryzen-9-9950x3d2-dual-edition-processor/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline inline-flex items-center gap-1">
                   AMD Official Store (EU): AMD Ryzen™ 9 9950X3D2 Processor Specifications <ExternalLink size={10} />
                 </a>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-zinc-700 font-mono mt-0.5">[3]</span>
                 <a href="https://www.techpowerup.com/cpu-specs/ryzen-9-9950x3d2-dual-edition.c4375" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline inline-flex items-center gap-1">
                   TechPowerUp CPU Database: AMD Ryzen 9 9950X3D2 Dual Edition Specs <ExternalLink size={10} />
                 </a>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-zinc-700 font-mono mt-0.5">[4]</span>
                 <a href="https://videocardz.com/228337/amd-ryzen-9-9950x3d2-review-roundup" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline inline-flex items-center gap-1">
                   VideoCardz: AMD Ryzen 9 9950X3D2 Review Roundup & Market Positioning <ExternalLink size={10} />
                 </a>
               </li>
             </ul>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
