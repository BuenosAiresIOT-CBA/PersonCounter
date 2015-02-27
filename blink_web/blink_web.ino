const int triggerPin = 9;
const int echoPin = 8;
const int ledPin = 13;

float distancia;
float tiempo;

void showDistance(){
  /*Monitorización en centímetros por el monitor serial*/
  Serial.print("Distancia ");
  Serial.print(distancia);
  Serial.println(" cm.");
}

void setup(){
  Serial.begin(9600);
  pinMode(triggerPin, OUTPUT); /*activación del pin 9 como salida: para el pulso ultrasónico*/
  pinMode(echoPin, INPUT); /*activación del pin 8 como entrada: tiempo del rebote del ultrasonido*/
  pinMode(ledPin, OUTPUT);
  distancia = 0.0;
  tiempo = 0.0;
}

void loop(){

  delay(200);
  digitalWrite(ledPin, HIGH);  
  
  Serial.write(int(distancia));
//  Serial.write(255);
  
  delay(200);
  digitalWrite(ledPin, LOW); 
  
  digitalWrite(triggerPin,LOW); /* Por cuestión de estabilización del sensor*/
  delayMicroseconds(5);
  digitalWrite(triggerPin, HIGH); /* envío del pulso ultrasónico*/
  delayMicroseconds(10);
  tiempo=pulseIn(echoPin, HIGH); /* Función para medir la longitud del pulso entrante. Mide el tiempo que transcurrido entre el envío
  del pulso ultrasónico y cuando el sensor recibe el rebote, es decir: desde que el pin 12 empieza a recibir el rebote, HIGH, hasta que
  deja de hacerlo, LOW, la longitud del pulso entrante*/
  distancia= (0.017*tiempo); /*fórmula para calcular la distancia obteniendo un valor entero*/

//  showDistance();

}

