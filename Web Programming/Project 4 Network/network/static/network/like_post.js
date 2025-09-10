document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.heart-button').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            const likesCountSpan = document.querySelector(`#likes-count-${postId}`);

            fetch(`/like_post/${postId}/`, {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    // Update the like count
                    likesCountSpan.innerText = data.likes_count;

                    // Toggle the heart icon color
                    if (data.liked) {
                        button.querySelector('i').classList.add('text-danger');
                    } else {
                        button.querySelector('i').classList.remove('text-danger');
                    }
                } else if (data.error) {
                    console.error(data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}