(function()
{
    const orderId = getUrlParam()
    showNumCommand(orderId)
}());
function getUrlParam()
{
    let params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function showNumCommand(orderId)
{
    const spanOrderId = document.getElementById('orderId');
          spanOrderId.innerText = orderId;
}

