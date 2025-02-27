from google import genai
import PyPDF2

client = genai.Client(api_key="AIzaSyDmOAkblY5FkPf-CMFm_7Jlmhl1VXobVUk")

def makeSummary(text):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=["summarize this text wiht a minimum of 300 words, but if the text is long, then provide a long summary. ", text])

    return response.text

def generateExam(text):
    print("generating exam")
    prompt = """Create an exam from this text {text}
            REALLY IMPORTANT Please provide 10 questions.
            Use this JSON schema:

            {
                "questions": [
                    {
                        "questionText": "What are the primary causes of rising global temperatures?",
                        "answerA": "Greenhouse gases",
                        "answerB": "Deforestation",
                        "answerC": "Solar flares",
                        "answerD": "Volcanic eruptions",
                        "Correct": "A"
                    },
                    {
                        "questionText": "What are the key impacts of climate change on the environment?",
                        "answerA": "Decreased biodiversity",
                        "answerB": "Increased storms",
                        "answerC": "Rising sea levels",
                        "answerD": "All of the above",
                        "Correct": "D"
                    },
                    {
                        "questionText": "What are the primary causes of rising global temperatures?",
                        "answerA": "Greenhouse gases",
                        "answerB": "Deforestation",
                        "answerC": "Solar flares",
                        "answerD": "Volcanic eruptions",
                        "Correct": "A"
                    }
                ],
            }
            
            Please provide 10 questions
            """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, text])

    return response.text[8:-4]