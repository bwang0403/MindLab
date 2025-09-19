# PracAI

PracAI is a web application designed to support psychology research and training.  
This repository contains my independent extensions and contributions to the project.

---

## 🔍 Background
The original project was developed in collaboration with the **UF Psychology Lab**.  
It started as a private repository maintained by lab members.  
This repository (`bwang0403/PracAI`) contains my own work, refactoring, and new features.

---

## 🚀 My Contributions
- **Frontend improvements**
  - Refactored static HTML into Django templates for better maintainability.
  - Integrated Bootstrap + custom CSS for responsive design.
  - Improved UI accessibility and SEO (Lighthouse audit 90+).

- **Backend integration**
  - Connected frontend with Django views and models.
  - Added basic user management and session handling.
  - Extended API endpoints for handling client data.

- **Deployment readiness**
  - Configured the project for deployment on Render/Heroku.
  - Added `requirements.txt` and environment configuration.

---

## 🛠 Tech Stack
- **Frontend**: HTML, CSS (Bootstrap, custom styling), JavaScript  
- **Backend**: Django (Python)  
- **Database**: SQLite (development), PostgreSQL (deployment-ready)  

---

## 📦 Installation (local)
```bash
# clone the repo
git clone https://github.com/bwang0403/PracAI.git
cd PracAI

# create and activate virtual environment
python -m venv .venv
. .venv/Scripts/activate   # Windows
source .venv/bin/activate  # Mac/Linux

# install dependencies
pip install -r requirements.txt

# migrate database
python manage.py migrate

# run locally
python manage.py runserver
