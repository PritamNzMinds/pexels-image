const apiKey = "eWYyc0ZxlYbtsqor0WLsLsc0B8CAvwTybIFbA0Vp8j7QKf0AyKoI01Hl";
let page = 1;
let per_page = 8;
let url = `https://api.pexels.com/v1/search?query=food?page=${page}&per_page=${per_page}`;

// fetch url

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    console.log(data);
    displayPhoto(data.photos);
    displayPaginationButton(data);
  } catch (error) {
    console.log(error);
  }
};

// display photo
const displayPhoto = (photos) => {
  const card = document.getElementById("card-data");
  const cardHtml = photos
    .map((photo) => {
      return `
        <div class="col-12 col-md-6 col-lg-3 mt-2">
          <div class="card">
            <img
              src="${photo.src.medium}"
              class="card-img-top img"
              alt="${photo.alt}"
            />
            <div class="card-body">
              <p class="card-text">${photo.alt}</p>
            </div>
          </div>
        </div>

        `;
    })
    .join("");
  card.innerHTML = cardHtml;
};

// search function
const searchValue=()=>{
  const query=document.getElementById('search-image').value;
  console.log(query);
  page=1;
  url = `https://api.pexels.com/v1/search?query=${query}?page=${page}&per_page=${per_page}`;

  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    fetchUrl(url);
    document.getElementById("loader").style.display = "none";
    document.getElementById('search-image').value="";
  }, 3000);
}
//search event
const searchBtn=document.getElementById("button-addon2");
searchBtn.addEventListener("click",searchValue);















// pagination button
// const displayPaginationButton = (data) => {
//   const totalPage = data.total_results / per_page;
//   const paginationDiv = document.getElementById("pagination-div");
//   console.log(totalPage);

//   for (let i = 1; i <= totalPage; i++) {
//     const li = document.createElement("li");
//     li.classList.add("page-item");

//     const a = document.createElement("a");
//     a.classList.add("page-link", "pagination-link");
//     a.href = "#";
//     a.textContent = i;

//     li.appendChild(a);
//     paginationDiv.appendChild(li);
//   }
// };

// pagination event

const paginationEvent = (event) => {
  page = event.target.innerText;
  url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;

  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    fetchUrl(url);
    document.getElementById("loader").style.display = "none";
  }, 1000);
};

const paginationLinks = document.querySelectorAll(".pagination-link");

paginationLinks.forEach((link) => {
  link.addEventListener("click", paginationEvent);
});

fetchUrl(url);
