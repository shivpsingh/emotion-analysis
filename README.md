# Emotion Analysis Web App

A compassionate, browser-based tool to help understand your emotional well-being. This application uses behavior-focused questions and AI-powered insights to provide supportive feedback about your emotional health.

## ✨ Features

- **Privacy-First**: All data is processed locally. Your API key is never shared or stored on any server.
- **Bilingual Support**: Full support for English and Hindi (हिंदी) languages
- **35 Thoughtful Questions**: Carefully crafted behavior-focused questions covering various aspects of emotional well-being
- **AI-Powered Insights**: Uses OpenAI to generate compassionate, non-judgmental feedback
- **Safe & Supportive**: Automatically filters out diagnostic or judgmental language
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Installation Required**: Runs entirely in your web browser

## 🚀 Live Demo

Visit the live application: [https://shivpsingh.github.io/emotion-analysis/](https://shivpsingh.github.io/emotion-analysis/)

## 📋 How to Use

1. **Enter Your API Credentials**
   - Provide your OpenAI API Base URL (default: `https://api.openai.com/v1`)
   - Enter your OpenAI API Key (starts with `sk-...`)
   - Your API key is stored only in your browser's memory and never sent anywhere except to OpenAI

2. **Choose Your Language**
   - Select either English or हिंदी based on your preference

3. **Answer the Questions**
   - You'll be presented with 35 questions about your emotional well-being
   - Use the slider to rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)
   - Navigate freely between questions using Back/Next buttons
   - Your answers are automatically saved as you progress

4. **Review Your Insights**
   - After completing all questions, the app analyzes your responses
   - You'll receive personalized insights including:
     - Emotional well-being summary
     - Your strengths and positive patterns
     - Areas where additional support might be helpful
     - Practical wellness tips

5. **Start Over**
   - You can restart the assessment at any time

## 🔧 Setup for Development

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/shivpsingh/emotion-analysis.git
   cd emotion-analysis
   ```

2. Serve the files using any HTTP server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

### GitHub Pages Deployment

This app is already configured for GitHub Pages. To deploy:

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch you want to deploy (usually `main` or `master`)
4. Click "Save"
5. Your app will be available at `https://[your-username].github.io/emotion-analysis/`

## 🔑 Getting an OpenAI API Key

1. Visit [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and use it in the application

**Note**: API usage will incur costs based on OpenAI's pricing. Each assessment typically uses a small amount of tokens.

## 🛡️ Privacy & Security

- **No Server-Side Storage**: This app runs entirely in your browser
- **No Data Collection**: We don't collect, store, or transmit your responses anywhere except to OpenAI for analysis
- **Local Processing**: All question navigation and answer storage happens in your browser's memory
- **Secure Communication**: API calls to OpenAI use HTTPS encryption
- **API Key Safety**: Your API key is only stored in browser memory during your session

## 🧠 About the Questions

The 35 questions are designed to assess various aspects of emotional well-being, including:

- Emotional expression and awareness
- Stress management and relaxation
- Social connections and relationships
- Self-care and personal boundaries
- Motivation and life satisfaction
- Resilience and adaptability
- Self-compassion and gratitude

These questions are for self-reflection purposes only and do not constitute a clinical assessment.

## ⚠️ Important Disclaimer

This tool is designed for self-reflection and personal growth. It is **NOT** a substitute for professional mental health care. If you're experiencing serious emotional difficulties, please:

- Reach out to a licensed mental health professional
- Contact a crisis helpline in your area
- Talk to your doctor or healthcare provider

**Emergency Resources**:
- International: [Find a helpline](https://findahelpline.com/)
- US: National Suicide Prevention Lifeline: 988
- India: AASRA: +91-22-27546669

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom properties and animations
- **Vanilla JavaScript**: No frameworks or libraries required
- **OpenAI API**: GPT-3.5-turbo for generating insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with 💙 for emotional well-being**