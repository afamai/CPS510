$(document).ready(function(){
    $("select#vendor").change(function() {
        var selectedVendor = $(this).children("option:selected").val();
        if (selectedVendor === "new") {
            window.location = "/vendor/add";
        }
    });
});