export const EXPERIENCES = [
  {
    company: 'State Farm Insurance', role: 'Full Stack Developer', location: 'Bloomington, IL',
    start: '05/2025', end: 'Present', current: true,
    technologies: ['Java', 'Spring Boot', 'Angular', 'Microsoft Entra', 'AWS Bedrock'],
    achievements: [
      'Modernized enterprise authentication by migrating from on-prem LDAP to Microsoft Entra External ID and implementing OAuth 2.0 across React and Spring Boot microservices, eliminating legacy identity dependencies.',
      'Engineered identity workflows with Microsoft Graph API, custom attribute mapping, role-based authorization, and feature flags to preserve functional parity and strengthen access management.',
      'Built a GenAI virtual assistant with AWS Bedrock Agents, Lambda, Angular, and Node.js, integrating enterprise APIs to automate workflows, streamline employee support, and reduce manual effort.'
    ]
  },
  {
    company: 'Community Dreams Foundation', role: 'Software Engineer', location: 'Tampa, FL',
    start: '06/2024', end: '04/2025', current: false,
    technologies: ['Spring Boot', 'PostgreSQL', 'REST APIs', 'JWT', 'Jira'],
    achievements: [
      'Optimized Spring Boot services and PostgreSQL queries, improving course-data processing efficiency and accelerating e-learning platform response times by 25%.',
      'Secured REST APIs with JWT authentication, strengthening input validation and session integrity while improving platform security and reliability by 30%.',
      'Streamlined Jira-based incident resolution, service requests, and performance tracking to support production operations, reliable systems, and faster issue management.'
    ]
  },
  {
    company: 'Jabil', role: 'Financial Systems Developer', location: 'St. Petersburg, FL',
    start: '05/2023', end: '05/2024', current: false,
    technologies: ['.NET', 'Entity Framework', 'React', 'SQL', 'AWS'],
    achievements: [
      'Developed and supported a financial operations application used by global finance teams across multiple sites, ensuring reliable transaction processing and reporting.',
      'Built .NET APIs with Entity Framework for data synchronization, paired with React interfaces and optimized SQL procedures to improve platform performance by 45%.',
      'Automated intercompany financial calculations and reporting workflows, eliminating more than 70 staff-hours of manual effort each month.'
    ]
  },
  {
    company: 'Cognizant Technology Solutions', role: 'Programming Analyst', location: 'Hyderabad, TG',
    start: '07/2021', end: '07/2022', current: false,
    technologies: ['REST APIs', 'React', 'AWS', 'SQL', 'JUnit'],
    achievements: [
      'Transitioned MetLife SOAP APIs to REST and optimized SQL procedures, increasing data-processing efficiency and delivering a more responsive end-user experience.',
      'Implemented React components for HTTP-based data retrieval and input validation, improving client-side usability and supporting reliable server integration.',
      'Applied test-driven development with JUnit and JMockit, achieving 90% code coverage and improving system stability by 15%.'
    ]
  }
];
