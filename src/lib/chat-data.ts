export interface ChatQA {
  keywords: string[];
  answer: {
    engineer: string;
    executive: string;
  };
}

export const chatData: ChatQA[] = [
  {
    keywords: ["who", "omar", "background", "about"],
    answer: {
      engineer: "I'm a Software Engineer focused on backend systems, Java/Node.js, and AI-augmented workflows.",
      executive: "I'm a Techno-Functional professional bridging software architecture with strategic business management."
    }
  },
  {
    keywords: ["sap", "s4hana", "certification", "business"],
    answer: {
      engineer: "I hold SAP S/4HANA certifications in Business Process Integration and SAP Activate, focusing on system implementation.",
      executive: "I am SAP certified in S/4HANA, specializing in aligning ERP systems with organizational business processes."
    }
  },
  {
    keywords: ["skills", "tech", "stack", "languages"],
    answer: {
      engineer: "My stack includes Java, Node.js, React, Nuxt 3, PostgreSQL, and professional AI Prompt Engineering.",
      executive: "I leverage a modern tech stack (Java/Node/React) to deliver high-ROI business solutions and automated workflows."
    }
  },
  {
    keywords: ["contact", "hire", "email", "phone"],
    answer: {
      engineer: "You can reach me at omermohammedabbas99@gmail.com or call +964 773-514-3788.",
      executive: "I'm open to opportunities! Contact me at omermohammedabbas99@gmail.com to discuss how I can add value to your organization."
    }
  },
  {
    keywords: ["location", "iraq", "remote"],
    answer: {
      engineer: "Based in Iraq, available for remote or hybrid work worldwide.",
      executive: "I am based in Iraq and fully equipped for remote international collaboration."
    }
  }
];
