---
sidebar_position: 1
---

# System Design Basics

- Ref: [System Design Basics | Client, Server, API, Database, Cache, Load Balancer, Monolith vs Microservice](https://www.youtube.com/watch?v=jq2XHMQwCUE) by **Mohit Chhabra**

---

## What is System Design?

**Purpose:** System design is the process of defining the architecture, components, and interactions of a system to satisfy specific requirements. It answers the question — *"How do we build a software system that works reliably at scale?"*

At a high level, system design deals with:

- How different parts of a system communicate with each other
- How data flows from the user to the server and back
- How to handle millions of users without the system crashing
- How to make sure the system stays available even when parts of it fail

### Real-time Example

Think about **YouTube** — when you open the app and tap on a video, a lot happens behind the scenes: your request travels to a server, the server fetches the video data from a database, and streams it back to your device. System design is the blueprint that makes all of this work smoothly for billions of users simultaneously.

---

## Client and Server

### What is a Client?

**Purpose:** A client is the platform or medium through which an end user interacts with a product.

- A **mobile app** (Android / iOS) running YouTube
- A **web browser** (Chrome, Safari) where you type `www.youtube.com`
- A **smart TV** app

All of these are clients — they are the *front door* through which users access a service.

### What is a Server?

**Purpose:** A server is a machine (or set of machines) that contains the business logic and processes requests from clients.

In simple terms, if you write a piece of code on your laptop that takes an input image and returns a filtered version of it — your laptop is acting as a server.

### Real-time Example — Restaurant Analogy

| Restaurant        | Technical Equivalent |
| ----------------- | -------------------- |
| You (the customer) | Client               |
| Chef               | Server               |
| Waiter             | API                  |
| Kitchen            | Database             |
| Salt/pepper nearby | Cache                |

You don't walk into the kitchen and talk to the chef directly. You tell the **waiter** what you want, the waiter relays it to the chef, and the chef prepares your order and sends it back through the waiter.

```mermaid
graph LR
    subgraph "🍽️ Restaurant Analogy"
        You["🧑 You\n(Customer)"]
        Waiter["🤵 Waiter"]
        Chef["👨‍🍳 Chef"]
    end

    You -- "I want pizza" --> Waiter
    Waiter -- "Customer wants pizza" --> Chef
    Chef -- "Pizza ready" --> Waiter
    Waiter -- "Here's your pizza" --> You

    subgraph "💻 Technical Equivalent"
        Client["📱 Client\n(App / Browser)"]
        API["🔌 API"]
        Server["🖥️ Server"]
    end

    Client -- "Request" --> API
    API -- "Forward Request" --> Server
    Server -- "Response" --> API
    API -- "Return Response" --> Client
```

---

## API — Application Programming Interface

**Purpose:** An API is the intermediary (the "waiter") that allows the client and server to communicate without the client needing to know how the server works internally.

### How it Works

1. **Client** sends a **request** to the API (e.g., "I want to watch this video")
2. The **API** forwards the request to the **server**
3. The **server** processes the request and prepares a **response**
4. The **API** sends the response back to the **client**

In technical terms, we call the input a **request** and the output a **response**.

```mermaid
sequenceDiagram
    participant C as 📱 Client
    participant A as 🔌 API
    participant S as 🖥️ Server

    C->>A: Request (e.g., "Play video XYZ")
    A->>S: Forward request
    S->>S: Process business logic
    S-->>A: Response (video data + metadata)
    A-->>C: Return response to client
```

### Real-time Example

When you click on a video thumbnail on YouTube:

1. The front-end code detects the click event
2. It fires an API request to YouTube's server with the video ID
3. The server fetches the video data and metadata
4. The API returns the video stream and details back to your browser/app

> The end user never knows an API exists — they just click a button. The front-end developers write code that triggers API calls on user interactions.

---

## Frontend and Backend

### Frontend

**Purpose:** The frontend is the user-facing part of the product — everything the user can see and interact with.

- Built using **Swift** (iOS), **Kotlin/Java** (Android), **JavaScript/HTML/CSS** (Web)
- Handles UI rendering, button clicks, navigation
- Triggers API calls when the user performs actions

### Backend

**Purpose:** The backend is the server-side logic that the user never directly interacts with. It processes requests, applies business logic, and returns results.

- Built using **Java**, **Node.js**, **Python**, **PHP**, **Go**, etc.
- Contains the core business logic (e.g., applying AI filters to an image, sorting a feed, processing payments)

### Real-time Example

Think of a **car**:

- **Frontend** = Steering wheel, brakes, dashboard — things you see and interact with
- **Backend** = Engine, transmission, braking mechanism — how things actually work under the hood

You press the brake (frontend interaction), and the car stops (backend logic). You don't need to understand hydraulic braking systems to drive.

```mermaid
graph TB
    subgraph Frontend ["🎨 Frontend (What user sees)"]
        MA["📱 Mobile App\n(Swift / Kotlin)"]
        WB["🌐 Web Browser\n(JS / HTML / CSS)"]
        TV["📺 Smart TV App"]
    end

    subgraph Backend ["⚙️ Backend (Hidden from user)"]
        SV["🖥️ Server\n(Java / Node.js / Python)"]
        BL["📋 Business Logic\n(Processing, Filters, Sorting)"]
    end

    MA -- "API Request" --> SV
    WB -- "API Request" --> SV
    TV -- "API Request" --> SV
    SV --> BL
    BL -- "API Response" --> MA
    BL -- "API Response" --> WB
    BL -- "API Response" --> TV

    style Frontend fill:#e1f5fe,stroke:#0288d1
    style Backend fill:#fff3e0,stroke:#f57c00
```

---

## Database

**Purpose:** A database is where all the data required by your application is stored persistently. Just like a kitchen stores all the raw ingredients needed to prepare dishes, a database stores all the data the server needs to generate responses.

### How it Fits in the Flow

1. Client sends a request via API
2. Server receives the request
3. Server queries the **database** to fetch the required data
4. Server processes the data (applies business logic)
5. Server sends the response back via API

### Real-time Example

On YouTube, every video, thumbnail, title, description, like count, and comment is stored in databases. When you open a channel page, the server queries the database to fetch all 277 videos and their metadata, then returns the relevant data to your client.

```mermaid
graph LR
    C["📱 Client"] -- "API Request" --> S["🖥️ Server\n(Business Logic)"]
    S -- "Query data" --> DB[("🗄️ Database\n(All Data)")]
    DB -- "Return data" --> S
    S -- "Process + Apply logic" --> S
    S -- "API Response" --> C

    style DB fill:#e8f5e9,stroke:#388e3c
```

---

## Cache

**Purpose:** A cache is a fast, temporary storage layer that holds frequently accessed data so the server doesn't have to query the slower database every time.

### Why Cache?

- **Speed**: Cache stores data in memory (RAM), which is significantly faster than disk-based database reads
- **Reduced database load**: Frequently requested data is served from cache, reducing pressure on the database
- **Trade-off**: Cache has limited storage (RAM is expensive) — only the most frequently used data is kept here

### Cache Hit vs Cache Miss

| Scenario        | What Happens                                                                 | Analogy                                              |
| --------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Cache Hit**   | Data is found in the cache → served directly, very fast                      | Salt is right in front of the chef — grab and use    |
| **Cache Miss**  | Data is NOT in the cache → fetched from database, stored in cache for next time | Salt ran out — go to kitchen, refill, then use       |

### Real-time Example

When **Ronaldo posts on Instagram**, millions of people will view it within minutes. Instead of hitting the database for every single request, Instagram caches that post. Every subsequent viewer gets it from the cache (cache hit) — making it blazing fast.

Similarly, after a **FIFA World Cup final**, the highlights video is cached because the system knows it will be accessed millions of times.

```mermaid
graph TD
    S["🖥️ Server"] -- "1. Check cache first" --> Cache["⚡ Cache\n(Fast - RAM)"]

    Cache -- "✅ Cache Hit\n(Data found!)" --> S
    Cache -- "❌ Cache Miss\n(Data not found)" --> DB[("🗄️ Database\n(Slower - Disk)")]
    DB -- "2. Fetch data" --> Cache
    Cache -- "3. Store for next time\n+ Return data" --> S

    subgraph "🧂 Restaurant Analogy"
        Chef2["👨‍🍳 Chef"]
        Salt["🧂 Salt & Pepper\n(Nearby = Cache)"]
        Kitchen["🏠 Kitchen\n(Far = Database)"]
    end

    Chef2 -. "Quick grab" .-> Salt
    Salt -. "Ran out? Refill from" .-> Kitchen

    style Cache fill:#fff9c4,stroke:#f9a825
    style DB fill:#e8f5e9,stroke:#388e3c
```

---

## Scaling — Vertical vs Horizontal

**Purpose:** Scaling is the process of increasing your system's capacity to handle growing traffic and load.

### Vertical Scaling (Scale Up)

Increase the power of your **existing** machine.

- Add more RAM (8GB → 16GB)
- Upgrade to SSD storage
- Add a better CPU or GPU

**Analogy:** You have one chef — you increase his salary so he works longer hours.

**Analogy 2:** You have a restaurant on the ground floor — you rent out the first floor in the **same building** to seat more customers.

### Horizontal Scaling (Scale Out)

Add **more machines** to distribute the load.

- Instead of one powerful server, use 5 servers working together

**Analogy:** Instead of overworking one chef, you hire 4 more chefs.

**Analogy 2:** Instead of adding floors to the same building, you open a **new restaurant in another location**.

### Comparison

| Aspect                  | Vertical Scaling                          | Horizontal Scaling                              |
| ----------------------- | ----------------------------------------- | ----------------------------------------------- |
| **Approach**            | Upgrade existing machine                  | Add more machines                               |
| **Ease**                | Simple — just upgrade hardware            | Complex — manage multiple machines              |
| **Communication**       | Fast (inter-process, local)               | Slower (network calls between machines)         |
| **Limit**               | Has a ceiling (max hardware capacity)     | Virtually unlimited                             |
| **Single Point of Failure** | Yes — one machine goes down, system is down | No — other machines continue working        |
| **Cost**                | Expensive at high end                     | More cost-effective at scale                    |

### Real-time Example

**WhatsApp** handles millions of messages daily. A single server, no matter how powerful, cannot handle that. WhatsApp uses **horizontal scaling** — hundreds of servers distributed across data centers worldwide. If one server goes down, others pick up the load seamlessly.

```mermaid
graph TB
    subgraph VS ["⬆️ Vertical Scaling (Scale Up)"]
        direction TB
        S1_before["🖥️ Server\n8GB RAM\n512GB Storage"]
        S1_after["🖥️ Server\n16GB RAM\n1TB SSD + GPU"]
        S1_before -- "Upgrade ⬆️" --> S1_after
    end

    subgraph HS ["➡️ Horizontal Scaling (Scale Out)"]
        direction LR
        S2["🖥️ Server 1"]
        S3["🖥️ Server 2"]
        S4["🖥️ Server 3"]
        S5["🖥️ Server 4"]
    end

    subgraph VSB ["🏢 Building Analogy - Vertical"]
        direction TB
        GF["Ground Floor"]
        F1["1st Floor"]
        F2["2nd Floor"]
        GF --- F1 --- F2
    end

    subgraph HSB ["🏘️ Building Analogy - Horizontal"]
        direction LR
        B1["🏢 Building 1\n(Location A)"]
        B2["🏢 Building 2\n(Location B)"]
        B3["🏢 Building 3\n(Location C)"]
    end

    style VS fill:#e3f2fd,stroke:#1565c0
    style HS fill:#fce4ec,stroke:#c62828
    style VSB fill:#e3f2fd,stroke:#1565c0
    style HSB fill:#fce4ec,stroke:#c62828
```

---

## Single Point of Failure (SPOF)

**Purpose:** A single point of failure is any component in your system where, if it fails, the **entire system goes down**. Good system design eliminates SPOFs.

### Why it Matters

- If you have only **one server** and it crashes → your entire product is offline
- If you have only **one database** and it corrupts → all your data is inaccessible

### How to Avoid SPOF

Use **horizontal scaling** and **replication**:

- Multiple servers so if one fails, others handle the traffic
- Multiple database replicas so data is never lost
- Distribute resources across **different geographic regions** so a natural disaster in one area doesn't take down the whole system

### Real-time Example

Major companies like **Netflix** deploy their servers across multiple AWS regions worldwide. If the US-East data center goes down, US-West or EU servers continue serving users. This is why Netflix rarely has a complete global outage.

```mermaid
graph TB
    subgraph SPOF ["❌ Single Point of Failure (Bad)"]
        C1["📱 Client"] --> S_one["🖥️ Single Server"]
        S_one -- "Server crashes 💥" --> Down["🚫 Entire System DOWN"]
    end

    subgraph NoSPOF ["✅ No SPOF with Horizontal Scaling (Good)"]
        C2["📱 Client"] --> LB["⚖️ Load Balancer"]
        LB --> S_a["🖥️ Server 1 ✅"]
        LB --> S_b["🖥️ Server 2 💥 Down"]
        LB --> S_c["🖥️ Server 3 ✅"]
        LB --> S_d["🖥️ Server 4 ✅"]
        S_a --> Up["✅ System keeps running!"]
        S_c --> Up
        S_d --> Up
    end

    style SPOF fill:#ffebee,stroke:#c62828
    style NoSPOF fill:#e8f5e9,stroke:#2e7d32
```

---

## Auto-Scaling

**Purpose:** Auto-scaling automatically adjusts the number of servers based on current traffic load — scaling up during peak times and scaling down during low traffic to save costs.

### How it Works

Cloud providers like **AWS**, **Google Cloud**, and **Azure** offer auto-scaling:

- During a **flash sale** on an e-commerce site, traffic spikes 10x → auto-scaling adds more servers
- At 3 AM when traffic is minimal → auto-scaling removes extra servers to reduce cost

### Real-time Example

During **Amazon Prime Day**, traffic surges massively. AWS auto-scaling detects the increased load and spins up hundreds of additional servers automatically. Once the sale ends and traffic normalizes, those extra servers are decommissioned. The business only pays for what it uses.

```mermaid
graph LR
    subgraph Normal ["📊 Normal Traffic"]
        N_LB["⚖️ Load Balancer"] --> N_S1["🖥️ Server 1"]
        N_LB --> N_S2["🖥️ Server 2"]
    end

    Normal -- "🔥 Traffic spikes!\nAuto-scaling triggers" --> Peak

    subgraph Peak ["📈 Peak Traffic (Auto-Scaled)"]
        P_LB["⚖️ Load Balancer"] --> P_S1["🖥️ Server 1"]
        P_LB --> P_S2["🖥️ Server 2"]
        P_LB --> P_S3["🖥️ Server 3 ✨ New"]
        P_LB --> P_S4["🖥️ Server 4 ✨ New"]
        P_LB --> P_S5["🖥️ Server 5 ✨ New"]
    end

    Peak -- "📉 Traffic drops\nScale down" --> Normal

    style Normal fill:#e3f2fd,stroke:#1565c0
    style Peak fill:#fff3e0,stroke:#e65100
```

---

## Load Balancer

**Purpose:** A load balancer distributes incoming API requests evenly across multiple servers so that no single server gets overwhelmed.

### Why is it Needed?

Without a load balancer, all requests might hit **Server 1** while **Server 2, 3, 4** sit idle. This defeats the purpose of horizontal scaling.

### How it Works

1. Client sends a request via API
2. The request first reaches the **load balancer**
3. The load balancer decides which server should handle this request (using algorithms like **consistent hashing**, **round-robin**, etc.)
4. The selected server processes the request and returns the response

**Analogy:** The load balancer is like a **kitchen manager** who assigns orders to chefs. The waiter (API) just tells the kitchen manager what's needed, and the kitchen manager decides which chef (server) handles it — ensuring all chefs are equally busy.

### Real-time Example

When you search on **Google**, your request hits a load balancer first. Google has thousands of servers worldwide. The load balancer routes your request to the nearest, least-loaded server — which is why Google Search responds in milliseconds regardless of how many people are searching simultaneously.

```mermaid
graph TB
    subgraph Without ["❌ Without Load Balancer"]
        C_bad["📱📱📱 All Requests"] --> S_bad1["🖥️ Server 1\n🔥 Overloaded!"]
        S_bad2["🖥️ Server 2\n😴 Idle"]
        S_bad3["🖥️ Server 3\n😴 Idle"]
    end

    subgraph With ["✅ With Load Balancer"]
        C_good["📱📱📱 All Requests"] --> LB["⚖️ Load Balancer\n(Kitchen Manager)"]
        LB -- "Request 1" --> S_good1["🖥️ Server 1\n👨‍🍳 Chef 1"]
        LB -- "Request 2" --> S_good2["🖥️ Server 2\n👨‍🍳 Chef 2"]
        LB -- "Request 3" --> S_good3["🖥️ Server 3\n👨‍🍳 Chef 3"]
    end

    style Without fill:#ffebee,stroke:#c62828
    style With fill:#e8f5e9,stroke:#2e7d32
```

```mermaid
sequenceDiagram
    participant C as 📱 Client
    participant LB as ⚖️ Load Balancer
    participant S1 as 🖥️ Server 1
    participant S2 as 🖥️ Server 2
    participant S3 as 🖥️ Server 3

    C->>LB: Request 1 (Pizza)
    LB->>S1: Assign to Server 1
    C->>LB: Request 2 (Pasta)
    LB->>S2: Assign to Server 2 (S1 busy)
    C->>LB: Request 3 (Noodles)
    LB->>S3: Assign to Server 3 (S1,S2 busy)
    S1-->>LB: Response 1 ready
    LB-->>C: Return Response 1
    S2-->>LB: Response 2 ready
    LB-->>C: Return Response 2
    S3-->>LB: Response 3 ready
    LB-->>C: Return Response 3
```

---

## Synchronous vs Asynchronous Communication

### Synchronous (Sync)

**Purpose:** The client sends a request and **waits (blocks)** until it gets a response. Nothing else can happen in the meantime.

**Analogy:** You stand in a pizza queue, place your order, and **must wait in line** until your pizza is ready. You can't leave or do anything else.

### Asynchronous (Async)

**Purpose:** The client sends a request and is **immediately free** to do other things. It gets notified when the response is ready.

**Analogy:** You place your order, receive a **token number (e.g., #20)**, and go sit down or browse your phone. When your pizza is ready, they call out "Order #20!" — you pick it up.

### Comparison

| Aspect        | Synchronous                        | Asynchronous                                 |
| ------------- | ---------------------------------- | -------------------------------------------- |
| **Client**    | Blocked, waiting                   | Free to do other tasks                       |
| **Speed**     | Slower (sequential processing)     | Faster (parallel processing possible)        |
| **Use case**  | Simple, immediate responses needed | Long-running tasks, background processing    |

### Real-time Example

When you **upload a video to YouTube**:

1. Your raw video file is uploaded (this part may feel sync — you wait for the upload bar)
2. Once uploaded, **you're free** — YouTube processes the video asynchronously in the background (encoding to multiple resolutions, copyright checks, thumbnail generation)
3. You get **notified** when processing is complete and the video is ready to publish

```mermaid
sequenceDiagram
    participant C as 📱 Client

    rect rgb(255, 235, 238)
        Note over C: ⏳ Synchronous (Blocking)
        C->>+Server: Request (Order pizza)
        Note over C: Client BLOCKED ⛔<br/>Cannot do anything...
        Server-->>-C: Response (Pizza ready)
        Note over C: Now client can proceed
    end

    rect rgb(232, 245, 233)
        Note over C: ⚡ Asynchronous (Non-blocking)
        C->>Server: Request (Order pizza)
        Note over C: Client FREE ✅<br/>Token #20 received
        Note over C: Client does other tasks...<br/>Browse phone, sit down
        Server-->>C: Notification: "Order #20 ready!"
    end
```

---

## Message Queue (e.g., Kafka, RabbitMQ)

**Purpose:** A message queue is a component that enables asynchronous processing by holding tasks in a queue until servers (consumers) are ready to process them.

### How it Works

1. Requests (messages/events) are added to the queue
2. Available servers (consumers) pick up tasks from the queue one at a time
3. Once a task is processed, it's removed from the queue
4. If all servers are busy, new tasks simply wait in the queue — no request is lost

**Analogy:** Think of a restaurant with 2 chefs and 50 orders. The orders are written on slips and placed in a queue. Each chef picks up the next slip when they finish their current dish. Customers don't wait at the counter — they gave their order and are free.

### Real-time Example

When you **send a message on WhatsApp** to someone who is offline, the message doesn't disappear. It's placed in a **message queue**. When the recipient comes online, the queue delivers the message. This is asynchronous processing powered by message queues.

```mermaid
graph LR
    subgraph Producers ["📥 Incoming Orders"]
        O1["Order 1: Pizza"]
        O2["Order 2: Pasta"]
        O3["Order 3: Noodles"]
        O4["Order 4: Burger"]
        O5["Order 5: Salad"]
    end

    subgraph Queue ["📋 Message Queue (Kafka / RabbitMQ)"]
        Q["🔄 Task Queue\n\nOrder 3 → Order 4 → Order 5\n(waiting to be picked)"]
    end

    subgraph Consumers ["👨‍🍳 Servers (Consumers)"]
        S1["🖥️ Server 1\nProcessing: Order 1"]
        S2["🖥️ Server 2\nProcessing: Order 2"]
    end

    O1 & O2 & O3 & O4 & O5 --> Q
    Q -- "Pick next task" --> S1
    Q -- "Pick next task" --> S2

    style Queue fill:#fff9c4,stroke:#f9a825
    style Consumers fill:#e8f5e9,stroke:#388e3c
```

---

## Stateful vs Stateless Architecture

### Stateful

**Purpose:** The server maintains information (state) about the client across requests. The client's requests must always go to the **same server**.

**Problem:** If that specific server goes down, the client's session/data is lost — no other server knows about this client.

**Analogy:** You always go to the same concert staff member who knows you and gives you 10% off. One day he's absent — no one else recognizes you, and you can't get in.

### Stateless

**Purpose:** The server does NOT store any client state. Instead, the client sends all necessary identification (e.g., a **JWT token**) with every request. Any server can handle any request.

**Analogy:** Instead of relying on one staff member, you get a **membership card**. You show it to any staff member at the entrance, and they verify your identity and give you the discount.

### Why Stateless is Preferred

| Aspect                | Stateful                                  | Stateless                                   |
| --------------------- | ----------------------------------------- | ------------------------------------------- |
| **Server dependency** | Request tied to a specific server         | Request can go to any server                |
| **Horizontal scaling**| Limited — sticky sessions needed          | Works seamlessly with load balancers        |
| **Fault tolerance**   | Server failure = lost client state        | Server failure = no impact, others take over|
| **Scalability**       | Hard to scale                             | Easy to scale                               |

### Real-time Example

When you browse **Amazon.com**, your authentication token (JWT) is sent with every request. Whether your request lands on Server A in Virginia or Server B in Oregon, both can verify your identity and serve your personalized page. This is stateless architecture in action.

```mermaid
graph TB
    subgraph Stateful ["❌ Stateful Architecture"]
        C_sf["📱 Client\n(You)"]
        C_sf -- "Always goes to\nthis server only" --> S_sf2["🖥️ Server 2\n✅ Knows this client\n(Stores user state)"]
        S_sf1["🖥️ Server 1\n❓ Doesn't know you"]
        S_sf3["🖥️ Server 3\n❓ Doesn't know you"]
        S_sf2 -- "💥 Goes down!" --> Problem["🚫 Client state LOST!\nNo other server can help"]
    end

    subgraph Stateless ["✅ Stateless Architecture"]
        C_sl["📱 Client\n(Sends JWT token\nwith every request)"]
        C_sl -- "Request + Token" --> LB_sl["⚖️ Load Balancer"]
        LB_sl --> S_sl1["🖥️ Server 1\n🔑 Verifies token ✅"]
        LB_sl --> S_sl2["🖥️ Server 2\n🔑 Verifies token ✅"]
        LB_sl --> S_sl3["🖥️ Server 3\n🔑 Verifies token ✅"]
        Note_sl["Any server can handle\nany request!"]
    end

    style Stateful fill:#ffebee,stroke:#c62828
    style Stateless fill:#e8f5e9,stroke:#2e7d32
```

---

## Monolithic vs Microservices Architecture

### Monolithic Architecture

**Purpose:** The entire application is built and deployed as a **single unit**. All features — authentication, user feed, profile, orders — live in one codebase and run as one process.

**Analogy:** A single large room where customers, chefs, raw materials, and reception all operate together. Everything is interconnected.

**Pros:**

- Simple to develop and deploy when the system is small
- Easy inter-module communication (everything is in-process)
- Good for startups and MVPs

**Cons:**

- A bug in one module can crash the entire system
- Deploying a small change requires redeploying the whole application
- Hard to scale individual features independently
- As the codebase grows, it becomes harder to maintain

### Microservices Architecture

**Purpose:** The application is split into small, independent services, each responsible for a specific feature. Each service can be developed, deployed, and scaled independently.

**Analogy:** The same restaurant, but now the customer area, kitchen, and storage are **separate rooms** with their own entrances. A water leak in storage doesn't affect the dining area.

**Pros:**

- Independent deployment — update one service without touching others
- Independent scaling — scale the user-feed service more than the profile service if needed
- Fault isolation — if the orders service crashes, authentication and feed still work
- Technology flexibility — different services can use different tech stacks

**Cons:**

- More complex to set up and manage
- Network communication between services adds latency
- Requires robust monitoring and orchestration

### Comparison

| Aspect              | Monolithic                              | Microservices                                |
| ------------------- | --------------------------------------- | -------------------------------------------- |
| **Deployment**      | Deploy entire app at once               | Deploy individual services independently     |
| **Scaling**         | Scale the whole app                     | Scale individual services as needed          |
| **Fault impact**    | One failure can crash everything        | Failure is isolated to one service           |
| **Complexity**      | Simple initially, complex at scale      | Complex initially, manageable at scale       |
| **Best for**        | Small apps, startups, MVPs              | Large-scale, distributed systems             |

### Real-time Example

**Netflix** started as a monolithic application. As it grew to serve 200+ million users, they migrated to microservices. Now, the **recommendation engine**, **video streaming**, **user authentication**, **billing**, and **content catalog** are all separate microservices. If the recommendation engine has a bug, you can still stream videos — the streaming service is completely independent.

```mermaid
graph TB
    subgraph Mono ["🏢 Monolithic Architecture"]
        M_ALL["Single Deployment Unit\n\n🔐 Auth\n📰 User Feed\n👤 Profile\n🛒 Orders\n💳 Payments\n\nAll tightly coupled\nin ONE codebase"]
        M_BUG["🐛 Bug in Orders?\n💥 Entire system crashes!"]
        M_ALL --> M_BUG
    end

    subgraph Micro ["🏘️ Microservices Architecture"]
        direction LR
        MS1["🔐 Auth\nService"]
        MS2["📰 Feed\nService"]
        MS3["👤 Profile\nService"]
        MS4["🛒 Orders\nService"]
        MS5["💳 Payment\nService"]
        MS4_bug["🐛 Orders down?\n✅ Others still work!"]
        MS4 --> MS4_bug
    end

    style Mono fill:#ffebee,stroke:#c62828
    style Micro fill:#e8f5e9,stroke:#2e7d32
```

---

## Putting It All Together — Request Flow in a Real System

Here's how all the components work together when you open YouTube and play a video:

```mermaid
graph TB
    User["🧑 User"] --> Client

    subgraph FE ["🎨 Frontend Layer"]
        Client["📱 Mobile App / 🌐 Web Browser"]
    end

    Client -- "API Request:\nPlay video XYZ" --> LB

    LB["⚖️ Load Balancer\nDistributes to least-loaded server"]

    LB --> S1["🖥️ Server 1"]
    LB --> S2["🖥️ Server 2"]
    LB --> S3["🖥️ Server 3"]

    subgraph BE ["⚙️ Backend Layer"]
        S1 & S2 & S3
    end

    S1 & S2 & S3 -- "Check cache first" --> Cache["⚡ Cache\n(Fast - RAM)"]
    Cache -- "✅ Hit → Return instantly" --> S1 & S2 & S3
    Cache -- "❌ Miss → Fetch" --> DB[("🗄️ Database\n(Persistent Storage)")]
    DB -- "Return data + Store in cache" --> Cache

    S1 & S2 & S3 -- "Async tasks\n(view count, analytics)" --> MQ["📋 Message Queue\n(Kafka)"]
    MQ --> Worker1["⚙️ Worker 1"]
    MQ --> Worker2["⚙️ Worker 2"]

    S1 & S2 & S3 -- "API Response:\nVideo stream + metadata" --> Client

    style FE fill:#e1f5fe,stroke:#0288d1
    style BE fill:#fff3e0,stroke:#f57c00
    style Cache fill:#fff9c4,stroke:#f9a825
    style DB fill:#e8f5e9,stroke:#388e3c
    style MQ fill:#f3e5f5,stroke:#7b1fa2
```

---

## Summary

| Concept              | One-Line Definition                                                        |
| -------------------- | -------------------------------------------------------------------------- |
| **Client**           | The platform (app/browser) through which users interact with the product   |
| **Server**           | Machine(s) running the business logic that processes requests              |
| **API**              | The intermediary that enables client-server communication                  |
| **Frontend**         | User-facing layer — what users see and interact with                       |
| **Backend**          | Server-side logic — how things actually work behind the scenes             |
| **Database**         | Persistent storage for all application data                                |
| **Cache**            | Fast temporary storage for frequently accessed data                        |
| **Vertical Scaling** | Upgrading the existing machine's resources                                 |
| **Horizontal Scaling** | Adding more machines to distribute load                                  |
| **SPOF**             | A component whose failure brings down the entire system                    |
| **Auto-Scaling**     | Automatically adjusting server count based on traffic                      |
| **Load Balancer**    | Distributes requests evenly across multiple servers                        |
| **Sync**             | Client waits (blocks) for the response                                     |
| **Async**            | Client is free after sending request; notified when response is ready      |
| **Message Queue**    | Holds tasks for async processing (e.g., Kafka, RabbitMQ)                  |
| **Stateful**         | Server stores client state — request tied to specific server               |
| **Stateless**        | Server stores no client state — any server can handle any request          |
| **Monolithic**       | Entire app as a single deployable unit                                     |
| **Microservices**    | App split into independent, separately deployable services                 |
