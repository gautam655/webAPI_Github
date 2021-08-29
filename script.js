var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

//Container Elements
const container=document.getElementById("container");
const userId=document.getElementById("userId");
const pullData=document.getElementById("pullData");

//Name Element
const name_login=document.getElementById("name_login");
const name_pers=document.getElementById("name");
const login=document.getElementById("login");

//Image And repo list
const image=document.getElementById("image");
const repo_list=document.getElementById("repo_list");
const text=document.getElementById("text");
const btngroup2=document.getElementById("btngroup2");

pullData.addEventListener('click',function(){
  let username=userId.value;
  getNameLogin(username);
  getRepoList(username);
});

function getNameLogin(username){
  var url=`https://api.github.com/users/${username}`;
  request.addEventListener('load',function(event){
    let data=JSON.parse(event.target.responseText);
    console.log(data);
    name_pers.innerText=data.name;
    login.innerText=`(@${data.login})`;
    login.href=data.url;
    image.innerHTML= `<img src="${data.avatar_url}"/>`;
    let follower=document.createElement("p");
    let follow="Followers: " +data.followers + "-Following: " +data.following +"\n"+"Repos: "+data.public_repos;
    follower.innerText=follow;
    image.appendChild(follower);
  });

  request.open('get',url);
  request.send();
}

function getRepoList(username){
  var url=`https://api.github.com/users/${username}/repos`;
  request2.addEventListener("load",function(event){
    text.innerText="Repo List: "
    let data=JSON.parse(event.target.responseText);
    data.forEach(function(dat){
      let btn=document.createElement("button");
      btn.setAttribute('class','btns');
      btn.href=dat.url;
      btn.innerText=dat.name;
      btn.setAttribute('onclick',`location.href='${dat.url}';`);
      console.log(btn);
      btngroup2.appendChild(btn);

    });
  });
  request2.open("get",url);
  request2.send();
}
