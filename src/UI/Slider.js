const Slider = (id, parent, cb) => {
    let _cb = cb;

    let span = $('<span>', {
        id: id + 'span'
    }).appendTo(parent).css({
        borderWidth: 1
    });

    let label = $('<label>', {
        id: id + 'lbl'
    }).appendTo(parent).text(id + ':').css({
        minWidth: 60,
        display: "inline-block",
        marginLeft: 10
    });

    let slider = $('<input>', {
        id: id + '_slider',
        type:'range',
        min:0,
        max:100,
        step:0.1,
        value:'0'
    }).on({
        "input": function(v) {
            if (typeof cb === "function") {
                _cb($(this));
            }
            $(this).next().text($(this).val());
        }
    });
    let textField = $('<label>', {
        id: id + '_val'
    }).text(slider.val()).css({
        minWidth: 60,
        display: "inline-block",
        marginLeft: 10
    });

    span.append(label, slider, textField);

    return {
        span,
        label,
        slider,
        textField,
        setCallback: function(cb) { this._cb = cb; }
    };
};

module.exports = Slider;
