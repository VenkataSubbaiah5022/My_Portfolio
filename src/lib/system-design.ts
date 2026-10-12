export type ArchitectureLayer = {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
};

export type SystemDesignChallenge = {
  title: string;
  body: string;
};

export type SystemDesign = {
  slug: string;
  title: string;
  subtitle: string;
  category: "production" | "product";
  relatedProjectSlug?: string;
  diagramType: "image" | "layers";
  imageSrc?: string;
  imageAlt?: string;
  layers?: ArchitectureLayer[];
  overview: string;
  flowSummary: string[];
  highlights: string[];
  challenges: SystemDesignChallenge[];
  metrics: string[];
  lessonsLearned: string[];
  stack: string[];
};

export const systemDesigns: SystemDesign[] = [
  {
    slug: "ev-fleet-operations",
    title: "EV Rental Queue & Fleet Operations",
    subtitle: "Hala Mobility · booking, deployment queues, and turnaround",
    category: "production",
    diagramType: "layers",
    layers: [
      {
        id: "surfaces",
        title: "Rider and hub surfaces",
        subtitle: "Bookings, rentals, and the executive app",
        technologies: ["Rider app", "Executive app", "Hub ops"],
      },
      {
        id: "controls",
        title: "Booking controls",
        subtitle: "Expiry, vehicle age, and geofence rules",
        technologies: ["Expiry", "Vehicle age", "Geofence"],
      },
      {
        id: "queues",
        title: "Queue and fleet",
        subtitle: "Deployment, return, fast-track, and turnaround time",
        technologies: ["Deployment", "Return", "Turnaround"],
      },
      {
        id: "service",
        title: "Service workflows",
        subtitle: "Technician visibility and live operational tracking",
        technologies: ["Service", "Tracking"],
      },
    ],
    overview:
      "A public look at the rental operations I work on at Hala Mobility: how a booking becomes a vehicle on the road, how hubs queue deployments and returns, and how service work stays visible while the bike is out. City names and product areas below are already public; internal service names and volumes are left out.",
    flowSummary: [
      "A rider books a vehicle; expiry and eligibility rules decide whether that booking can proceed",
      "Vehicle age and geofence checks keep the offered fleet inside the rules for that city and hub",
      "Deployment and return queues, including a fast-track path, manage hub turnaround",
      "Service workflows give technicians a live view of work while operations track the same vehicle",
      "The executive app covers the shift-side actions that keep hubs moving",
    ],
    highlights: [
      "Automated booking expiry so holds do not block vehicles that should return to the pool",
      "Deployment, return, and fast-track queues with turnaround-time tracking",
      "Queue operations live in Delhi and Mumbai",
      "Vehicle-age and geofence controls on what can be booked",
      "Service tracking and an executive app for hub-side work",
    ],
    challenges: [
      {
        title: "A hold should not park a vehicle",
        body: "Bookings that are never completed have to expire on their own, or the same bike stays unavailable for the next rider and the hub queue stalls.",
      },
      {
        title: "Fast-track without skipping the line blindly",
        body: "Some returns need to go back out quickly. The queue has a fast path, but normal deployments still need a predictable turnaround.",
      },
      {
        title: "Rules that differ by place",
        body: "Vehicle age and geofence limits change what a rider can book. Those checks sit in front of the queue so a hub is not handed a booking it cannot fulfill.",
      },
    ],
    metrics: [
      "40+ tasks and deployments",
      "Live in Delhi and Mumbai",
      "Booking, queue, and service flows",
      "Q2 excellence award",
    ],
    lessonsLearned: [
      "Expiry is an operations feature, not only a timer — it returns inventory to the pool.",
      "Separate the eligibility check from the queue so hubs only see bookings they can run.",
      "Turnaround time is the number hubs feel; the queue design has to make that visible.",
    ],
    stack: ["Node.js", "TypeScript", "MongoDB"],
  },
  {
    slug: "iot-telemetry-pipeline",
    title: "IoT Telemetry Ingestion Pipeline",
    subtitle: "Production platform · MQTT → Kafka → microservices → MongoDB",
    category: "production",
    diagramType: "image",
    imageSrc: "/system-design/iot-telemetry-pipeline.png",
    imageAlt:
      "Architecture diagram showing IoT devices connecting through EMQX MQTT broker, Kafka streaming, Python Flask microservices, and MongoDB storage with device management APIs",
    overview:
      "End-to-end pipeline for ingesting environmental telemetry from field devices at scale. Devices provision through a secure tooling flow, publish JSON packets over MQTT, and data flows through Kafka-backed listeners and routers into MongoDB — exposed via REST APIs for dashboards and mobile apps.",
    flowSummary: [
      "Device provisioning tool generates records, cloud config, and device credentials",
      "IoT devices authenticate via ACL/JWT and publish JSON telemetry to EMQX MQTT",
      "Device Data Listener (Python/Flask, Docker) subscribes and produces to Kafka",
      "Device Data Router consumes Kafka topics, decodes payloads, persists to MongoDB",
      "Device Management API serves list, update, telemetry, and hierarchy endpoints",
    ],
    highlights: [
      "Decoupled ingestion with Kafka between MQTT edge and persistence services",
      "Containerized Python/Flask microservices on GCP for horizontal scaling",
      "JWT/ACL-secured device connectivity with structured JSON payloads",
      "MongoDB for flexible telemetry schemas and aggregation-heavy read paths",
      "REST APIs for device list, telemetry, updates, and tree hierarchy",
    ],
    challenges: [
      {
        title: "High-throughput burst handling",
        body: "Restaurant networks generate telemetry spikes during equipment events. Kafka buffering isolates MQTT ingestion from database write pressure.",
      },
      {
        title: "Schema evolution across device generations",
        body: "Multiple sensor and gateway generations required a router layer that normalizes payloads before MongoDB persistence.",
      },
      {
        title: "Sub-100ms read paths for dashboards",
        body: "Aggregation pipeline tuning and indexing strategies on hot telemetry collections reduced operational API latency.",
      },
    ],
    metrics: [
      "19+ production microservices",
      "20+ REST APIs",
      "Sub-100ms API paths",
      "70% downtime reduction",
    ],
    lessonsLearned: [
      "Stream buffers (Kafka) are essential when edge publish rates outpace persistence throughput.",
      "Keep provisioning, ingestion, routing, and API layers as separate deployable units.",
      "Design MongoDB collections for the read patterns dashboards actually use.",
    ],
    stack: ["Python", "Flask", "Docker", "EMQX", "MQTT", "Kafka", "MongoDB", "GCP"],
  },
  {
    slug: "platform-microservices",
    title: "Multi-Product Platform Architecture",
    subtitle: "Production platform · Node.js microservices · Keycloak IAM",
    category: "production",
    diagramType: "image",
    imageSrc: "/system-design/platform-microservices.png",
    imageAlt:
      "Architecture diagram showing SuperAdmin, TempGenie, Marker, and TimeTick client apps each with dedicated Node.js APIs routing through a central User Management API, Keycloak IAM, PostgreSQL, and MongoDB",
    overview:
      "Multi-tenant SaaS platform where each product surface (operations admin, temperature monitoring, mapping, scheduling) has a dedicated Node.js/Express microservice — all unified through a central User Management API with Keycloak IAM and polyglot persistence.",
    flowSummary: [
      "Web and mobile clients connect to product-specific Node.js/Express APIs (Docker)",
      "Each product API delegates identity and user context to User Management API",
      "Keycloak IAM handles authentication; PostgreSQL stores identity realm data",
      "MongoDB stores application domain data accessed via User Management API",
      "Third-party integrations attach at the product API layer per surface",
    ],
    highlights: [
      "Product-isolated APIs with shared identity and user management",
      "Keycloak centralizes auth across SuperAdmin, TempGenie, Marker, and TimeTick",
      "Polyglot persistence: PostgreSQL for IAM, MongoDB for application data",
      "Dockerized Node.js/Express services for independent deployment",
      "Consistent API contracts across web, mobile, and third-party clients",
    ],
    challenges: [
      {
        title: "Shared auth across heterogeneous products",
        body: "Each product team ships independently, but users expect single sign-on and consistent role semantics — solved via Keycloak + User Management API gateway.",
      },
      {
        title: "Service boundary ownership",
        body: "Clear API ownership per product prevented cross-service coupling while keeping user operations centralized.",
      },
      {
        title: "Production release confidence",
        body: "80%+ Jest coverage and GitHub Actions CI/CD across services reduced regression risk during rapid iteration.",
      },
    ],
    metrics: [
      "4 product API surfaces",
      "Centralized IAM",
      "80%+ test coverage",
      "Dockerized deployments",
    ],
    lessonsLearned: [
      "A thin User Management API pays off when multiple products share identity but not domain logic.",
      "Keycloak removes auth complexity from every product service.",
      "Define API ownership boundaries early in multi-product platforms.",
    ],
    stack: [
      "Node.js",
      "Express.js",
      "Docker",
      "Keycloak",
      "MongoDB",
      "PostgreSQL",
      "TypeScript",
    ],
  },
];

export const productionSystemDesigns = systemDesigns;

export function getSystemDesign(slug: string) {
  return systemDesigns.find((design) => design.slug === slug);
}

export function getAdjacentSystemDesigns(slug: string) {
  const index = systemDesigns.findIndex((design) => design.slug === slug);
  const prev = index > 0 ? systemDesigns[index - 1]! : null;
  const next = index >= 0 && index < systemDesigns.length - 1 ? systemDesigns[index + 1]! : null;
  return { prev, next };
}

export function estimateSystemDesignReadingMinutes(design: SystemDesign) {
  const text = [
    design.overview,
    design.subtitle,
    ...design.flowSummary,
    ...design.highlights,
    ...design.challenges.map((c) => c.body),
    ...design.lessonsLearned,
  ].join(" ");
  return Math.max(4, Math.ceil(text.split(/\s+/).length / 200));
}

const metricLabels = ["Scale", "Surface area", "Performance", "Reliability", "Coverage"];

export function getSystemDesignMetricCards(design: SystemDesign) {
  return design.metrics.slice(0, 4).map((value, index) => ({
    label: metricLabels[index] ?? "Metric",
    value,
  }));
}
