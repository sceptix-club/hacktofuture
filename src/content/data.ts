export type ProblemStatement = {
  id: string;
  title: string;
  problem: string;
  solution?: string;
};

export type Theme = {
  slug:
    | "healthcare-and-citizen-welfare"
    | "industry-and-trade"
    | "infrastructure-and-smart-cities"
    | "open-innovation";
  label: string;
  icon: string; // path to image or emoji placeholder
  problemStatements: ProblemStatement[];
};

export const VALID_THEME_SLUGS = [
  "healthcare-and-citizen-welfare",
  "industry-and-trade",
  "infrastructure-and-smart-cities",
  "open-innovation",
] as const;

export type ThemeSlug = (typeof VALID_THEME_SLUGS)[number];

export const themes: Record<ThemeSlug, Theme> = {
  "healthcare-and-citizen-welfare": {
    slug: "healthcare-and-citizen-welfare",
    label: "Healthcare and Citizen Welfare",
    icon: "/icons/healthcare.png",
    problemStatements: [
      {
        id: "PS-1",
        title: "AI-Powered Early Disease Detection",
        problem:
          "Rural and semi-urban populations lack access to timely diagnostic services. Early-stage diseases such as diabetes, tuberculosis, and hypertension often go undetected due to the absence of affordable screening tools and trained medical professionals at grassroots level.",
        solution:
          "Build an AI-powered, low-cost diagnostic tool that can be operated by community health workers to screen for common diseases using basic inputs like images, vitals, or symptom data, and flag high-risk individuals for further medical review.",
      },
      {
        id: "PS-2",
        title: "Mental Health Support Platform for Citizens",
        problem:
          "There is a significant gap in mental health awareness and access to counseling services, especially in tier-2 and tier-3 cities. Stigma, lack of professionals, and cost barriers prevent individuals from seeking help.",
        solution:
          "Design a digital platform that provides anonymous, accessible mental health screenings, connects users to verified counselors, and uses AI to offer guided self-help programs tailored to users' reported conditions.",
      },
    ],
  },
  "industry-and-trade": {
    slug: "industry-and-trade",
    label: "Industry and Trade",
    icon: "/icons/industry.png",
    problemStatements: [
      {
        id: "PS-1",
        title: "Real-Time Dashboard for Optimized Manufacturing Supply Chains",
        problem:
          "Manufacturing companies struggle to optimize production due to fluctuating raw material availability (e.g., steel, chemicals) and unpredictable price swings (e.g., 20–30% monthly variations). Frequent supply chain disruptions—such as delayed shipments or supplier shortages—lead to either idle machinery (e.g., 15% downtime) or overstocked inventories (e.g., 25% excess stock), increasing costs by up to 10–15% annually. Traditional procurement relies on static contracts and manual forecasting, which cannot adapt to sudden market shifts like tariff changes or demand spikes, compromising quality and profitability.",
        solution:
          "Develop a real-time supply chain dashboard that integrates live market data, supplier APIs, and predictive analytics to dynamically adjust procurement schedules, flagging disruptions and recommending alternatives before they impact production.",
      },
      {
        id: "PS-2",
        title: "SME Export Compliance Automation",
        problem:
          "Small and medium enterprises (SMEs) entering export markets face a labyrinth of compliance requirements across different countries—tariffs, documentation, certifications, and regulatory norms—leading to delays, penalties, and missed opportunities.",
        solution:
          "Create an intelligent compliance assistant that maps product categories to destination-country requirements, auto-generates required documentation, and alerts businesses to regulatory changes in real time.",
      },
      {
        id: "PS-3",
        title: "Predictive Demand Forecasting for Retail Trade",
        problem:
          "Retailers, especially in unorganized markets, frequently face stockouts or overstocking due to poor demand visibility, resulting in lost sales and high wastage.",
        solution:
          "Build a demand forecasting engine using historical sales data, regional trends, and seasonal patterns to help retailers plan inventory efficiently and reduce wastage by up to 30%.",
      },
    ],
  },
  "infrastructure-and-smart-cities": {
    slug: "infrastructure-and-smart-cities",
    label: "Infrastructure and Smart Cities",
    icon: "/icons/infrastructure.png",
    problemStatements: [
      {
        id: "PS-1",
        title: "Smart Waste Management System",
        problem:
          "Urban local bodies face challenges in optimizing waste collection routes, leading to overflowing bins, increased fuel costs, and citizen dissatisfaction.",
        solution:
          "Develop an IoT-enabled smart waste management platform with real-time bin-fill sensors, dynamic route optimization for collection vehicles, and a citizen reporting interface.",
      },
      {
        id: "PS-2",
        title: "Pothole Detection and Road Maintenance Prioritization",
        problem:
          "Road maintenance departments lack data-driven tools to prioritize repair work, leading to delayed fixes, accidents, and high maintenance backlogs.",
        solution:
          "Build a crowdsourced + AI-based pothole detection system using mobile phone sensors and camera feeds, aggregating reports into a municipality dashboard for prioritized repair scheduling.",
      },
      {
        id: "PS-3",
        title: "Integrated Public Transport Planner",
        problem:
          "Citizens in metropolitan areas struggle with fragmented public transport systems offering no unified real-time route planning across buses, metros, and autos.",
        solution:
          "Create a unified transit planner app that aggregates real-time data from multiple transport providers, offers multi-modal routing, estimated arrival times, and dynamic updates on delays.",
      },
    ],
  },
  "open-innovation": {
    slug: "open-innovation",
    label: "Open Innovation",
    icon: "/icons/open-innovation.png",
    problemStatements: [
      {
        id: "PS-1",
        title: "Open Innovation Challenge",
        problem:
          "Traditional innovation models limit collaboration across organizations, hindering the development of breakthrough solutions. Many promising ideas remain siloed within individual teams or companies.",
        solution:
          "Build a platform or solution that fosters open collaboration, enabling cross-organizational innovation through shared resources, open data, and community-driven development.",
      },
    ],
  },
};
