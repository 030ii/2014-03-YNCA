var Play = {


  /* when you click the 'point submit button' */
  inputSomething : function () {
    var content = this.method.getInputContent();

    switch (this.progress) {
        case 1:
          this.inputPlayer1Id(content);
          this.method.doSomething(this.progress);
          this.progress ++;
            break;
        case 2:
          this.inputPlayer2Id(content);
          this.method.doSomething(this.progress);
          this.progress ++;
            break;
        case 3:
          this.proceedRound(content);
            break;
        case 4:
          this.proceedRound(content);
            break;
    }
  },


}
