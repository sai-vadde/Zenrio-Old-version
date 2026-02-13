"use client";

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    items: [
      "Custom Website Development",
      "WordPress Development",
      "E-Commerce Website",
      "Web Application Development",
    ],
  },
  {
    title: "UI/UX Design",
    items: [
      "Website and App UI/UX Design",
      "Wireframing and Prototyping",
      "Brand Identity and Logo Design",
      "Design System Development",
    ],
  },
  {
    title: "Software Development",
    items: [
      "Custom ERP & CRM Solutions",
      "Inventory, HR, Billing & POS Software",
      "API Integration and Backend Systems",
    ],
  },
  {
    title: "Mobile App Development",
    items: [
      "Android & iOS App Development",
      "Cross-Platform Apps (Flutter, React Native)",
      "App UI/UX Design & Deployment",
    ],
  },
  {
    title: "Cloud Solutions",
    items: [
      "Cloud Hosting & Migration",
      "AWS, Google Cloud & Azure Integration",
      "DevOps & CI/CD Services",
      "Cloud Security & Optimization",
    ],
  },
  {
    title: "AI & Automation Solutions",
    items: [
      "Chatbot Integration",
      "Machine Learning Models",
      "Process Automation (RPA)",
      "AI-Powered Analytics Dashboards",
    ],
  },
   {
    title: "IT Consulting & Strategy",
    items: [
      "Digital Transformation Consulting",
      "System Architecture & Tech Stack Guidance",
      "Startup Tech Advisory & MVP Planning",
    ],
  },
   {
    title: "Maintenance & Support",
    items: [
      "Ongoing Website & App Maintenance",
      "Bug Fixing,Backup,and Security Updates",
      "Technical Support",
    ],
  },
   {
    title: "Digital Marketing",
    items: [
      "SEO (Search Engine Optimization)",
      "Google Ads & Social Media Marketing",
      "Content Strategy & Branding",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-10 py-20 pt-32">

        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-black">
            Our Services
          </h1>

          <p className="mt-4 text-gray-600 max-w-xl">
            We provide end-to-end digital solutions to help businesses grow,
            innovate, and succeed in a competitive world.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-black text-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4">
                {service.title}
              </h2>

              <ul className="space-y-2 text-gray-300 text-sm">
                {service.items.map((item, idx) => (
                  <li key={idx}>▪ {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

      </main>
    </>
  );
}

