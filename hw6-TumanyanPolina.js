Hero.TYPE_THIEF = 'thief';
Hero.TYPE_WARS = 'wars';
Hero.TYPE_WIZARD = 'wizard';
Monster.TYPE_GOBLIN = 'goblin';
Monster.TYPE_ORCS = 'orks';
Monster.TYPE_VAMPIRE = 'vampire';

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
    [Monster.TYPE_VAMPIRE, 80]
]);

class Character {
    costructor(life, damage) {
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
    takeDamage(damage) { //нанести урон
        if (typeof this === 'Hero') {
            if (this.shouldUseSkill() && !this.usedPotion) {
                this.life -= 0; //неуязвим
            } else this.life -= damage;
        }
        if (typeof this === 'Monster') {
            if (this.shouldUseSkill() && this.usedPotion) {
                this.life -= 0;
            } else this.life -= damage;
        }
    }
    attack(otherCharacter) { //передаем того, кого атакуем
        otherCharacter.takeDamage(this.damage);
    }
    isAlive() {
        return this.life > 0;
    }
    get life() {
        return this.life;
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
        if (typeof this === 'Hero') {
            if (this.shouldUseSkill() && this.usedPotion) {
                return 2 * this.damage;
            } else return this.damage;
        }
        if (typeof this === 'Monster') {
            if (this.shouldUseSkill() && !this.usedPotion) {
                return 2 * this.damage;
            } else return this.damage;
        }
    }
}

class Hero extends Character {
    constructor(type) {
        const life = Hero.TYPE_LIFE_MAP.get(type);
        const damage = Hero.TYPE_DAMAGE_MAP.get(type);
        super(life, damage);
        this.type = type;
    }
}

class Monster extends Character {
    constructor(type) {
        const life = Monster.TYPE_LIFE_MAP.get(type);
        const damage = Monster.TYPE_DAMAGE_MAP.get(type);
        super(life, damage);
        this.type = type;
    }
}

class Tournament {
    constructor(n, ...characters) {
        this.chatacters = [...characters];
        this.n
    }
}

let monster1 = new Monster(Monster.TYPE_ORCS);
let hero1 = new Hero(Hero.TYPE_THIEF);

//создать массив из чарактеров и записать его в переменную
проверить что длина меньше или = чем н
если нет ошибка есди да - записать чаракеров в зыс чарактерс