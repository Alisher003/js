const elScrolList = document.querySelector(".scroll-list")
const elPosts = document.querySelector(".posts")



const elTeplate = document.querySelector(".teplate").content
const elPostsTeplate = document.querySelector(".post-teplate").content

// console.log(elPostsTeplate);
// console.log(elTeplate);


function renderusers(array, element) {
        // element.innerHTML = null;

        const renderUsers = document.createDocumentFragment()

        array.forEach(item => {
            const clonedTeplate = elTeplate.cloneNode(true)

            clonedTeplate.querySelector(".id").textContent = item.id
            clonedTeplate.querySelector(".name").textContent = item.name
            clonedTeplate.querySelector(".user-name").textContent = item.username
            clonedTeplate.querySelector(".text").textContent = item.email
            clonedTeplate.querySelector(".street").textContent = item.address.street
            clonedTeplate.querySelector(".suite").textContent = item.address.suite
            clonedTeplate.querySelector(".city").textContent = item.address.city
            clonedTeplate.querySelector(".zipcode").textContent = item.address.zipcode

            renderUsers.appendChild(clonedTeplate)

        })
        element.appendChild(renderUsers)
    }

    function renderPost(arr, element){

        // element.innerHTML = "";

        const fragmentPost = document.createDocumentFragment();

        arr.forEach( item => {

          const clonedPostTemplate = elPostsTeplate.cloneNode(true);

          clonedPostTemplate.querySelector(".scroll-item").dataset.postId = item.id;
          clonedPostTemplate.querySelector(".heading").textContent = item.id;
          clonedPostTemplate.querySelector("title").textContent = item.title;
          clonedPostTemplate.querySelector(".text").textContent = item.body;
          fragmentPost.appendChild(clonedPostTemplate);
        })

        element.appendChild(fragmentPost);
      }





async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()

    renderusers(data, elScrolList);
}

getUsers()


elScrolList.addEventListener("click", async (evt) => {

    if(evt.target.matches(".scroll-item")){

      let userId = evt.target.dataset.userId;

      console.log(userId);


      let res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${userId}`);

      let data = await res.json();
      console.log(data);

      renderPost(data, elPosts);
    }

  })
