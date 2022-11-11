//rpg
let currentPoints = 0;
currentPoints = localStorage.getItem("pointsCasino");
localStorage.setItem("pointsDungeon", currentPoints);
let playerLevel = 1;
playerLevel = localStorage.getItem("levelCasino");
console.log(localStorage.getItem("levelCasino"));
localStorage.setItem("levelDungeon", playerLevel);
let currentExp = 0;
currentExp = localStorage.getItem("xpCasino");
console.log(localStorage.getItem("xpCasino"));
localStorage.setItem("xpDungeon", currentExp);
let experienceReq = 10;
experienceReq = localStorage.getItem("xpReqCasino");
console.log(localStorage.getItem("xpReqCasino"));
localStorage.setItem("xpReqDungeon", experienceReq);

//active Items

function addPoints(point){
    currentPoints = +currentPoints + +point;
    localStorage.setItem("pointsDungeon", currentPoints);
    console.log(localStorage.getItem("pointsDungeon", currentPoints));
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let startFloor = 0;
let highestFloor = 0;
highestFloor = localStorage.getItem("highestFloor")
function setStart(start) {
    if (highestFloor >= start) {
        startFloor = start;
        document.getElementById("title").innerHTML = "Choose your Starting floor! Current start: " + startFloor;
    } else {
        alert("You must reach this floor at least once before you can start here.");
    }
}
    function startAdventure() {
        document.getElementById("startBtn").innerHTML = "";
        document.getElementById("title").innerHTML = "Choose your Starting floor! Current start: " + startFloor;
        document.getElementById("selectionTable").innerHTML = "<tr>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(10)\">10</button></h1></td>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(60)\">60</button></h1></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(20)\">20</button></h1></td>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(70)\">70</button></h1></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(30)\">30</button></h1></td>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(80)\">80</button></h1></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(40)\">40</button></h1></td>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(90)\">90</button></h1></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td><h1><button class=\"btn-lg \" onclick=\"setStart(50)\">50</button></h1></td>\n" +
            "        <td><h1><button class=\"btn-lg\" onclick=\"setStart(100)\">100</button></h1></td>\n" +
            "    </tr>"
        document.getElementById("go").innerHTML = "<button class=\"btn-lg\" onclick=\"go()\">Go!</button>";
    }

    let floor = 0;

    function go() {
        floor = startFloor;
        document.getElementById("title").innerHTML = "Current Floor: " + floor + " // Current Points: " + currentPoints;
        document.getElementById("selectionTable").innerHTML = "";
        document.getElementById("go").innerHTML = "<button onclick='descend()'> Descend </button>";
        playerHP = 1000 + (3 * playerLevel);
        playerTHP = playerHP;
        playerAttack = 5 + (2 * playerLevel);
        playerEvasion = 0 + (Math.floor(playerLevel / 3));
        document.getElementById("return").innerHTML = "";
        descend();
    }

    async function descend() {
        floor++;
        document.getElementById("title").innerHTML = "Current Floor: " + floor + " // Current Points: " + currentPoints;
        document.getElementById("go").innerHTML = "";
        document.getElementById("leave").innerHTML = "";

        createEnemy("random", 1);
        document.getElementById("result1").innerHTML = "";
        await battle();
        document.getElementById("result5").innerHTML = "";
        if (playerHP > 0) {
            document.getElementById("go").innerHTML = "<button onclick='descend()'> Descend </button>";
            document.getElementById("leave").innerHTML = "<button> <a href='casino.html'>Leave?</a></button>";
        } else {
            document.getElementById("leave").innerHTML = "<button> <a href='casino.html'>Reawaken</a></button>";
        }

    }

    let enemyLevel;
    let points = 0;
    let totalHP = 0;
    let totalPoints = 0;
    let totalXP = 0;
    let numEnemies = 0;
    let enemyList = [];

    function createEnemy(type, num) {
        let random;
        enemyLevel = Math.floor(floor / 2) + 1;
        if (type == "random") {
            numEnemies = num;
            let enemy1 = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            let enemy2 = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            let enemy3 = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            let enemy4 = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            enemyList = [enemy1, enemy2, enemy3, enemy4];
            for (let i = 0; i < num; i++) {
                let id = "enemy" + (i + 1);
                if (floor > 0 && floor < 10) {
                    random = Math.floor(Math.random() * (3) + 1);
                    if (random == 1) {
                        enemyList[i].enemyID = 1;
                        enemyList[i].enemyName = "Slime";
                        enemyList[i].enemyHP = 10 + enemyLevel;
                        enemyList[i].enemyTHP = enemyList[i].enemyHP;
                        document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                        enemyList[i].enemyAttack = 2 + enemyLevel;
                        enemyList[i].enemyDefence = 0;
                        enemyList[i].enemyEvasion = 0;
                        enemyList[i].xp = 1 + enemyLevel;
                        enemyList[i].points = 100;
                        enemyList[i].slotEmpty = false;
                    } else if (random == 2) {
                        enemyList[i].enemyID = 2;
                        enemyList[i].enemyName = "Rat";
                        enemyList[i].enemyHP = 5 + enemyLevel;
                        enemyList[i].enemyTHP = enemyList[i].enemyHP;
                        document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                        enemyList[i].enemyAttack = 4 + enemyLevel;
                        enemyList[i].enemyDefence = -2 + enemyLevel;
                        enemyList[i].enemyEvasion = 20;
                        enemyList[i].xp = 2 + enemyLevel;
                        enemyList[i].points = 200;
                        enemyList[i].slotEmpty = false;
                    } else {
                        enemyList[i].enemyID = 3;
                        enemyList[i].enemyName = "Bat";
                        enemyList[i].enemyHP = 10 + enemyLevel;
                        enemyList[i].enemyTHP = enemyList[i].enemyHP;
                        document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                        enemyList[i].enemyAttack = 2 + enemyLevel;
                        enemyList[i].enemyDefence = 0 + enemyLevel;
                        enemyList[i].enemyEvasion = 0;
                        enemyList[i].xp = 1 + enemyLevel;
                        enemyList[i].points = 150;
                        enemyList[i].slotEmpty = false;
                    }
                }
                if (floor == 10) {
                    enemyList[i].enemyID = 4;
                    enemyList[i].enemyName = "Royal Jelly";
                    enemyList[i].enemyHP = 30 + (5 * enemyLevel);
                    enemyList[i].enemyTHP = enemyList[i].enemyHP;
                    document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                    enemyList[i].enemyAttack = 4 + enemyLevel;
                    enemyList[i].enemyDefence = 20 + enemyLevel;
                    enemyList[i].enemyEvasion = 0;
                    enemyList[i].xp = 20;
                    enemyList[i].points = 2000;
                    enemyList[i].slotEmpty = false;
                }
            }
            totalPoints += enemyList[0].points + enemyList[1].points + enemyList[2].points + enemyList[3].points;
            totalHP += enemyList[0].enemyHP + enemyList[1].enemyHP + enemyList[2].enemyHP + enemyList[3].enemyHP;
            totalXP += enemyList[0].xp + enemyList[1].xp + enemyList[2].xp + enemyList[3].xp;
        }

        if (type == "slimeling") {
            let i = 0;
            let slimelingMade = false;
            while (i < 4 && slimelingMade == false) {
                let id = "enemy" + (i + 1);
                console.log("almost");
                if (enemyList[i].slotEmpty === true) {
                    console.log("got it");
                    enemyList[i].enemyID = 5;
                    enemyList[i].enemyName = "Slimeling";
                    enemyList[i].enemyHP = 5 + (1 * enemyLevel);
                    enemyList[i].enemyTHP = enemyList[i].enemyHP;
                    document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                    enemyList[i].enemyAttack = 2 + Math.floor(0.5 * enemyLevel);
                    enemyList[i].enemyDefence = 0;
                    enemyList[i].enemyEvasion = 0;
                    enemyList[i].xp = 1;
                    enemyList[i].points = 50;
                    enemyList[i].slotEmpty = false;
                    numEnemies++;
                    slimelingMade = true;
                    totalXP += enemyList[i].xp;
                    totalPoints += enemyList[i].points;
                    totalHP += enemyList[i].enemyHP;
                }
                i++;
            }
        }
        if (type == "slime") {
            let i = 0;
            let slimeMade = false;
            while (i < 4 && slimeMade == false) {
                let id = "enemy" + (i + 1);
                if (enemyList[i].slotEmpty == true) {
                    enemyList[i].enemyID = 1;
                    enemyList[i].enemyName = "Slime";
                    enemyList[i].enemyHP = 10 + enemyLevel;
                    enemyList[i].enemyTHP = enemyList[i].enemyHP;
                    document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                    enemyList[i].enemyAttack = 2 + enemyLevel;
                    enemyList[i].enemyDefence = 0;
                    enemyList[i].enemyEvasion = 0;
                    enemyList[i].xp = 1 + enemyLevel;
                    enemyList[i].points = 100;
                    enemyList[i].slotEmpty = false;
                    numEnemies++;
                    slimeMade = true;
                    totalXP += enemyList[i].xp;
                    totalPoints += enemyList[i].points;
                    totalHP += enemyList[i].enemyHP;
                }
                i++;
            }
        }
        if (type == "splitRoyal") {
            let i = 0;
            let splitMade = false;
            while (i < 4 && splitMade == false) {
                let id = "enemy" + (i + 1);
                if (enemyList[i].slotEmpty == true) {
                    enemyList[i].enemyID = 4.5;
                    enemyList[i].enemyName = "Royal Jelly";
                    enemyList[i].enemyHP = enemyList[currentEnemy].enemyHP;
                    enemyList[i].enemyTHP = enemyList[i].enemyHP;
                    document.getElementById(id).innerHTML = " // Lv " + enemyLevel + " " + enemyList[i].enemyName + " " + enemyList[i].enemyHP + "/" + enemyList[i].enemyTHP + " // ";
                    enemyList[i].enemyAttack = 4 + enemyLevel;
                    enemyList[i].enemyDefence = 20 + enemyLevel;
                    enemyList[i].enemyEvasion = 0;
                    enemyList[i].slotEmpty = false;
                    numEnemies++;
                    splitMade = true;
                    totalHP += enemyList[i].enemyHP;
                }
                i++;
            }
            if (splitMade == false) {
                enemyList[3].enemyID = 4.5;
                enemyList[3].enemyName = "Royal Jelly";
                enemyList[3].enemyHP = enemyList[currentEnemy].enemyHP;
                enemyList[3].enemyTHP = enemyList[3].enemyHP;
                document.getElementById("ememy4").innerHTML = " // Lv " + enemyLevel + " " + enemyList[3].enemyName + " " + enemyList[3].enemyHP + "/" + enemyList[3].enemyTHP + " // ";
                enemyList[3].enemyAttack = 4 + enemyLevel;
                enemyList[3].enemyDefence = 20 + enemyLevel;
                enemyList[3].enemyEvasion = 0;
                enemyList[3].slotEmpty = false;
                numEnemies++;
                totalHP += enemyList[4].enemyHP;
            }
        }
    }

    let playerDodge = false;
    let playerAttack = 0;
    let playerHP = 0;
    let playerTHP = 0;
    let playerDefence = 0;
    let playerEvasion = 0;
    let currentEnemy = 10;
    let currentResult = 0;
    let poison = 0;

    async function battle() {
        document.getElementById("player").innerHTML = "Lv " + playerLevel + " You " + playerHP + "/" + playerTHP;
        let random;
        if (numEnemies == 1) {
            document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
        } else if (numEnemies == 2) {
            document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
            document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
        } else if (numEnemies == 3) {
            document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
            document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
            document.getElementById("enemy3").innerHTML = " // Lv " + enemyLevel + " " + enemyList[2].enemyName + " " + enemyList[2].enemyHP + "/" + enemyList[2].enemyTHP + " // ";
        } else {
            document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
            document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
            document.getElementById("enemy3").innerHTML = " // Lv " + enemyLevel + " " + enemyList[2].enemyName + " " + enemyList[2].enemyHP + "/" + enemyList[2].enemyTHP + " // ";
            document.getElementById("enemy4").innerHTML = " // Lv " + enemyLevel + " " + enemyList[3].enemyName + " " + enemyList[3].enemyHP + "/" + enemyList[3].enemyTHP + " // ";
        }
        while (totalHP > 0 && playerHP > 0) {
            console.log(totalHP);
            random = Math.floor(Math.random() * (100) + 1);
            if (random <= playerEvasion) {
                playerDodge = true;
            }
            for (let i = 0; i < numEnemies; i++) {
                random = Math.floor(Math.random() * (100) + 1);
                if (random <= enemyList[i].enemyEvasion) {
                    enemyList[i].enemyDodge = true;
                }
            }
            await (playerTurn());
            await (sleep(1000));
            document.getElementById("result1").innerHTML = "";
            document.getElementById("result2").innerHTML = "";
            document.getElementById("result3").innerHTML = "";
            document.getElementById("result4").innerHTML = "";
            document.getElementById(target).style.color = "black";
            target = null;
            await (sleep(500));
            for (let i = 0; i < numEnemies; i++) {
                currentEnemy = i;
                currentResult = "result" + (i + 1);
                if (enemyList[i].enemyHP > 0) {
                    if (enemyList[i].enemyID == 1) {
                        await (slime());
                    }
                    if (enemyList[i].enemyID == 2) {
                        await (rat());
                    }
                    if (enemyList[i].enemyID == 3) {
                        await (bat());
                    }
                    if (enemyList[i].enemyID == 4) {
                        await (royalJelly());
                    }
                    if (enemyList[i].enemyID == 4.5) {
                        await (royalJellyClone());
                    }
                    if (enemyList[i].enemyID == 5) {
                        await (slimeling());
                    }
                } else {
                    numEnemies--;
                    for (let j = i; j < numEnemies; j++) {
                        enemyList[j] = enemyList[j + 1];
                    }
                    i--;
                }
            }
            if (poison > 0) {
                playerHP -= poison;
                poison--;
            }
            if (poison > 0) {
                document.getElementById("player").innerHTML = "Lv " + playerLevel  + " You " + playerHP + "/" + playerTHP + " Poisoned x" + poison;
            } else {
                document.getElementById("player").innerHTML = "Lv " + playerLevel  + " You " + playerHP + "/" + playerTHP;
            }
            if (numEnemies == 1) {
                document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
                document.getElementById("enemy2").innerHTML = "";
                document.getElementById("enemy3").innerHTML = "";
                document.getElementById("enemy4").innerHTML = "";
            } else if (numEnemies == 2) {
                document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
                document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
                document.getElementById("enemy3").innerHTML = "";
                document.getElementById("enemy4").innerHTML = "";
            } else if (numEnemies == 3) {
                document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
                document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
                document.getElementById("enemy3").innerHTML = " // Lv " + enemyLevel + " " + enemyList[2].enemyName + " " + enemyList[2].enemyHP + "/" + enemyList[2].enemyTHP + " // ";
                document.getElementById("enemy4").innerHTML = "";
            } else if (numEnemies == 4) {
                document.getElementById("enemy1").innerHTML = " // Lv " + enemyLevel + " " + enemyList[0].enemyName + " " + enemyList[0].enemyHP + "/" + enemyList[0].enemyTHP + " // ";
                document.getElementById("enemy2").innerHTML = " // Lv " + enemyLevel + " " + enemyList[1].enemyName + " " + enemyList[1].enemyHP + "/" + enemyList[1].enemyTHP + " // ";
                document.getElementById("enemy3").innerHTML = " // Lv " + enemyLevel + " " + enemyList[2].enemyName + " " + enemyList[2].enemyHP + "/" + enemyList[2].enemyTHP + " // ";
                document.getElementById("enemy4").innerHTML = " // Lv " + enemyLevel + " " + enemyList[3].enemyName + " " + enemyList[3].enemyHP + "/" + enemyList[3].enemyTHP + " // ";
            }
            await (sleep(1000));
        }
        if (totalHP <= 0) {
            document.getElementById("result1").innerHTML = "Congrats you are victorious! You earned " + totalXP + " exp and " + totalPoints + " points!";
            document.getElementById("enemy1").innerHTML = "";
            document.getElementById("enemy2").innerHTML = "";
            document.getElementById("enemy3").innerHTML = "";
            document.getElementById("enemy4").innerHTML = "";
            calcExp(totalXP);
            addPoints(totalPoints);

            totalHP = 0;
            totalPoints = 0;
            totalXP = 0;

            document.getElementById("title").innerHTML = "Current Floor: " + floor + " // Current Points: " + currentPoints;
            if (floor > highestFloor) {
                highestFloor = floor;
                localStorage.setItem("highestFloor", highestFloor);
            }
            enemyList[0] = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            enemyList[1] = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            enemyList[2] = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};
            enemyList[3] = {enemyHP: 0, xp: 0, points: 0, slotEmpty: true};

        } else if (playerHP <= 0) {
            let pointsLost = Math.floor(currentPoints() / -3 );
            document.getElementById("result1").innerHTML = "You died! But the casino still binds you. Also, you lost " + pointsLost + " points!";
            addPoints(pointsLost);
            document.getElementById("title").innerHTML = "Current Floor: " + floor + " // Current Points: " + currentPoints;
        }
        numEnemies = 0;
        poison = 0;
    }

    let action = false;

    async function playerTurn() {
        document.getElementById("selectionTable").innerHTML = "<tr>\n" +
            "        <td><button onclick='attack(\"punch\")'>Punch! </button></td> <td>" + display("punch") + "</td>\n" +
            "        <td><button onclick='attack(\"punch\")'>Punch! </button></td> <td>" + display("punch") + "</td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td><button onclick='attack(\"punch\")'>Punch! </button></td> <td>" + display("punch") + "</td>\n" +
            "        <td><button onclick='attack(\"punch\")'>Punch! </button></td> <td>" + display("punch") + "</td>\n" +
            "    </tr>";
        while (action === false) {
            await (sleep(1000));
        }
        action = false;
        document.getElementById("selectionTable").innerHTML = "";
        await (sleep(1000));
    }

    function calcExp(exp) {
        currentExp = +currentExp + +exp;
        localStorage.setItem("xpDungeon", currentExp);
        if (+currentExp >= +experienceReq) {
            playerLevel++;
            localStorage.setItem("levelDungeon", playerLevel);
            currentExp -= experienceReq;
            localStorage.setItem("xpDungeon", currentExp);
            experienceReq = (+experienceReq) * 2;
            localStorage.setItem("xpReqDungeon", experienceReq);
            points = 500;
            document.getElementById("result2").innerHTML = "Nice! You leveled up! Take this complimentary " + points + " points!";
            addPoints(500);
            playerTHP = 1000 + (3 * playerLevel);
            playerHP += 3;
            document.getElementById("player").innerHTML = "Lv " + playerLevel + " You " + playerHP + "/" + playerTHP;
            playerAttack = 5 + (2 * playerLevel);
            playerEvasion = 0 + (Math.floor(playerLevel / 3));
        }
    }

//player attacks
    let target = null;
    let previousTarget = null;

    function chooseTarget(choice) {
        target = choice.id;
        document.getElementById(target).style.color = "red";
        if (previousTarget == null) {
            previousTarget = target;
        }
        if (previousTarget != target) {
            document.getElementById(previousTarget).style.color = "black";
            previousTarget = target;
        }
    }

    let healthRestore = 0;

    function attack(what) {
        if (target == null) {
            alert("please choose a target");
        } else {
            let enemyHit = parseInt(target.substring(target.length - 1)) - 1;
            if (what == "punch") {
                let damage = playerAttack;
                if (action != true) {
                    if (enemyList[enemyHit].enemyDodge == true) {
                        document.getElementById("result5").innerHTML = "You tried to punch the enemy, but the enemy dodged."
                        enemyList[enemyHit].enemyDodge = false;
                    } else {
                        damage = Math.floor(damage * (1 - (enemyList[enemyHit].enemyDefence / 100)));
                        document.getElementById("result5").innerHTML = "You smacked the enemy right in their stupid face dealing " + damage + " damage!";
                        enemyList[enemyHit].enemyHP -= damage;
                        if (enemyList[enemyHit].enemyHP < 0) {
                            healthRestore = enemyList[enemyHit].enemyHP;
                        }
                        totalHP -= damage + healthRestore;
                        healthRestore = 0;
                    }
                }
                action = true;
            }
        }
    }

    function display(attack) {
        if (attack == "punch") {
            let damage = playerAttack;
            return ("Nothing special. Punches the enemy, in their face, neck, and crotch area dealing " + damage + " damage.");
        }

    }


//enemy attacks

    function slime() {
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            slimeSpit();
        } else if (random == 2) {
            slimeSpit();
        } else if (random == 3) {
            if (numEnemies < 4) {
                summonSlimeling();
            } else {
                document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to summon a little slimeling but failed.";
            }
        } else {
            if (numEnemies < 4) {
                summonSlimeling();
            } else {
                document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to summon a little slimeling but failed.";
            }
        }
    }

    function summonSlimeling() {
        document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + "  spat on the floor and the spit turned into a small slimeling!"
        createEnemy("slimeling");
    }

    function slimeling() {
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            slimeSpit();
        } else if (random == 2) {
            slimeSpit();
        } else if (random == 3) {
            slimeSpit();
        } else {
            slimeSpit();
        }
    }

    function slimeSpit() {
        let damage = enemyList[currentEnemy].enemyAttack;
        if (playerDodge == true) {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to spit slime at you but you ducked just in time!";
            playerDodge = false;
        } else {
            damage = Math.floor(damage * (1 - (playerDefence / 100)));
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " spit a slime glob at you dealing " + damage + " damage!";
            playerHP -= damage
        }
    }

    function bat() {
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            flyHigh();
        } else if (random == 2) {
            bite();
        } else if (random == 3) {
            bite();
        } else {
            bite();
        }
    }

    function flyHigh() {
        enemyList[currentEnemy].enemyEvasion += 20;
        if (enemyList[currentEnemy].enemyEvasion > 50) {
            enemyList[currentEnemy].enemyEvasion -= 10;
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to fly faster, but it was already at max evasion."
        } else {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " flew faster and faster around the room, increasing its evasion."
        }
    }

    function bite() {
        let damage = enemyList[currentEnemy].enemyAttack;
        if (playerDodge == true) {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + "  tried to bite you, but you slided out of the way!"
            playerDodge = false;
        } else {
            damage = Math.floor(damage * (1 - (playerDefence / 100)));
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " bit a chunk out of you you dealing " + damage + " damage!";
            playerHP -= damage;
        }
    }

    function rat() {
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            bite();
        } else if (random == 2) {
            bite();
        } else if (random == 3) {
            poisonousBite();
        } else {
            poisonousBite();
        }
    }

    function poisonousBite() {
        let damage = enemyList[currentEnemy].enemyAttack - 2;
        if (playerDodge == true) {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to poison you, but you slided out of the way!"
            playerDodge = false;
        } else {
            let poisonApplied = 2;
            poison += poisonApplied;
            damage = Math.floor(damage * (1 - (playerDefence / 100)));
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " gave you an infected wound dealing " + damage + " damage and applying " + poisonApplied + " poison!";
            playerHP -= damage;

        }
    }

    let hasSplit = false;

    function royalJelly() {
        if (enemyList[currentEnemy].enemyHP <= 30 && hasSplit == false) {
            split();
            hasSplit = true;
        }
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            slimeSpit();
        } else if (random == 2) {
            crush();
        } else if (random == 3) {
            harden();
        } else {
            if (numEnemies >= 3) {
                document.getElementById(currentResult).innerHTML = "The Royal Jelly Tried to summon minions, but there was no more space available!"
            } else {
                summonSlime();
            }
        }
    }

    function royalJellyClone() {
        let random = Math.floor(Math.random() * (4) + 1);
        if (random == 1) {
            slimeSpit();
        } else if (random == 2) {
            crush();
        } else if (random == 3) {
            harden();
        } else {
            if (numEnemies >= 3) {
                document.getElementById(currentResult).innerHTML = "The Royal Jelly Tried to summon minions, but there was no more space available!"
            } else {
                summonSlime();
            }
        }
    }

    function split() {
        document.getElementById("result5").innerHTML = "The " + enemyList[currentEnemy].enemyName + " split into two!!!"
        createEnemy("splitRoyal");
    }

    function crush() {
        let damage = enemyList[currentEnemy].enemyAttack * 1.5;
        if (playerDodge == true) {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + "  tried to crush you but you were fast enough to escape!"
            playerDodge = false;
        } else {
            damage = Math.floor(damage * (1 - (playerDefence / 100)));
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + "  crushed your spine in dealing " + damage + " damage!";
            playerHP -= damage
        }
    }

    function harden() {
        enemyList[currentEnemy].enemyDefence += 10;
        if (enemyList[currentEnemy].enemyDefence > 50) {
            enemyList[currentEnemy].enemyDefence -= 10;
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " tried to harden itself, but it was already at max defence."
        } else {
            document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + "'s skin hardened as its defence increased."
        }
    }

    function summonSlime() {
        document.getElementById(currentResult).innerHTML = "The " + enemyList[currentEnemy].enemyName + " split off a small blob of itself which formed into a slime!"
        createEnemy("slime");
    }
