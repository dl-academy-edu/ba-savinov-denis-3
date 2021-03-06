const SERVER_URL = 'https://academy.directlinedev.com';
const preloader = document.querySelector('.blog-spinner_js.spinner_js');

//XHR для тегов
(function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', SERVER_URL + '/api/tags');
    xhr.send();
    preloader.classList.remove('hidden');
    xhr.onload = () => {
        const tags = JSON.parse(xhr.response).data;
        const tagBox = document.querySelector('.tags__list');
        tags.forEach (tag => {
        const tagHTML = createTag (tag);
        tagBox.insertAdjacentHTML('beforeend', tagHTML);
        });
        getParamsToSubmit();
        getArticle (getParams());
        preloader.classList.add('hidden');
    };
})();

//Переключение страниц стрелками в пагинации
function arrovPaginationControl (pages) {
    const paginationBtnNext = document.querySelector('.pagination-next_js');
    const paginationBtnPrev = document.querySelector('.pagination-prev_js');
    paginationBtnPrev.disabled = false;
    paginationBtnNext.disabled = false;
    let params = getParams();
    let searchParams = new URLSearchParams(location.search);

    if (params.page === 0) {
        paginationBtnPrev.disabled = true;
    }
    if (params.page >= pages-1) {
        paginationBtnNext.disabled = true;
    }

    function clickNext () {
        paginationBtnPrev.disabled = false;
        const numPageNext = +searchParams.getAll('page');
        params = getParams();
        if (numPageNext >= (pages -1)) {
            paginationBtnNext.disabled = true;
        } else {
            params.page = 1+numPageNext;
            searchParams.set('page', params.page);
            history.replaceState(null, document.title, '?' + searchParams.toString());
            getArticle (getParams());
            params = getParams();
            if (params.page >= (pages -1)) {
               paginationBtnNext.disabled = true;
            }
        }
    }

    function clickPrev () {
        paginationBtnNext.disabled = false;
        const numPagePrev = +searchParams.getAll('page');
        params = getParams();
        if (numPagePrev === 0) {
            paginationBtnPrev.disabled = true;
        } else {
            params.page = numPagePrev - 1;
            searchParams.set('page', params.page);
            history.replaceState(null, document.title, '?' + searchParams.toString());
            getArticle (getParams());
            params = getParams();
            if (params.page === 0 ) {
                paginationBtnPrev.disabled = true;
            }
        }
    }

    paginationBtnNext.addEventListener('click', clickNext, {once: true});
    paginationBtnPrev.addEventListener('click', clickPrev, {once: true});
}

//получение и вывод статей
function getArticle (params) {
    const xhr = new XMLHttpRequest();
    let searchParams = new URLSearchParams(location.search);
    searchParams.set('v', '1.0.0'); 
    if (params.tags && Array.isArray(params.tags) && params.tags.length) {
        searchParams.set('tags', JSON.stringify(params.tags));
    }

    let filter = {};
    if (params.comments.length) {
        let paramComment = params.comments;
        let resultCommentStr = [];
        let resultCommentNum = [];
        paramComment.forEach(key => {  
            resultCommentStr = resultCommentStr.concat((key.split('-')));
        })
        resultCommentStr.forEach (key => { 
            resultCommentNum.push(+key);
        })
        let minComment =Math.min.apply( null, resultCommentNum);
        let maxComment =Math.max.apply( null, resultCommentNum);
        filter.commentsCount = {"$between": [minComment, maxComment]};
    } 
    if (params.views.length) {
        let views = (params.views).split('-');
        filter.views = {"$between": [+views[0], +views[1]]};
    }
    if (params.search) {
        filter.title = params.search;
    }

    searchParams.set('filter', JSON.stringify(filter));

    if (params.sort) {
        searchParams.set('sort', JSON.stringify([params.sort, 'ASC']));
    }

    searchParams.set('limit', params.show);

    if (+params.page) {
        searchParams.set('offset', +params.page * params.show);
    }

    xhr.open('GET', SERVER_URL + '/api/posts?' + searchParams.toString());
    xhr.send();
    preloader.classList.remove('hidden');
    xhr.onload = () =>{
        const articles = JSON.parse(xhr.response).data;
        const getCountArticle = JSON.parse(xhr.response).count;
        let dataArticle = '';
        const linksbox = document.querySelector('.pagination__list');
        linksbox.innerHTML = '';
        
        articles.forEach (article => {
            dataArticle += createArticle(article);
        });
        let articlePage = Math.ceil(getCountArticle/params.show);
        const articleBox = document.querySelector('.article-result_js');
        articleBox.innerHTML = dataArticle;

        for(let i=0; i < articlePage; i++) {
            const linkLiElement = document.createElement('li');
            const link = createLinkElement(i);
            linkLiElement.appendChild(link);
            linksbox.insertAdjacentElement('beforeend', linkLiElement);
        }
        arrovPaginationControl(articlePage);
        preloader.classList.add('hidden');
    };
}

//Создание ссылок пагинации
function createLinkElement (page) {
    const linkElement = document.createElement('a');
    linkElement.classList.add('pagination__item');
    linkElement.classList.add('link_js');
    linkElement.innerText = page + 1;
    linkElement.href = '?page=' + page;
    let params = getParams();
    if (page === +params.page) {
        linkElement.classList.add('pagination__item_active');
    }

    linkElement.addEventListener('click', (e) => {
        e.preventDefault();
        const links = document.querySelectorAll('.link_js');
        let searchParams = new URLSearchParams(location.search);
        let params = getParams();
        links[params.page].classList.remove('pagination__item_active');
        searchParams.set('page', page);
        links[page].classList.add('pagination__item_active');
        history.replaceState(null, document.title, '?' + searchParams.toString());
        getArticle (getParams());
    })

    return linkElement;
}

//создание разметки статьи
function createArticle ({title, text, views, photo, commentsCount, date, tags}) {
    let dataTags = '';
    tags.forEach (tag => {
        dataTags += `<span class="article__tags_color" style="background:${tag.color}"></span>`;
    });
    let fulldDate = new Date(date);
    let getDay = (fulldDate.getDate()) < 10 ? "0"+fulldDate.getDate() : fulldDate.getDate();
    let getMonth = (fulldDate.getMonth()) < 10 ? "0"+fulldDate.getMonth() : fulldDate.getMonth();
    let dateToArticle = `${getDay}.${getMonth}.${fulldDate.getFullYear()}`;

    return `
    <article class="article">
    <picture>
        <source srcset="${SERVER_URL}${photo.mobilePhotoUrl}, ${SERVER_URL}${photo.mobile2xPhotoUrl} 2x" media="(max-width: 375px)">
        <source srcset="${SERVER_URL}${photo.tabletPhotoUrl}, ${SERVER_URL}${photo.tablet2xPhotoUrl} 2x" media="(max-width: 768px)">
        <source srcset="${SERVER_URL}${photo.desktopPhotoUrl}, ${SERVER_URL}${photo.desktop2xPhotoUrl} 2x">
        <img class="article__img" src="${SERVER_URL}${photo.desktopPhotoUrl}" alt="${title}" />
    </picture>
    <div class="article__content">
        ${dataTags}
        <div class="article__statistic">
            <span class="article__post-time">${dateToArticle}</span>
            <span class="article__views">${views} views</span>
            <span class="article__comments">${commentsCount} comments</span>
        </div>
        <h3 class="article__title">${title}</h3>
        <p class="article__text">${text}</p>
        <a class="article__link" href="#">Go to this post</a>
    </div>
</article>
    `
}



// При нажатии кнопки search в фильтр форме, сохранение и выставление search параметров
function getParamsToSubmit() {
    const form = document.forms.filters;

    setDataToFilter(getParams());

    form.addEventListener('submit', event => {

        event.preventDefault();
        let data = {
            page: 0,
        };
        data.search = form.elements.search.value;
        data.tags = [...form.elements.tags]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data.comments = [...form.elements.comments]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data.views = ([...form.elements.views].find(radio => radio.checked) || {
            value: null
        }).value;
        data.show = ([...form.elements.show].find(radio => radio.checked) || {
            value: null
        }).value;
        data.sort = ([...form.elements.sort].find(radio => radio.checked) || {
            value: null
        }).value;
        setsearchParams(data);
        getArticle (data);
    });
}


//создание html кода 1 тега чекбокса в фильтре

function createTag ({id, color}) {
    let tagChecked = '';
    if (id === 1 || id === 6) {
        tagChecked = 'checked';
    } else {
        tagChecked = '';
    }
    
    return `
    <li class="tags__item">
                            <input type="checkbox" name="tags" id="color-${id}" value="${id}" ${tagChecked}>
                            <label class="tags__label-${id}-color" for="color-${id}"><svg class="tags__check-mark"
                                    width="15" height="15" viewBox="0 0 15 15" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 6.75L5.91301 12.77C6.20128 13.2135 6.85836 13.1893 7.11327 12.7259L13.425 1.25"
                                        stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
                                </svg></label>
                        </li>
    `
}


//Выставление search параметров в адресную строку
function setsearchParams(data) {
    let searchParams = new URLSearchParams();
    
    searchParams.set('search', data.search);
    data.tags.forEach(item => {
        searchParams.append('tags', item);
    });
    data.comments.forEach(item => {
        searchParams.append('comments', item);
    });
    if (data.views) {
        searchParams.set('views', data.views);
    }
    if (data.show) {
        searchParams.set('show', data.show);
    }
    if (data.sort) {
        searchParams.set('sort', data.sort);
    }
    if (data.page) {
        searchParams.set('page', data.page);
    } else {
        searchParams.set('page', 0);
    }

    history.replaceState(null, document.title, '?' + searchParams.toString());
}

// Получение search параметров из адресной строки и выставление параметров при 1 загрузке страницы
function getParams(firstParams = false) {
    let searchParams = new URLSearchParams(location.search);
    let tag = null;
    let comment = null;
        if (!searchParams.getAll('tags').length) {
            tag = ["1", "6"];
        } else {
            tag = searchParams.getAll('tags');
        }
        comment = searchParams.getAll('comments');
        return {
            tags: tag,
            views: searchParams.get('views') || "100-500",
            comments: comment,
            show: searchParams.get('show') || "5",
            sort: searchParams.get('sort') || "date",
            search: searchParams.get('search') || '',
            page: +searchParams.get('page') || 0,
        };
};

//установка данных из объекта data в форму поиска
function setDataToFilter(data) {

    const form = document.forms.filters;

    form.elements.search.value = data.search;

    form.elements.tags.forEach(checkbox => {

        checkbox.checked = data.tags.includes(checkbox.value);

    })

    form.elements.comments.forEach(checkbox => {

        checkbox.checked = data.comments.includes(checkbox.value);

    });

    form.elements.views.forEach(radio => {

        radio.checked = data.views === radio.value;

    });

    form.elements.show.forEach(radio => {

        radio.checked = data.show === radio.value;

    });

    form.elements.sort.forEach(radio => {

        radio.checked = data.sort === radio.value;

    });

};