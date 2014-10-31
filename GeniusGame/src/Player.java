import java.util.Scanner;


public class Player {
int numOfToken;
int inputNum;
int score=0;
String color="something";
int gauge=5;

public void inputNum(int num){
	System.out.println(num +" Input a number");
	Scanner input = new Scanner(System.in);
	inputNum = input.nextInt();
	//만약 가진 숫자보다 큰 숫자를 넣으면 에러처리해줘야..
	while(inputNum >numOfToken){
		System.out.println("you don't have enough tokens. Please input another number");
		inputNum = input.nextInt();	
	}
	
	//숫자 따라 색 바꿔주는.. 
	if(inputNum<10){
		color="black";
	}
	else
		color="white";
	
	//쓴 숫자만큼 줄여주
	numOfToken=numOfToken-inputNum;
	if(numOfToken>79){
		gauge=5;
		return;}
	else if(numOfToken>59){
		gauge=4;
		return;}
	else if(numOfToken>39){
		gauge=3;
		return;}
	else if(numOfToken>19){
		gauge=2;
		return;}
	else
		gauge=1;
		return;
	
	
}

public void showResult(){
	System.out.println("color is"+ color);
	System.out.println("gauge is"+ gauge);
	System.out.println("======================");
}

}
