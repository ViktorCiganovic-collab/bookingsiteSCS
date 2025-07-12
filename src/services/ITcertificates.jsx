import dataAnalysisImg from '../assets/ITspecialist__.png';
import aiImg from '../assets/pexels-photo-2007647.jpeg';
import cybersecurityImg from '../assets/cybersecurity.jpg';
import cloudImg from '../assets/microsoftfundamentals.png';
import webDevImg from '../assets/adobe_img.png'
import networkingImg from '../assets/cisco_certified.jpg'
import scriptingImg from '../assets/MOS-Bundle-800x800.jpg.webp';

import { useTranslation } from 'react-i18next';

const Itcourses = () => {
  const { t } = useTranslation();

  return [
    {
      courseName: "Microsoft Office Specialist",
      category: t('it_pros'),
      description: t("mos_description"),
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
      courseName: "Microsoft Fundamentals Certifieringar",
      category: t('it_pros'),
      description: t("fundamentals_description"),
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
      category: t('it_pros'),
      description: t("unity_description"),
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
      category: t('it_pros'),
      description: t("adobe_description"),
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
      courseName: "Cisco Certified Support Technican",
      category: t('it_pros'),
      description: t("ccst_description"),
      image: networkingImg,
      certs: [
        "CCST Networking",
        "CCST Cybersecurity"
      ]
    },
    {
      courseName: "IT Specialist",
      category: t('it_pros'),
      description: t("it_specialist_description"),
      image: dataAnalysisImg,
      certs: [
        t("ai"),
        t("cloud_computing"),
        t("computational_thinking"),
        t("cybersecurity"),
        t("data_analysis"),
        t("databases"),
        t("device_configuration"),
        t("html_css"),
        t("html5_app"),
        t("java"),
        t("javascript"),
        t("networking"),
        t("network_security"),
        t("python"),
        t("software_development")
      ]
    }
  ];
};

export default Itcourses;
