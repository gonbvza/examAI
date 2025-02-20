from google import genai
import PyPDF2

client = genai.Client(api_key="AIzaSyDmOAkblY5FkPf-CMFm_7Jlmhl1VXobVUk")

def makeSummary(text):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=["summarize this text in 5 paragraphs", text])

    return response.text
