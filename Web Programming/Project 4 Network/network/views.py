from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User, Post
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@login_required
def index(request):
    posts = Post.objects.all().order_by('-timestamp')
    paginator = Paginator(posts, 10)  

    page_number = request.GET.get('page')  
    page_obj = paginator.get_page(page_number)  
    return render(request, "network/index.html", {'page_obj': page_obj})


def login_view(request):
    if request.method == "POST":

        
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def create_post(request):
    if request.method == "POST":
        content = request.POST.get("content")
        if content:  
            Post.objects.create(user=request.user, content=content)
            return redirect('index')  
    return render(request, 'network/create_post.html')

@login_required
def profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(user=user).order_by('-timestamp')
    paginator = Paginator(posts, 10)

    page_number = request.GET.get('page')  
    page_obj = paginator.get_page(page_number) 

    followers_count = user.followers.count()
    following_count = user.following.count()
    is_following = request.user in user.followers.all()

    return render(request, 'network/profile.html', {
        'profile_user': user,
        'page_obj': page_obj,
        'followers_count': followers_count,
        'following_count': following_count,
        'is_following': is_following
    })

@login_required
def follow_unfollow(request, username):
    if request.method == "PUT":
        user_to_follow = get_object_or_404(User, username=username)
        if request.user in user_to_follow.followers.all():
            user_to_follow.followers.remove(request.user)
        else:
            user_to_follow.followers.add(request.user)
        return JsonResponse({"message": "Follow status updated."}, status=200)
    return JsonResponse({"error": "Invalid request."}, status=400)

@login_required
def following(request):

    following_users = request.user.following.all()

    posts = Post.objects.filter(user__in=following_users).order_by('-timestamp')
    paginator = Paginator(posts, 10)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'network/following.html', {'page_obj': page_obj})

@login_required
@csrf_exempt
def edit_post(request, post_id):
    if request.method == "PUT":
        try:
            post = Post.objects.get(id=post_id, user=request.user)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found or you do not have permission to edit this post."}, status=404)

        data = json.loads(request.body)
        content = data.get("content", "")
        if content.strip() == "":
            return JsonResponse({"error": "Post content cannot be empty."}, status=400)

        post.content = content
        post.save()
        return JsonResponse({"message": "Post updated successfully.", "content": post.content}, status=200)

    return JsonResponse({"error": "Invalid request method."}, status=400)

@login_required
def like_post(request, post_id):
    if request.method == "PUT":
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found."}, status=404)

        # Toggle like
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            liked = False
        else:
            post.likes.add(request.user)
            liked = True

        return JsonResponse({"message": "Like status updated.", "likes_count": post.likes.count(), "liked": liked}, status=200)

    return JsonResponse({"error": "Invalid request method."}, status=400)