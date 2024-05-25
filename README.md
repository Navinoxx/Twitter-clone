# Twitter Clone

This is a Twitter clone application built using ReactJS for the frontend, Tailwind CSS for styling, Django for the backend, and PostgreSQL for the database. The project is set up in a virtual environment for better dependency management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Tweet creation, deletion, and display
- Follow and unfollow functionality
- Real-time updates
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:** ReactJS, Tailwind CSS
- **Backend:** Django, Django REST framework
- **Database:** PostgreSQL
- **Environment:** Virtualenv

## Installation

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL
- Virtualenv

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Navinoxx/Twitter-clone.git
    cd twitter-clone
    ```

2. Create and activate a virtual environment:

    ```bash
    python -m venv myenv
    source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
    ```

3. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up PostgreSQL database and update `DATABASES` in `settings.py`:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'twitter_clone',
            'USER': 'your_db_user',
            'PASSWORD': 'your_db_password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```

5. Run migrations and start the backend server:

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

## Usage

1. Open your browser and go to `http://localhost:3000` to see the frontend.
2. The backend server will be running on `http://localhost:8000`.

## Contributing

We welcome contributions!

## License

This project is licensed under the MIT License.
