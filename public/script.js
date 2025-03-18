let currentPage = 1;

async function fetchNews(page = 1) {
    const response = await fetch('/api/news?page=' + page);
    const data = await response.json();
    currentPage = data.page;

    const container = document.getElementById("news");
    container.innerHTML = data.news.map(news =>
        `<div>
                    <h2><a href="${news.url}" target="_blank">${news.headers}</a></h2>
                    <p><strong>Category:</strong> ${news.category} | 
                       <strong>Comments:</strong> ${news.number_of_comments} | 
                       <strong>Photos:</strong> ${news.num_photos}
                    </p>
                    <p>${news.content}</p>
                </div><hr>`
    ).join('');

    // Update pagination buttons
    document.getElementById("page-info").innerText = `Page ${data.page} of ${data.totalPages}`;
    document.getElementById("prev-btn").disabled = data.page === 1;
    document.getElementById("next-btn").disabled = data.page === data.totalPages;
}

window.onload = () => fetchNews();

function nextPage() {
    fetchNews(currentPage + 1);
}

function prevPage() {
    fetchNews(currentPage - 1);
}