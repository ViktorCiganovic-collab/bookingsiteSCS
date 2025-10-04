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
      categoryId: 1,
      courseName: "Microsoft Office Specialist",
      category: t('it_pros'),
      description: t("mos_description"),
      image: scriptingImg,
      certs: [
        { certId: 1, name: "Word 365/2019 Associate", description: t("categories.microsoft_office_specialist.certs.word_associate.description") },
        { certId: 2, name: "Excel 365/2019 Associate", description: t("categories.microsoft_office_specialist.certs.excel_associate.description") },
        { certId: 3, name: "Outlook 365/2019 Associate", description: t("categories.microsoft_office_specialist.certs.outlook_associate.description") },
        { certId: 4, name: "PowerPoint 365/2019 Associate", description: t("categories.microsoft_office_specialist.certs.powerpoint_associate.description") },
        { certId: 5, name: "Word 365/2019 Expert", description: t("categories.microsoft_office_specialist.certs.word_expert.description") },
        { certId: 6, name: "Excel 365/2019 Expert", description: t("categories.microsoft_office_specialist.certs.excel_expert.description") },
        { certId: 7, name: "Access 365/2019 Expert", description: t("categories.microsoft_office_specialist.certs.access_expert.description") }
      ]
    },
    {
      categoryId: 2,
      courseName: "Microsoft Fundamentals Certifieringar",
      category: t('it_pros'),
      description: t("fundamentals_description"),
      image: cloudImg,
      certs: [
        { certId: 8, name: "Azure Fundamentals (AZ-900)", description: t("categories.microsoft_fundamentals.certs.azure_fundamentals.description") },
        { certId: 9, name: "Azure AI Fundamentals (AI-900)", description: t("categories.microsoft_fundamentals.certs.azure_ai_fundamentals.description") },
        { certId: 10, name: "Azure Data Fundamentals (DP-900)", description: t("categories.microsoft_fundamentals.certs.azure_data_fundamentals.description") },
        { certId: 11, name: "Security, Compliance, and Identity Fundamentals (SC-900)", description: t("categories.microsoft_fundamentals.certs.security_compliance_identity.description") },
        { certId: 12, name: "Power Platform Fundamentals (PL-900)", description: t("categories.microsoft_fundamentals.certs.power_platform.description") },
        { certId: 13, name: "Microsoft 365 Fundamentals (MS-900)", description: t("categories.microsoft_fundamentals.certs.microsoft_365.description") },
        { certId: 14, name: "Dynamics 365 Fundamentals (CRM)", description: t("categories.microsoft_fundamentals.certs.dynamics_crm.description") },
        { certId: 15, name: "Dynamics 365 Fundamentals (ERP)", description: t("categories.microsoft_fundamentals.certs.dynamics_erp.description") }
      ]
    },
    {
      categoryId: 3,
      courseName: "Unity Certified User",
      category: t('it_pros'),
      description: t("unity_description"),
      image: aiImg,
      certs: [
        { certId: 16, name: "Unity Certified User: Programmering", description: t("categories.unity_certified_user.certs.programmering.description") },
        { certId: 17, name: "Unity Certified User: Artist", description: t("categories.unity_certified_user.certs.artist.description") },
        { certId: 18, name: "Unity Certified User: VR/AR Design", description: t("categories.unity_certified_user.certs.vr_ar.description") },
        { certId: 19, name: "Unity Certified User: Game Development", description: t("categories.unity_certified_user.certs.game_dev.description") }
      ]
    },
    {
      categoryId: 4,
      courseName: "Adobe Certified Professional",
      category: t('it_pros'),
      description: t("adobe_description"),
      image: webDevImg,
      certs: [
        { certId: 20, name: "Adobe After Effects", description: t("categories.adobe_certified_professional.certs.after_effects.description") },
        { certId: 21, name: "Adobe Animate", description: t("categories.adobe_certified_professional.certs.animate.description") },
        { certId: 22, name: "Adobe Dreamweaver", description: t("categories.adobe_certified_professional.certs.dreamweaver.description") },
        { certId: 23, name: "Adobe Illustrator", description: t("categories.adobe_certified_professional.certs.illustrator.description") },
        { certId: 24, name: "Adobe InDesign", description: t("categories.adobe_certified_professional.certs.indesign.description") },
        { certId: 25, name: "Adobe Photoshop", description: t("categories.adobe_certified_professional.certs.photoshop.description") },
        { certId: 26, name: "Adobe Premiere Pro", description: t("categories.adobe_certified_professional.certs.premiere_pro.description") }
      ]
    },
    {
      categoryId: 5,
      courseName: "Cisco Certified Support Technican",
      category: t('it_pros'),
      description: t("ccst_description"),
      image: networkingImg,
      certs: [
        { certId: 27, name: "CCST Networking", description: t("categories.cisco_certified_support_technician.certs.networking.description") },
        { certId: 28, name: "CCST Cybersecurity", description: t("categories.cisco_certified_support_technician.certs.cybersecurity.description") }
      ]
    },
    {
      categoryId: 6,
      courseName: "IT Specialist",
      category: t('it_pros'),
      description: t("it_specialist_description"),
      image: dataAnalysisImg,
      certs: [
        { certId: 29, name: t("ai"), description: t("categories.it_specialist.certs.ai.description") },
        { certId: 30, name: t("cloud_computing"), description: t("categories.it_specialist.certs.cloud_computing.description") },
        { certId: 31, name: t("computational_thinking"), description: t("categories.it_specialist.certs.computational_thinking.description") },
        { certId: 32, name: t("cybersecurity"), description: t("categories.it_specialist.certs.cybersecurity.description") },
        { certId: 33, name: t("data_analysis"), description: t("categories.it_specialist.certs.data_analysis.description") },
        { certId: 34, name: t("databases"), description: t("categories.it_specialist.certs.databases.description") },
        { certId: 35, name: t("device_configuration"), description: t("categories.it_specialist.certs.device_configuration.description") },
        { certId: 36, name: t("html_css"), description: t("categories.it_specialist.certs.html_css.description") },
        { certId: 37, name: t("html5_app"), description: t("categories.it_specialist.certs.html5_app.description") },
        { certId: 38, name: t("java"), description: t("categories.it_specialist.certs.java.description") },
        { certId: 39, name: t("javascript"), description: t("categories.it_specialist.certs.javascript.description") },
        { certId: 40, name: t("networking"), description: t("categories.it_specialist.certs.networking.description") },
        { certId: 41, name: t("network_security"), description: t("categories.it_specialist.certs.network_security.description") },
        { certId: 42, name: t("python"), description: t("categories.it_specialist.certs.python.description") },
        { certId: 43, name: t("software_development"), description: t("categories.it_specialist.certs.software_development.description") }
      ]
    }
  ];
};


export default Itcourses;
