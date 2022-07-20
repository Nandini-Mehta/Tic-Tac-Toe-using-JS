
const selectBox = document.querySelector(".container"),
selectXBtn = selectBox.querySelector(".player-x"),
selectOBtn = selectBox.querySelector(".player-o"),
playboard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = playboard.querySelector(".players"),
result = document.querySelector(".result"),
msg = result.querySelector(".text"),
replay = result.querySelector("button");
let playerID;
let runBot=true;

window.onload=()=>{
    for(let i=0; i<allBox.length; i++)
    {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectXBtn.onclick=()=>{
    selectBox.classList.add("hide");
    playboard.classList.add("show");
}
selectOBtn.onclick=()=>{
    selectBox.classList.add("hide");
    playboard.classList.add("show");
    players.classList.add("active-o");
}
 
function clickedBox(element)
{
    if(players.classList.contains("active-o")){
        element.innerHTML = "<p>O<p/>";
        players.classList.remove("active-o");
        playerID="O";
        element.setAttribute("id", playerID);
    }
    else{
        element.innerHTML = "<p>X<p/>";;
        players.classList.add("active-o");
        playerID="X";
        element.setAttribute("id", playerID);
    }
    selectWinner();
    playboard.style.pointerEvents ="none";
    element.style.pointerEvents ="none";

    let randomTimeDelay = ((Math.random() * 1000)+ 500).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}

function bot(runBot){   
    if(runBot){
    let array =[];
    for(let i=0; i<allBox.length; i++){
        if(allBox[i].childElementCount ==0){
            array.push(i);
        } 
    }  
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length >0)
    {
        if(players.classList.contains("active-o")){
            allBox[randomBox].innerHTML = "<p>O<p/>";
            players.classList.remove("active-o");
            playerID = "O";
            allBox[randomBox].setAttribute("id", playerID);
        }
        else{
            allBox[randomBox].innerHTML = "<p>X<p/>";;
            players.classList.add("active-o");
            playerID = "X";
            allBox[randomBox].setAttribute("id", playerID);
        }
        selectWinner();
    }
    playboard.style.pointerEvents ="auto";
    allBox[randomBox].style.pointerEvents ="none";
    }
}
function getId(name){
    return (document.querySelector(".box" + name).id);
}
function check(val1, val2, val3, playerID){ 
    if(getId(val1) == playerID && getId(val2) == playerID && getId(val3) == playerID){
        return true;
    }
}
function selectWinner(){
    if(check(1,2,3,playerID) || check(4,5,6,playerID) || 
    check(7,8,9,playerID) || check(1,4,7,playerID) ||
    check(2,5,8,playerID) || check(3,6,9,playerID) || 
    check(1,5,9,playerID) || check(3,5,7,playerID))
    {
        runBot=false;
        bot(runBot);

        setTimeout(()=>{
            result.classList.add("show");
            playboard.classList.remove("show");   
        }, 500);

        msg.innerHTML = `<h1>Hurrey !!!</h1>
        <p>Player ${playerID} won the game 😎</p>`;
    }

    else {
        if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "")
        {
            runBot=false;
            bot(runBot);

            setTimeout(()=>{
                result.classList.add("show");
                playboard.classList.remove("show");    
            }, 500);
            msg.innerHTML = `<h1>Match has been drawn !!!</h1>`;
        }
    }
}

replay.onclick =()=>{
    window.location.reload();
}