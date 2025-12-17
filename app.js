// Main Application Logic
class EmotionAnalysisApp {
    constructor() {
        this.currentPage = 'config-page';
        this.language = 'en';
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

    startAssessment() {
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

    finishAssessment() {
        // Save final answer
        const currentValue = document.getElementById('answer-slider').value;
        this.answers[this.currentQuestionIndex] = parseInt(currentValue);
        
        // Show results page with download option
        this.displayResults();
    }

    generatePromptText() {
        // Generate the full prompt text with questions and answers
        const questionsAndAnswers = QUESTIONS.map((q, index) => {
            const question = q[this.language];
            const answer = this.answers[index];
            return `Q${index + 1}: ${question}\nResponse: ${answer}/5`;
        }).join('\n\n');

        const prompt = `I have completed an emotional well-being self-assessment questionnaire. Each question was answered on a scale of 1-5 (1=Strongly Disagree, 5=Strongly Agree).

Here are my responses:

${questionsAndAnswers}

---

Please provide compassionate, supportive insights in the following format:

1. EMOTIONAL SUMMARY: A warm, non-judgmental summary of my overall emotional well-being (2-3 sentences)

2. STRENGTHS: List 3-4 specific positive patterns or strengths you observe from my responses

3. AREAS OF SUPPORT: List 3-4 gentle suggestions for areas where I might benefit from additional support or self-care practices

4. WELLNESS TIPS: Provide 4-5 practical, actionable tips I can implement to enhance my emotional well-being

IMPORTANT GUIDELINES:
- Be warm, supportive, and encouraging
- Avoid any diagnostic language or clinical terms
- Do not use words like "disorder," "condition," "symptoms," "diagnosis," or "treatment"
- Focus on strengths and growth opportunities
- Use person-first, empowering language
- Keep the tone conversational and compassionate
- Emphasize that everyone experiences emotional ups and downs
- Encourage self-compassion and seeking support when needed`;

        return prompt;
    }

    downloadReport() {
        const reportText = this.generatePromptText();
        
        // Create a blob with the text content
        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `emotion-analysis-report-${timestamp}.txt`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        URL.revokeObjectURL(link.href);
    }

    displayResults() {
        const resultsHTML = `
            <div class="result-section">
                <h3>📋 Assessment Complete</h3>
                <p>Thank you for completing the emotional well-being assessment. You've answered all ${QUESTIONS.length} questions.</p>
                <p>To get personalized insights, download your assessment report below and paste it into any AI chat engine (like ChatGPT, Claude, Gemini, etc.) to receive compassionate, supportive feedback.</p>
            </div>

            <div class="result-section">
                <h3>📥 Download Your Report</h3>
                <p>Your report includes:</p>
                <ul>
                    <li>All ${QUESTIONS.length} questions with your responses</li>
                    <li>A ready-to-use prompt for AI analysis</li>
                    <li>Instructions for getting supportive insights</li>
                </ul>
                <button id="download-report-btn" class="primary-btn" style="margin-top: 20px;">
                    📥 Download Assessment Report
                </button>
            </div>

            <div class="result-section">
                <h3>💡 How to Use Your Report</h3>
                <ol>
                    <li>Click the "Download Assessment Report" button above</li>
                    <li>Open the downloaded text file</li>
                    <li>Copy the entire contents</li>
                    <li>Paste it into any AI chat service (ChatGPT, Claude, Gemini, etc.)</li>
                    <li>Receive personalized, compassionate insights about your emotional well-being</li>
                </ol>
            </div>

            <div class="result-section">
                <h3>🤝 Remember</h3>
                <p>Your emotional well-being is a journey, not a destination. Everyone experiences ups and downs, and it's perfectly normal to seek support when you need it. Consider talking to trusted friends, family members, or professional counselors if you'd like additional guidance.</p>
            </div>
        `;

        document.getElementById('results-content').innerHTML = resultsHTML;
        
        // Add event listener for download button
        document.getElementById('download-report-btn').addEventListener('click', () => this.downloadReport());
        
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
        
        // Go back to config page
        this.showPage('config-page');
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmotionAnalysisApp();
});
