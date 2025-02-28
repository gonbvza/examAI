def produceExam(exam, questions):
    print(exam.name)

    for i in questions:
        print(i)

    JSON = {
        "id": str(exam.id),
        "name": exam.name,
        "questions": questions,
        "created_at": exam.pub_date,
    }

    return JSON
