def produceExam(exam, questions):
    JSON = {
        "id": str(exam.id),
        "name": exam.name,
        "questions": questions,
        "created_at": exam.pub_date,
    }

    return JSON
