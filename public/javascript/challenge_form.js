document.getElementById("cover_image").onchange = () => {
    const fileInput = document.getElementById('cover_image');
    const file = fileInput.files[0];
    if (file == null) {
        return alert('No file selected.');
    }
    getSignedRequest(file);
};
function getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
            }
            else {
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}
function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        console.log(url);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert("Successfully Uploaded");
            }
            else {
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}
