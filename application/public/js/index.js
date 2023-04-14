/**
 * @param   {{thumbnailUrl: string, title: string, url: string}}   data
 */
function buildCard(data) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "video-card");

    let imgTag = document.createElement("img");
    imgTag.setAttribute("class", "video-thumbnail");
    imgTag.setAttribute("src", data.thumbnailUrl);

    let titleTag = document.createElement("p");
    titleTag.setAttribute("class", "video-title");
    titleTag.appendChild(document.createTextNode(data.title));

    cardDiv.append(imgTag, titleTag);
    cardDiv.addEventListener("click", (e) => {
        /** @type {HTMLDivElement} */
        const div = e.currentTarget;
        div.style.animation = "fade-out 1.5s forwards";
        setTimeout(() => {
            div.remove();
            updateCardCount();
        }, 1300);
    });
    return cardDiv;
}

function updateCardCount() {
    const count = document.getElementById("video-gallery").children.length;
    document.getElementById("video-count").replaceChildren(
        `Displaying ${count} video${count == 1 ? "" : "s"}`
    );
}

/**
 * @return {{thumbnailUrl: string, title: string, url: string}[]}
 */
async function fetchVideos() {
    const resp = await fetch("https://jsonplaceholder.typicode.com/albums/2/photos");
    return await resp.json();
}

async function loadGallery() {
    const items = await fetchVideos();
    const cards = items.map(buildCard);
    document.getElementById("video-gallery").append(...cards);
    console.log(cards);
    updateCardCount();
}


loadGallery();
