$(document).ready(function () {
    $('label[class=checkbox], label[class=radio]').on('click', function () {
        let checkbox = $(this).prev();
        if ($(this).attr('class') === 'checkbox') {
            checkbox.prop('checked', !checkbox.is(':checked'));
        } else {
            checkbox.prop('checked', true);
        }
    });

    $('.btn-toggle').on('click', function () {
        $(this).siblings('ul[class=toggle-list]').slideToggle(280);
    });

    $('.btn-toggle-continents').on('click', function () {
        $(this).siblings('ul[class=toggle-list-continents]').slideToggle(280);
    });

    $('.toggle-list li').on('click', function () {
        $(this).parent().siblings('span[class=display-country]').text($(this).text());
    });

    $('.dropdown-submenu li').on('click', function () {
        var country = $(this).parents(".toogle-list-continents")
            .siblings("a.insideElement").text() + ' / ' + $(this).find('a.insideElement').text();
        $(".display-continents").html(country);
    });

    // $('.btn-reset').on('click', function () {
    //     let parent = $(this).parent().parent();
    //     parent.find('.display-country').text('');
    //     parent.find('.toggle-list').css('display', 'none');
    //     parent.find('.display-continents').text('');
    //     parent.find('.toggle-list-continents').css('display', 'none');
    //     $(".phone-number").val('').prop('disabled', true)
    // });

    $('.js-scroll-top').on('click', function () {
        window.scrollTo({top: 0, behavior: "smooth"});
    });

    $('.checked').click(function () {
        let tableChecked = $(this).parents('table');
        let checkedCheckBox = $(this).data();
        if (tableChecked.hasClass('table-checked')) {
            let toggleTab = $(this).parents('.table-checked').find('.toggle');
            toggleTab.prop('checked', !checkedCheckBox.checked);
            checkedCheckBox.checked = !checkedCheckBox.checked;
        } else {
            $('.toggle').prop('checked', !checkedCheckBox.checked);
            checkedCheckBox.checked = !checkedCheckBox.checked;
        }
    })

})