const blogDiv = document.querySelector('.blog_section');

export const clearBlog = function() {
    blogDiv.innerHTML = '';
}

export const blogFetch = async function() {
    const retrieve = await fetch(`https://v1.nocodeapi.com/ptbcodin/medium/EVHwRLgGycjofWDE`)
    const data = await retrieve.json();
    console.log(data);
    renderData(data);
}
// blogFetch(); -> DO NOT ACTIVATE UNTIL WEBSITE IS LIVE, API DATA IS COSTLY.

const renderData = function(data) {
    clearBlog();
    data.map(el => {
        const postId = el.content.slice((el.content.indexOf('&postId=')), (el.content.indexOf(' width="1"')));
        console.log(postId);
        const markup = `
        <li class="blog_post">
            <div class="blog_head">
                <h1>${el.title}</h1>
            </div>
            <div class="blog_thumb">
                <ul><h3>SEO: </h3>${el.category.map(el => `<li>${el}</li>`).join("")}</ul>
            </div>
            <div class="blog_content">
                <h3>${el.content.replaceAll(`<img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss${postId} width="1" height="1" alt="">`, '')}</h3>
            </div>
            <div class="blog_footer">
                <h3>Published: ${new Date(el.published)}</h3>
                <button><a href="${el.link}" target="_blank" rel="noopener noreferrer">source</a></button>
            </div>
        </li>
        `
        blogDiv.insertAdjacentHTML('beforeend', markup);
    })
}