import dataAnalysisImg from '../assets/data_analysis.jpg';
import devopsImg from '../assets/devops.jpg';
import aiImg from '../assets/ai.jpg';
import cybersecurityImg from '../assets/cybersecurity.jpg';
import cloudImg from '../assets/cloud.jpg';
import webDevImg from '../assets/webdev.jpg';
import networkingImg from '../assets/networking.jpg';
import scriptingImg from '../assets/scripting.jpg';
import agileImg from '../assets/agile.jpg';

const Itcourses = [
  {
    courseName: "Microsoft Office Specialist",
    category: "IT-proffs",
    description: "Certifiering som bekräftar specialistkunskaper i Microsoft Office-program. Utmärkt för både anställda och arbetsgivare att validera kompetens.",
    image: scriptingImg,
    certs: [
      "Word 365/2019 Associate",
      "Excel 365/2019 Associate",
      "Outlook 365/2019 Associate",
      "PowerPoint 365/2019 Associate",
      "Word 365/2019 Expert",
      "Excel 365/2019 Expert",
      "Access 365/2019 Expert"
    ]
  },
  {
    courseName: "Microsoft Fundamentals",
    category: "IT-proffs",
    description: "Grundläggande certifieringar inom molntjänster, AI, data och säkerhet. Perfekt för nybörjare och icke-tekniska roller som vill förstå Microsofts ekosystem.",
    image: cloudImg,
    certs: [
      "Azure Fundamentals (AZ-900)",
      "Azure AI Fundamentals (AI-900)",
      "Azure Data Fundamentals (DP-900)",
      "Security, Compliance, and Identity Fundamentals (SC-900)",
      "Power Platform Fundamentals (PL-900)",
      "Microsoft 365 Fundamentals (MS-900)",
      "Dynamics 365 Fundamentals (CRM)",
      "Dynamics 365 Fundamentals (ERP)"
    ]
  },
  {
    courseName: "Unity Certified User",
    category: "IT-proffs",
    description: "Unity-certifiering för att bevisa kunskap inom VR/AR, 3D- och spelutveckling. En perfekt startpunkt för kreativa yrkesroller inom teknik.",
    image: aiImg,
    certs: [
      "Unity Certified User: Programmering",
      "Unity Certified User: Artist",
      "Unity Certified User: VR/AR Design",
      "Unity Certified User: Game Development"
    ]
  },
  {
    courseName: "Adobe Certified Professional",
    category: "IT-proffs",
    description: "Certifiera dig i Adobe-program för att visa professionella färdigheter inom digitalt skapande, design och video.",
    image: webDevImg,
    certs: [
      "Adobe After Effects",
      "Adobe Animate",
      "Adobe Dreamweaver",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Adobe Photoshop",
      "Adobe Premiere Pro"
    ]
  },
  {
    courseName: "Cisco Certified Support Technician (CCST)",
    category: "IT-proffs",
    description: "CCST-programmet validerar arbetsklara färdigheter inom nätverk och cybersäkerhet – redo för tekniska roller från dag ett.",
    image: networkingImg,
    certs: [
      "CCST Networking",
      "CCST Cybersecurity"
    ]
  },
  {
    courseName: "IT Specialist",
    category: "IT-proffs",
    description: "IT Specialist-programmet validerar grundläggande kompetenser inom AI, moln, säkerhet, programmering och nätverk – perfekt för karriärstart inom IT.",
    image: dataAnalysisImg,
    certs: [
      "Artificiell Intelligens",
      "Molnberäkning",
      "Beräkningstänkande",
      "Cybersäkerhet",
      "Dataanalys",
      "Databaser",
      "Enhetkonfiguration och -hantering",
      "HTML och CSS",
      "HTML5 Application Development",
      "Java",
      "JavaScript",
      "Nätverk",
      "Nätverkssäkerhet",
      "Python",
      "Programvaruutveckling"
    ]
  }
];

export default Itcourses;
