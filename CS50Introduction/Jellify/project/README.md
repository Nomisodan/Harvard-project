# Jellify
#### Video Demo:  https://youtu.be/d8Ch1U1Hm2I
#### Description:

My project is website that I decided to do for my wife. She is a nail technician that work from home. When I saw how dedicated she was I decided that this project would go on for a long time since I'll have to continue to update it afterwards. Which in this case will be helpful for my portfolio in return.

At first I must admit I required the help of ChatGPT to help me with troubleshoot and questions that I have but AI did not create this website, it only helped. I didn't truly know what I would have to do, so I looked at other nail website and I decided to start with an HTML file which is called jellify.html in the templates folder.
There lies the whole heart of the website. I started with a template that I found on codepen made by Eva Koops and I build from there.
I wasn't able to work with that specific navigation bar since i didn't like the aspect that it doesn't collapse properly so i chose a bootstrap navigation bar that i modified. I added the aspect that when you scroll down the navigation bar becomes dark. Also when the navigation button a pressed it scrolls to the particular box. I also integrated a temporary logo and I used it as a favicon. The signature was made with xml and graphic design that became way too advance for me to figure out so I made a slight animation with css. I used tables in the service section and I added a booking section even though I can only gather the information while using sqlite3.

In my style.css I modified the logonavbar, the headers, the paragraph, every box has it's unique style and background. With that file I was able to modify the look of my table and modify the look from pc website to phone website as well as adjusting the look of the navigation bar like having underline when hovering over the words. I also change the style of the container behind forms and the thank you message. I finished with styling the terms and conditions page and styling the qrcode position and size.

I used Jellify.png, Last.jpg, nezuko nail (1) and (2), nude.jpg (meaning nude colored nails), thank you back.jpg qr-code.png and white.jpg to enhance the user experience on the website by giving exemple of what my wife and having a redirection to her instagram.

Once I got to the booking an apointment part I wanted to use a third-party booking service from reputable website but I had to pay so I decided to use flask with app.py and appointments.db to create routes to a diferent page for a confirmation and also to add the information to a database instead. This part of the project was hard since I'm not able to recreate some of those more immediate responsive booking change like having a instant message telling you the appointment isn't available. It instead refresh the page and you have to go back down to see the message on top of the form. I added code so that you can't choose date before today. I was trying to remove the time that was already being appointed but I was not able to make it work I need a little bit more knowledge and it's also hard since I think I need to find a way to have an instant refresh but that would scroll the page back up and I seriously need to be a little more advance for that.

I added a quick Terms and Conditions (terms.html) page made by CHATGPT since this is not made to be my main page and I needed quick appointments rules, although I modified the style of the page so that it looks more presentable because whatever it did was not good looking.

If the form miss required field it would be told to the user.
If the appointment is conflicting with another one it would refresh the page and when you go down on the booking a message would be showing on top of the form letting you know to choose another time.

When the form is complete it direct the user to another page thank_you.html where you would see the confirmation with your name, date and time the user have chosen plus a button to go back home.

I used flask in app.py so that I can route to the different page as well as interact with the data that goes into the appointments.db from the form.

I finished the website with the phone number and a QR code that redirect the user to her instagram.
