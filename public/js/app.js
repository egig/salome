nunjucks.configure('/_tpl');
var router = new Navigo();
ROUTE_CONFIG.init(router, nunjucks);

$.get('/api/playlists', function(playlists) {
    var plNav = nunjucks.render('playlist-nav.html', {playlists: playlists});
    $(playlistNav).html(plNav);

    router.updatePageLinks();
});
