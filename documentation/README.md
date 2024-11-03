# Pax Digital Insurance Journey

**Tagline:** Smart Insurance Onboarding with Instant Approvals and Streamlined Back-Office Support

---

## Table of Contents

- [Pax Digital Insurance Journey](#pax-digital-insurance-journey)
  - [Table of Contents](#table-of-contents)
  - [Project Title and Description](#project-title-and-description)
  - [Our Product](#our-product)
    - [Onboarding Process](#onboarding-process)
    - [Back-Office](#back-office)
  - [Key Features](#key-features)
  - [Screenshots/Demo](#screenshotsdemo)
    - [Demo](#demo)
    - [Main Application Screenshots](#main-application-screenshots)
    - [Back Office Screenshots](#back-office-screenshots)
  - [Tech Stack and Dependencies](#tech-stack-and-dependencies)
  - [Setup and Installation Instructions](#setup-and-installation-instructions)
  - [Architecture and Technical Overview](#architecture-and-technical-overview)
  - [Challenges and Future Improvements](#challenges-and-future-improvements)
  - [Contributors](#contributors)

---

## Project Title and Description

Pax Digital Insurance Journey

This project is our submission for a hackathon, aimed at simplifying the insurance purchasing process, which currently involves multiple steps and can be time-consuming and daunting for clients. By implementing innovative digital solutions, we aim to make this process more efficient and user-friendly.

Our app features a form for inputting user data, making the process fast and efficient for the end user. The interface appears naturally as a chat, providing a more engaging experience. Additionally, we have implemented complete back-office support for accepting new applicants, all handled automatically to reduce costs and make the process more affordable.

---

## Our Product

### Onboarding Process

The challenge we aimed to solve was to make the insurance onboarding process more efficient, faster, and easier as a whole. 
We wanted the end user to be the main focus of our project, ensuring a seamless experience without unnecessary complexities like chatbots or AI-generated voices. 
In fact, statistics show that having a chatbot for insurance can negatively impact the customer experience, which led us to opt for our current solution – combining the best of both worlds.

Our solution features a fast and efficient form for data input, presented in a chat-like interface that provides a natural and engaging user experience.

### Back-Office

Not all applicants are automatically accepted into the insurance pool, as there are risks (e.g., medical conditions, smoking) that need further assessment. 
We addressed this by implementing an automatic back-office process, allowing employees to review and approve applications more efficiently.

There are certain cases that need to be considered during the back-office review:

1. **Green**: The application passes all checks automatically, and no further action is needed.
2. **Orange**: Additional information is required. The employee will see what needs to be requested and can send an automatic request via email. 
              In some cases, the insurance sum may be too high, and our algorithm proposes an alternative contract that fulfills all requirements, often by reducing the insured amount.
3. **Red**: The applicant is not accepted. However, their data is saved in our database. 

Data is saved because the situation can change over time, such as every month, allowing the weights of our algorithm to be adjusted with a visual graph that shows these weights. 
Red candidates are automatically reconsidered if they become eligible at a later point.

![Our Process](screenshots/process.jpeg)
*Our Process for arriving at the final product*

---

## Key Features

- **Fast and Efficient Form-Based Onboarding**: A form-based input method that appears as a chat for a more natural user experience.
- **Instant Quote Generation**: Users receive a price for death insurance instantly after providing basic information.
- **Streamlined Back-Office Process**: Employees can efficiently approve new applicants, reducing time and effort.
- **Personalized Insurance Recommendations**: The app recommends suitable insurance options based on user-provided information.

---

## Screenshots/Demo
### Demo

![Demo Animation](screenshots/animation.gif)
*Full application flow demonstration*

### Main Application Screenshots

![Landing Page](screenshots/screenshot1.png)
*Landing page with initial form questions*

![Chat Interface](screenshots/screenshot2.png) 
*Natural chat-like interface for data collection*

![Quote Generation](screenshots/screenshot3.png)
*Instant quote generation based on user inputs*

![Quote Generation](screenshots/screenshot4.png)
*More Data screen for checking of validity*

![Quote Generation](screenshots/screenshot5.png)
*Singature on website*

### Back Office Screenshots

![Dashboard](screenshots/screenshot7.jpeg)
*Employee dashboard showing application status overview*

![Risk Assessment](screenshots/screenshot8.jpeg)
*Leads*

![Risk Assessment](screenshots/screenshot9.jpeg)
*Risk assesement*


---

## Tech Stack and Dependencies

- **Frontend**:
  - Framework: Next.js 14
  - UI Components: Shadcn/UI (based on Radix UI primitives)
  - Animations: Framer Motion, TypeWriter Effect for typing animations
  - Styling: Tailwind CSS, CSS Modules
  - State Management: React Hooks, URL state management with nuqs, Custom store (likely Zustand based on the imports)

- **Backend**:
  - API: Next.js API Routes
  - Database: PostgreSQL with Prisma as ORM (Connection pooling enabled)
  - Type Safety: TypeScript throughout the application, Strict type checking, Prisma-generated types for database models

- **Development Tools**:
  - Package Manager: pnpm
  - Monorepo Structure: Using Turborepo
  - Apps: journey (main application), admin (back-office application)
  - Packages: @repo/ui (shared UI components), @repo/database (database layer), @repo/eslint-config, @repo/typescript-config

- **Key Features in Schema**:
  - Customer management
  - Document handling
  - Risk assessment system
  - Medical history tracking
  - Employee management
  - Multi-language support (EN, DE, FR)

- **Notable Dependencies**:
  - framer-motion for animations
  - react-signature-canvas for signature capture
  - recharts for data visualization
  - swr for data fetching
  - date-fns for date manipulation
  - Various Radix UI components for accessible UI elements

---

## Setup and Installation Instructions

To set up the project locally, follow these steps:

1. **Start PostgreSQL Server as Docker Container**:
   ```bash
   docker run --name postgres -e POSTGRES_USER=johndoe -e POSTGRES_PASSWORD=randompassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
   ```

2. **Create `.env` File**:
   Create a `.env` file in the root directory and add the following content:
   ```env
   POSTGRES_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   POSTGRES_PRISMA_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   POSTGRES_URL_NO_SSL="postgresql://johndoe:randompassword@localhost:5432/mydb"
   POSTGRES_URL_NON_POOLING="postgresql://johndoe:randompassword@localhost:5432/mydb"
   POSTGRES_USER="johndoe"
   POSTGRES_HOST="localhost"
   POSTGRES_PASSWORD="randompassword"
   POSTGRES_DATABASE="mydb"
   ```

3. **Install Dependencies**:
   ```bash
   pnpm install
   ```

4. **Generate Prisma Client**:
   ```bash
   turbo db:generate
   ```

5. **Push Prisma Schema to Database**:
   ```bash
   turbo db:push
   ```

6. **Start Development Server**:
   ```bash
   turbo dev
   ```

---

## Architecture and Technical Overview

This project is built using a modern, scalable, and type-safe architecture. The following is a technical overview of the architecture and main components:

- **Monorepo Structure**: Managed using Turborepo, with separate applications for the onboarding process (`journey`) and back-office (`admin`) to ensure modularity and scalability.
- **Full-Stack Framework**: Next.js 14 is used for both frontend and backend, enabling server-side rendering, static generation, and API route handling in a unified codebase.
- **Database Management**: PostgreSQL is used as the database, with Prisma as the ORM for efficient data modeling, type safety, and easy integration with the Next.js backend.
- **State Management**: React Hooks are used along with Zustand-based custom stores for efficient state handling across the application. URL state management is done with nuqs.
- **UI Components**: Shadcn/UI, based on Radix UI primitives, is used for building accessible and reusable components. Framer Motion and TypeWriter Effect are used to enhance the user experience with animations.
- **Shared Libraries**: Shared UI components (`@repo/ui`) and database logic (`@repo/database`) are maintained as packages to promote code reuse and consistency across different parts of the application.

---

## Challenges and Future Improvements
- We made authentication and user amanagement for the backoffice with clerk. This is because we have senesitive information. So we need this protection layer. This needed an action auth and a QueryClientProvier for react. This was hard to inject and needed a lot of word.
- For our chat and location feature, we used query parameter in the url. To make this less error prone, we used type safe query parameters in react. This was complicated, but refreshing to implement.
- We have a lot of data stored into the local storage, so the user can alwyas scroll back, scroll forward etc. The userID especially is saved in the session.
- The chat feature was hard to implement beacuse we neede the animation, preserving states for components when sliding up. This needed to feel natural.

---

## Contributors

- [Ralf Boltshauser](https://github.com/ralf-boltshauser)
- [Oliver Baumgartner](https://github.com/oiver12)
- [Robin Zweifel](https://github.com/RobinZweifel)
- [Lionel Ding](https://github.com/InTheNooB)

---
