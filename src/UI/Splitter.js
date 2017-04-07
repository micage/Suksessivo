(function ( $ ) {

    $.fn.split = function( options ) {
        // defaults
        var settings = $.extend({
            horizontal: true, // otherwise layout is vertical
            thumbSize: 4,
            ratio: 0.5
        }, options );

        const onresize = function() {
            let box = $(this);
            let divs = box.children();
            let one = $(divs[0]);
            let bar = $(divs[1]);
            let two = $(divs[2]);
            let ratio = parseFloat(box.attr('ratio'));

            if (settings.horizontal) {
                let boxHeight = box.height();
                one.height(boxHeight);
                bar.height(boxHeight);
                two.height(boxHeight);
                let boxWidth = box.width();
                one.width(Math.floor((boxWidth - bar.width()) * ratio));
                two.width(boxWidth - one.width() - bar.width());
            }
            else { // vertical
                let boxWidth = box.width();
                one.width(boxWidth);
                bar.width(boxWidth);
                two.width(boxWidth);
                let boxHeight = box.height();
                one.height(Math.floor((boxHeight - bar.height()) * ratio));
                two.height(boxHeight - one.height() - bar.height());
            }
            box.trigger('ratio', ratio);
        };

        var self = this;
        // 'this' is an array of objects that matches the given selector, e.g. 'split-box'
        this.each(function() {
            // 'this' here is the actual DOM element that corresponds to the visited jquery object !!!
            let divs = $(this).children('div');
            if (! divs.length == 2) { // check, if there are exactly 2 divs
                return;
            }

            this.onresize = onresize.bind(this);

            // insert bar in between one and two
            let box = $(this);
            let one = divs.first().addClass('one');
            let two = divs.last().addClass('two').detach();
            let bar = $('<div>').addClass('bar');
            $(this).append(bar, two);

            if (settings.horizontal) {
                $(this).children('div').each(function(i, o) {
                    $(o).css('float', 'left');
                });

                bar.width(settings.thumbSize).height(box.height());
                one.width(Math.floor((box.width() - bar.width()) * settings.ratio)).height(box.height());
                two.width(box.width() - one.width() - bar.width()).height(box.height());
            }
            else {  // vertical
                bar.height(settings.thumbSize).width(box.width());
                one.height(Math.floor((box.height() - bar.height()) * settings.ratio)).width(box.width());
                two.height(box.height() - one.height() - bar.height()).width(box.width());
            }

            box.attr('ratio', settings.ratio);
            box.trigger('ratio', settings.ratio);

            let target = null;
            let cursorBackup = document.body.style.cursor;
            let barX = 0, barY = 0;

            bar.on('mousedown', function(evt) {
                target = evt.target;
                barX = evt.clientX - bar.offset().left;
                barY = evt.clientY - bar.offset().top;
                if (__DEBUG__ && 0) {
                    $('.out .barX .value').text(barX);
                    $('.out .barY .value').text(barY);
                }
                document.body.style.cursor = bar.css('cursor');
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
                evt.preventDefault();
            });

            const onMouseMove = function(evt) {
                self[0].dispatchEvent(new Event('ScrollStart', { "bubbles":true }));
                // $(self).trigger('scrollStart');

                if (settings.horizontal) {
                    let oneWidth = evt.clientX - box.offset().left - barX;
                    let twoWidth = box.width() - oneWidth - bar.width();
                    if (twoWidth < 0) {
                        twoWidth = 0;
                        oneWidth = box.width() - bar.width();
                    }
                    if (oneWidth < 0) {
                        oneWidth = 0;
                        twoWidth = box.width() - bar.width();
                    }
                    one.width(oneWidth);
                    two.width(twoWidth);

                    box.attr('ratio', one.width()/(box.width() - bar.width()) );
                }
                else {
                    let oneHeight = evt.clientY - box.offset().top - barY;
                    let twoHeight = box.height() - oneHeight - bar.height();
                    if (twoHeight < 0) {
                        twoHeight = 0;
                        oneHeight = box.height() - bar.height();
                    }
                    if (oneHeight < 0) {
                        oneHeight = 0;
                        twoHeight = box.height() - bar.height();
                    }
                    one.height(oneHeight);
                    two.height(twoHeight);

                    box.attr('ratio', one.height()/(box.height() - bar.height()) );
                }

                box.trigger('ratio', box.attr('ratio'));

                // cancel event
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            };

            const onMouseUp = function(evt) {
                self[0].dispatchEvent(new Event('ScrollStop', { "bubbles":true }));
                // $(self).trigger('scrollStop');
                document.body.style.cursor = cursorBackup;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

        });

        $(window).resize(function(evt) {
            self.each(onresize);
        });

        return this;
    };

}( jQuery ));
