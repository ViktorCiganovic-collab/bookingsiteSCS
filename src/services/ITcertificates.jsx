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
        {
          name: "Word 365/2019 Associate",
          description: t("categories.microsoft_office_specialist.certs.word_associate.description")
        },
        {
          name: "Excel 365/2019 Associate",
          description: t("categories.microsoft_office_specialist.certs.excel_associate.description")
        },
        {
          name: "Outlook 365/2019 Associate",
          description: t("categories.microsoft_office_specialist.certs.outlook_associate.description")
        },
        {
          name: "PowerPoint 365/2019 Associate",
          description: t("categories.microsoft_office_specialist.certs.powerpoint_associate.description")
        },
        {
          name: "Word 365/2019 Expert",
          description: t("categories.microsoft_office_specialist.certs.word_expert.description")
        },
        {
          name: "Excel 365/2019 Expert",
          description: t("categories.microsoft_office_specialist.certs.excel_expert.description")
        },
        {
          name: "Access 365/2019 Expert",
          description: t("categories.microsoft_office_specialist.certs.access_expert.description")
        }
      ]
    },
    {
      categoryId: 2,
      courseName: "Microsoft Fundamentals Certifieringar",
      category: t('it_pros'),
      description: t("fundamentals_description"),
      image: cloudImg,
      certs: [
        {
          name: "Azure Fundamentals (AZ-900)",
          description: t("categories.microsoft_fundamentals.certs.azure_fundamentals.description")
        },
        {
          name: "Azure AI Fundamentals (AI-900)",
          description: t("categories.microsoft_fundamentals.certs.azure_ai_fundamentals.description")
        },
        {
          name: "Azure Data Fundamentals (DP-900)",
          description: t("categories.microsoft_fundamentals.certs.azure_data_fundamentals.description")
        },
        {
          name: "Security, Compliance, and Identity Fundamentals (SC-900)",
          description: t("categories.microsoft_fundamentals.certs.security_compliance_identity.description")
        },
        {
          name: "Power Platform Fundamentals (PL-900)",
          description: t("categories.microsoft_fundamentals.certs.power_platform.description")
        },
        {
          name: "Microsoft 365 Fundamentals (MS-900)",
          description: t("categories.microsoft_fundamentals.certs.microsoft_365.description")
        },
        {
          name: "Dynamics 365 Fundamentals (CRM)",
          description: t("categories.microsoft_fundamentals.certs.dynamics_crm.description")
        },
        {
          name: "Dynamics 365 Fundamentals (ERP)",
          description: t("categories.microsoft_fundamentals.certs.dynamics_erp.description")
        }
      ]
    },
    {
      categoryId: 3,
      courseName: "Unity Certified User",
      category: t('it_pros'),
      description: t("unity_description"),
      image: aiImg,
      certs: [
        {
          name: "Unity Certified User: Programmering",
          description: t("categories.unity_certified_user.certs.programmering.description")
        },
        {
          name: "Unity Certified User: Artist",
          description: t("categories.unity_certified_user.certs.artist.description")
        },
        {
          name: "Unity Certified User: VR/AR Design",
          description: t("categories.unity_certified_user.certs.vr_ar.description")
        },
        {
          name: "Unity Certified User: Game Development",
          description: t("categories.unity_certified_user.certs.game_dev.description")
        }
      ]
    },
    {
      categoryId: 4,
      courseName: "Adobe Certified Professional",
      category: t('it_pros'),
      description: t("adobe_description"),
      image: webDevImg,
      certs: [
        {
          name: "Adobe After Effects",
          description: t("categories.adobe_certified_professional.certs.after_effects.description")
        },
        {
          name: "Adobe Animate",
          description: t("categories.adobe_certified_professional.certs.animate.description")
        },
        {
          name: "Adobe Dreamweaver",
          description: t("categories.adobe_certified_professional.certs.dreamweaver.description")
        },
        {
          name: "Adobe Illustrator",
          description: t("categories.adobe_certified_professional.certs.illustrator.description")
        },
        {
          name: "Adobe InDesign",
          description: t("categories.adobe_certified_professional.certs.indesign.description")
        },
        {
          name: "Adobe Photoshop",
          description: t("categories.adobe_certified_professional.certs.photoshop.description")
        },
        {
          name: "Adobe Premiere Pro",
          description: t("categories.adobe_certified_professional.certs.premiere_pro.description")
        }
      ]
    },
    {
      categoryId: 5,
      courseName: "Cisco Certified Support Technican",
      category: t('it_pros'),
      description: t("ccst_description"),
      image: networkingImg,
      certs: [
        {
          name: "CCST Networking",
          description: t("categories.cisco_certified_support_technician.certs.networking.description")
        },
        {
          name: "CCST Cybersecurity",
          description: t("categories.cisco_certified_support_technician.certs.cybersecurity.description")
        }
      ]
    },
    {
      categoryId: 6,
      courseName: "IT Specialist",
      category: t('it_pros'),
      description: t("it_specialist_description"),
      image: dataAnalysisImg,
      certs: [
        {
          name: t("ai"),
          description: t("categories.it_specialist.certs.ai.description")
        },
        {
          name: t("cloud_computing"),
          description: t("categories.it_specialist.certs.cloud_computing.description")
        },
        {
          name: t("computational_thinking"),
          description: t("categories.it_specialist.certs.computational_thinking.description")
        },
        {
          name: t("cybersecurity"),
          description: t("categories.it_specialist.certs.cybersecurity.description")
        },
        {
          name: t("data_analysis"),
          description: t("categories.it_specialist.certs.data_analysis.description")
        },
        {
          name: t("databases"),
          description: t("categories.it_specialist.certs.databases.description")
        },
        {
          name: t("device_configuration"),
          description: t("categories.it_specialist.certs.device_configuration.description")
        },
        {
          name: t("html_css"),
          description: t("categories.it_specialist.certs.html_css.description")
        },
        {
          name: t("html5_app"),
          description: t("categories.it_specialist.certs.html5_app.description")
        },
        {
          name: t("java"),
          description: t("categories.it_specialist.certs.java.description")
        },
        {
          name: t("javascript"),
          description: t("categories.it_specialist.certs.javascript.description")
        },
        {
          name: t("networking"),
          description: t("categories.it_specialist.certs.networking.description")
        },
        {
          name: t("network_security"),
          description: t("categories.it_specialist.certs.network_security.description")
        },
        {
          name: t("python"),
          description: t("categories.it_specialist.certs.python.description")
        },
        {
          name: t("software_development"),
          description: t("categories.it_specialist.certs.software_development.description")
        }
      ]
    }
  ];
};

export default Itcourses;
