window.onload = function(){
    $("#addItemBtn").click(function(){
        optionValue = $("#item").val();
        q = $("#quantity").val();
        item = $('<td>').text($('#item option[value="'+optionValue+'"]').text());
        quantity = $('<td>').text(q);
        row = $('<tr>').append(item).append(quantity);
        $("#itemTable").append(row);
        obj = $('#sale').val();
        if(obj == ''){
            obj = {};
            obj.itemid = optionValue;
            obj.quantity = q;
            $('#sale').val(JSON.stringify([obj]));
        } else {
            o = {};
            o.itemid = optionValue;
            o.quantity = q;
            obj = JSON.parse(obj);
            obj.push(o);
            $('#sale').val(JSON.stringify(obj));
        }
        total = parseInt($('#price').val());
        selected = $('#item').find('option:selected');
        $('#price').val(total + q * selected.data('price'));
    })
}
