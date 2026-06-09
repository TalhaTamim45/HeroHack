window.GAME_DATA = {
  version: "1.1.0",
  name: "CyberQuest Ops",
  rankNames: [
    { level: 1, rank: "Trainee" },
    { level: 2, rank: "Junior Operator" },
    { level: 3, rank: "Field Analyst" },
    { level: 4, rank: "Security Specialist" },
    { level: 5, rank: "Mission Lead" },
    { level: 7, rank: "WhiteHat Elite" }
  ],
  paths: [
    {
      id: "core",
      cityClass: "core",
      name: "Core Academy",
      shortName: "Core",
      icon: "🎓",
      district: "Guild HQ",
      color: "cyan",
      description: "Ethics, scope, internet basics, terminal basics, and the mindset needed before any security work.",
      unlock: "Open from the start",
      capstone: "Foundation License"
    },
    {
      id: "web",
      cityClass: "web",
      name: "Web Pentest District",
      shortName: "Web",
      icon: "🌐",
      district: "PixelBank Avenue",
      color: "purple",
      description: "HTTP, cookies, sessions, access control, XSS concepts, SQL concepts, APIs, and secure fixes.",
      unlock: "Complete Core Academy mission 1",
      capstone: "FakeBank Web Pentest"
    },
    {
      id: "network",
      cityClass: "network",
      name: "Network Ops Zone",
      shortName: "Network",
      icon: "📡",
      district: "MetroNet Yard",
      color: "yellow",
      description: "Ports, services, packets, DNS, firewalls, segmentation, and safe network investigation simulations.",
      unlock: "Complete Core Academy mission 2",
      capstone: "Office Network Review"
    },
    {
      id: "soc",
      cityClass: "soc",
      name: "SOC Defense Tower",
      shortName: "SOC",
      icon: "🛡️",
      district: "NightWatch HQ",
      color: "green",
      description: "Logs, alerts, phishing triage, incident timelines, containment, recovery, and defensive thinking.",
      unlock: "Complete Terminal Alley",
      capstone: "Incident Response Drill"
    },
    {
      id: "wordpress",
      cityClass: "wordpress",
      name: "WordPress Security City",
      shortName: "WordPress",
      icon: "🧩",
      district: "Plugin Plaza",
      color: "blue",
      description: "Roles, nonces, plugins, themes, file permissions, hardening, backups, malware cleanup, and client reports.",
      unlock: "Complete one web mission",
      capstone: "Client Site Hardening"
    },
    {
      id: "cloud",
      cityClass: "cloud",
      name: "Cloud Mountain",
      shortName: "Cloud",
      icon: "☁️",
      district: "SkyVault Ridge",
      color: "pink",
      description: "IAM, storage exposure, secrets, containers, CI/CD, environment variables, and cloud hardening concepts.",
      unlock: "Reach level 3",
      capstone: "Cloud Breach Review"
    },
    {
      id: "capstone",
      cityClass: "capstone",
      name: "Capstone Boss Cases",
      shortName: "Boss",
      icon: "🏆",
      district: "CyberCity Central",
      color: "orange",
      description: "Multi-stage missions that combine scope, recon, finding validation, defense, and professional reporting.",
      unlock: "Complete 7 missions",
      capstone: "Zero to Hero Trial"
    }
  ],
  badges: [
    { id: "oath", name: "White Hat Oath", icon: "🤝", description: "Completed the ethics and scope mission." },
    { id: "browser", name: "Browser Detective", icon: "🕵️", description: "Understands how a basic web request moves through the internet." },
    { id: "terminal", name: "Terminal Runner", icon: "⌨️", description: "Used the safe console to collect and organize evidence." },
    { id: "web-apprentice", name: "Web Security Apprentice", icon: "🕸️", description: "Completed a web security lab and explained the fix." },
    { id: "network-scout", name: "Network Scout", icon: "📡", description: "Mapped a fictional lab network safely." },
    { id: "soc-investigator", name: "SOC Investigator", icon: "🛡️", description: "Triaged logs or phishing evidence." },
    { id: "wp-guardian", name: "WordPress Guardian", icon: "🧩", description: "Fixed a WordPress-style security mistake." },
    { id: "cloud-warden", name: "Cloud Warden", icon: "☁️", description: "Detected a cloud permissions or secrets issue." },
    { id: "report-writer", name: "Report Writer", icon: "📝", description: "Submitted a professional-style security report." },
    { id: "boss-clear", name: "Boss Case Clear", icon: "🏆", description: "Completed a multi-stage capstone case." }
  ],
  missions: [
    {
      id: "core-01",
      path: "core",
      title: "The White Hat Oath",
      location: "Guild HQ",
      difficulty: 1,
      xp: 160,
      credits: 80,
      badge: "oath",
      summary: "Join the WhiteHat Guild, learn permission and scope, and prove you can make ethical decisions under pressure.",
      tags: ["ethics", "scope", "beginner"],
      unlock: { level: 1, completed: [] },
      steps: [
        {
          type: "briefing",
          title: "Mission Briefing",
          body: "Maya, your mentor, hands you a contract from a fictional company called PixelBank. Your first job is not to hack. Your first job is to understand permission. Professionals do not test random systems. They read scope, confirm rules, keep notes, and protect people.",
          objectives: [
            "Read the fictional scope.",
            "Identify what is allowed and what is forbidden.",
            "Choose the ethical action when pressure appears."
          ]
        },
        {
          type: "choice",
          title: "Scope Check",
          question: "The contract allows testing only app.pixelbank.local inside the CyberQuest lab. The CEO sends a chat message saying: 'Our competitor has a weak site too. Can you quickly check them?' What should you do?",
          options: [
            { id: "a", text: "Test the competitor because the CEO asked nicely.", correct: false, ethicsDelta: -12, explanation: "That target is not owned by your client and is not in the written scope. A verbal request cannot override permission boundaries." },
            { id: "b", text: "Refuse the competitor target, document the request, and ask for a signed scope update if needed.", correct: true, ethicsDelta: 4, explanation: "Correct. Ethical hacking requires permission, ownership, and clear written scope." },
            { id: "c", text: "Run only a small check because it probably will not hurt.", correct: false, ethicsDelta: -10, explanation: "Even a small unauthorized check can be illegal and harmful. Scope exists to protect everyone." }
          ]
        },
        {
          type: "terminal",
          title: "Read the Contract in the Training Console",
          body: "Use the safe simulated console. It never contacts the internet. Complete the tasks on the right.",
          initial: "CyberQuest Training Console\nNo real network access. Fictional lab only. Type help if you get stuck.",
          tasks: [
            {
              id: "help",
              label: "View safe console commands",
              commands: ["help"],
              response: "Available simulated commands: help, scope, rules, evidence, status. These are training commands, not real hacking tools.",
              evidence: "The console confirms this is a simulated training environment."
            },
            {
              id: "scope",
              label: "Read the allowed target scope",
              commands: ["scope", "cat scope.txt"],
              response: "SCOPE: Allowed target: app.pixelbank.local. Forbidden: public internet, third-party companies, personal accounts, production data. Required: document evidence and report fixes.",
              evidence: "Allowed target is app.pixelbank.local only. Public internet and third-party companies are out of scope."
            },
            {
              id: "rules",
              label: "Confirm rules of engagement",
              commands: ["rules", "cat rules.txt"],
              response: "RULES: Work only inside lab. Stop if scope is unclear. Do not damage data. Do not access real accounts. Report every finding with impact and remediation.",
              evidence: "Rules of engagement require lab-only work, no damage, and clear remediation."
            }
          ]
        },
        {
          type: "choice",
          title: "Mission Exit Question",
          question: "What is the best motto for this game?",
          options: [
            { id: "a", text: "Attack first, ask later.", correct: false, ethicsDelta: -8, explanation: "That mindset is unsafe and unprofessional." },
            { id: "b", text: "Think like an attacker, act like a defender, work only with permission.", correct: true, ethicsDelta: 4, explanation: "Perfect. This is the core rule of CyberQuest Ops." },
            { id: "c", text: "Only rules for beginners matter.", correct: false, ethicsDelta: -6, explanation: "Ethics matters more as skill increases, not less." }
          ]
        }
      ]
    },
    {
      id: "core-02",
      path: "core",
      title: "Browser Street: How Websites Talk",
      location: "Browser Street",
      difficulty: 1,
      xp: 180,
      credits: 90,
      badge: "browser",
      summary: "Trace a safe fictional web request from browser to DNS to server response.",
      tags: ["http", "dns", "web basics"],
      unlock: { level: 1, completed: ["core-01"] },
      steps: [
        {
          type: "briefing",
          title: "The Website is 'Down'",
          body: "A fictional shop, NeonCart, says customers cannot open the site. Your task is to identify where the request fails. You will learn the chain: browser, domain name, DNS answer, server address, HTTP request, response code.",
          objectives: [
            "Explain DNS in simple language.",
            "Identify what HTTP status codes mean.",
            "Collect evidence before making a conclusion."
          ]
        },
        {
          type: "terminal",
          title: "Trace the Request",
          body: "Use the simulated training console to trace the fictional site. Nothing leaves your browser.",
          initial: "NeonCart request trace loaded. Type help for commands.",
          tasks: [
            {
              id: "dns",
              label: "Ask the lab DNS resolver",
              commands: ["lookup neoncart.local", "dns neoncart.local"],
              response: "DNS RESULT: neoncart.local -> 10.10.10.25 (fictional lab address). DNS is working.",
              evidence: "DNS resolves neoncart.local to a fictional lab address, so the domain lookup is not the issue."
            },
            {
              id: "http",
              label: "Check the web response",
              commands: ["request neoncart.local", "http neoncart.local"],
              response: "HTTP RESULT: 503 Service Unavailable. The web server responded, but the application service is not ready.",
              evidence: "HTTP 503 means the server responded but the application service is unavailable."
            },
            {
              id: "status",
              label: "Check lab service status",
              commands: ["service neoncart", "status neoncart"],
              response: "SERVICE RESULT: database connection failed. The app cannot reach its database in the fictional lab.",
              evidence: "Root cause appears to be a database connection failure, not DNS or routing."
            }
          ]
        },
        {
          type: "choice",
          title: "What Broke?",
          question: "Based on the evidence, what is the most accurate conclusion?",
          options: [
            { id: "a", text: "DNS is broken because the website name is involved.", correct: false, explanation: "DNS resolved correctly. The evidence points later in the chain." },
            { id: "b", text: "The app service is unavailable because it cannot connect to its database.", correct: true, explanation: "Correct. A good analyst follows evidence instead of guessing." },
            { id: "c", text: "The user browser is definitely infected.", correct: false, explanation: "There is no evidence of browser compromise in this case." }
          ]
        }
      ]
    },
    {
      id: "core-03",
      path: "core",
      title: "Terminal Alley: Evidence Runner",
      location: "Terminal Alley",
      difficulty: 1,
      xp: 210,
      credits: 100,
      badge: "terminal",
      summary: "Practice safe terminal thinking: list files, read logs, filter evidence, and create a clean timeline.",
      tags: ["linux", "logs", "evidence"],
      unlock: { level: 1, completed: ["core-02"] },
      steps: [
        {
          type: "briefing",
          title: "The Missing Clue",
          body: "A lab server contains several evidence files. Your job is to navigate the simulated file system, inspect logs, and find the important clue. This mission teaches terminal confidence without requiring a real server.",
          objectives: [
            "List available evidence files.",
            "Read a fake log file.",
            "Find the suspicious event time."
          ]
        },
        {
          type: "terminal",
          title: "Evidence Console",
          body: "Use the simulated commands. This is not a shell on your computer; it is a safe story console.",
          initial: "Evidence case mounted at /case/metro-lab. Type help.",
          tasks: [
            {
              id: "ls",
              label: "List case files",
              commands: ["list files", "ls", "dir"],
              response: "FILES: access.log, auth.log, notes.txt, timeline.md",
              evidence: "Case files include access.log, auth.log, notes.txt, and timeline.md."
            },
            {
              id: "auth",
              label: "Read the authentication log",
              commands: ["read auth.log", "cat auth.log"],
              response: "auth.log: 09:11 login ok user=demo. 09:18 failed login user=admin. 09:19 failed login user=admin. 09:20 login ok user=admin from lab-vpn.",
              evidence: "Admin had two failed logins followed by one successful login from lab-vpn at 09:20."
            },
            {
              id: "timeline",
              label: "Build the timeline",
              commands: ["timeline", "build timeline"],
              response: "TIMELINE: 09:18 failed admin login. 09:19 failed admin login. 09:20 admin success. Next step: verify whether lab-vpn was expected.",
              evidence: "Suspicious event window is 09:18 to 09:20; lab-vpn should be verified."
            }
          ]
        },
        {
          type: "choice",
          title: "Evidence Habit",
          question: "Why should you record exact times and evidence instead of saying 'someone hacked it'?",
          options: [
            { id: "a", text: "Because reports need facts, timelines, and repeatable evidence.", correct: true, explanation: "Correct. Good security work is evidence-based." },
            { id: "b", text: "Because exact details make the story sound scarier.", correct: false, explanation: "The goal is clarity, not fear." },
            { id: "c", text: "Because it lets you blame someone faster.", correct: false, ethicsDelta: -5, explanation: "Professional analysts avoid blame without evidence." }
          ]
        }
      ]
    },
    {
      id: "web-01",
      path: "web",
      title: "PixelBank: Broken Access Control",
      location: "PixelBank Avenue",
      difficulty: 2,
      xp: 260,
      credits: 140,
      badge: "web-apprentice",
      summary: "Investigate a fictional account access bug, understand IDOR, patch the authorization check, and write a finding.",
      tags: ["web", "idor", "access control"],
      unlock: { level: 1, completed: ["core-01"] },
      steps: [
        {
          type: "briefing",
          title: "Case Brief: Wrong Invoices",
          body: "PixelBank says test users inside the lab can sometimes view invoices that are not theirs. Your target is the fictional app app.pixelbank.local. You are allowed to use only the provided test accounts and simulated console.",
          objectives: [
            "Confirm the issue inside the toy app story.",
            "Explain the difference between authentication and authorization.",
            "Choose the secure server-side fix.",
            "Write a professional finding."
          ]
        },
        {
          type: "choice",
          title: "Concept Check",
          question: "A user is logged in, but the app lets them view another user's invoice by changing an invoice ID. What is the core problem?",
          options: [
            { id: "a", text: "The app forgot to check whether the logged-in user owns the requested invoice.", correct: true, explanation: "Correct. Being logged in is authentication. Checking ownership is authorization." },
            { id: "b", text: "The user needs a stronger password.", correct: false, explanation: "Password strength does not fix object-level authorization." },
            { id: "c", text: "The website needs a prettier UI.", correct: false, explanation: "Design does not fix broken access control." }
          ]
        },
        {
          type: "terminal",
          title: "Safe Lab Reproduction",
          body: "Use fictional test identities only. This lab does not send real requests.",
          initial: "PixelBank lab loaded. Allowed users: alice-test and bob-test. Allowed target: app.pixelbank.local.",
          tasks: [
            {
              id: "login",
              label: "Open Alice's test session",
              commands: ["login alice-test", "session alice-test"],
              response: "SESSION: alice-test authenticated. Alice owns invoice INV-1001.",
              evidence: "Alice owns invoice INV-1001 in the fictional PixelBank lab."
            },
            {
              id: "invoice",
              label: "Request Alice's invoice",
              commands: ["open invoice INV-1001", "view invoice INV-1001"],
              response: "HTTP 200: Invoice INV-1001 belongs to alice-test. Expected behavior.",
              evidence: "The app correctly shows Alice's own invoice INV-1001."
            },
            {
              id: "idor",
              label: "Test another lab invoice safely",
              commands: ["open invoice INV-1002", "view invoice INV-1002"],
              response: "HTTP 200: Invoice INV-1002 belongs to bob-test. Finding confirmed in lab: missing object ownership check.",
              evidence: "Alice's test session could view Bob's invoice INV-1002, confirming broken object-level authorization in the lab."
            }
          ]
        },
        {
          type: "patch",
          title: "Patch the Server-Side Logic",
          body: "The vulnerable pseudo-code trusts an invoice ID from the request. Which fix is best?",
          code: "function getInvoice(request) {\n  user = requireLogin(request)\n  invoice = database.findInvoice(request.invoiceId)\n  return invoice\n}",
          options: [
            { id: "a", text: "Hide invoice IDs in the frontend so users cannot see them.", correct: false, explanation: "This is not enough. Attackers can still send modified requests. The server must enforce ownership." },
            { id: "b", text: "After loading the invoice, check invoice.ownerId equals user.id before returning it.", correct: true, explanation: "Correct. Authorization must happen on the server for every object access." },
            { id: "c", text: "Tell users not to change invoice IDs.", correct: false, explanation: "Security cannot depend on user promises." }
          ]
        },
        {
          type: "report",
          title: "Write the Finding",
          finding: "Broken object-level authorization allowed a test user to view another test user's invoice in the fictional PixelBank lab.",
          required: ["scope", "impact", "authorization", "fix", "evidence"],
          minLength: 120
        }
      ]
    },
    {
      id: "web-02",
      path: "web",
      title: "Cookie Chase: Session Safety",
      location: "Session Market",
      difficulty: 2,
      xp: 230,
      credits: 120,
      summary: "Learn what cookies and sessions are, then choose safer session settings for a toy app.",
      tags: ["cookies", "sessions", "secure coding"],
      unlock: { level: 2, completed: ["core-02"] },
      steps: [
        {
          type: "briefing",
          title: "A Session Mystery",
          body: "NeonCart's toy app stores too much trust in a client-side cookie. You will inspect the idea, identify the risk, and choose safer settings. This is a concept lab, not a real exploit guide.",
          objectives: ["Understand what a session cookie does.", "Identify risky cookie design.", "Pick secure cookie attributes."]
        },
        {
          type: "choice",
          title: "Cookie Design",
          question: "Which design is safer for a login session?",
          options: [
            { id: "a", text: "Store the user's role as plain text in the browser and trust it forever.", correct: false, explanation: "The browser is not a trusted place for authorization decisions." },
            { id: "b", text: "Store a random session ID and keep sensitive authorization decisions on the server.", correct: true, explanation: "Correct. The client receives a token, but the server owns the important session state." },
            { id: "c", text: "Use the same session value for every user because it is easier.", correct: false, explanation: "Shared session values break accountability and security." }
          ]
        },
        {
          type: "patch",
          title: "Choose Cookie Protections",
          body: "Which setting combination is strongest for a normal HTTPS web app session cookie?",
          code: "Set-Cookie: session=<random>; ...",
          options: [
            { id: "a", text: "HttpOnly, Secure, SameSite=Lax or Strict, short lifetime, server-side validation.", correct: true, explanation: "Correct. These settings reduce script access, network leakage, cross-site abuse, and stale sessions." },
            { id: "b", text: "No expiration, readable by all scripts, works over HTTP.", correct: false, explanation: "That increases risk and should not be used for sensitive sessions." },
            { id: "c", text: "Only make the cookie name very confusing.", correct: false, explanation: "Obscurity does not replace secure settings." }
          ]
        }
      ]
    },
    {
      id: "web-03",
      path: "web",
      title: "XSS Theater: Escape the Script",
      location: "Theater Row",
      difficulty: 2,
      xp: 260,
      credits: 130,
      summary: "Understand cross-site scripting safely by choosing correct output encoding and content handling.",
      tags: ["xss", "frontend", "defense"],
      unlock: { level: 2, completed: ["web-01"] },
      steps: [
        {
          type: "briefing",
          title: "The Comment Stage",
          body: "A toy comment feature displays user input. The goal is to understand why untrusted input must be treated carefully. You will not run harmful scripts. You will choose the safe rendering strategy.",
          objectives: ["Recognize untrusted input.", "Choose output encoding.", "Explain impact and remediation."]
        },
        {
          type: "choice",
          title: "Rendering Decision",
          question: "A comment field allows users to submit text. What is the safest default way to render it on a page?",
          options: [
            { id: "a", text: "Render the text as HTML because users may want fancy comments.", correct: false, explanation: "Rendering untrusted HTML can create script execution risks." },
            { id: "b", text: "Encode or escape output so the browser treats it as text, not executable markup.", correct: true, explanation: "Correct. Output encoding is a key defense against XSS." },
            { id: "c", text: "Disable comments for all users forever.", correct: false, explanation: "Removing features is not always necessary. Secure handling is better." }
          ]
        },
        {
          type: "patch",
          title: "Pick the Safer Template",
          body: "Which pseudo-template is safer for untrusted comments?",
          code: "comment = getCommentFromUser()\nrender( ? )",
          options: [
            { id: "a", text: "renderRawHtml(comment)", correct: false, explanation: "Raw rendering treats user input as markup and can be dangerous." },
            { id: "b", text: "renderText(escapeForHtml(comment))", correct: true, explanation: "Correct. Treat user content as text unless there is a strong, sanitized reason not to." },
            { id: "c", text: "renderRawHtml(comment) but ask users to be nice", correct: false, explanation: "Security controls cannot depend on kindness." }
          ]
        },
        {
          type: "report",
          title: "Write an XSS-Style Finding",
          finding: "A toy comment feature rendered untrusted input as markup instead of safe text.",
          required: ["untrusted", "impact", "escape", "fix"],
          minLength: 100
        }
      ]
    },
    {
      id: "web-04",
      path: "web",
      title: "API Harbor: Object Rules",
      location: "API Harbor",
      difficulty: 3,
      xp: 300,
      credits: 160,
      summary: "Investigate API object access and missing rate limit concepts in a safe story lab.",
      tags: ["api", "authorization", "rate limits"],
      unlock: { level: 3, completed: ["web-01"] },
      steps: [
        {
          type: "briefing",
          title: "Harbor API Review",
          body: "A shipping startup's fictional API returns shipment details. Your task is to verify object-level access rules and recommend defensive controls.",
          objectives: ["Review scope.", "Confirm object ownership logic.", "Recommend rate limits and logging."]
        },
        {
          type: "terminal",
          title: "API Simulation Console",
          body: "Use toy commands that model API behavior without real requests.",
          initial: "API Harbor simulation. Fictional endpoint: api.harbor.local/shipments.",
          tasks: [
            { id: "scope", label: "Read API scope", commands: ["scope", "api scope"], response: "Allowed: api.harbor.local only. Test users: shipper-a, shipper-b. No real API calls.", evidence: "API Harbor scope is limited to the fictional api.harbor.local lab." },
            { id: "own", label: "Check allowed object", commands: ["api get SHIP-2001 as shipper-a", "get SHIP-2001"], response: "HTTP 200: SHIP-2001 belongs to shipper-a. Expected behavior.", evidence: "shipper-a can view its own shipment SHIP-2001." },
            { id: "other", label: "Check another lab object", commands: ["api get SHIP-2002 as shipper-a", "get SHIP-2002"], response: "HTTP 403: Access denied. The API correctly enforces ownership in this version.", evidence: "API returned 403 for another user's object, so object authorization appears present." }
          ]
        },
        {
          type: "choice",
          title: "Defense Recommendation",
          question: "Even when object authorization works, what additional controls help protect APIs?",
          options: [
            { id: "a", text: "Rate limits, structured logs, alerting, clear errors, and server-side authorization on every object.", correct: true, explanation: "Correct. Strong APIs combine prevention, monitoring, and abuse resistance." },
            { id: "b", text: "Only a secret-looking URL path.", correct: false, explanation: "URLs leak and can be guessed. Use real controls." },
            { id: "c", text: "No logs because logs use storage.", correct: false, explanation: "Logs are critical for detection and investigation." }
          ]
        }
      ]
    },
    {
      id: "network-01",
      path: "network",
      title: "Packet Park: Ports and Services",
      location: "Packet Park",
      difficulty: 2,
      xp: 240,
      credits: 120,
      badge: "network-scout",
      summary: "Map fictional lab services and learn what ports represent without touching real networks.",
      tags: ["network", "ports", "services"],
      unlock: { level: 1, completed: ["core-02"] },
      steps: [
        {
          type: "briefing",
          title: "City Network Orientation",
          body: "MetroNet has a toy office network for training. You will map which fictional services are available and learn why exposed services need ownership, patching, and monitoring.",
          objectives: ["Read network scope.", "Map lab services.", "Explain what a port means."]
        },
        {
          type: "terminal",
          title: "Network Map Simulation",
          body: "This is a fictional map command. It is not scanning the internet.",
          initial: "MetroNet simulator loaded. Allowed lab: metronet.local.",
          tasks: [
            { id: "scope", label: "Read network scope", commands: ["scope", "network scope"], response: "Allowed lab network: metronet.local. Forbidden: public IPs, neighbor devices, real routers.", evidence: "MetroNet lab scope is metronet.local only." },
            { id: "map", label: "Map fictional lab services", commands: ["map metronet.local", "scan metronet.local"], response: "SIMULATED SERVICES: 10.20.0.10 web:80, 10.20.0.11 dns:53, 10.20.0.12 files:445, 10.20.0.13 admin:22. These are fictional training assets.", evidence: "Fictional lab services include web, DNS, file sharing, and admin access." },
            { id: "explain", label: "Explain a service", commands: ["explain port 80", "what is port 80"], response: "Port 80 usually represents web traffic. A port is like a numbered door to a service. A service should be patched, monitored, and exposed only when needed.", evidence: "Port 80 represents a web service in this lab. Exposed services need patching and monitoring." }
          ]
        },
        {
          type: "choice",
          title: "Network Ethics",
          question: "What should you do if you accidentally discover a real device outside the authorized lab?",
          options: [
            { id: "a", text: "Stop, record what happened, and ask for guidance before continuing.", correct: true, ethicsDelta: 4, explanation: "Correct. Stop when scope becomes unclear." },
            { id: "b", text: "Keep going because discovery is fun.", correct: false, ethicsDelta: -10, explanation: "Curiosity does not override authorization." },
            { id: "c", text: "Try default passwords to see if it is vulnerable.", correct: false, ethicsDelta: -15, explanation: "That is unauthorized access and is not allowed." }
          ]
        }
      ]
    },
    {
      id: "network-02",
      path: "network",
      title: "Firewall Fix: Close the Wrong Door",
      location: "Firewall Gate",
      difficulty: 2,
      xp: 260,
      credits: 130,
      summary: "Use a fictional firewall review to decide which services should be reachable and why segmentation matters.",
      tags: ["firewall", "hardening", "network"],
      unlock: { level: 2, completed: ["network-01"] },
      steps: [
        {
          type: "briefing",
          title: "Firewall Review",
          body: "A small fictional office exposes too many internal services. Your job is to reduce attack surface while keeping business functions alive.",
          objectives: ["Identify unnecessary exposure.", "Choose least-privilege network rules.", "Explain segmentation." ]
        },
        {
          type: "choice",
          title: "Rule Review",
          question: "The public internet can reach file sharing, database, and admin services. Which is the best first recommendation?",
          options: [
            { id: "a", text: "Expose every service because users may need them someday.", correct: false, explanation: "Unnecessary exposure increases risk." },
            { id: "b", text: "Allow only required public web services; restrict admin, database, and file services to trusted internal paths or VPN.", correct: true, explanation: "Correct. Reduce exposure and apply least privilege." },
            { id: "c", text: "Change port numbers but keep everything public.", correct: false, explanation: "Changing numbers alone is not real access control." }
          ]
        },
        {
          type: "patch",
          title: "Choose the Safer Policy",
          body: "Pick the best high-level firewall policy for a public website with an internal database.",
          code: "Internet -> Web App -> Database\nAdmin -> Management Console",
          options: [
            { id: "a", text: "Internet can access web app only; web app can access database; admin access requires trusted path and MFA.", correct: true, explanation: "Correct. This follows segmentation and least privilege." },
            { id: "b", text: "Internet can access database directly for speed.", correct: false, explanation: "Direct database exposure is usually dangerous and unnecessary." },
            { id: "c", text: "No logging anywhere.", correct: false, explanation: "Logging helps detect and investigate problems." }
          ]
        }
      ]
    },
    {
      id: "network-03",
      path: "network",
      title: "DNS Maze: Find the Misroute",
      location: "DNS Maze",
      difficulty: 3,
      xp: 280,
      credits: 150,
      summary: "Diagnose a fictional DNS misconfiguration and explain how it affects users.",
      tags: ["dns", "network", "diagnostics"],
      unlock: { level: 3, completed: ["network-01"] },
      steps: [
        {
          type: "briefing",
          title: "The Wrong Destination",
          body: "Users report that docs.metronet.local opens the old help center. You will compare DNS records in a safe fictional environment.",
          objectives: ["Query fictional DNS records.", "Compare expected and actual records.", "Recommend a fix with rollback plan."]
        },
        {
          type: "terminal",
          title: "DNS Simulation",
          body: "Use fictional lookup commands.",
          initial: "DNS Maze loaded. Target: docs.metronet.local.",
          tasks: [
            { id: "lookup", label: "Look up current record", commands: ["lookup docs.metronet.local", "dns docs.metronet.local"], response: "docs.metronet.local -> 10.20.0.40 old-help-center", evidence: "docs.metronet.local points to old-help-center at 10.20.0.40." },
            { id: "expected", label: "Check expected record", commands: ["expected docs.metronet.local", "plan docs.metronet.local"], response: "Expected destination: 10.20.0.70 docs-platform. TTL should be lowered before planned cutover.", evidence: "Expected docs platform is 10.20.0.70; current record is stale." },
            { id: "fix", label: "Propose DNS fix", commands: ["fix dns", "propose dns fix"], response: "Recommendation: update docs.metronet.local to 10.20.0.70, communicate change, monitor, keep rollback record to 10.20.0.40.", evidence: "DNS fix should include update, communication, monitoring, and rollback." }
          ]
        }
      ]
    },
    {
      id: "soc-01",
      path: "soc",
      title: "NightWatch Logs: Suspicious Login",
      location: "NightWatch HQ",
      difficulty: 2,
      xp: 260,
      credits: 130,
      badge: "soc-investigator",
      summary: "Analyze fictional authentication logs, build a timeline, and decide a containment step.",
      tags: ["soc", "logs", "incident response"],
      unlock: { level: 2, completed: ["core-03"] },
      steps: [
        {
          type: "briefing",
          title: "SOC Alert",
          body: "NightWatch receives an alert: admin login after repeated failures. Your task is to triage with evidence, not panic.",
          objectives: ["Collect log evidence.", "Build a timeline.", "Choose containment." ]
        },
        {
          type: "terminal",
          title: "Log Triage Console",
          body: "This console contains fake log entries for training.",
          initial: "NightWatch SIEM simulation loaded. Alert ID NW-441.",
          tasks: [
            { id: "alert", label: "Read alert summary", commands: ["alert NW-441", "open alert"], response: "ALERT: 8 failed admin logins from lab-vpn, then success at 02:14. User agent changed after success.", evidence: "Alert NW-441 shows 8 failures followed by admin success at 02:14 from lab-vpn." },
            { id: "timeline", label: "Create timeline", commands: ["timeline NW-441", "build timeline"], response: "02:07 failures begin. 02:14 admin success. 02:16 settings page accessed. 02:19 export requested.", evidence: "Timeline includes login failures, admin success, settings access, and export request." },
            { id: "contain", label: "Recommend containment", commands: ["contain NW-441", "recommend containment"], response: "Containment: verify admin, rotate session, require password reset/MFA review, preserve logs, check export action, notify owner.", evidence: "Containment should preserve evidence, verify account owner, reset risky sessions, and review MFA." }
          ]
        },
        {
          type: "choice",
          title: "Triage Decision",
          question: "What should you avoid during incident response?",
          options: [
            { id: "a", text: "Preserving logs and writing a timeline.", correct: false, explanation: "Those are good practices." },
            { id: "b", text: "Making public accusations before confirming evidence.", correct: true, explanation: "Correct. Communicate carefully and base actions on evidence." },
            { id: "c", text: "Notifying the responsible owner when required.", correct: false, explanation: "Escalation is often necessary." }
          ]
        }
      ]
    },
    {
      id: "soc-02",
      path: "soc",
      title: "Phishing Inbox: The Fake Login",
      location: "Inbox Alley",
      difficulty: 2,
      xp: 240,
      credits: 120,
      summary: "Inspect a fictional phishing email and choose safe response steps.",
      tags: ["phishing", "email", "defense"],
      unlock: { level: 2, completed: ["core-03"] },
      steps: [
        {
          type: "briefing",
          title: "Suspicious Email",
          body: "A fictional employee reports a message asking them to log in immediately. You will inspect clues safely and choose response steps. No real links are used.",
          objectives: ["Identify phishing indicators.", "Avoid clicking unknown links.", "Choose safe reporting and containment." ]
        },
        {
          type: "choice",
          title: "Email Clues",
          question: "Which combination is most suspicious?",
          options: [
            { id: "a", text: "Urgent pressure, mismatched sender, unexpected login link, and request for credentials.", correct: true, explanation: "Correct. These are common phishing indicators." },
            { id: "b", text: "A normal internal newsletter with no links.", correct: false, explanation: "That is less suspicious based on the details." },
            { id: "c", text: "A calendar invite from a known teammate for a meeting you expected.", correct: false, explanation: "Expected context matters." }
          ]
        },
        {
          type: "choice",
          title: "Safe Response",
          question: "What should the analyst do first?",
          options: [
            { id: "a", text: "Click the link to see where it goes.", correct: false, ethicsDelta: -6, explanation: "Do not interact with suspicious links directly. Use safe analysis methods and reporting channels." },
            { id: "b", text: "Preserve the email, report it through the approved channel, and check whether anyone submitted credentials.", correct: true, explanation: "Correct. Preserve evidence and respond through process." },
            { id: "c", text: "Forward it to everyone as a warning with the link still active.", correct: false, explanation: "That can spread the threat. Use safe reporting and sanitized communication." }
          ]
        }
      ]
    },
    {
      id: "wordpress-01",
      path: "wordpress",
      title: "Plugin Plaza: Missing Permission Check",
      location: "Plugin Plaza",
      difficulty: 2,
      xp: 300,
      credits: 160,
      badge: "wp-guardian",
      summary: "Fix a WordPress-style plugin action that forgets capability and nonce checks.",
      tags: ["wordpress", "plugin", "secure coding"],
      unlock: { level: 2, completedAny: ["web-01", "web-02", "web-03"] },
      steps: [
        {
          type: "briefing",
          title: "Client Plugin Review",
          body: "A fictional WordPress plugin allows a settings update from an admin page. Your job is to choose the safer pattern: verify intent and verify permission before changing state.",
          objectives: ["Understand capabilities.", "Understand nonces at a high level.", "Patch the logic." ]
        },
        {
          type: "patch",
          title: "Patch the Plugin Handler",
          body: "The pseudo-code updates plugin settings but does not verify who is allowed or whether the request is intentional. Which fix is best?",
          code: "function save_settings(request) {\n  update_option('cq_banner_text', request.banner_text)\n  return 'saved'\n}",
          options: [
            { id: "a", text: "Check the current user has the right capability, verify request intent with a nonce, sanitize input, then save.", correct: true, explanation: "Correct. Sensitive actions need permission checks, intent checks, sanitization, and safe output later." },
            { id: "b", text: "Rename the function so attackers cannot guess it.", correct: false, explanation: "Names are not access control." },
            { id: "c", text: "Trust anyone who can load the page.", correct: false, explanation: "Loading a page does not prove permission or intent." }
          ]
        },
        {
          type: "report",
          title: "Write the Plugin Finding",
          finding: "A fictional WordPress plugin settings handler lacked permission and request-intent checks.",
          required: ["wordpress", "permission", "nonce", "sanitize", "fix"],
          minLength: 110
        }
      ]
    },
    {
      id: "wordpress-02",
      path: "wordpress",
      title: "Client Site Hardening Sprint",
      location: "Hardening House",
      difficulty: 3,
      xp: 320,
      credits: 170,
      summary: "Choose a balanced WordPress hardening plan for a fictional client without breaking their business.",
      tags: ["wordpress", "hardening", "client"],
      unlock: { level: 3, completed: ["wordpress-01"] },
      steps: [
        {
          type: "briefing",
          title: "Hardening Without Panic",
          body: "A fictional client asks for a quick security upgrade. Your goal is to recommend practical controls: backups, updates, least privilege, MFA, monitoring, and safe recovery plans.",
          objectives: ["Prioritize controls.", "Avoid breaking the site.", "Write client-friendly advice." ]
        },
        {
          type: "choice",
          title: "Best First Plan",
          question: "Which plan is strongest and realistic?",
          options: [
            { id: "a", text: "Update everything directly on production with no backup.", correct: false, explanation: "That can break the site and leaves no rollback path." },
            { id: "b", text: "Create a backup, test updates, remove unused plugins, enforce MFA for admins, review roles, and enable monitoring.", correct: true, explanation: "Correct. Good hardening balances security and reliability." },
            { id: "c", text: "Install every security plugin you find.", correct: false, explanation: "Too many plugins can increase complexity and risk." }
          ]
        },
        {
          type: "report",
          title: "Client Hardening Summary",
          finding: "The fictional WordPress site needed a practical hardening plan with backups, updates, least privilege, MFA, and monitoring.",
          required: ["backup", "updates", "mfa", "roles", "monitoring"],
          minLength: 110
        }
      ]
    },
    {
      id: "cloud-01",
      path: "cloud",
      title: "SkyVault IAM: Too Much Power",
      location: "SkyVault Ridge",
      difficulty: 3,
      xp: 330,
      credits: 180,
      badge: "cloud-warden",
      summary: "Review fictional cloud permissions and apply least privilege.",
      tags: ["cloud", "iam", "least privilege"],
      unlock: { level: 3, completedAny: ["web-01", "network-01", "soc-01"] },
      steps: [
        {
          type: "briefing",
          title: "Cloud Permission Review",
          body: "SkyVault has a fictional user account with permissions that are broader than needed. Your task is to reduce risk without stopping the job role.",
          objectives: ["Identify over-permission.", "Apply least privilege.", "Recommend monitoring." ]
        },
        {
          type: "choice",
          title: "Permission Design",
          question: "A reporting service only needs to read monthly report files, but its role can delete all storage and create new admin users. What is the best recommendation?",
          options: [
            { id: "a", text: "Keep admin power because it is convenient.", correct: false, explanation: "Convenience should not override least privilege." },
            { id: "b", text: "Limit the role to required read actions on required report storage, and monitor denied/admin actions.", correct: true, explanation: "Correct. Grant only what the workload needs." },
            { id: "c", text: "Share one admin key with everyone.", correct: false, ethicsDelta: -8, explanation: "Shared admin credentials are dangerous and hard to audit." }
          ]
        },
        {
          type: "patch",
          title: "Pick the Better Policy",
          body: "Choose the safest high-level policy for the reporting service.",
          code: "Service: monthly-report-reader\nNeed: read reports for dashboard\nNot needed: delete storage, create users, change billing",
          options: [
            { id: "a", text: "Allow read access only to the report bucket/path needed by the service.", correct: true, explanation: "Correct. This matches the business need." },
            { id: "b", text: "Allow all cloud actions because future features may need them.", correct: false, explanation: "Future needs should be reviewed later, not granted in advance." },
            { id: "c", text: "Disable logging to reduce noise.", correct: false, explanation: "Cloud logs are important for accountability and detection." }
          ]
        }
      ]
    },
    {
      id: "cloud-02",
      path: "cloud",
      title: "Secret Leak: Repo Cleanup",
      location: "Commit Canyon",
      difficulty: 3,
      xp: 340,
      credits: 180,
      summary: "Respond to a fictional leaked API key in a code repository.",
      tags: ["secrets", "devsecops", "cloud"],
      unlock: { level: 3, completed: ["cloud-01"] },
      steps: [
        {
          type: "briefing",
          title: "The Bad Commit",
          body: "A developer accidentally committed a fictional API key to a training repository. Your goal is not just to delete the line. You must rotate, review access, and prevent recurrence.",
          objectives: ["Recognize secret exposure.", "Choose response steps.", "Prevent recurrence." ]
        },
        {
          type: "choice",
          title: "Secret Response",
          question: "What is the best response after a secret is committed to a repository?",
          options: [
            { id: "a", text: "Delete the line and assume everything is fine.", correct: false, explanation: "The secret may already be copied. Deletion alone is not enough." },
            { id: "b", text: "Revoke or rotate the secret, review logs for use, remove it from history if needed, and move secrets to a proper manager.", correct: true, explanation: "Correct. Treat exposed secrets as compromised." },
            { id: "c", text: "Rename the variable to make it less obvious.", correct: false, explanation: "Renaming does not protect a leaked secret." }
          ]
        },
        {
          type: "report",
          title: "Secret Leak Report",
          finding: "A fictional API key was committed to a repository and required rotation plus prevention controls.",
          required: ["rotate", "revoke", "logs", "secret manager", "prevention"],
          minLength: 120
        }
      ]
    },
    {
      id: "capstone-01",
      path: "capstone",
      title: "Boss Case: PixelBank Mini Pentest",
      location: "CyberCity Central",
      difficulty: 4,
      xp: 520,
      credits: 300,
      badge: "boss-clear",
      summary: "A multi-stage boss case combining scope, web access control, session safety, patching, and reporting.",
      tags: ["boss", "web", "report"],
      unlock: { level: 3, completedCount: 7 },
      steps: [
        {
          type: "briefing",
          title: "Boss Brief",
          body: "PixelBank wants a mini pentest of its fictional training app. You must stay in scope, confirm one access control issue, recommend session controls, patch the bug, and submit a professional report.",
          objectives: ["Read scope.", "Confirm evidence.", "Choose patch.", "Write report." ]
        },
        {
          type: "terminal",
          title: "Boss Investigation Console",
          body: "All actions are simulated. No real site is contacted.",
          initial: "Boss case loaded. Target: app.pixelbank.local. Test users only.",
          tasks: [
            { id: "scope", label: "Confirm scope", commands: ["scope", "boss scope"], response: "Allowed: app.pixelbank.local, test users alice-test and bob-test. Forbidden: real bank systems, production data, public internet.", evidence: "Boss case scope allows only app.pixelbank.local with test users." },
            { id: "access", label: "Confirm access control issue", commands: ["test access control", "confirm idor"], response: "Finding: alice-test can view bob-test invoice INV-1002 in the lab. Authorization check missing on invoice object.", evidence: "Boss finding: alice-test can view bob-test invoice INV-1002 in the lab." },
            { id: "session", label: "Review session settings", commands: ["review session", "check cookies"], response: "Observation: session should use random server-side token, HttpOnly, Secure, SameSite, and reasonable expiration.", evidence: "Session controls should include server-side validation and secure cookie attributes." }
          ]
        },
        {
          type: "patch",
          title: "Boss Patch",
          body: "Pick the strongest fix for the confirmed invoice issue.",
          code: "invoice = findInvoice(request.invoiceId)\nreturn invoice",
          options: [
            { id: "a", text: "Check invoice ownership against the authenticated user on the server before returning data.", correct: true, explanation: "Correct. Object authorization must be enforced server-side." },
            { id: "b", text: "Make invoice IDs longer but keep no ownership check.", correct: false, explanation: "Harder-to-guess IDs help but do not replace authorization." },
            { id: "c", text: "Only hide the invoice link in the UI.", correct: false, explanation: "Attackers can still send requests without links." }
          ]
        },
        {
          type: "report",
          title: "Boss Report",
          finding: "PixelBank's fictional lab app had broken object-level authorization in invoice access and needed server-side ownership checks plus session hardening.",
          required: ["scope", "evidence", "impact", "authorization", "session", "fix"],
          minLength: 180
        }
      ]
    },
    {
      id: "capstone-02",
      path: "capstone",
      title: "Boss Case: CyberCity Incident Response",
      location: "CyberCity Central",
      difficulty: 4,
      xp: 560,
      credits: 320,
      summary: "Investigate a fictional incident from alert to timeline to containment and executive summary.",
      tags: ["boss", "soc", "network"],
      unlock: { level: 4, completedCount: 10 },
      steps: [
        {
          type: "briefing",
          title: "City-Wide Alert",
          body: "A fictional company reports suspicious admin activity and an unexpected export. You will combine SOC logs, network reasoning, and reporting.",
          objectives: ["Read alert.", "Build timeline.", "Contain safely.", "Write executive summary." ]
        },
        {
          type: "terminal",
          title: "Incident Console",
          body: "All logs are fictional training data.",
          initial: "Incident IR-900 loaded. Use alert, timeline, contain, and summary commands.",
          tasks: [
            { id: "alert", label: "Open alert", commands: ["alert IR-900", "open incident"], response: "Alert: admin login after repeated failures, settings access, export request, and new API token created.", evidence: "IR-900 includes admin login anomaly, settings access, export request, and new API token." },
            { id: "timeline", label: "Build timeline", commands: ["timeline IR-900", "build timeline"], response: "02:07 failures. 02:14 success. 02:16 settings page. 02:19 export. 02:22 API token created. 02:30 alert triggered.", evidence: "Incident timeline spans 02:07 to 02:30 with login, export, token, and alert events." },
            { id: "contain", label: "Contain incident", commands: ["contain IR-900", "contain"], response: "Containment: disable suspicious token, rotate admin session, preserve logs, verify account owner, review export destination, communicate to stakeholders.", evidence: "Containment includes disabling token, session rotation, log preservation, owner verification, and export review." },
            { id: "summary", label: "Draft executive summary", commands: ["summary IR-900", "exec summary"], response: "Executive summary: A suspicious admin session performed sensitive actions in the fictional lab. Evidence was preserved, access was contained, and follow-up hardening is required.", evidence: "Executive summary should be clear, non-alarmist, and action-oriented." }
          ]
        },
        {
          type: "report",
          title: "Incident Report",
          finding: "A fictional incident involved suspicious admin login behavior, sensitive actions, token creation, and required containment plus hardening.",
          required: ["timeline", "containment", "impact", "evidence", "hardening"],
          minLength: 170
        }
      ]
    }
  ]
};
