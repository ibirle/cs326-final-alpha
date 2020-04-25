export{}
async function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/sign-s3?file-name="+file.name+"&file-type="+file.type);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
}

async function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log("Successfully Uploaded");
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
}

async function submit(){
  alert($("#startDate").val());
  const coverFileInput = document.getElementById('cover_image') as HTMLInputElement;
  const coverFile = coverFileInput.files![0];
  const detailFileInput = document.getElementById('cover_image') as HTMLInputElement;
  const detailFile = detailFileInput.files![0];

  if(coverFile == null || detailFile == null){
    return alert('No file selected.');
  }
  let coverURL = await getSignedRequest(coverFile);
  let detailURL = await getSignedRequest(detailFile);

  
  let data = {
    recipe_desc: $("#rescipeDesc").val(),
    recipe_link: $("#competitionName").val(),
    competition_name: $("#competitionName").val(),
    start_time: $("#startDate").val(),
    end_time: $("#endDate").val(),
    cover_link: coverURL,
    detail_link: detailURL,
    competition_type: $("#competition_type").val()
  }
  await fetch('/api/postChallenge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(data),
  });

  alert("Form Uploaded Successfully");
  $("#formBox").trigger("reset");
}