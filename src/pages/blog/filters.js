const SERVER_URL = 'https://academy.directlinedev.com';

//XHR
(function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', SERVER_URL + '/api/tags', false);
    xhr.send();
    const tags = JSON.parse(xhr.response).data;
    const tagBox = document.querySelector('.tags__list');
    
    tags.forEach (tag => {
        const tagHTML = createTag (tag);
        tagBox.insertAdjacentHTML('beforeend', tagHTML);
    })
})();


(function () {
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
        updateLinks();
    });
    updateLinks();
})();



function createTag ({id, name, color}) {
    let tagChecket = '';
    if (id === 1 || id === 6) {
        tagChecket = 'checked';
    } else {
        tagChecket = '';
    }
    
    return `
    <li class="tags__item">
                            <input type="checkbox" name="tags" id="color-${id}" value="${id}" ${tagChecket}>
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

function getParams() {
    let searchParams = new URLSearchParams(location.search);

    let tag = null;
    let comment = null;
    if (!searchParams.getAll('tags').length) {
        tag = ["1", "6"];
    } else {
        tag = searchParams.getAll('tags');
    }
    if (!searchParams.getAll('comments').length) {
        comment = ["1"];
    } else {
        comment = searchParams.getAll('comments');
    }
    return {
        tags: tag,
        views: searchParams.get('views') || "2",
        comments: comment,
        show: searchParams.get('show') || "1",
        sort: searchParams.get('sort') || "1",
        search: searchParams.get('search') || '',
        page: +searchParams.get('page') || 0,
    };
};

function updateLinks() {
    const links = document.querySelectorAll('.link_js');
    let params = getParams();
    links.forEach(link => {
        link.classList.remove('pagination__item_active');
    });
    links[params.page].classList.add('pagination__item_active');
    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            let searchParams = new URLSearchParams(location.search);
            let params = getParams();
            links[params.page].classList.remove('pagination__item_active');
            searchParams.set('page', index);
            links[index].classList.add('pagination__item_active');
            history.replaceState(null, document.title, '?' + searchParams.toString());
        });
    });
}

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