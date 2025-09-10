from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.models import User

def layout_view(request):
    message = ""
    # Handle login form
    if request.method == "POST" and "login" in request.POST:
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("index")
        else:
            message = "Invalid username and/or password."

    # Handle register form
    if request.method == "POST" and "register" in request.POST:
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirmation = request.POST.get("confirmation")
        if password != confirmation:
            message = "Passwords must match."
        else:
            try:
                user = User.objects.create_user(username, email, password)
                user.save()
                login(request, user)
                return redirect("index")
            except IntegrityError:
                message = "Username already taken."

    return render(request, "layout.html", {"message": message})

def logout_view(request):
    logout(request)
    return redirect("layout")

from django.contrib.auth.decorators import login_required

@login_required
def index_view(request):
    return render(request, "index.html")