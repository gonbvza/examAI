# ExamAI: AI-Powered Exam Generation and Assistance Platform

## Overview

ExamAI is a comprehensive web application designed to revolutionize the exam creation and study process using advanced AI technologies. The platform allows educators to generate exams, manage questions, and provides students with intelligent study assistance.

## Tech Stack

### Frontend

- React.js
- TypeScript

### Backend

- Django
- PostgreSQL
- Gunicorn
- Django REST Framework

## Features

### For Educators

- AI-powered exam generation
- Question bank management
- Customizable exam creation

### For Students

- Exam taking interface

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm
- PostgreSQL

## Local Development Setup

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/gonbvza/examAI.git
cd examAI
```

2. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install Python dependencies

```bash
cd server/server
pip install -r requirements.txt
```

4. Configure Database

- Create a PostgreSQL database
- Update database settings in `settings.py`

5. Run migrations

```bash
python manage.py migrate
```

### Frontend Setup

1. Navigate to client directory

```bash
cd ../../client
npm install
```

2. Start development server

```bash
npm run dev
```

### Running the Application

```bash
# In separate terminals
# Start backend
cd server/server
python manage.py runserver

# Start frontend
cd ../../client
npm run dev
```

## Deployment

### Railway Deployment

- Uses `railway.json` for configuration
- Supports PostgreSQL database
- Automated build and deployment process

### Environment Variables

- `DJANGO_SECRET_KEY`: Django secret key
- `DEBUG`: Set to `False` in production
- `DATABASE_*`: PostgreSQL connection details

## Security Considerations

- Use strong, unique Django secret key
- Enable HTTPS
- Implement proper authentication
- Regular dependency updates

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## Contact

- Project Maintainer: Gonzalo Vela, gonzalov2000@gmail.com
- GitHub: https://github.com/gonbvza/examAI

## Acknowledgements

- Django
- React
- PostgreSQL
- Gemini
