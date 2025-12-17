// Main Application Logic
class EmotionAnalysisApp {
    constructor() {
        this.currentPage = 'config-page';
        this.language = 'en';
        this.apiKey = '';
        this.baseURL = 'https://api.openai.com/v1';
        this.currentQuestionIndex = 0;
        this.answers = new Array(QUESTIONS.length).fill(3); // Default to middle value
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Config page listeners
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLanguageChange(e));
        });

        document.getElementById('start-btn').addEventListener('click', () => this.startAssessment());

        // Question page listeners
        document.getElementById('answer-slider').addEventListener('input', (e) => {
            document.getElementById('slider-value').textContent = e.target.value;
        });

        document.getElementById('back-btn').addEventListener('click', () => this.navigateQuestion(-1));
        document.getElementById('next-btn').addEventListener('click', () => this.navigateQuestion(1));

        // Results page listeners
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }

    handleLanguageChange(e) {
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.language = e.target.dataset.lang;
        
        // Update slider labels if on questions page
        if (this.currentPage === 'questions-page') {
            this.updateSliderLabels();
        }
    }

    validateConfig() {
        const baseURL = document.getElementById('openai-base-url').value.trim();
        const apiKey = document.getElementById('api-key').value.trim();

        if (!baseURL) {
            alert('Please enter the OpenAI Base URL');
            return false;
        }

        if (!apiKey) {
            alert('Please enter your API Key');
            return false;
        }

        this.baseURL = baseURL;
        this.apiKey = apiKey;
        return true;
    }

    startAssessment() {
        if (!this.validateConfig()) {
            return;
        }

        this.currentQuestionIndex = 0;
        this.showPage('questions-page');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = QUESTIONS[this.currentQuestionIndex];
        const questionText = question[this.language];
        
        // Update question number
        const counterTemplate = QUESTION_COUNTER[this.language];
        const counterText = counterTemplate
            .replace('{current}', this.currentQuestionIndex + 1)
            .replace('{total}', QUESTIONS.length);
        document.getElementById('question-number').textContent = counterText;
        
        // Update question text
        document.getElementById('question-text').textContent = questionText;
        
        // Update slider labels
        this.updateSliderLabels();
        
        // Set slider to saved answer
        const slider = document.getElementById('answer-slider');
        slider.value = this.answers[this.currentQuestionIndex];
        document.getElementById('slider-value').textContent = this.answers[this.currentQuestionIndex];
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / QUESTIONS.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Update button states
        document.getElementById('back-btn').disabled = this.currentQuestionIndex === 0;
        
        const nextBtn = document.getElementById('next-btn');
        if (this.currentQuestionIndex === QUESTIONS.length - 1) {
            nextBtn.textContent = this.language === 'en' ? 'Finish' : 'समाप्त करें';
        } else {
            nextBtn.textContent = this.language === 'en' ? 'Next' : 'अगला';
        }
    }

    updateSliderLabels() {
        const labels = SLIDER_LABELS[this.language];
        document.getElementById('label-low').textContent = labels.low;
        document.getElementById('label-high').textContent = labels.high;
    }

    navigateQuestion(direction) {
        // Save current answer
        const currentValue = document.getElementById('answer-slider').value;
        this.answers[this.currentQuestionIndex] = parseInt(currentValue);
        
        if (direction > 0 && this.currentQuestionIndex === QUESTIONS.length - 1) {
            // Finish assessment
            this.finishAssessment();
            return;
        }
        
        // Navigate to next/previous question
        this.currentQuestionIndex += direction;
        
        if (this.currentQuestionIndex < 0) {
            this.currentQuestionIndex = 0;
        } else if (this.currentQuestionIndex >= QUESTIONS.length) {
            this.currentQuestionIndex = QUESTIONS.length - 1;
        }
        
        this.displayQuestion();
    }

    async finishAssessment() {
        // Save final answer
        const currentValue = document.getElementById('answer-slider').value;
        this.answers[this.currentQuestionIndex] = parseInt(currentValue);
        
        // Show loading page
        this.showPage('loading-page');
        
        try {
            // Get AI insights
            const insights = await this.getAIInsights();
            
            // Display results
            this.displayResults(insights);
        } catch (error) {
            console.error('Error getting insights:', error);
            alert('An error occurred while analyzing your responses. Please try again.');
            this.showPage('questions-page');
        }
    }

    async getAIInsights() {
        // Prepare the data for OpenAI
        const questionsAndAnswers = QUESTIONS.map((q, index) => {
            return `Q${index + 1}: ${q.en} - Response: ${this.answers[index]}/5`;
        }).join('\n');

        const prompt = `You are a compassionate emotional wellness assistant. A person has completed a self-assessment questionnaire about their emotional well-being. Each question was answered on a scale of 1-5 (1=Strongly Disagree, 5=Strongly Agree).

Here are their responses:

${questionsAndAnswers}

Please provide empathetic, supportive insights in the following format:

1. EMOTIONAL SUMMARY: A warm, non-judgmental summary of their overall emotional well-being (2-3 sentences)

2. STRENGTHS: List 3-4 specific positive patterns or strengths you observe from their responses

3. AREAS OF SUPPORT: List 3-4 gentle suggestions for areas where they might benefit from additional support or self-care practices

4. WELLNESS TIPS: Provide 4-5 practical, actionable tips they can implement to enhance their emotional well-being

IMPORTANT GUIDELINES:
- Be warm, supportive, and encouraging
- Avoid any diagnostic language or clinical terms
- Do not use words like "disorder," "condition," "symptoms," "diagnosis," or "treatment"
- Focus on strengths and growth opportunities
- Use person-first, empowering language
- Keep the tone conversational and compassionate
- Emphasize that everyone experiences emotional ups and downs
- Encourage self-compassion and seeking support when needed`;

        const response = await fetch(`${this.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a compassionate emotional wellness assistant who provides supportive, non-judgmental insights. You never diagnose or use clinical language. You focus on strengths and gentle support.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Filter and sanitize the response
        return this.sanitizeResponse(aiResponse);
    }

    sanitizeResponse(response) {
        // Map of terms to filter and their safer alternatives
        const replacements = {
            'disorder': 'pattern',
            'disorders': 'patterns',
            'diagnosis': 'observation',
            'diagnose': 'observe',
            'diagnosed': 'observed',
            'symptom': 'sign',
            'symptoms': 'signs',
            'condition': 'experience',
            'conditions': 'experiences',
            'treatment': 'support',
            'treatments': 'support options',
            'therapy': 'counseling',
            'therapist': 'counselor',
            'patient': 'person',
            'patients': 'people',
            'abnormal': 'different',
            'dysfunction': 'challenge',
            'pathological': 'pattern',
            'pathology': 'pattern',
            'illness': 'challenge',
            'disease': 'challenge'
        };

        let sanitized = response;

        // Replace judgmental terms with softer alternatives
        for (const [term, replacement] of Object.entries(replacements)) {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            sanitized = sanitized.replace(regex, replacement);
        }

        return sanitized;
    }

    parseAndFormatResponse(text) {
        const sections = {
            summary: '',
            strengths: [],
            support: [],
            tips: []
        };

        // Split into sections
        const lines = text.split('\n').filter(line => line.trim());
        let currentSection = '';

        for (const line of lines) {
            const trimmed = line.trim();
            
            if (trimmed.match(/^1\.|EMOTIONAL SUMMARY/i)) {
                currentSection = 'summary';
                continue;
            } else if (trimmed.match(/^2\.|STRENGTHS/i)) {
                currentSection = 'strengths';
                continue;
            } else if (trimmed.match(/^3\.|AREAS OF SUPPORT/i)) {
                currentSection = 'support';
                continue;
            } else if (trimmed.match(/^4\.|WELLNESS TIPS/i)) {
                currentSection = 'tips';
                continue;
            }

            if (currentSection === 'summary' && trimmed) {
                sections.summary += trimmed + ' ';
            } else if (currentSection && trimmed && trimmed.match(/^[-•\d]/)) {
                const cleanedLine = trimmed.replace(/^[-•\d.)\s]+/, '').trim();
                if (cleanedLine) {
                    sections[currentSection].push(cleanedLine);
                }
            }
        }

        return sections;
    }

    displayResults(aiResponse) {
        const sections = this.parseAndFormatResponse(aiResponse);
        
        // Improved fallback: get first complete sentence or paragraph
        let summaryFallback = aiResponse;
        if (!sections.summary) {
            const firstParagraph = aiResponse.split('\n\n')[0] || aiResponse;
            const sentences = firstParagraph.match(/[^.!?]+[.!?]+/g) || [firstParagraph];
            summaryFallback = sentences.slice(0, 2).join(' ').trim();
            if (summaryFallback.length > 400) {
                summaryFallback = summaryFallback.substring(0, 400).trim() + '...';
            }
        }
        
        const resultsHTML = `
            <div class="result-section">
                <h3>💙 Your Emotional Well-being Summary</h3>
                <p>${sections.summary || summaryFallback}</p>
            </div>

            ${sections.strengths.length > 0 ? `
            <div class="result-section">
                <h3>✨ Your Strengths</h3>
                <ul>
                    ${sections.strengths.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${sections.support.length > 0 ? `
            <div class="result-section">
                <h3>🌱 Areas for Growth and Support</h3>
                <ul>
                    ${sections.support.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${sections.tips.length > 0 ? `
            <div class="result-section">
                <h3>💡 Wellness Tips</h3>
                <ul>
                    ${sections.tips.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="result-section">
                <h3>🤝 Remember</h3>
                <p>Your emotional well-being is a journey, not a destination. Everyone experiences ups and downs, and it's perfectly normal to seek support when you need it. Consider talking to trusted friends, family members, or professional counselors if you'd like additional guidance.</p>
            </div>
        `;

        document.getElementById('results-content').innerHTML = resultsHTML;
        this.showPage('results-page');
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;
    }

    restart() {
        // Reset all state
        this.currentQuestionIndex = 0;
        this.answers = new Array(QUESTIONS.length).fill(3);
        
        // Reset form
        document.getElementById('openai-base-url').value = 'https://api.openai.com/v1';
        document.getElementById('api-key').value = '';
        
        // Go back to config page
        this.showPage('config-page');
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmotionAnalysisApp();
});
