export const projectElement = document.querySelector('.gitList')
const paginationButtonsContainer = document.querySelector('.project_pagination');


export const gitHubData = async function() {
    const retrieve = await fetch(`https://api.github.com/users/ptnoire/repos`)
    const data = await retrieve.json();
    renderData(data);
}

let gitHubList = {
    page: 1,
    resultsPerPage: 6,
    results: [],
};

const clear = function(parentContainer) {
    parentContainer.innerHTML = ''
}


const renderData = async function(data, pageNum = gitHubList.page) {
    data.sort((a, b) => dateComparison(a,b))
    let language = [];
    for(let i=0; i<data.length;i++){
        const lang = await gatherUrl(data[i].languages_url);
        language.push(lang);
    }

    gitHubList.results = data.map((ele, i) => {
        const { full_name, html_url, description, updated_at, clone_url } = ele;
        return {
            title: full_name,
            link: html_url,
            description: description,
            last_update: updated_at,
            clone: clone_url,
            language: langToArray(language[i]),
        }
    })
    clear(projectElement);
    displayData(pagination(pageNum));
};

const gatherUrl = async function(url) {
    const render = await fetch(url);
    const render2 = await render.json();
    return render2;
}

const langToArray = function(obj) {
    let lang = [];
    if(Object.keys(obj)) {
        for (let i=0; i < Object.keys(obj).length; i++) {
            lang.push(String(`[${Object.keys(obj)[i]}: ${Object.values(obj)[i]}]`));
        }
    }
    return lang;
}

const dateComparison = function(a, b) {
    const firstDate = new Date(a.pushed_at).getTime();
    const secondDate = new Date(b.pushed_at).getTime();
    return secondDate - firstDate;
}

const controlPagination = function(newPage) {
    gitHubList.page = newPage;
    displayData(pagination(gitHubList.page))
}


paginationButtonsContainer.addEventListener('click', function(e) {
        e.preventDefault();
        const btn = e.target.closest('.btn');
        if(!btn) return;
        const goto = +btn.dataset.goto;
        controlPagination(goto);
    })

const pagination = function(page = gitHubList.page) {
    gitHubList.page = page;
    const start = (page -1) * gitHubList.resultsPerPage;
    const end = page * gitHubList.resultsPerPage;
    return gitHubList.results.slice(start, end);
}

const changePagination = function() {
    const gatherEmAll = document.querySelectorAll('.gitHub__item');
    gatherEmAll.forEach(el => el.classList.add('condense'));
    const first = document.querySelector('.gitHub__item');
    first.classList.remove('condense');
    const curPage = gitHubList.page;
    const numPages = Math.ceil(gitHubList.results.length / gitHubList.resultsPerPage);

    if (curPage === 1 && numPages > 1) {
        return `
        <button data-goto="${curPage + 1}" class="btn flicker1">
             <i class="fa-solid fa-circle-arrow-right"></i>
        </button>
        `
    }

    if(curPage === numPages && numPages > 1) {
        return `
        <button data-goto="${curPage - 1}" class="btn flicker1">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </button>
        `;
    }

    if(curPage < numPages) {
        return `
        <button data-goto="${curPage - 1}"  class="btn flicker1">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </button>
        <button data-goto="${curPage + 1}" class="btn flicker1">
            <i class="fa-solid fa-circle-arrow-right"></i>
        </button>
        `;
    }
}


const displayData = async function(data) {
    clear(projectElement);
    data.forEach(el => {
        const markup = `
    <div class="gitHub__item">
        <div class="git_item_title">
            <h1>${el.title}</h1>
        </div>
        <div class="git_item_description">
            <p>${el.description}</p>
            <p class="flicker1">Languages Used: ${el.language ? el.language.map(el => ` ${el}`) : ""}</p>
        </div>
        <div class="git_item_buttons">
            <a href="${el.link}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-folder-tree"></i></a>
            <a href="${el.clone}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-clone"></i></a>
        </div>
        <div class="git_item_updated">
            <h3>Last Push: ${new Date(el.last_update).toLocaleDateString()}</h3>
        </div>
    </div>
    `;
    projectElement.insertAdjacentHTML('afterbegin', markup)
    });
    clear(paginationButtonsContainer);
    const buttons = changePagination();
    paginationButtonsContainer.insertAdjacentHTML('afterbegin', buttons)
}



projectElement.addEventListener('click', function(e) {
    const target = e.target.closest('.gitHub__item');
    if(!target) return;
    const gitHubItems = document.querySelectorAll('.gitHub__item');
    gitHubItems.forEach(el => {
        el.classList.add('condense')
        el.classList.remove('git_active')
    })
    target.classList.remove('condense');
    target.classList.add('git_active');
})


gitHubData();