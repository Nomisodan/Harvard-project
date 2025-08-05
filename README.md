## Distinctiveness and Complexity

For this project, I didn't really know what complexity meant in terms of a web app. So I went with the first thing that came to mind that looked complicated: a dynamic website, something that moves when scrolling through the page. I don’t know if this is complex for an experienced software engineer, but as someone who is learning, this was a challenge to accomplish.

Building something that is front-end heavy using SCSS and JavaScript was hard because things were conflicting with each other. For example, if you do an opacity fade-in in CSS but have similar code in JavaScript, things can break. The elements also didn’t move the way I wanted, and it took me a while to figure everything out. I can't really compare it to others, but I think this was hard to accomplish based on the multiple page that conflict with each other rules.

---

## The Files

To start the project, I used `manage.py` to communicate with Django.

I got a `db.sqlite3` database ready for later use.

I created a `Project5` folder for `settings.py`, `urls.py`, and `wsgi.py`.

I also made a folder called `Capstone`, which contains folders for `static`, `migrations`, and `templates`.

Once the foundation was done, I started thinking about the concept of the website. I didn’t want to create the full app but just the **intro** of what the web app could be.

So I thought of a simple idea for a site where you scroll through a game called **Speeme** (Speed/Game. Spee/me). Kind of like TikTok but for games. I created `index.html` and `style2.css` to represent what could be a future web app.

I added a background (`cave5.webp`) that appears for users on devices other than phones.

To introduce users to the web app, I needed to create an experience with transitions, a carousel, snap-lock forms and text, parallax zoom scrolling, etc. I wanted to tell a kind of story while scrolling through the website.

The idea: we are arriving at the entrance of a cave that leads to the other side, where the world of Speeme is.

So I started with `layout.html` and `style.scss`, which compiles to `style.css`. I also added a favicon with the letters “SP”.

I made four sections: **Intro**, **Explanation**, **Register**, and **Login**. Each one represents a part of the cave.

## Section Breakdown

**Intro**  
Starts with a fade-in of the title “Speeme?” (like “Speed Game?”) and a cave background (`cave3.jpg`).  
When scrolling starts, `transition1.js` takes over. This is where the heart of the web app lives:
- "Speeme?" zooms out as if you pass by it and disappears behind you.
- The background zooms into the cave.
- "Are you ready?" zooms and fades into the darkness.

**Explanation**
“Are you ready?” fades out. A new background (`cave2.jpg`) fades in, and from the bottom, a carousel with the explanation of the game snap-locks in the middle of the page.  
I made `carousel.js` separate from `transition1.js` to keep it easier to manage.  
As users scroll through the carousel, the background zooms in—like walking deeper into the cave while learning what the game is.

**Register**  
Once the carousel is finished, it detaches from the lock. The background keeps zooming in and fades out while `cave1.jpg` fades in.  
At the bottom, the register form comes into view and snap-locks to the screen.

Since there is a register and login, `models.py` is used to migrate data to the database.  
`views.py` and `urls.py` are used to link to the index page.

**Login**  
If the user scrolls down a bit more, the background zooms in and fades out. Then `cave4.jpg` fades in with the exit and the login form.

---

## Running the App

To run this app, just start the server from the main directory:

```bash
python manage.py runserver
