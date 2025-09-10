document.addEventListener('DOMContentLoaded', function() {

  // Set up button event listeners
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Handle form submission
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function send_email(event) {
  event.preventDefault(); 
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.getElementById('compose-recipients').value,
      subject: document.getElementById('compose-subject').value,
      body: document.getElementById('compose-body').value
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    load_mailbox('sent');
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function load_mailbox(mailbox) {

  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  const emails_view = document.querySelector('#emails-view');
  emails_view.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(email => {
        const email_div = document.createElement('div');
        email_div.className = 'email-item';
      
        if (email.read) {
          email_div.classList.add('read');
        }
      
        const status_label = email.read
          ? '<span class="email-status read">Read</span>'
          : '<span class="email-status unread">Unread</span>';
      
        email_div.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>${mailbox === 'sent' ? email.recipients.join(', ') : email.sender}</strong> — 
              <span>${email.subject}</span>
            </div>
            <div>
              <span class="text-muted">${email.timestamp}</span>
              ${status_label}
            </div>
          </div>
        `;
      
        email_div.addEventListener('click', () => view_email(email.id));
        emails_view.appendChild(email_div);
      });
    }); // <-- closes .then()
} // <-- closes load_mailbox function


function view_email(id) {

  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  const emails_view = document.querySelector('#emails-view');
  emails_view.innerHTML = '';

  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {

      if (!email.read) {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ read: true })
        });
      }

      const email_content = document.createElement('div');
      email_content.className = 'email-detail';

      email_content.innerHTML = `
        <ul class="list-group mb-3">
          <li class="list-group-item"><strong>From:</strong> ${email.sender}</li>
          <li class="list-group-item"><strong>To:</strong> ${email.recipients.join(', ')}</li>
          <li class="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
          <li class="list-group-item"><strong>Timestamp:</strong> ${email.timestamp}</li>
        </ul>
        <div class="mb-3"><strong>Body:</strong><br>${email.body}</div>
      `;

      if (email.sender !== document.querySelector('h2').innerText) {
        const archive_button = document.createElement('button');
        archive_button.className = 'btn btn-sm btn-outline-secondary me-2';
        archive_button.innerText = email.archived ? 'Unarchive' : 'Archive';

        archive_button.addEventListener('click', () => {
          fetch(`/emails/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              archived: !email.archived
            })
          })
            .then(() => load_mailbox('inbox'));
        });

        email_content.appendChild(archive_button);
      }

      const reply_button = document.createElement('button');
      reply_button.className = 'btn btn-sm btn-outline-primary';
      reply_button.innerText = 'Reply';

      reply_button.addEventListener('click', () => {
        compose_email();

        document.querySelector('#compose-recipients').value = email.sender;
        document.querySelector('#compose-subject').value =
          email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`;
        document.querySelector('#compose-body').value = `\n\nOn ${email.timestamp} ${email.sender} wrote:\n${email.body}`;
      });

      email_content.appendChild(reply_button);

      emails_view.appendChild(email_content);
    });
}
  
  function showView(viewId) {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'none';
  
    document.querySelector(viewId).style.display = 'block';
  }
  