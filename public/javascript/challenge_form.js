"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getSignedRequest(file) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function uploadFile(file, signedRequest, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Successfully Uploaded");
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    });
}
function submit() {
    return __awaiter(this, void 0, void 0, function* () {
        alert($("#startDate").val());
        const coverFileInput = document.getElementById('cover_image');
        const coverFile = coverFileInput.files[0];
        const detailFileInput = document.getElementById('cover_image');
        const detailFile = detailFileInput.files[0];
        if (coverFile == null || detailFile == null) {
            return alert('No file selected.');
        }
        let coverURL = yield getSignedRequest(coverFile);
        let detailURL = yield getSignedRequest(detailFile);
        let data = {
            recipe_desc: $("#rescipeDesc").val(),
            recipe_link: $("#competitionName").val(),
            competition_name: $("#competitionName").val(),
            start_time: $("#startDate").val(),
            end_time: $("#endDate").val(),
            cover_link: coverURL,
            detail_link: detailURL,
            competition_type: $("#competition_type").val()
        };
        yield fetch('/api/postChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        alert("Form Uploaded Successfully");
        $("#formBox").trigger("reset");
    });
}
