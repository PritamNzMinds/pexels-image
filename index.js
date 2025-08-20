const apiKey = "eWYyc0ZxlYbtsqor0WLsLsc0B8CAvwTybIFbA0Vp8j7QKf0AyKoI01Hl";
let page = 1;
let per_page = 8;
let url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;
var query="";

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
    displayPhoto(data);
    displayPrevBtn(data);
    displayNextBtn(data);
  } catch (error) {
    console.log(error);
  }
};

// display photo
const displayPhoto = (data) => {
  const card = document.getElementById("card-data");
  const cardHtml = data.photos
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


  const pageShow=document.getElementById("page-show");
  pageShow.innerText=`Page no: ${data.page}`
};

// search function
const searchValue=()=>{
  query=document.getElementById('search-image').value;
  if(!query){
    alert("Enter anything to search");
    return;
  }
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

// display prev btn
const displayPrevBtn=(data)=>{
  const prevBtn=document.getElementById("prev-btn");
  if(data.page===1){
    prevBtn.disabled=true
  }else{
    prevBtn.disabled=false
  }
}
const prevBtnFunc=()=>{
  page=page-1;

  if(query){
    url = `https://api.pexels.com/v1/search?page=${page}&per_page=${per_page}&query=${query}%3Fpage%3D1`;
  }else{
    url=`https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`
  }
  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    fetchUrl(url);
    document.getElementById("loader").style.display = "none";
    document.getElementById('search-image').value="";
  }, 3000);

  
}

// display next btn
const displayNextBtn=(data)=>{
  const nextBtn=document.getElementById("next-btn");
  const totalPage = data.total_results / per_page;
  if(page===totalPage){
    nextBtn.disabled=true
  }else{
    nextBtn.disabled=false
  }

}

const nextBtnFunc=()=>{
  page=page+1;
  console.log(query);
  if(query){
    url = `https://api.pexels.com/v1/search?page=${page}&per_page=${per_page}&query=${query}%3Fpage%3D1`;
  }else{
    url=`https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`
  }
  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    fetchUrl(url);
    document.getElementById("loader").style.display = "none";
    document.getElementById('search-image').value="";
  }, 3000);
}


// next and prev button event
const prevBtn=document.getElementById("prev-btn");
const nextBtn=document.getElementById("next-btn");

prevBtn.addEventListener("click",prevBtnFunc);
nextBtn.addEventListener("click",nextBtnFunc);

// initialize
fetchUrl(url);
