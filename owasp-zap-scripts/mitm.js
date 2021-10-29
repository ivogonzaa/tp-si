function sendingRequest(msg, initiator, helper) {
    try {
        uri = msg.getRequestHeader().getURI();
        uri.setEscapedAuthority("tpsibad.azurewebsites.net/prendas");
        msg.getRequestHeader().setURI(uri);
    }
    catch (err) { }
    print('sendingRequest called for url=' + msg.getRequestHeader().getURI().toString())
}

function responseReceived(msg, initiator, helper) {
    print('responseReceived called for url=' + msg.getRequestHeader().getURI().toString())
}