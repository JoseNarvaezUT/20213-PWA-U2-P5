
let pathSw = '/20213-PWA-EF/sw.js';
let url = window.location.href;

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        pathSw = '/sw.js';
    }
    navigator.serviceWorker.register(pathSw);
}

let principal = $('#principal');
let notice = $('#notice');
let page = 0;


$('#notices').on('click', '.btn-seguir', function (e) {
    e.preventDefault();
    principal.fadeOut(function () {
        notice.fadeIn(1000);
    });
});

$('.btn-regresar').on('click', function () {
    console.log('Regresar');
    notice.fadeOut(function () {
        principal.fadeIn(1000);
    });
});



function loadNotices(page) {

    fetch('http://192.168.20.127:8084/api/notice/page/' + page)
        .then(res => res.json())
        .then(resp => {
            totalPages = resp.totalPages;
            resp.content.forEach(notice => {
                let noticeHtml = $(`
                <div class="col-12 pt-2 pb-2 border-bottom border-success">
                <img src="data:image/jpeg;base64,${notice.attachedNotice.file}" class="img-fluid" alt="">
                <h4>${notice.title}</h4>
                <div class="row">
                    <div class="col-6 text-muted text-center">
                        ${notice.datePublic}
                    </div>
                    <div class="col-6 text-info text-center font-italic ">
                        ${notice.hashTag}
                    </div>
                </div>
                <div class="font-italic text-justify">
                    ${notice.initialDescription}
                </div>
                <a href="" class="float-right btn btn-sm btn-info btn-seguir" data-id-notice="${notice.id}"  >Seguir leyendo...</a>
            </div>
            `);

                $('#notices').append(noticeHtml);
            });
        })
        .catch((err) => {
            alert('Se presento un error cargar las noticias')
        });
}


loadNotices(0);