"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "header.emergencies": "Emergencies",
    "header.resources": "Resources",
    "header.community": "Community",
    "header.govAssistance": "Gov Assistance",
    "header.guides": "Guides",
    "header.warEmergency": "War Emergency",
    "header.aiAssistant": "AI Assistant",
    "header.signIn": "Sign In",

    // Home page
    "home.title": "आपातकालीन सहायता",
    "home.subtitle": "Emergency Response",
    "home.description":
      "Connect with your community, access government assistance, and get AI-powered emergency guidance. Designed for India's diverse emergency scenarios.",
    "home.reportEmergency": "Report Emergency",
    "home.govAssistance": "Gov Assistance",
    "home.missingPersons": "Missing Persons",
    "home.emergency": "Emergency: 108",
    "home.police": "Police: 100",
    "home.fire": "Fire: 101",

    // Buttons
    "button.findRoutes": "Find Safe Routes",
    "button.joinCommunity": "Join Community",
    "button.viewAssistance": "View Assistance",
    "button.viewGuides": "View Guides",
    "button.getDirections": "Get Directions",
    "button.getUpdates": "Get Updates",
    "button.requestThis": "Request This",
    "button.offerHelp": "Offer Help",
    "button.loadMore": "Load More",
    "button.readGuide": "Read Guide",
    "button.requestEntry": "Request Entry",

    // Emergency types
    "emergency.fire": "Fire Emergency",
    "emergency.earthquake": "Earthquake",
    "emergency.flood": "Flood",
    "emergency.medical": "Medical Emergency",
    "emergency.security": "Security Emergency",

    // Messages
    "message.noEmergencies": "No emergencies found matching your search criteria.",
    "message.requestSent": "Request sent successfully!",
    "message.entryRequested": "Entry request submitted successfully!",
    "message.discussionStarted": "Discussion started successfully!",
  },
  hi: {
    // Header
    "header.emergencies": "आपातकाल",
    "header.resources": "संसाधन",
    "header.community": "समुदाय",
    "header.govAssistance": "सरकारी सहायता",
    "header.guides": "गाइड",
    "header.warEmergency": "युद्ध आपातकाल",
    "header.aiAssistant": "AI सहायक",
    "header.signIn": "साइन इन",

    // Home page
    "home.title": "आपातकालीन सहायता",
    "home.subtitle": "Emergency Response",
    "home.description":
      "अपने समुदाय से जुड़ें, सरकारी सहायता प्राप्त करें, और AI-संचालित आपातकालीन मार्गदर्शन प्राप्त करें। भारत की विविध आपातकालीन स्थितियों के लिए डिज़ाइन किया गया।",
    "home.reportEmergency": "आपातकाल रिपोर्ट करें",
    "home.govAssistance": "सरकारी सहायता",
    "home.missingPersons": "लापता व्यक्ति",
    "home.emergency": "आपातकाल: 108",
    "home.police": "पुलिस: 100",
    "home.fire": "अग्निशमन: 101",

    // Buttons
    "button.findRoutes": "सुरक्षित मार्ग खोजें",
    "button.joinCommunity": "समुदाय में शामिल हों",
    "button.viewAssistance": "सहायता देखें",
    "button.viewGuides": "गाइड देखें",
    "button.getDirections": "दिशा निर्देश प्राप्त करें",
    "button.getUpdates": "अपडेट प्राप्त करें",
    "button.requestThis": "इसका अनुरोध करें",
    "button.offerHelp": "सहायता प्रदान करें",
    "button.loadMore": "और लोड करें",
    "button.readGuide": "गाइड पढ़ें",
    "button.requestEntry": "प्रवेश का अनुरोध करें",

    // Emergency types
    "emergency.fire": "आग की आपातकाल",
    "emergency.earthquake": "भूकंप",
    "emergency.flood": "बाढ़",
    "emergency.medical": "चिकित्सा आपातकाल",
    "emergency.security": "सुरक्षा आपातकाल",

    // Messages
    "message.noEmergencies": "आपकी खोज मानदंडों से मेल खाने वाली कोई आपातकाल नहीं मिली।",
    "message.requestSent": "अनुरोध सफलतापूर्वक भेजा गया!",
    "message.entryRequested": "प्रवेश अनुरोध सफलतापूर्वक सबमिट किया गया!",
    "message.discussionStarted": "चर्चा सफलतापूर्वक शुरू की गई!",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "hi")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
