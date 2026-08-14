var appendDownloadLink = function (item) {
    var downloadLink = item && item.el ? item.el.attr('data-download-link') : ''
    var magnificPopup = $.magnificPopup.instance
    if (!magnificPopup || !magnificPopup.content) {
        return
    }

    var $title = magnificPopup.content.find('.mfp-title')
    $title.find('[data-gallery-download-link=true]').remove()
    if (downloadLink && $title.length) {
        $('<a></a>')
            .attr('href', downloadLink)
            .attr('target', '_blank')
            .attr('class', 'ms-2')
            .attr('data-gallery-download-link', 'true')
            .text('Download')
            .appendTo($title)
    }
}

$('[data-gallery-lightbox=true]').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    },
    image: {
        titleSrc: function (item) {
            return item.el.attr('data-caption') || ''
        }
    },
    callbacks: {
        open: function () {
            appendDownloadLink(this.currItem)
        },
        change: function () {
            appendDownloadLink(this.currItem)
        }
    }
})
