const blogDiv = document.querySelector('.blog_section');

export const blogFetch = async function() {
    const retrieve = await fetch(`https://v1.nocodeapi.com/ptbcodin/medium/EVHwRLgGycjofWDE`)
    const data = await retrieve.json();
    console.log(data);
    renderData(data);
}
blogFetch();

const renderData = function(data) {
    data.map(el => {
        const postId = el.content.slice((el.content.indexOf('&postId=')), (el.content.indexOf(' width="1"')));
        console.log(postId);
        const markup = `
        <li class="blog_post">
            <div class="blog_head">
                <h1>${el.title}</h1>
            </div>
            <div class="blog_thumb">
                <h3>SEO: ${el.category}</h3>
            </div>
            <div class="blog_content">
                <h3>${el.content.replaceAll(`<img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss${postId} width="1" height="1" alt="">`, '')}</h3>
            </div>
            <div class="blog_footer">
                <h3>Published: ${new Date(el.published)}</h3>
                <a href="${el.link}">Source</a>
            </div>
        </li>
        `
        blogDiv.insertAdjacentHTML('beforeend', markup);
    })
}