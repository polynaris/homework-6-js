class Character {
    constructor(life, damage) {
        this.life = life;
        this.damage = damage;
        this.maxLife = life;
        this.counter = 2;
        this.usedPotion = false;
        this.usedSuperSkill = false;
    }
    superSkill() {
        this.usedSuperSkill = true;
    }
    takePotion() {
        this.usedPotion = true;
    }
    heal() {
        this.life = this.maxLife;
    }
    takeDamage(damage) {
        if (this instanceof Hero) {
            if (this.shouldUseSkill() && !this.usedPotion) {
                this.life -= 0;
            } else this.life -= damage;
        }
        if (this instanceof Monster) {
            if (this.shouldUseSkill() && this.usedPotion) {
                this.life -= 0;
            } else this.life -= damage;
        }
    }
    attack(otherCharacter) {
        otherCharacter.takeDamage(this.damage);
    }
    isAlive() {
        return this.life > 0;
    }
    get life() {
        return this._life;
    }
    set life(life) {
        this._life = life;
    }
    shouldUseSkill() {
        if (this.life < this.maxLife / 2 && this.counter > 0 && this.usedSuperSkill === false) {
            this.counter--;
            if (this.counter === 0) {
                this.usedSuperSkill === true;
            }
            return true;
        };
        return false;
    }
    get damage() {
        if (this instanceof Hero) {
            if (this.shouldUseSkill() && this.usedPotion) {
                return 2 * this._damage;
            } else return this._damage;
        }
        if (this instanceof Monster) {
            if (this.shouldUseSkill() && !this.usedPotion) {
                return 2 * this._damage;
            } else return this._damage;
        }
    }
    set damage(damage) {
        this._damage = damage;
    }
}

class Hero extends Character {
    constructor(type, name) {
        const life = Hero.TYPE_LIFE_MAP.get(type);
        const damage = Hero.TYPE_DAMAGE_MAP.get(type);
        super(life, damage);
        this.type = type;
        if (this.checkName(name)) {
            this.name = name;
        } else {
            throw new Error('This name not found! :(');
        }
    }
    checkName(name) {
        return Hero.NAME.includes(name);
    }
}

class Monster extends Character {
    constructor(type, name) {
        const life = Monster.TYPE_LIFE_MAP.get(type);
        const damage = Monster.TYPE_DAMAGE_MAP.get(type);
        super(life, damage);
        this.type = type;
        if (this.checkName(name)) {
            this.name = name;
        } else {
            throw new Error('This name not found! :(');
        }
    }
    checkName(name) {
        return Monster.NAME.includes(name);
    }
}

Hero.TYPE_THIEF = 'thief';
Hero.TYPE_WARS = 'wars';
Hero.TYPE_WIZARD = 'wizard';
Hero.NAME = ['Maxim', 'Kirill', 'Guldan', 'Naymar', 'Ronaldo', 'Jesus', 'Leonid'];
Monster.TYPE_GOBLIN = 'goblin';
Monster.TYPE_ORCS = 'orks';
Monster.TYPE_VAMPIRE = 'vampire';
Monster.NAME = ['Polina', 'Anna', 'Olga', 'Galina', 'Kompany', 'Mumu', 'Ququsha'];

Hero.TYPE_LIFE_MAP = new Map([
    [Hero.TYPE_THIEF, 200],
    [Hero.TYPE_WARS, 250],
    [Hero.TYPE_WIZARD, 180],
]);
Hero.TYPE_DAMAGE_MAP = new Map([
    [Hero.TYPE_THIEF, 40],
    [Hero.TYPE_WARS, 20],
    [Hero.TYPE_WIZARD, 60],
]);
Monster.TYPE_LIFE_MAP = new Map([
    [Monster.TYPE_GOBLIN, 170],
    [Monster.TYPE_ORCS, 300],
    [Monster.TYPE_VAMPIRE, 150]
]);
Monster.TYPE_DAMAGE_MAP = new Map([
    [Monster.TYPE_GOBLIN, 55],
    [Monster.TYPE_ORCS, 15],
    [Monster.TYPE_VAMPIRE, 70]
]);

class Tournament {
    constructor(n, characters) {
        this.verifyQuantity(n, characters);
        this.n = n;
    }
    verifyQuantity(n, characters) {
        if (characters.length <= n) {
            this.chatacters = characters;
        } else
            throw new Error('Error!!!Too many participants registered!!! ');
    }
    start() {
        let winnerOfTournament = this.battle(this.chatacters);
        if (winnerOfTournament === null) {
            console.log(`There is no winner! Everybody died`);
        } else {
            console.log(`Winner is ${winnerOfTournament.name}`);
        }
    }
    battle(characters) {
        if (characters.length > 2) {
            const char1 = this.battle(characters.slice(0, characters.length / 2));
            const char2 = this.battle(characters.slice(characters.length / 2, characters.length));
            return this.fight(char1, char2);
        } else if (characters.length > 1) {
            return this.fight(characters[0], characters[1]);
        } else {
            return characters[0];
        }
    }
    fight(char1, char2) {
        if (char1 === null) {
            if (char2 === null) {
                return null;
            }
            return char2;
        }
        if (char2 === null) {
            return char1;
        }
        while (char1.isAlive() && char2.isAlive()) {
            char1.attack(char2);
            char2.attack(char1);
        }
        let winner;
        if (char1.isAlive()) {
            winner = char1;
            char1.life = char1.maxLife;
            console.log(`${char1.name} won ${char2.name}`);
        } else if (char2.isAlive()) {
            winner = char2;
            char2.life = char2.maxLife;
            console.log(`${char2.name} won ${char1.name}`)
        } else {
            console.log(`${char1.name} drew with ${char2.name}. Both are DEAD`)
            return null;
        }
        return winner;
    }
}

let tourney = new Tournament(3, [
    new Hero(Hero.TYPE_THIEF, 'Leonid'),
    new Hero(Hero.TYPE_WIZARD, 'Naymar'),
    new Hero(Hero.TYPE_WARS, 'Guldan'),
    new Monster(Monster.TYPE_ORCS, 'Olga'),
    new Monster(Monster.TYPE_VAMPIRE, 'Polina'),
]);

tourney.start();