const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY
})

const generateReview = async (code, language) => {

    const prompt = `
You are an expert code reviewer.

Analyze this ${language} code:

${code}

Give me:
1. Summary
2. Bugs or issues
3. Suggestions for improvement
4. Time complexity
5. Space complexity
6. Security issues
7. Improved code
`

    const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
    })

    return response.text
}

module.exports = {
    generateReview
}
