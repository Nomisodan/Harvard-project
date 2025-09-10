document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            const postContent = document.querySelector(`#post-content-${postId}`);

            // Ensure the postContent element exists
            if (!postContent) {
                console.error(`Post content element with ID post-content-${postId} not found.`);
                return;
            }

            // Replace the post content with a textarea
            const textarea = document.createElement('textarea');
            textarea.className = 'form-control';
            textarea.value = postContent.innerText;
            postContent.replaceWith(textarea);

            // Change the button to "Save"
            button.innerText = 'Save';
            button.classList.remove('btn-outline-secondary');
            button.classList.add('btn-outline-success');

            // Add event listener for saving the edited post
            button.addEventListener('click', () => {
                fetch(`/edit_post/${postId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify({ content: textarea.value })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        // Replace the textarea with the updated content
                        const updatedContent = document.createElement('p');
                        updatedContent.className = 'card-text';
                        updatedContent.id = `post-content-${postId}`;
                        updatedContent.innerText = data.content;
                        textarea.replaceWith(updatedContent);

                        // Change the button back to "Edit"
                        button.innerText = 'Edit';
                        button.classList.remove('btn-outline-success');
                        button.classList.add('btn-outline-secondary');
                    } else if (data.error) {
                        alert(data.error);
                    }
                });
            }, { once: true });
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