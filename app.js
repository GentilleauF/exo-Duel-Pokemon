Vue.createApp({
  data() {
    return {
      viePlayer: 200,
      vieAdversaire: 200,
      counterRound: 0,
      chargeSpecialAttack: true,
      gameOver: "",
      myWin: 0,
      myLoose: 0,
      nbrPartie: 0,
      endGame: false,
      statGame: [],
      lifeBarPerso: 'green',
      lifeBarAdversaire: 'green'
    };
  },

  methods: {
//Attaque du joueur
    attackDuPlayer() {
      let attack =  Math.floor(Math.random() * (20 - 10) + 10);
      console.log(attack);
      this.vieAdversaire -= attack;

      // LOG de suivi d'attaque
      statsDeLattack = "Vous avez infligé " + attack + " de dégats à l'adversaire";
      this.statGame.unshift(statsDeLattack);
      this.attackDeLadversaire();
    },



//Attaque speciale
    attackSpecial() {
      console.log("attackspecial");
      let attack =  Math.floor(Math.random() * (35 - 25) + 25);
      this.vieAdversaire -= attack;

      // Réinitialise l'attaque speciale
      this.chargeSpecialAttack = true;

      // LOG de suivi d'attaque
      statsDeLattack = "Vous avez infligé " + attack + " de dégats à l'adversaire"
      this.statGame.unshift(statsDeLattack)
      this.attackDeLadversaire();
    },


//Se soigner
    gainLife() {
      let heal =  Math.floor(Math.random() * (40 - 15) + 15);
      if (this.viePlayer <= 185) {
        this.viePlayer += heal;

        //LOG de suivi d'attaque
        let statsDeLattack = ""; 
        statsDeLattack = "Vous avez gagné "+ heal + "PDV" ;
        this.statGame.unshift(statsDeLattack);
        this.attackDeLadversaire();
      }
    },


//Attaque de l'adversaire
    attackDeLadversaire(attack) {
      let attackAdversaire =  Math.floor(Math.random() * (25 - 15) + 15);

      this.viePlayer -= attackAdversaire;
      console.log(this.viePlayer, this.vieAdversaire);
      this.counterRound++;

      // Log de suivi des attaques
      let statsDeLattack = ""; 
      statsDeLattack = "Vous a subi " + attackAdversaire + ' de dégats'
      this.statGame.unshift(statsDeLattack)
      
    
      //Debloque l'attaque speciale tout les 3 tours
      if (this.counterRound % 3 == 0) {
        console.log("55");
        return (this.chargeSpecialAttack = false);
      }

    },


// Boutton lancer une nouvelle partie
    nouvellePartie () {
      //reinitialise les parametres
      this.endGame = false;
      this.gameOver= "";
      this.viePlayer= 200;
      this.vieAdversaire= 200;
      this.counterRound= 0;
      this.statGame = [],
      this.lifeBarPerso= 'green',
      this.lifeBarAdversaire= 'green'
    },

// Boutton abandonner
    giveUp () {
      console.log("clickkkk");
      this.endGame = true;
      this.myLoose++;
      this.nbrPartie++;
      this.chargeSpecialAttack = true
      this.gameOver = "GAME OVER!!! Vous avez abandonné la partie!!";
    }
  },


  watch: {
  // FIN DE PARIE si viePlayer ==0
    viePlayer(value){
      if(value<=0){
        this.viePlayer = 0;
        this.gameOver = "GAME OVER!!! Vous avez perdu en " + this.counterRound + ' tours';
        this.endGame = true;
        this.myLoose++;
        this.nbrPartie++;
        this.chargeSpecialAttack = true
      }
      //Changer la couleur de la barre de vie
      if (value>100 && value<200) {
        this.lifeBarPerso = 'green'
      } else if (value<=100 && value>=50) {
        this.lifeBarPerso = 'orange'
      } else if (value<50 && value>=0) {
        this.lifeBarPerso = 'red'
      }
    },



// FIN DE PARIE si vieAdversaire ==0
    vieAdversaire(value){
      if(value<=0){
        this.vieAdversaire = 0;
        this.gameOver = 'Vous avez gagné en ' + this.counterRound + ' tours';
        this.endGame = true;
        this.chargeSpecialAttack = true
        this.myWin++;
        this.nbrPartie++;
      }
      //Changer la couleur de la barre de vie
      if (value>100 && value<200) {
        this.lifeBarPerso = 'green'
      } else if (value<=100 && value>=50) {
        this.lifeBarAdversaire = 'orange'
      } else if (value<50 && value>=0) {
        this.lifeBarAdversaire = 'red'
      }
    }
  }
}).mount("#app");


