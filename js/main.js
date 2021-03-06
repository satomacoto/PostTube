
// IFrame Player APIを非同期にロード
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// APIをダウンロードしたら<iframe>とYouTubeプレイヤーを生成
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '580',
        videoId: 'qqXMM8v9vn0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log(event);
    }
}

function onPlayerError(event) {
    console.log(event);
}


$(document).ready(function() {
    $("#container").masonry({
        itemSelector: '.item',
        columnWidth: 200,
        isAnimated: true
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://post-tube.satomacoto.com/tubes/random?limit=20&callback=?",
        success: function(data) {
            var entries = data.entries;
            for (var i=0; i < entries.length; i++) {
                var entry = entries[i];
                var fontsize = Math.sqrt(50 / entry.title.length);
                var tube = $("<div/>")
                    .css("background-image", "url(http://i.ytimg.com/vi/" + entry.videoid + "/0.jpg)")
                    .css("font-size", fontsize + "em")
                    .css("color", "rgba(0, 0, 0, 0)")
                    .attr("id", entry.videoid)
                    .attr("class", "item post")
                    .css("height", "100")
                    // .text(entry.title)
                    .click(function() {
                        player.loadVideoById($(this).attr('id'));
                    });
                $("#container").append(tube).masonry(tube).masonry("reload");
            }
        }
    });
});
