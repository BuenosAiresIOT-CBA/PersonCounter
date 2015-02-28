#include <Bridge.h>
#include <Console.h>
#include <FileIO.h>
#include <HttpClient.h>
#include <Mailbox.h>
#include <Process.h>
#include <YunClient.h>
#include <YunServer.h>

#include <Ultrasonic.h>

//Pines en los cuales se conectara el Ultrasonido
Ultrasonic ultrasonic(9, 8); // (Trig PIN,Echo PIN)
Ultrasonic ultra2(11, 10); // (Trig PIN,Echo PIN)

int med1 = 0;
int med2 = 0;

int buzzer = 3;
int filter = 0;
//sentido = 1 : entran ; sentido = 2 : salen
int sentido = 0;

const int led = 13;

void setup() {
  Serial.begin(9600);
  Bridge.begin();
  Console.begin();
  pinMode(OUTPUT, led);
}

void loop()
{
  if (ultrasonic.Ranging(CM) < 45) {
    med1 = ultrasonic.Ranging(CM);
    if (sentido == 0 || sentido == 1) {
      sentido = 1;
    } else {
      Serial.println(1);
      postToNode(1);
      delay(500);
      reset();
    }
  }
  if (ultra2.Ranging(CM) < 45) {
    med2 = ultrasonic.Ranging(CM);
    if (sentido == 0 || sentido == 2) {
      sentido = 2;
    } else {
      Serial.println(0);
      postToNode(0);
      delay(500);
      reset();
    }
  }


  filter++;
  if (filter == 100) {
    reset();
    filter = 0;
  }

}

void reset() {
  sentido = 0;
  med1 = 0;
  med2 = 0;
}

void postToNode(int value) {
  Process p;
  String cmd = "curl http://personcounter.herokuapp.com/count?field=" + String(value);
  p.runShellCommand(cmd);
  Serial.println(cmd);
  p.close();
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
}
