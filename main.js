const userSelect = document.getElementById('user-select');
const username = document.getElementById('username');
const userDetails = document.getElementById('user-details');
const postsDiv = document.getElementById('posts');
const commentsDiv = document.getElementById('comments');
const user1 = document.getElementById('user1');
const website = document.getElementById('website');
const Userlocation = document.querySelector('.location');
const multi = document.querySelector('.multi');
const main = document.querySelector('#main');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });

        userSelect.addEventListener('change', function() {
            const selectedUser = users.find(user => user.id == this.value);
            displayUser(selectedUser);
            displayPosts(selectedUser.id, selectedUser.name);
        });

        // Display the first user by default
        userSelect.value = 1;
        userSelect.dispatchEvent(new Event('change'));
    });

function displayUser(user) {
    username.textContent = user.name;
    user1.textContent = user.username;
    website.textContent = user.website;
    multi.textContent = user.company.catchPhrase
    Userlocation.textContent = user.address.city;
}

function displayPosts(userId,username) {
  
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            postsDiv.innerHTML = '';

            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('card');

                
                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');
                postCard.appendChild(imageCard);

                const imageC = document.createElement('img');
                imageC.classList.add('imageC');
                imageC.src = "https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png";
                imageCard.appendChild(imageC);

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name-div');
                postCard.appendChild(nameDiv);

                const iconsDiv = document.createElement('div');
                iconsDiv.innerHTML = `
                    <i class="fas fa-share-alt" style="color: #17bf63;"></i>
                    <i class="fab fa-twitter" style="color: #1da1f2;"></i>
                `;
                nameDiv.appendChild(iconsDiv);

                const postTitle = document.createElement('h5');
                postTitle.textContent = username;
                nameDiv.appendChild(postTitle);



                const postBody = document.createElement('p');
                postBody.textContent = post.body;
                postCard.appendChild(postBody);

                postCard.addEventListener('click', function() {
                    displayComments(post.id);
                });

                postsDiv.appendChild(postCard);
            });

            // Display comments for the first post by default
            displayComments(posts[0].id);
        });
}

function displayComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {

            commentsDiv.innerHTML = '';
            comments.forEach(comment => {
                const commentCard = document.createElement('div');
                commentCard.classList.add('card');

                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');
                commentCard.appendChild(imageCard);

                const imageC = document.createElement('img');
                imageC.classList.add('imageC');
                imageC.src = "https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png";
                imageCard.appendChild(imageC);

                const commentText = document.createElement('p');
                commentText.textContent = comment.body;
                commentCard.appendChild(commentText);

                const iconsDiv = document.createElement('div');
                iconsDiv.innerHTML = `
                    <i class="fas fa-comment" style="color: #1da1f2;"></i>
                    <i class="fas fa-heart heart" style="color: #e0245e;"> 0</i>
                    <i class="fas fa-share-alt" style="color: #17bf63;"></i>
                `;
                commentCard.appendChild(iconsDiv);

                commentsDiv.appendChild(commentCard);
            });
        });
        
    }

