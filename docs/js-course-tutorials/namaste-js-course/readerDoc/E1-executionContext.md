---
sidebar_position: 1
---

# E1 - How JS Works 🔥 & Execution Context

> Understanding how JavaScript works behind the scenes, inside the JS Engine will make you a better developer. This covers details about Execution Context Creation and its 2 phases: The memory Allocation Phase and the Code Execution phase. Is Javascript Single-threaded or multi-threaded? Is JS Synchronous or asynchronous?

- **Everything in Javascript, happens inside an <mark>Execution Context</mark>**
  ![alt text](images/jxw0se23.hpx.png)
- Execution Context is like big box or container
- Execution Context has 2 major components

  - **<mark>Memory</mark>** - where all JS variables, functions stored as key, value pair and used to call as **<mark>Variable Environment</mark>**
  - **<mark>Code</mark>** - all code executed in code component, executed line by line, one line at a time, calling as **<mark>Thread of Execution</mark>**
    ![alt text](images/e12rx5o3.rha.png)

- JS is **<mark>Single Threaded</mark>**, since JS executed one command at a time only once with **<mark>Synchronously</mark>** (orderly from top one by one)
  ![alt text](images/sed4lh4y.glp.png)
