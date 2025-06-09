import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured")
    }

    // Use the correct Gemini model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an expert emergency response AI assistant specifically designed for India. A user has asked: "${message}"

Please provide comprehensive, India-specific guidance including:

1. **Immediate Safety Instructions** - What to do right now for safety
2. **Indian Emergency Contacts** - Relevant numbers (108-Emergency, 100-Police, 101-Fire, 1078-NDRF)
3. **Step-by-Step Action Plan** - Clear, numbered steps to follow
4. **Government Resources** - Which Indian agencies can help (NDRF, District Collector, State Emergency Response, etc.)
5. **Local Context** - Consider Indian conditions, infrastructure, and cultural factors
6. **Alternative Options** - Backup plans if primary options aren't available
7. **Long-term Guidance** - What to do after immediate crisis is handled

For emergency situations, prioritize:
- Life safety first
- Contacting appropriate Indian emergency services
- Following official government guidance
- Community support and resources
- Cultural and regional considerations for India

If this is about natural disasters, consider India's monsoons, earthquakes, cyclones, floods, etc.
If this is about conflicts or security, consider India's border areas and security protocols.
If this is about medical emergencies, consider India's healthcare system and AIIMS network.

Provide practical, actionable advice that works in the Indian context. Include relevant phone numbers, government agencies, and local resources.

Format your response clearly with headers and bullet points for easy reading during emergencies.

Keep responses concise but comprehensive, focusing on actionable steps the user can take immediately.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Analyze the emergency type and severity with a separate request
    const analysisPrompt = `Based on this user query: "${message}"

Analyze and respond with a JSON object only:
{
  "emergencyType": "Fire|Medical|Natural Disaster|Security|Infrastructure|General Emergency",
  "severity": "low|medium|high|critical",
  "shouldSaveEmergency": true,
  "emergencyTitle": "Brief title for this emergency",
  "emergencyDescription": "Brief description",
  "location": null
}

Only respond with the JSON object, no other text.`

    let analysisData
    try {
      const analysisResult = await model.generateContent(analysisPrompt)
      const analysisResponse = await analysisResult.response
      const analysisText = analysisResponse.text()

      // Clean the response to extract JSON
      const cleanedText = analysisText.replace(/```json|```/g, "").trim()
      analysisData = JSON.parse(cleanedText)
    } catch (analysisError) {
      console.warn("Analysis failed, using defaults:", analysisError)
      analysisData = {
        emergencyType: "General Emergency",
        severity: "medium",
        shouldSaveEmergency: false,
        emergencyTitle: "Emergency Situation",
        emergencyDescription: message,
        location: null,
      }
    }

    return NextResponse.json({
      response: text,
      ...analysisData,
    })
  } catch (error) {
    console.error("AI Assistant error:", error)

    // Enhanced fallback response when API fails
    const lowerMessage = (await request.json()).message.toLowerCase()
    let fallbackResponse = ""
    let emergencyType = "General Emergency"
    let severity = "medium"

    if (lowerMessage.includes("fire") || lowerMessage.includes("burning") || lowerMessage.includes("smoke")) {
      fallbackResponse = `🔥 **FIRE EMERGENCY - IMMEDIATE ACTIONS (INDIA):**

**1. GET OUT IMMEDIATELY**
- Stay low to avoid smoke
- Feel doors before opening (if hot, find another way)
- Close doors behind you to slow fire spread

**2. CALL FOR HELP**
- Fire Services: **101**
- Emergency Services: **108**
- Police: **100**

**3. EVACUATION**
- Use stairs, never elevators
- If trapped, signal for help from windows
- Meet at designated safe area

**4. INDIAN FIRE SAFETY RESOURCES:**
- Contact local Fire Station
- Delhi Fire Service: 011-101
- Mumbai Fire Brigade: 022-101
- State Disaster Management Authority

**IMPORTANT:** Stay away from building until fire brigade declares it safe.`
      emergencyType = "Fire Emergency"
      severity = "critical"
    } else if (lowerMessage.includes("earthquake") || lowerMessage.includes("shaking")) {
      fallbackResponse = `🌍 **EARTHQUAKE - IMMEDIATE ACTIONS (INDIA):**

**1. DURING SHAKING**
- DROP to hands and knees
- COVER head and neck under sturdy table
- HOLD ON to shelter

**2. AFTER EARTHQUAKE**
- Check for injuries and hazards
- Turn off gas if you smell leaks
- Be prepared for aftershocks

**3. INDIAN EMERGENCY CONTACTS:**
- NDRF: **1078**
- Emergency: **108**
- Police: **100**
- State Emergency Response Force

**4. RESOURCES:**
- Contact District Collector office
- Monitor DD News for updates
- Follow @ndmaindia on social media

**EARTHQUAKE ZONES:** India has 5 seismic zones - follow local building codes.`
      emergencyType = "Natural Disaster"
      severity = "critical"
    } else if (lowerMessage.includes("medical") || lowerMessage.includes("health") || lowerMessage.includes("injury")) {
      fallbackResponse = `🏥 **MEDICAL EMERGENCY (INDIA):**

**1. IMMEDIATE ACTIONS**
- Call **108** for ambulance
- Provide first aid if trained
- Keep patient calm and comfortable

**2. INDIAN MEDICAL SERVICES:**
- Emergency: **108**
- AIIMS Emergency: 011-26588500
- Apollo Emergency: 1066
- Fortis Emergency: 102

**3. GOVERNMENT HOSPITALS:**
- Contact nearest Primary Health Center
- District Hospital emergency ward
- Medical College hospitals

**4. INSURANCE & DOCUMENTS:**
- Keep Aadhaar card ready
- Health insurance details
- Previous medical records

**AYUSHMAN BHARAT:** Free treatment available at empaneled hospitals.`
      emergencyType = "Medical Emergency"
      severity = "high"
    } else {
      fallbackResponse = `🚨 **EMERGENCY ASSISTANCE (INDIA)**

**IMMEDIATE HELP:**
- Emergency Services: **108**
- Police: **100**
- Fire: **101**
- NDRF: **1078**

**GOVERNMENT RESOURCES:**
- District Collector Office
- State Emergency Response Force
- Local Police Station
- Primary Health Center

**FOR SPECIFIC HELP:**
- Describe your emergency situation
- Mention your location
- State immediate dangers

**NATIONAL HELPLINES:**
- Women Helpline: **1091**
- Child Helpline: **1098**
- Senior Citizen: **1291**
- Tourist Helpline: **1363**

I can provide specific guidance once you describe your emergency situation in detail.`
    }

    return NextResponse.json({
      response: fallbackResponse,
      emergencyType: emergencyType,
      severity: severity,
      shouldSaveEmergency: severity === "critical",
      emergencyTitle: severity === "critical" ? `${emergencyType} Reported` : null,
      emergencyDescription: severity === "critical" ? message : null,
      location: null,
    })
  }
}
