from django.shortcuts import render, redirect
from django.http import HttpResponse
from . import util
import random
import markdown2

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wiki_entry(request, title):  
    content = util.get_entry(title) 

    if content is None:
        return render(request, "wiki/not_found.html", {"title": title})

    html_content = markdown2.markdown(content)


    return render(request, "wiki/page.html", {  
        "title": title,  
        "content": html_content  
        })  

def search(request):
  entries = util.list_entries()
  query = request.GET.get("q", "").strip()

  if query in entries:
    content = util.get_entry(query)
    return render(request, "wiki/page.html", {  
            "title": query,  
            "content": content  
        })

  matching_entries = [entry for entry in entries if query.lower() in entry.lower()]
  
  if matching_entries:
    return render(request, "encyclopedia/index.html", {
        "query": query,
        "matching_entries": matching_entries
    })  
  else:
        return render(request, "wiki/not_found.html", {"title": query})

def create(request):
    if request.method == "POST":
        title = request.POST.get("title", "").strip()  
        content = request.POST.get("content", "").strip() 
        entries = util.list_entries()

        if not title:
            return render(request, "encyclopedia/create.html", {
                "error": "Title cannot be empty!"
            })

        if not content:
            return render(request, "encyclopedia/create.html", {
                "error": "Content cannot be empty!"
            })

        if title in entries:
            return render(request, "wiki/exist.html", {
                "error": "A page with this title already exists!"
            })

        util.save_entry(title, content)

        return redirect("wiki_entry", title=title)

    return render(request, "encyclopedia/create.html")
    
def edit(request, title):
    content = util.get_entry(title) 

    if content is None:
        return render(request, "wiki/not_found.html", {"title": title}) 

    if request.method == "POST":
        updated_content = request.POST.get("content", "").strip()  

        if not updated_content:
            return render(request, "encyclopedia/edit.html", {
                "title": title,
                "content": content,
                "error": "Content cannot be empty!"
            })

        util.save_entry(title, updated_content)

        return redirect("wiki_entry", title=title)

    return render(request, "encyclopedia/edit.html", {
        "title": title,
        "content": content
    })

def random_entry(request):
    entries = util.list_entries() 
    selected_title = random.choice(entries)
    return redirect("wiki_entry", title=selected_title)
