from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import PyPDF2
from sklearn.metrics.pairwise import cosine_similarity
import re
import io

# Initialize the Application
app = FastAPI(title="Certify.Ai AI Engine")

# Add CORS Middleware so React/Node can talk to it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We can restrict this to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
try:
    print("Loading AI Models...")
    tfidf = joblib.load('tfidf_vectorizer.pkl')
    tfidf_matrix = joblib.load('tfidf_matrix.pkl')
    df = pd.read_pickle('cleaned_course_data.pkl')
    print("Models loaded successfully!")
except FileNotFoundError:
    raise RuntimeError("Ensure .pkl files are in the /antigravity folder!")

def clean_text(text):
    text = str(text).lower()
    return re.sub(r'[^a-zA-Z0-9\s]', '', text)

def get_recommendations(input_text, top_n=5):
    cleaned_input = clean_text(input_text)
    user_vec = tfidf.transform([cleaned_input])
    cosine_sim = cosine_similarity(user_vec, tfidf_matrix)
    
    scores = list(enumerate(cosine_sim[0]))
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)[:top_n]
    
    results = []
    for i, score in sorted_scores:
        results.append({
            "match_percentage": round(score * 100, 1),
            "course_title": df.iloc[i][df.columns[0]], 
            "organization": df.iloc[i][df.columns[1]] if len(df.columns) > 1 else "Unknown"
        })
    return results

class JobRequest(BaseModel):
    job_role: str

# Endpoints
@app.post("/api/recommend/job")
async def recommend_by_job(request: JobRequest):
    if not request.job_role:
        raise HTTPException(status_code=400, detail="Job role is required")
    return {"status": "success", "recommendations": get_recommendations(request.job_role)}

@app.post("/api/recommend/cv")
async def recommend_by_cv(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        cv_text = "".join([page.extract_text() for page in pdf_reader.pages])
        return {"status": "success", "recommendations": get_recommendations(cv_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)