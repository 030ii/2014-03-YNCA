
public class Gameroom {

	static public void main (String args[]){
//		System.out.print('\u000C');
		
		Player player1 = new Player();
		Player player2 = new Player();
		Dealer dealer = new Dealer();
		
		player1.numOfToken=99;
		player2.numOfToken=99;
		
		int round;
		for(round = 1; round <=9; round++){
			
			if(player1.score==5){
				System.out.println("Player1 wins!");
				break;
			}
			else if(player2.score==5){
				System.out.println("Player2 wins!");
				break;
			}
			
			if(dealer.turn == 1){
			player1.inputNum(1);  
			player1.showResult();
			//player1의 색 조정, 게이지 조정 정보 player2에게 보여주는 
			player2.inputNum(2); 
			player2.showResult();
			//player2의 색 조정, 게이지 조정 정보 player1에게 보여주는 
			dealer.compareNum(player1, player2);
			
			}
			else if(dealer.turn == 2){
				player2.inputNum(2); 
				//player2의 색 조정, 게이지 조정 정보 player1에게 보여주는
				player2.showResult();
				player1.inputNum(1);  
				//player1의 색 조정, 게이지 조정 정보 player2에게 보여주는 
				player1.showResult();
				dealer.compareNum(player1, player2);
			}
			
			if(round == 9){
				if(player1.score > player2.score){
					System.out.println("Player1 wins!");
				}
				else if(player1.score == player2.score){
					//3rounds를 더하는 부분.. 
					for(round = 1; round <=3; round++){
						player1.inputNum(1);  
						//player1의 색 조정, 게이지 조정 정보 player2에게 보여주는 
						player2.inputNum(2); 
						dealer.compareNum(player1, player2);
					}
					if(player1.score>player2.score){
						System.out.println("player1 wins!");
					}
					else if(player1.score==player2.score){
						System.out.println("Tie!");
					}
					else 
						System.out.println("Player2 wins!");
				}
				else
					System.out.println("Player2 wins!");
			}
		}
		
		
	}
}
