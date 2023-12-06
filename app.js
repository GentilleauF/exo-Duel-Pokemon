

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
      endGame: false
    };
  },

  methods: {
    //Attaque du joueur
    attackDuPlayer() {
      console.log("ok");
      this.vieAdversaire -= 15;
      this.attackDeLadversaire();
    },

    //Attaque de l'adversaire
    attackDeLadversaire() {
      this.viePlayer -= 20;
      console.log(this.viePlayer, this.vieAdversaire);
      this.counterRound++;
      if (this.counterRound % 3 == 0) {
        console.log("55");
        return (this.chargeSpecialAttack = false);
      }
    },

    //Attaque speciale
    attackSpecial() {
      console.log("attackspecial");
      this.vieAdversaire -= 30;
      this.chargeSpecialAttack = true;
      this.attackDeLadversaire();
    },

    //Se soigner
    gainLife() {
      if (this.viePlayer <= 185) {
        this.viePlayer += 30;
        this.attackDeLadversaire();
      }
    },

    // Boutton lancer une nouvelle partie
    nouvellePartie () {
      this.endGame = false;
      this.gameOver= "";
      this.viePlayer= 200;
      this.vieAdversaire= 200;
      this.counterRound= 0;
    },

    giveUp () {
      console.log("clickkkk");
      this.endGame = true;
      this.myLoose++;
      this.nbrPartie++;
      this.gameOver = "GAME OVER!!! Vous avez abandonné la partie!!";
    }
  },

  watch: {
    // FIN DE PARIE si viePlayer ==0
    viePlayer(value){
      if(value<=0){
        this.gameOver = "GAME OVER!!! Vous avez perdu en" + this.counterRound + ' tours';
        this.endGame = true;
        this.myLoose++;
        this.nbrPartie++
      }
    },

    // FIN DE PARIE si vieAdversaire ==0
    vieAdversaire(value){
      if(value<=0){
        this.gameOver = 'Vous avez gagné en' + this.counterRound + ' tours';
        this.endGame = true;
        this.myWin++;
        this.nbrPartie++


      }
    }
  }
}).mount("#app");





