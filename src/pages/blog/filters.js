(function() {
    const form = document.forms.filters;

    setDataToFilter(getParams ());

    form.addEventListener('submit', event => {
        event.preventDefault();
       let data = {};
       data.search = form.elements.search.value;
       data.tags = [...form.elements.tags]
       .filter (checkbox => checkbox.checked)
       .map (checkbox => checkbox.value);
       data.comments = [...form.elements.comments]
       .filter (checkbox => checkbox.checked)
       .map (checkbox => checkbox.value);
       data.views = ([...form.elements.views].find(radio => radio.checked ) || {value: null}.value);
       data.show = ([...form.elements.show].find(radio => radio.checked ) || {value: null}.value);
       data.sort = ([...form.elements.sort].find(radio => radio.checked) || {value: null}.value);
    });
})();

function getParams () {
    let searchParams = new URLSearchParams(location.search);
    
    return {
        tags: searchParams.getAll('tags'),
        views: searchParams.get('views'),
        comments: searchParams.getAll('comments'),
        show: searchParams.get('show'),
        sort: searchParams.get('sort'),
        search: searchParams.get('search') || '',
    };
};

function setDataToFilter (data) {
    const form = document.forms.filters;

    form.elements.search.value = data.search;

    form.elements.tags.forEach (checkbox => {

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