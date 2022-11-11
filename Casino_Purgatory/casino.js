let points = 1000;
points = localStorage.getItem("pointsDungeon");
localStorage.setItem("pointsCasino", points);
let playerLevel = 1;
playerLevel = localStorage.getItem("levelDungeon");
console.log(localStorage.getItem("levelDungeon"));
localStorage.setItem("levelCasino", playerLevel);
let currentExp = 0;
currentExp = localStorage.getItem("xpDungeon");
console.log(localStorage.getItem("xpDungeon"));
localStorage.setItem("xpCasino", currentExp);
let experienceReq = 10;
experienceReq = localStorage.getItem("xpReqDungeon");
console.log(localStorage.getItem("xpReqDungeon"));
localStorage.setItem("xpReqCasino", experienceReq);
let result = "nothing";
let infinite = 0;
let garyMoney = 0;
let garySpins = 0;

async function activateGary(){
    if (points < 3000){
        alert("ERROR not enough funds!");
    }
    else{
        document.getElementById("gary").innerHTML = "Purchased! :)";
        addPoints(-3000);
        document.getElementById("garyTotal").innerHTML = "Gary's Total Winnings (for you): " + garyMoney;
        document.getElementById("garySpins").innerHTML = "Gary's Total Spins: " + garySpins;
        while (infinite < 1){
            await sleep(10000);
            garyStartSlots();
            await sleep(100);
            garyStopSpin();
        }

    }
}
let gun = false;
function activateGun(){
    if (points < 1000){
        alert("ERROR not enough funds!");
    }
    else{
        document.getElementById("gun").innerHTML = "Purchased! :)";
        addPoints(-1000);
        gun = true;
        localStorage.setItem("gun", true);
    }
    if (localStorage.getItem("gun") == true){
        document.getElementById("gun").innerHTML = "Purchased! :)";
    }
}
let fred = false;
function activateFred(){
    if (points < 2000){
        alert("ERROR not enough funds!");
    }
    else{
        document.getElementById("fred").innerHTML = "Purchased! :)";
        addPoints(-2000);
        fred = true;
    }
    if (fred == true){
        document.getElementById("fred").innerHTML = "Purchased! :)";
    }
}

console.log(localStorage.getItem("gun"));
console.log(localStorage.getItem("pointsCasino"));
console.log(localStorage.getItem("pointsDungeon"));

function equip(item){

}

let god = false;
function activateGod(){
    if (points < 2000){
        alert("ERROR not enough funds!");
    }
    else{
        document.getElementById("god").innerHTML = "Purchased! :)";
        addPoints(-2000);
        god = true;
    }
}

function randomize(){
    let count = 0;
    let game = document.getElementById("guessing");
    game.innerHTML = "<tr> <th>Guess: </th> <th>Number: </th> <th>Result: </th> </tr>";
    let max = document.getElementById("max").value;
    let random = Math.floor(Math.random() * (max) + 1);
    console.log(random);
    let response = prompt("Enter your guess: ");
    count++;
    while (response != random){
        if (response > random){
            result = "Too high! :(";
            game.innerHTML += "<tr> <td>" + count + "</td> <td>" + response + "</td> <td>" + result + "</td> </tr>";
            response = prompt("Sorry too high! Try again: ");
            count++;
        }
        else if (response < random){
            result = "Too low! :("
            game.innerHTML += "<tr> <td>" + count + "</td> <td>" + response + "</td> <td>" + result + "</td> </tr>";
            response = prompt("Sorry too low! Try again: ");
            count++;
        }
    }
        result = "Correct! Good job! :D";
        game.innerHTML += "<tr> <td>" + count + "</td> <td>" + response + "</td> <td>" + result + "</td> </tr>";
        let gamePoints = Math.floor(max / count);
        game.innerHTML += "<tr> <td> Points earned: </td> <td>" + gamePoints + "</td> <td> Nice! :D </td> </tr>";
        addPoints(gamePoints);
}

function addPoints(addedPoints){
    points = +points + +addedPoints;
    localStorage.setItem("pointsCasino", points);
    document.getElementById("points").innerHTML = "Total Points: " + localStorage.getItem("pointsCasino");
    if (points > 100000){
        let victory = document.createElement("h1");
        document.body.innerHTML = "<img src=\"Victory.png\">";
        victory.innerHTML = "Congratulations! You have officially beaten this casino! I bow to you good sir/madam!";
        document.body.appendChild(victory);
        alert("Congratulations! You have officially beaten this casino! I bow to you good sir/madam!");
        infinite = 1;
    }
    if (points < -2000){
        if (god == true){
            alert("You were about to lose, but then god stepped in and gave you your investment back! Spend it wisely.");
            addPoints(2000);
            god = false;
        }
        else {
            alert("Congratulations! You are now officially in permanent life debt with this casino! Consider your freedom " +
                "terminated :)")
            document.body.innerHTML = "<img src=\"gameOver.png\">"
            let defeat = document.createElement("h1");
            defeat.innerHTML = "Congratulations! You are now officially in permanent life debt with this casino! Consider your freedom terminated :)"
            document.body.appendChild(defeat);
            infinite = 1;
        }
    }
}

function getPoints(){
    document.getElementById("points").innerHTML = "Total Points: " + localStorage.getItem("pointsCasino");
}

let bet;
let playerValue = 0;
let dealerValue = 0;
let hiddenCard;
let dealerCard;
function startBlackJack(){
    bet = document.getElementById("bet").value;
    if (bet < 100 || bet > 1000){
        alert("Error bet not accepted!");
    }
    else{
        dealerCard = drawCard().src;
        let value = cardValue;
        hiddenCard = drawCard().src;
        let hiddenValue = cardValue;
        document.getElementById("dealerCards").innerHTML = "<img src=' " + dealerCard + "  '> <h1> + ??? </h1>";
        document.getElementById("dealerTotal").innerHTML = "<h1>" + value + " + ??? </h1>";
        dealerValue = value + hiddenValue;
        console.log(dealerValue);

        let card = drawCard().src;
        playerValue += cardValue;
        document.getElementById("playerCards").innerHTML += "<img src=' " + card + "  '>";


        card = drawCard().src;
        playerValue += cardValue;
        document.getElementById("playerCards").innerHTML += "<img src=' " + card + "  '>";
        document.getElementById("playerTotal").innerHTML = playerValue;

        //activate and deactivate buttons
        document.getElementById("start").innerHTML = "";
        document.getElementById("play").innerHTML = "<button class=\"btn-lg btn-primary\" onclick=\"play()\">Draw another</button>\n" +
            "    <button class=\"btn-lg\" onclick=\"pass()\">Pass</button>";
        document.getElementById("startAgain").innerHTML = "";
    }
}
function play(){
    let card = drawCard().src;
    playerValue += cardValue;
    document.getElementById("playerCards").innerHTML += "<img src=' " + card + "  '>";
    document.getElementById("playerTotal").innerHTML = playerValue;

    if (playerValue >= 21){
        pass();
    }
}
let card;
async function pass(){
    //activate and deactivate buttons
    document.getElementById("play").innerHTML = "";
    document.getElementById("dealerCards").innerHTML = "<img src=' " + dealerCard + "  '> <img src='" + hiddenCard + "'>";
    document.getElementById("dealerTotal").innerHTML = dealerValue;
    await sleep(2000);
    while (dealerValue <= playerValue && dealerValue < 21){
        card = drawCard().src;
        dealerValue += cardValue;
        document.getElementById("dealerCards").innerHTML += "<img src=' " + card + "  '>";
        document.getElementById("dealerTotal").innerHTML = dealerValue;
        await sleep(2000);
    }

    if (playerValue <= 21){
        if (dealerValue > playerValue && (dealerValue <= 21)){
            if (gun == true){
                let random = Math.floor(Math.random() * (4) + 1);
                if (random == 1){
                    alert("You used gun and didn't lose anything!");
                    console.log("gun");
                }
                else{
                    if (fred == true){
                        let random = Math.floor(Math.random() * (2) + 1);
                        if (random == 1){
                            let valueLost = bet * -1;
                            alert("Fred, From HR with his smooth talking skills helped reduced your loss to " + valueLost);
                            addPoints(valuelost);
                        }
                        else{
                            let valueLost = bet * -2;
                            alert("You just lost " + valueLost + " points! Dummy");
                            addPoints(valueLost);
                        }
                    }
                    else{
                        let valueLost = bet * -2;
                        alert("You just lost " + valueLost + " points! Dummy");
                        addPoints(valueLost);
                    }
                }
            }
            else{
                if (fred == true){
                    let random = Math.floor(Math.random() * (2) + 1);
                    if (random == 1){
                        let valueLost = bet * -1;
                        alert("Fred, From HR with his smooth talking skills helped reduced your loss to " + valueLost);
                        addPoints(valuelost);
                    }
                    else {
                        let valueLost = bet * -2;
                        alert("You just lost " + valueLost + " points! Dummy");
                        addPoints(valueLost);
                    }
                }
                else{
                    let valueLost = bet * -2;
                    alert("You just lost " + valueLost + " points! Dummy");
                    addPoints(valueLost);
                }
            }
        }
        else if (dealerValue == playerValue){
            alert("You tied and lost nothing");
        }
        else {
            if (fred == true){
                let random = Math.floor(Math.random() * (2) + 1);
                if (random == 1){
                    let valueWon = bet * 3;
                    valueWon *= 1.5;
                    alert("Fred, From HR used his smooth negotiation skills to increase your winnings to " + valueWon);
                    addPoints(valueWon);
                }
                else {
                    let valueWon = bet * 3;
                    alert("You just won " + valueWon + " points! Nice");
                    addPoints(valueWon);
                }
            }
            else{
                let valueWon = bet * 3;
                alert("You just won " + valueWon + " points! Nice");
                addPoints(valueWon);
            }
        }
    }
    else {
        if (gun == true){
            let random = Math.floor(Math.random() * (4) + 1);
            if (random == 1){
                alert("You used gun and didn't lose anything!");
                console.log("gun");
            }
            else {
                if (fred == true){
                    let random = Math.floor(Math.random() * (2) + 1);
                    if (random == 1){
                        let valueLost = bet * -1;
                        alert("You busted but, Fred, From HR with his smooth talking skills helped reduced your loss to " + valueLost);
                        addPoints(valueLost);
                    }
                    else{
                        let valueLost = bet * -2;
                        alert("You went over 21 and busted and lost " + valueLost + " points! Ha ha");
                        addPoints(valueLost);
                    }
                }
                else{
                    let valueLost = bet * -2;
                    alert("You went over 21 and busted and lost " + valueLost + " points! Ha ha");
                    addPoints(valueLost);
                }
            }
        }
        else{
            if (fred == true){
                let random = Math.floor(Math.random() * (2) + 1);
                if (random == 1){
                    let valueLost = bet * -1;
                    alert("You busted but, Fred, From HR with his smooth talking skills helped reduced your loss to " + valueLost);
                    addPoints(valueLost);
                }
                else{
                    let valueLost = bet * -2;
                    alert("You went over 21 and busted and lost " + valueLost + " points! Ha ha");
                    addPoints(valueLost);
                }
            }
            else{
                let valueLost = bet * -2;
                alert("You went over 21 and busted and lost " + valueLost + " points! Ha ha");
                addPoints(valueLost);
            }
        }
    }
    document.getElementById("startAgain").innerHTML = "<label> Enter your new bet (Minimum 100): </label>\n" +
        "    <input id=\"bet\" type=\"number\">\n" +
        "    <button class=\"btn-lg btn-primary\" onclick=\"startAgain()\">Play again? </button>";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let cardValue = 0;
function drawCard(){
    let random = Math.floor(Math.random() * (13) + 1);
    console.log(random);
    let card = document.createElement("img");
    if (random == 1){
        card.src = "cardDeck/Ace.png";
        cardValue = 11;
    }
    else if (random == 2){
        card.src = "cardDeck/Two.png";
        cardValue = 2;
    }
    else if (random == 3){
        card.src = "cardDeck/Three.png";
        cardValue = 3;
    }
    else if (random == 4){
        card.src = "cardDeck/Four.png";
        cardValue = 4;
    }
    else if (random == 5){
        card.src = "cardDeck/Five.png";
        cardValue = 5;
    }
    else if (random == 6){
        card.src = "cardDeck/Six.png";
        cardValue = 6;
    }
    else if (random == 7){
        card.src = "cardDeck/Seven.png";
        cardValue = 7;
    }
    else if (random == 8){
        card.src = "cardDeck/Eight.png";
        cardValue = 8;
    }
    else if (random == 9){
        card.src = "cardDeck/Nine.png";
        cardValue = 9;
    }
    else if (random == 10){
        card.src = "cardDeck/Ten.png";
        cardValue = 10;
    }
    else if (random == 11){
        card.src = "cardDeck/Jack.png";
        cardValue = 10;
    }
    else if (random == 12){
        card.src = "cardDeck/Queen.png";
        cardValue = 10;
    }
    else if (random == 13){
        card.src = "cardDeck/King.png";
        cardValue = 10;
    }

    return card;
}

function startAgain(){
    document.getElementById("dealerCards").innerHTML = "";
    document.getElementById("dealerTotal").innerHTML = "";
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("playerTotal").innerHTML = "";
    playerValue = 0;
    dealerValue = 0;
    startBlackJack();
}
let slotPoints;

function startSlots(bet){
    addPoints(bet);
    document.getElementById("slotStart").innerHTML = "";
    document.getElementById("slotEnd").innerHTML ="<button class=\"btn-lg\" onclick=\"stopSpin()\"> Stop! </button>";

    spinning();
}

function calculateTotal(){
    let totalPoints = 0;
    if (spinUpperLeftPoints == spinUpperMiddlePoints && spinUpperMiddlePoints == spinUpperRightPoints
        && spinUpperRightPoints == spinLeftPoints && spinLeftPoints == spinMiddlePoints && spinMiddlePoints ==
        spinRightPoints && spinRightPoints == spinLowerLeftPoints && spinLowerLeftPoints == spinLowerMiddlePoints &&
        spinLowerMiddlePoints == spinLowerRightPoints){
        totalPoints += spinUpperLeftPoints * 100;
    }
    else {
        if (spinUpperRightPoints == spinUpperMiddlePoints && spinUpperLeftPoints == spinUpperMiddlePoints){
            totalPoints += spinUpperLeftPoints;
        }
        if (spinLeftPoints == spinMiddlePoints && spinMiddlePoints == spinRightPoints){
            totalPoints += spinLeftPoints;
        }
        if (spinLowerLeftPoints == spinLowerMiddlePoints && spinLowerMiddlePoints == spinLowerRightPoints){
            totalPoints += spinLowerLeftPoints;
        }
        if (spinUpperLeftPoints == spinLeftPoints && spinLeftPoints == spinLowerLeftPoints){
            totalPoints += spinUpperLeftPoints * 2;
        }
        if (spinUpperMiddlePoints == spinMiddlePoints && spinMiddlePoints == spinLowerMiddlePoints){
            totalPoints += spinUpperMiddlePoints * 2;
        }
        if (spinUpperRightPoints == spinRightPoints && spinRightPoints == spinLowerRightPoints){
            totalPoints += spinUpperRightPoints * 2;
        }
        if (spinUpperRightPoints == spinMiddlePoints && spinMiddlePoints == spinLowerLeftPoints){
            totalPoints += spinUpperRightPoints * 3;
        }
        if (spinUpperLeftPoints == spinMiddlePoints && spinMiddlePoints == spinLowerRightPoints){
            totalPoints += spinUpperLeftPoints * 3;
        }
        document.getElementById("slotEnd").innerHTML = "";
        document.getElementById("slotStart").innerHTML = "<button class=\"btn-lg btn-primary\" onclick=\"startSlots(-100)\"> Spin! </button>";
    }

    addPoints(totalPoints);
    if (totalPoints >= 5000){
        if (fred == true){
            let random = Math.floor(Math.random() * (2) + 1);
            if (random == 1){
                totalPoints *= 1.5;
                alert("WOW! HOLY #%^$ INCREDIBLE! HOW DID YOU DO THAT??? FRED, FROM HR HELPED YOU WIN " + totalPoints + " POINTS!");
            }
            else {
                alert("WOW! HOLY #%^$ INCREDIBLE! HOW DID YOU DO THAT??? YOU WON " + totalPoints + " POINTS!");
            }
        }
        else {
            alert("WOW! HOLY #%^$ INCREDIBLE! HOW DID YOU DO THAT??? YOU WON " + totalPoints + " POINTS!");
        }
    }
    else if (totalPoints >= 1000){
        if (fred == true){
            let random = Math.floor(Math.random() * (2) + 1);
            if (random == 1){
                totalPoints *= 1.5;
                alert("It's your's and Fred, From HR's lucky day! Woohoo! " + totalPoints + " points!");
            }
            else {
                alert("It's somebody's lucky day! Woohoo! " + totalPoints + " points!");
            }
        }
        else {
            alert("It's somebody's lucky day! Woohoo! " + totalPoints + " points!");
        }

    }
    else if (totalPoints >= 500){
        if (fred == true){
            let random = Math.floor(Math.random() * (2) + 1);
            if (random == 1){
                totalPoints *= 1.5;
                alert("Wow nice! Fred, From HR helped you get " + totalPoints + " points! That's not bad at all.");
            }
            else {
                alert("Wow nice! " + totalPoints + " points! That's not bad at all.");
            }
        }
        else {
            alert("Wow nice! " + totalPoints + " points! That's not bad at all.");
        }

    }
    else if (totalPoints >= 200){
        if (fred == true){
            let random = Math.floor(Math.random() * (2) + 1);
            if (random == 1){
                totalPoints *= 1.5;
                alert("Nice, Fred, From HR got you a decent haul! " + totalPoints + " points!");
            }
            else {
                alert("Nice, decent haul! " + totalPoints + " points!");
            }
        }
        else {
            alert("Nice, decent haul! " + totalPoints + " points!");
        }

    }
    else if (totalPoints > 0) {
        if (fred == true) {
            let random = Math.floor(Math.random() * (2) + 1);
            if (random == 1) {
                totalPoints *= 1.5;
                alert("Congrats " + totalPoints + " points, Fred, From HR helped you win something at least");
            } else {
                alert("Congrats " + totalPoints + " points, you won something at least");
            }
        } else {
            alert("Congrats " + totalPoints + " points, you won something at least");
        }
    }
    else if (totalPoints == 0){
        if (gun == true){
            let random = Math.floor(Math.random() * (4) + 1);
            if (random == 1){
                alert("You won nothing, but you used gun and got your money back!");
                addPoints(100);
                console.log("gun");
            }
            else {
                if (fred == true){
                    let random = Math.floor(Math.random() * (2) + 1);
                    if (random == 1){
                        alert("Fred, From HR used his bulging biceps to get you 50 points back after that loss");
                        addPoints(50);
                    }
                    else{
                        alert("You won nothing! :(");
                    }
                }
            }
        }
        else{
            if (fred == true){
                let random = Math.floor(Math.random() * (2) + 1);
                if (random == 1){
                    alert("Fred, From HR used his bulging biceps to get you 50 points back after that loss");
                    addPoints(50);
                }
                else{
                    alert("You won nothing! :(");
                }
            }
            else{
                alert("You won nothing! :(");
            }
        }
    }
}
function spin(){
    let random = Math.floor(Math.random() * (1000) + 1);
    let spin = document.createElement("img");

    if (random <= 200){
        spin.src = "slotSymbol/cherry.png";
        slotPoints = 50;
    }
    else if (random <= 400){
        spin.src = "slotSymbol/banana.png";
        slotPoints = 100;
    }
    else if (random <= 550){
        spin.src = "slotSymbol/grape.png";
        slotPoints = 200;
    }
    else if (random <= 650){
        spin.src = "slotSymbol/lemon.png";
        slotPoints = 300;
    }
    else if (random <= 750){
        spin.src = "slotSymbol/orange.png";
        slotPoints = 400;
    }
    else if (random <= 850){
        spin.src = "slotSymbol/watermelon.png";
        slotPoints = 500;
    }
    else if (random <= 900){
        spin.src = "slotSymbol/bell.png";
        slotPoints = 600;
    }
    else if (random <= 950){
        spin.src = "slotSymbol/777.png";
        slotPoints = 777;
    }
    else if (random <= 1000){
        spin.src = "slotSymbol/bar.png";
        slotPoints = 1000;
    }
    return spin;
}
let interval;
function spinning(){
    interval = setInterval("slots()", 100);
}
let spinUpperLeftPoints;
let spinUpperMiddlePoints;
let spinUpperRightPoints;
let spinLeftPoints;
let spinMiddlePoints;
let spinRightPoints;
let spinLowerLeftPoints;
let spinLowerMiddlePoints;
let spinLowerRightPoints;
function slots(){
    let spinUpperLeft = spin().src;
    spinUpperLeftPoints = slotPoints;
    document.getElementById("slotUpperLeft").innerHTML = "<img src=' " + spinUpperLeft + "  ' width = 200px>";
    let spinUpperMiddle = spin().src;
    spinUpperMiddlePoints = slotPoints;
    document.getElementById("slotUpperMiddle").innerHTML = "<img src=' " + spinUpperMiddle + "  ' width = 200px>";
    let spinUpperRight = spin().src;
    spinUpperRightPoints = slotPoints;
    document.getElementById("slotUpperRight").innerHTML = "<img src=' " + spinUpperRight + "  ' width = 200px>";
    let spinLeft = spin().src;
    spinLeftPoints = slotPoints;
    document.getElementById("slotLeft").innerHTML = "<img src=' " + spinLeft + "  ' width = 200px>";
    let spinMiddle = spin().src;
    spinMiddlePoints = slotPoints;
    document.getElementById("slotMiddle").innerHTML = "<img src=' " + spinMiddle + "  ' width = 200px>";
    let spinRight = spin().src;
    spinRightPoints = slotPoints;
    document.getElementById("slotRight").innerHTML = "<img src=' " + spinRight + "  ' width = 200px>";
    let spinLowerLeft = spin().src;
    spinLowerLeftPoints = slotPoints;
    document.getElementById("slotLowerLeft").innerHTML = "<img src=' " + spinLowerLeft + "  ' width = 200px>";
    let spinLowerMiddle = spin().src;
    spinLowerMiddlePoints = slotPoints;
    document.getElementById("slotLowerMiddle").innerHTML = "<img src=' " + spinLowerMiddle + "  ' width = 200px>";
    let spinLowerRight = spin().src;
    spinLowerRightPoints = slotPoints;
    document.getElementById("slotLowerRight").innerHTML = "<img src=' " + spinLowerRight + "  ' width = 200px>";
}

function stopSpin(){
    clearInterval(interval);
    calculateTotal();
}


function garyStartSlots(){
    console.log("start");

    spinning();
}
function garyCalculateTotal(){
    console.log("stop");
    let totalPoints = 0;
    if (spinUpperLeftPoints == spinUpperMiddlePoints && spinUpperMiddlePoints == spinUpperRightPoints
        && spinUpperRightPoints == spinLeftPoints && spinLeftPoints == spinMiddlePoints && spinMiddlePoints ==
        spinRightPoints && spinRightPoints == spinLowerLeftPoints && spinLowerLeftPoints == spinLowerMiddlePoints &&
        spinLowerMiddlePoints == spinLowerRightPoints){
        totalPoints += spinUpperLeftPoints * 100;
    }
    else {
        if (spinUpperRightPoints == spinUpperMiddlePoints && spinUpperLeftPoints == spinUpperMiddlePoints){
            totalPoints += spinUpperLeftPoints;
        }
        if (spinLeftPoints == spinMiddlePoints && spinMiddlePoints == spinRightPoints){
            totalPoints += spinLeftPoints;
        }
        if (spinLowerLeftPoints == spinLowerMiddlePoints && spinLowerMiddlePoints == spinLowerRightPoints){
            totalPoints += spinLowerLeftPoints;
        }
        if (spinUpperLeftPoints == spinLeftPoints && spinLeftPoints == spinLowerLeftPoints){
            totalPoints += spinUpperLeftPoints * 2;
        }
        if (spinUpperMiddlePoints == spinMiddlePoints && spinMiddlePoints == spinLowerMiddlePoints){
            totalPoints += spinUpperMiddlePoints * 2;
        }
        if (spinUpperRightPoints == spinRightPoints && spinRightPoints == spinLowerRightPoints){
            totalPoints += spinUpperRightPoints * 2;
        }
        if (spinUpperRightPoints == spinMiddlePoints && spinMiddlePoints == spinLowerLeftPoints){
            totalPoints += spinUpperRightPoints * 3;
        }
        if (spinUpperLeftPoints == spinMiddlePoints && spinMiddlePoints == spinLowerRightPoints){
            totalPoints += spinUpperLeftPoints * 3;
        }
    }
    if (fred == true){
        let random = Math.floor(Math.random() * (2) + 1);
        if (random == 1){
            totalPoints *= 1.5;
            console.log("fred");
        }
    }

    if (totalPoints > 1000){
        alert("GARY WON BIG CHECK IT OUT! " + totalPoints + " POINTS!!! :D GO GARY!");
    }
    garySpins++;
    garyMoney += totalPoints;
    document.getElementById("garyTotal").innerHTML = "Gary's Total Winnings (for you): " + garyMoney;
    document.getElementById("garySpins").innerHTML = "Gary's Total Spins: " + garySpins;
    addPoints(totalPoints);
}

function garyStopSpin(){
    clearInterval(interval);
    garyCalculateTotal();
}
