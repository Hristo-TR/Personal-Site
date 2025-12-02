document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  var commentsList = document.getElementById('commentsList');
  var commentForm = document.getElementById('commentForm');
  var contactForm = document.getElementById('contactForm');

  if (commentsList && commentForm) {
    var comments = [
      {
        id: 1,
        name: 'Ivan Ivanov',
        comment: 'Wow!',
        date: new Date('2025-11-28T14:30:00')
      },
      {
        id: 2,
        name: 'Georgi Georgiev',
        comment: 'Nice!',
        date: new Date('2025-11-29T09:15:00')
      }
    ];

    function formatDate(date) {
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-US', options);
    }

    function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function renderComments() {
      if (!commentsList) {
        return;
      }

      if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to leave one!</p>';
        return;
      }

      var sortedComments = [];
      for (var i = 0; i < comments.length; i++) {
        sortedComments.push(comments[i]);
      }

      for (var i = 0; i < sortedComments.length - 1; i++) {
        for (var j = 0; j < sortedComments.length - i - 1; j++) {
          if (sortedComments[j].date < sortedComments[j + 1].date) {
            var temp = sortedComments[j];
            sortedComments[j] = sortedComments[j + 1];
            sortedComments[j + 1] = temp;
          }
        }
      }

      var html = '';
      for (var i = 0; i < sortedComments.length; i++) {
        var comment = sortedComments[i];
        html = html + '<article class="comment-card">';
        html = html + '<div class="comment-header">';
        html = html + '<span class="comment-author">' + escapeHtml(comment.name) + '</span>';
        html = html + '<span class="comment-date">' + formatDate(comment.date) + '</span>';
        html = html + '</div>';
        html = html + '<p class="comment-text">' + escapeHtml(comment.comment) + '</p>';
        html = html + '</article>';
      }

      commentsList.innerHTML = html;
    }

    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var nameInput = document.getElementById('commenterName');
      var commentInput = document.getElementById('comment');

      var newComment = {
        id: Date.now(),
        name: nameInput.value.trim(),
        comment: commentInput.value.trim(),
        date: new Date()
      };

      comments.push(newComment);
      renderComments();

      nameInput.value = '';
      commentInput.value = '';

      commentsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    renderComments();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Backend not implemented :(');
      contactForm.reset();
    });
  }
});
