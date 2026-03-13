export type ProblemStatement = {
  id: string;
  title: string;
  problem: string;
  prerequisites?: string;
};

export type Theme = {
  slug: "devops" | "cybersecurity" | "cloud-architecture" | "open-innovation";
  label: string;
  icon: string;
  problemStatements: ProblemStatement[];
};

export const VALID_THEME_SLUGS = [
  "devops",
  "cybersecurity",
  "cloud-architecture",
  "open-innovation",
] as const;

export type ThemeSlug = (typeof VALID_THEME_SLUGS)[number];

export const themes: Record<ThemeSlug, Theme> = {
  devops: {
    slug: "devops",
    label: "DevOps",
    icon: "/icons/devops.png",
    problemStatements: [
      {
        id: "T1PS1",
        title:
          "Agentic CI/CD Pipeline Repair & Intelligent Release Orchestration",
        problem:
          "Modern software teams rely on complex CI/CD pipelines to deploy code frequently. Diagnosing pipeline failures often requires engineers to switch between version control systems, logs, test reports, and monitoring dashboards. As development velocity increases and AI-generated code becomes more common, pipeline failures occur more frequently and debugging them becomes increasingly time-consuming. Organizations also face risks when automation systems operate with elevated permissions without proper oversight. The challenge is to design an intelligent system that continuously monitors pipeline activity, analyzes contextual signals such as logs and commits, detects failure patterns, and assists in repairing pipelines while maintaining strong governance controls for high-risk deployment decisions.",
        prerequisites:
          "Participants should have knowledge of agentic AI and multi-agent systems, understanding how autonomous agents coordinate tasks and workflows using frameworks such as LangGraph, CrewAI, or AutoGen. Familiarity with CI/CD pipelines and tools like GitHub Actions, Jenkins, or GitLab CI is important, along with the ability to analyze logs and test reports using LLM-based reasoning. A solid understanding of security principles such as least-privilege access and audit trails for autonomous systems is expected, as well as experience with backend development and integration with version control and deployment APIs.",
      },
      {
        id: "T1PS2",
        title:
          "Agentic Developer Cognitive Load Reduction & Toil Elimination Platform",
        problem:
          "Engineering teams rely on a wide range of tools for infrastructure management, deployment, monitoring, documentation, and incident response. Operational knowledge is often scattered across dashboards, chat platforms, documentation pages, and internal tools. Developers spend a significant amount of time searching for information, interpreting logs, and switching between systems to complete routine tasks. Critical knowledge frequently exists only as tribal knowledge held by experienced engineers, creating bottlenecks and slowing down productivity. The challenge is to build a platform that unifies fragmented operational knowledge and integrates with developer tools so that engineers can easily access workflows, runbooks, and troubleshooting guidance through an intelligent and context-aware system.",
        prerequisites:
          "Participants should understand agentic AI and multi-agent architectures, including how autonomous agents coordinate tasks across distributed systems. Experience integrating developer tools such as GitHub, Jira, Slack, Confluence, and monitoring systems is valuable. Familiarity with vector databases or knowledge graphs for organizing and querying unstructured data is helpful. Understanding internal developer platforms, self-service infrastructure concepts, and developer experience engineering will also be beneficial. Participants should also be able to design human-in-the-loop workflows where autonomous actions are auditable and controlled.",
      },
    ],
  },

  cybersecurity: {
    slug: "cybersecurity",
    label: "Cybersecurity",
    icon: "/icons/cybersecurity.png",
    problemStatements: [
      {
        id: "T2PS1",
        title:
          "Agentic Continuous Identity Verification for Zero Trust Environments",
        problem:
          "Traditional authentication systems verify user identity only during login through mechanisms such as passwords, one-time passwords, or single sign-on. Once authenticated, users maintain access for the entire session without continuous verification. If credentials are compromised or session tokens are stolen, attackers can move across services and systems without being detected. In modern cloud-native environments where sessions may interact with many microservices, this creates a significant security gap. The challenge is to build a system that continuously evaluates user behavior, device characteristics, and contextual signals throughout the session lifecycle to dynamically verify identity and detect suspicious activity in real time.",
        prerequisites:
          "Participants should understand Zero Trust architecture concepts including continuous authentication and identity-centric security. Knowledge of behavioral biometrics such as keystroke dynamics and user interaction patterns will be useful. Familiarity with authentication protocols including OAuth 2.0, OpenID Connect, and identity federation is recommended. Experience applying machine learning or anomaly detection techniques for security monitoring is beneficial, along with familiarity with enterprise monitoring systems such as SIEM platforms and real-time event processing pipelines.",
      },
      {
        id: "T2PS2",
        title: "Autonomous Red vs Blue AI Defense System",
        problem:
          "Enterprise security defenses often rely on periodic vulnerability assessments or penetration tests that occur quarterly or annually. These methods cannot keep up with modern attackers who increasingly use automated AI tools to scan for misconfigurations and exploit vulnerabilities within minutes of their disclosure. As enterprise infrastructures expand across cloud and hybrid environments, the attack surface grows faster than security teams can manually monitor. The challenge is to design a system that continuously simulates attacker behavior, identifies vulnerabilities, evaluates defensive responses, and improves system security proactively through autonomous security testing.",
        prerequisites:
          "Participants should have knowledge of agentic AI and multi-agent systems where autonomous agents collaborate and simulate adversarial scenarios. Understanding cybersecurity concepts such as threat modeling, vulnerability scanning, penetration testing, and defensive monitoring systems is essential. Experience building AI systems for analyzing security logs and detecting anomalies will be valuable. Familiarity with distributed systems, enterprise infrastructure environments, and secure sandbox or digital twin simulations will help teams design realistic attack and defense environments.",
      },
    ],
  },

  "cloud-architecture": {
    slug: "cloud-architecture",
    label: "Cloud Architecture",
    icon: "/icons/cloud.png",
    problemStatements: [
      {
        id: "T3PS1",
        title:
          "Agentic Internal Spot Market Scheduler for Private Data Centers",
        problem:
          "Private data centers are typically provisioned to handle peak demand, which leaves large amounts of computing resources such as CPU, memory, and GPUs underutilized during off-peak periods. Many organizations maintain queues of batch workloads such as analytics jobs, machine learning training, and reporting tasks that could take advantage of these idle resources. However, traditional cluster schedulers rely on static policies and cannot dynamically detect spare capacity, assign it to queued workloads, or reclaim resources quickly when production demand increases. The challenge is to design a scheduling system that intelligently allocates idle capacity to batch workloads while ensuring that high-priority production workloads can reclaim resources when needed.",
        prerequisites:
          "Participants should have a solid understanding of Linux process lifecycle concepts including signals, process states, and graceful shutdown behavior. Knowledge of containerization and resource isolation mechanisms is important. Familiarity with Kubernetes fundamentals such as pods, nodes, scheduling policies, and resource limits is required. Experience with cluster monitoring tools and performance observability systems such as Prometheus will also be beneficial.",
      },
      {
        id: "T3PS2",
        title:
          "Agentic Self-Healing Cloud for Autonomous Kubernetes Operations",
        problem:
          "Modern applications are built using microservices running on Kubernetes clusters. While Kubernetes provides basic self-healing capabilities such as restarting containers or rescheduling pods, these mechanisms are reactive and cannot determine the root causes of failures. When systems scale to hundreds of interconnected services, a single degraded component can trigger cascading failures that lead to widespread downtime. Site reliability engineers must manually analyze logs, metrics, and traces across multiple observability tools to identify issues, which can take significant time and effort. The challenge is to build an intelligent system capable of monitoring infrastructure telemetry, diagnosing root causes, and autonomously restoring system stability.",
        prerequisites:
          "Participants should understand agentic AI and multi-agent architectures capable of reasoning about system state and coordinating remediation actions. Familiarity with cloud-native infrastructure concepts including Kubernetes, container orchestration, and microservices is essential. Experience with observability tools such as Prometheus, Grafana, and OpenTelemetry will be useful. Participants should also be comfortable interacting with Kubernetes APIs and automating infrastructure operations using cloud-agnostic tooling.",
      },
    ],
  },

  "open-innovation": {
    slug: "open-innovation",
    label: "Open Innovation",
    icon: "/icons/open-innovation.png",
    problemStatements: [
      {
        id: "OI-1",
        title: "Open Innovation",
        problem:
          "Not all impactful ideas fit neatly into predefined problem statements. Innovation often emerges when individuals explore problems they personally care about, experiment with unconventional approaches, and challenge existing assumptions. This track invites participants to step beyond structured themes and identify a real-world problem worth solving. Whether it is related to technology, society, education, sustainability, accessibility, or entirely new domains, the focus is on meaningful innovation and creative problem discovery.",
        prerequisites:
          "There are no strict prerequisites for this track. Participants are encouraged to bring curiosity, creativity, and the willingness to experiment. Strong ideas, thoughtful design, and effective execution matter more than following predefined rules. Teams should focus on identifying a meaningful problem, designing a practical solution, and building a working prototype that clearly demonstrates impact and feasibility.",
      },
    ],
  },
};
