document.addEventListener('DOMContentLoaded', function () {
    const followButton = document.querySelector('#follow-button');
    if (followButton) {
        followButton.addEventListener('click', () => {
            const username = window.location.pathname.split('/')[2];
            fetch(`/profile/${username}/follow`, {
                method: 'PUT',
                headers: { 'X-CSRFToken': getCookie('csrftoken') }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    followButton.innerText = followButton.innerText === 'Follow' ? 'Unfollow' : 'Follow';
                    location.reload(); // Reload to update follower count
                }
            });
        });
    }
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