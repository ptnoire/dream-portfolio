export const projectElement = document.querySelector('.gitList')
export const featureElement = document.querySelector('.feature__projects')

export const gitHubData = async function() {
    const retrieve = await fetch(`https://api.github.com/users/ptnoire/repos`)
    const data = await retrieve.json();
    renderData(data);
    featureProject1(data);
}

let gitHubList = {
    page: 1,
    resultsPerPage: 5,
    results: [],
};

const clear = function(parentContainer) {
    parentContainer.innerHTML = ''
}

const featureProject1 = function(data) {
    const payd = data.find(el => el.id === 597271140);
    clear(featureElement);
    featureElement.innerHTML = `
    <h1 class="featureTitle">payd</h1>
    <h3 class="flicker1">"A simple, no non-sense bill tracking app."</h3>
    <p class="flicker1">This is a project that came to me while I was in the hospital, finding an app that does this simple task without a lot of extra unwanted things wasn't available. This app features a 'no-data' exchange system where your data will never and can not be sold, no sign up or login neccessary.</p>
    <button><a href="https://ptnoire.github.io/PAYD-bill-tracker/" target="_blank" rel="noopener noreferrer">View App</a></button>
    <button><a href="https://github.com/ptnoire/PAYD-bill-tracker" target="_blank" rel="noopener noreferrer">View Source Code</a></button>
    <h3 class="flicker1">Project Started: ${new Date(payd.created_at)}</h3>
    <h3 class="flicker1">Last Push: ${new Date(payd.pushed_at)}</h3>
    `
}

const renderData = async function(data, pageNum = gitHubList.page) {
    data.sort((a, b) => dateComparison(a,b))
    gitHubList.results = data.map(ele => {
        const { full_name, html_url, description, updated_at, clone_url } = ele;
        return {
            title: full_name,
            link: html_url,
            description: description,
            last_update: updated_at,
            clone: clone_url,
            profilePic: ele.owner.avatar_url,
        }
    })
    clear(projectElement);
    displayData(pagination(pageNum));
};

const dateComparison = function(a, b) {
    const firstDate = new Date(a.pushed_at).getTime();
    const secondDate = new Date(b.pushed_at).getTime();
    return secondDate - firstDate;
}

const controlPagination = function(newPage) {
    gitHubList.page = newPage;
    displayData(pagination(gitHubList.page))
}

const paginationButtonsContainer = document.querySelector('.project_pagination');

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
             <p>${curPage + 1}➡</p>
        </button>
        `
    }

    if(curPage === numPages && numPages > 1) {
        return `
        <button data-goto="${curPage - 1}" class="btn flicker1">
            <p>⬅${curPage - 1}</p>
        </button>
        `;
    }

    if(curPage < numPages) {
        return `
        <button data-goto="${curPage - 1}"  class="btn flicker1">
            <p>⬅${curPage - 1}</p>
        </button>
        <button data-goto="${curPage + 1}" class="btn flicker1">
            <p>${curPage + 1}➡</p>
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
        </div>
        <div class="git_item_buttons">
            <a href="${el.link}" target="_blank" rel="noopener noreferrer">+ Source Code</a><br>
            <a href="${el.clone}" target="_blank" rel="noopener noreferrer">+ Clone</a>
        </div>
        <div class="git_item_updated">
            <h3>Last Push: ${new Date(el.last_update)}</h3>
        </div>
    </div>
    `;
    projectElement.insertAdjacentHTML('afterbegin', markup)
    });
    clear(paginationButtonsContainer);
    const buttons = changePagination();
    paginationButtonsContainer.insertAdjacentHTML('afterbegin', buttons)
}



projectElement.addEventListener('mouseover', function(e) {
    const target = e.target.closest('.gitHub__item');
    if(!target) return;
    const gitHubItems = document.querySelectorAll('.gitHub__item');
    gitHubItems.forEach(el => el.classList.add('condense'))
    target.classList.remove('condense');
})


gitHubData();