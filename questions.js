// 30+ behavior-focused questions for emotional well-being assessment
// Each question has English (en) and Hindi (hi) versions

const QUESTIONS = [
    {
        id: 1,
        en: "I feel comfortable expressing my emotions to others.",
        hi: "मुझे दूसरों के सामने अपनी भावनाओं को व्यक्त करने में सहजता महसूस होती है।"
    },
    {
        id: 2,
        en: "I find it easy to relax and unwind after a stressful day.",
        hi: "तनावपूर्ण दिन के बाद मुझे आराम करना और शांत होना आसान लगता है।"
    },
    {
        id: 3,
        en: "I maintain positive relationships with people around me.",
        hi: "मैं अपने आसपास के लोगों के साथ सकारात्मक संबंध बनाए रखता/रखती हूं।"
    },
    {
        id: 4,
        en: "I feel confident in handling unexpected challenges.",
        hi: "मुझे अप्रत्याशित चुनौतियों से निपटने में आत्मविश्वास महसूस होता है।"
    },
    {
        id: 5,
        en: "I take time for activities that bring me joy.",
        hi: "मैं उन गतिविधियों के लिए समय निकालता/निकालती हूं जो मुझे खुशी देती हैं।"
    },
    {
        id: 6,
        en: "I can identify what I'm feeling in different situations.",
        hi: "मैं विभिन्न परिस्थितियों में यह पहचान सकता/सकती हूं कि मैं क्या महसूस कर रहा/रही हूं।"
    },
    {
        id: 7,
        en: "I sleep well most nights.",
        hi: "मैं अधिकतर रातों में अच्छी नींद लेता/लेती हूं।"
    },
    {
        id: 8,
        en: "I feel energized and motivated during the day.",
        hi: "मुझे दिन भर ऊर्जावान और प्रेरित महसूस होता है।"
    },
    {
        id: 9,
        en: "I can ask for help when I need it.",
        hi: "जब मुझे आवश्यकता होती है तो मैं मदद मांग सकता/सकती हूं।"
    },
    {
        id: 10,
        en: "I feel satisfied with my daily accomplishments.",
        hi: "मुझे अपनी दैनिक उपलब्धियों से संतुष्टि महसूस होती है।"
    },
    {
        id: 11,
        en: "I handle criticism constructively without feeling overly upset.",
        hi: "मैं आलोचना को रचनात्मक तरीके से संभालता/संभालती हूं बिना अत्यधिक परेशान हुए।"
    },
    {
        id: 12,
        en: "I engage in regular physical activity or exercise.",
        hi: "मैं नियमित रूप से शारीरिक गतिविधि या व्यायाम करता/करती हूं।"
    },
    {
        id: 13,
        en: "I feel hopeful about my future.",
        hi: "मुझे अपने भविष्य के बारे में आशावान महसूस होता है।"
    },
    {
        id: 14,
        en: "I can focus on tasks without being easily distracted.",
        hi: "मैं आसानी से विचलित हुए बिना कार्यों पर ध्यान केंद्रित कर सकता/सकती हूं।"
    },
    {
        id: 15,
        en: "I enjoy spending time with friends and family.",
        hi: "मुझे दोस्तों और परिवार के साथ समय बिताना अच्छा लगता है।"
    },
    {
        id: 16,
        en: "I practice self-care regularly.",
        hi: "मैं नियमित रूप से आत्म-देखभाल का अभ्यास करता/करती हूं।"
    },
    {
        id: 17,
        en: "I can manage my anger effectively.",
        hi: "मैं अपने क्रोध को प्रभावी ढंग से प्रबंधित कर सकता/सकती हूं।"
    },
    {
        id: 18,
        en: "I feel comfortable being alone with my thoughts.",
        hi: "मुझे अपने विचारों के साथ अकेले रहने में सहजता महसूस होती है।"
    },
    {
        id: 19,
        en: "I maintain a healthy work-life balance.",
        hi: "मैं एक स्वस्थ कार्य-जीवन संतुलन बनाए रखता/रखती हूं।"
    },
    {
        id: 20,
        en: "I can let go of things I cannot control.",
        hi: "मैं उन चीज़ों को जाने दे सकता/सकती हूं जिन्हें मैं नियंत्रित नहीं कर सकता/सकती।"
    },
    {
        id: 21,
        en: "I feel appreciated and valued by others.",
        hi: "मुझे दूसरों द्वारा सराहा और मूल्यवान महसूस होता है।"
    },
    {
        id: 22,
        en: "I can adapt to changes in my routine easily.",
        hi: "मैं अपनी दिनचर्या में बदलावों के अनुकूल आसानी से ढल सकता/सकती हूं।"
    },
    {
        id: 23,
        en: "I engage in hobbies or activities I'm passionate about.",
        hi: "मैं उन शौक या गतिविधियों में संलग्न रहता/रहती हूं जिनके बारे में मैं उत्साहित हूं।"
    },
    {
        id: 24,
        en: "I listen to others with empathy and understanding.",
        hi: "मैं दूसरों को सहानुभूति और समझ के साथ सुनता/सुनती हूं।"
    },
    {
        id: 25,
        en: "I feel content with who I am as a person.",
        hi: "मुझे इस बात से संतुष्टि है कि मैं एक व्यक्ति के रूप में कौन हूं।"
    },
    {
        id: 26,
        en: "I can set healthy boundaries in my relationships.",
        hi: "मैं अपने रिश्तों में स्वस्थ सीमाएं निर्धारित कर सकता/सकती हूं।"
    },
    {
        id: 27,
        en: "I practice gratitude regularly.",
        hi: "मैं नियमित रूप से कृतज्ञता का अभ्यास करता/करती हूं।"
    },
    {
        id: 28,
        en: "I can forgive myself when I make mistakes.",
        hi: "जब मैं गलतियाँ करता/करती हूं तो मैं खुद को माफ कर सकता/सकती हूं।"
    },
    {
        id: 29,
        en: "I feel connected to a sense of purpose in my life.",
        hi: "मुझे अपने जीवन में उद्देश्य की भावना से जुड़ाव महसूस होता है।"
    },
    {
        id: 30,
        en: "I can celebrate my achievements, big or small.",
        hi: "मैं अपनी उपलब्धियों का जश्न मना सकता/सकती हूं, चाहे वे बड़ी हों या छोटी।"
    },
    {
        id: 31,
        en: "I communicate my needs clearly to others.",
        hi: "मैं दूसरों को अपनी जरूरतों को स्पष्ट रूप से बताता/बताती हूं।"
    },
    {
        id: 32,
        en: "I feel safe expressing my authentic self.",
        hi: "मुझे अपने वास्तविक स्वरूप को व्यक्त करने में सुरक्षित महसूस होता है।"
    },
    {
        id: 33,
        en: "I take breaks when I feel overwhelmed.",
        hi: "जब मैं अभिभूत महसूस करता/करती हूं तो मैं विराम लेता/लेती हूं।"
    },
    {
        id: 34,
        en: "I find meaning in helping and supporting others.",
        hi: "मुझे दूसरों की मदद करने और समर्थन करने में अर्थ मिलता है।"
    },
    {
        id: 35,
        en: "I maintain a positive outlook even during difficult times.",
        hi: "कठिन समय में भी मैं एक सकारात्मक दृष्टिकोण बनाए रखता/रखती हूं।"
    }
];

// Slider labels in both languages
const SLIDER_LABELS = {
    en: {
        low: "Strongly Disagree",
        high: "Strongly Agree"
    },
    hi: {
        low: "पूर्णतः असहमत",
        high: "पूर्णतः सहमत"
    }
};

// Question counter label
const QUESTION_COUNTER = {
    en: "Question {current} of {total}",
    hi: "प्रश्न {current} में से {total}"
};
