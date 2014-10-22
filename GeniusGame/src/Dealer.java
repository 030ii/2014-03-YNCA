import java.util.Random;


public class Dealer {
	Random random = new Random();
	int turn = random.nextInt(2) + 1;

	public void compareNum(Player player1, Player player2) {
		if(player1.inputNum > player2.inputNum){
			player1.score++;
			System.out.println("Player1 scored a point");
			turn = 1;
			//player2에게 player1의 score 보여주는 
			return;
		}
		else if(player1.inputNum == player2.inputNum){
			System.out.println("Tie!");
			return;
		}
		else 
			player2.score++;
			System.out.println("Player2 scored a point");
			turn= 2;
			//player1에게 player1의 score 보여주는 
			return;
	}

}
