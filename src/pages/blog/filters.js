(function() {
    getParams ();


    function setDataToFilter () {

    };
})();

function getParams () {
    let searchParams = new URLSearchParams(location.search);
    console.log(searchParams.getAll('comments-item-checkbox'));
}