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
	//���� ���� ���ں��� ū ���ڸ� ������ ����ó�������..
	while(inputNum >numOfToken){
		System.out.println("you don't have enough tokens. Please input another number");
		inputNum = input.nextInt();	
	}
	
	//���� ���� �� �ٲ��ִ�.. 
	if(inputNum<10){
		color="black";
	}
	else
		color="white";
	
	//�� ���ڸ�ŭ �ٿ���
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
