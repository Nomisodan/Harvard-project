## Distinctiveness and Complexity

When I first started this project, I wasn’t entirely sure how “complexity” was measured in terms of web applications. Many of the earlier projects in this course were centered around either data-driven features or social-driven features. I wanted to do something different and focus instead on creating a visually dynamic, interactive experience that integrates Django for authentication and state management while relying heavily on front-end logic for animations and transitions. This decision made my project distinct both in scope and in technical implementation.

This project is not an e-commerce site because it does not involve listing, selling, or managing products, nor does it have a checkout or payment system. It is also not a social network because it does not center around user interaction, following, or sharing content between users. While the HTML structure includes placeholders that might resemble social elements, these do not connect to any social functionality in the backend. Instead, my application focuses on building a scroll-driven storytelling landing page that introduces the concept of a TikTok-like platform for mini-games and riddles. The emphasis is on using scrolling as the primary method of navigation and engagement, something not present in the standard web programming projects. This makes it stand out by combining front-end animation complexity with a Django-based authentication system. Creating something so front-end heavy with SCSS and JavaScript was challenging because styles and scripts often conflicted with one another.

One example of this challenge came with handling opacity transitions. In my CSS file, I used opacity: 0 with a one-second transition for the initial state, which worked well for the intro. However, when I tried to control fade-out effects dynamically with JavaScript, the timing no longer matched the initial transitions. Managing opacity across both CSS and JavaScript required carefully synchronizing state and timing to avoid glitches. Beyond that, I implemented features such as parallax zoom scrolling, fade-in and fade-out transitions, sticky forms that snap into view, animated navigation dots, and a synchronized carousel explanation section. Ensuring that each section flowed seamlessly into the next while maintaining scroll-based control required significant experimentation, testing, and debugging.

On the back end, I integrated Django models to handle user registration, login, and logout, which tie directly into the front-end flow. These features allow users to transition from the animated welcome page into the main website once authenticated. While the backend is not as elaborate as a multi-model e-commerce system, it still demonstrates the importance of securely handling user data and authentication. The fact that the backend interacts with a highly dynamic, JavaScript-driven interface adds complexity, since I had to ensure that Django’s server-side logic and the client-side animations worked together without breaking the user experience.

Finally, I ensured the site was mobile responsive by adding media queries and testing across different screen sizes. Animations, transitions, and layout adjustments adapt to smaller displays, ensuring the site remains functional and visually consistent on both desktop and mobile devices. Altogether, the combination of advanced front-end animation, Django integration, authentication flow, and mobile responsiveness creates a project that is both distinct from the course’s earlier projects and sufficiently complex to meet the final project requirements.

## Section Breakdown

## Navigation Bar
The navigation bar contains four different sections, each represented by a dot that highlights dynamically as the user scrolls through the page. This animated navigation helps users track their position in the experience and adds to the immersive design.

## Intro
The welcome sequence begins with a fade-in of the title “Speeme?” (short for “Speed Game?”) set against the backdrop of a cave entrance. As scrolling begins:

The title “Speeme?” gradually zooms out, giving the impression that the viewer is moving past it into the cave.

The cave background zooms forward, simulating movement into the environment.

A new phrase, “Are you ready?”, emerges from the darkness with a zoom-and-fade effect, setting the tone for the next section.

## Explanation
Once the intro fades out, a new background fades in, accompanied by a carousel that slides upward from the bottom of the page and locks into the center of the screen. This carousel contains the explanation of the game. As users scroll through the carousel slides, the background continues its zoom effect, reinforcing the illusion of traveling deeper into the cave while simultaneously learning about the platform’s concept.

## Register
After the carousel is complete, it unlocks and scrolls away as the background transitions again. At this point, the registration form becomes visible and snaps into the center of the screen. Users who are new to the site can enter their details here, which are then stored in the Django database. Successful registration redirects them into the main portion of the website.

## Login
For returning users, scrolling past the registration section reveals the login form. The registration background zooms and fades out, while a new login background fades in. The login form itself slides upward into the center of the screen and locks in place. Upon entering valid credentials, users are authenticated by Django and directed into the main site.

## Main Website (Template)
The final section is a placeholder template of the main website. This is not the primary focus of the project but serves to demonstrate how the registration and login flow transition seamlessly into an authenticated user environment. It provides a clear endpoint to the animated introduction while showing how the backend and frontend components work together.


---
## The Files

"Project 5 Capstone/
├── Capstone/
│   ├── __pycache__/              # cache files (views, urls, models)
│   ├── migrations/               # generated by Django
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   └── 0001_initial.py
│   ├── static/
│   │   ├── carousel.js           # carousel functions
│   │   ├── transition1.js        # animations, parallax, sticky forms
│   │   ├── style.scss            # SCSS styles
│   │   ├── style.css             # compiled CSS
│   │   ├── style.css.map         # SCSS map file
│   │   ├── style2.css            # main site styles
│   │   ├── cave1.jpg             # register background
│   │   ├── cave2.jpg             # explanation background
│   │   ├── cave3.jpg             # intro background
│   │   ├── cave4.jpg             # login background
│   │   ├── cave5.jpg             # main website background
│   │   └── favicon-32x32.png
│   ├── templates/
│   │   ├── layout.html           # welcome page
│   │   └── index.html            # main website
│   ├── models.py                 # registration data
│   ├── urls.py                   # Django routes
│   └── views.py                  # handles registration/login
│
├── project5/
│   ├── __pycache__/              # cache for settings, urls, wsgi
│   ├── settings.py               # Django settings
│   ├── urls.py                   # url patterns
│   └── wsgi.py                   # server config
│
├── db.sqlite3                    # user database
├── manage.py                     # Django utility
├── requirements.txt              # dependencies (Django)
└── README.md                     # this file"
---

## Running the App

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

Then open http://127.0.0.1:8000/ in your browser.
