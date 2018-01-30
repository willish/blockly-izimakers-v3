/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating iziMakers blocks.
 * @author 
 */

goog.provide('Blockly.Arduino.iziMakers');

goog.require('Blockly.Arduino');



Blockly.Arduino.iziMakers_setup = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code = //'{\n' +
            branch;// + '\n}\n';
    var setup_key = Blockly.Arduino.variableDB_.getDistinctName('base_setup', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.setups_[setup_key] = code;
    return ""; //do not return any actual code
};

Blockly.Arduino.iziMakers_delay = function() {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.iziMakers_motors_a = function() {
	//var rx_pin = 2;
	//var tx_pin = 3;
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');

	// Serial
	Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
  //Blockly.Arduino.definitions_['define_Serial'] = '#define PC_SPEED 9600\n';
	//Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(PC_SPEED);\n';
	
	
	// Process Parse
	//Blockly.Arduino.process_['process_parse_json'] = 'char inBuffer[256];\n';
	
	
	// iziSerial
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['define_iziSerial'] = '#define RX_PIN 2\n#define TX_PIN 3\n#define IZI_SPEED 9600\nSoftwareSerial iziSerial(RX_PIN,TX_PIN);\nvoid iziSend(String chaine) {\n  Serial.println(chaine);\n  iziSerial.println(chaine);\n}\n';
	Blockly.Arduino.setups_['setup_iziSerial'] = 'iziSerial.begin(IZI_SPEED);\n  delay(1000);\n';
	
	// Motor A
	Blockly.Arduino.definitions_['motorA'] = 'int motorA_power;\nvoid motorA_process(int power) {\n  //if(power != motorA_power) {\n    //motorA_power = power;\n    String chaine1 = "a:";\n    String chaine2 = String(power);\n    String chaine3;\n    chaine3 = chaine1 + chaine2;\n    iziSend(chaine3);\n  //}\n}\n';
	Blockly.Arduino.setups_['setup_motorA'] = 'motorA_process(0);\n  delay(100);\n';
	
  //var code = 'iziSerial.println("a:" + ' + motor_power + ');';
  //var code = 'iziSerial.print("a:");iziSerial.println(' + motor_power + ');\n';
	var code = 'motorA_process(' + motor_power + ');\n';
	
  return code;
};

Blockly.Arduino.iziMakers_motors_b = function() {
	//var rx_pin = 2;
	//var tx_pin = 3;
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');

	// Serial
	Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
  //Blockly.Arduino.definitions_['define_Serial'] = '#define PC_SPEED 9600\n';
	//Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(PC_SPEED);\n';

	
	// iziSerial
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['define_iziSerial'] = '#define RX_PIN 2\n#define TX_PIN 3\n#define IZI_SPEED 9600\nSoftwareSerial iziSerial(RX_PIN,TX_PIN);\nvoid iziSend(String chaine) {\n  Serial.println(chaine);\n  iziSerial.println(chaine);\n}\n';
	Blockly.Arduino.setups_['setup_iziSerial'] = 'iziSerial.begin(IZI_SPEED);\n  delay(1000);\n';
	
	// Motor B
	Blockly.Arduino.definitions_['motorB'] = 'int motorB_power;\nvoid motorB_process(int power) {\n  //if(power != motorB_power) {\n    //motorB_power = power;\n    String chaine1 = "b:";\n    String chaine2 = String(power);\n    String chaine3;\n    chaine3 = chaine1 + chaine2;\n    iziSend(chaine3);\n  //}\n}\n';
	Blockly.Arduino.setups_['setup_motorB'] = 'motorB_process(0);\n  delay(100);\n';
	
  //var code = 'iziSerial.println("a:" + ' + motor_power + ');';
  //var code = 'iziSerial.print("a:");iziSerial.println(' + motor_power + ');\n';
	var code = 'motorB_process(' + motor_power + ');\n';
	
  return code;
};

Blockly.Arduino.iziMakers_thumb_joystick =  function() {
  //var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_axis = this.getFieldValue('AXIS');
  var stickPIN = "0";
  if(dropdown_axis==="y"){
    stickPIN = 1;
  } else {
    //stickPIN = dropdown_pin;
  }
  var code = 'map(analogRead('+stickPIN+'), 0, 1023, -100, 100)';
  Blockly.Arduino.setups_['setup_input_'+stickPIN] = 'pinMode('+stickPIN+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_ultrasonic_ranger = function() {
	var pin_trig = 9;
	var pin_echo = 10;
  //var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_unit = this.getFieldValue('UNIT');
  //Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
  //Blockly.Arduino.definitions_['var_ultrasonic'+dropdown_pin] = 'Ultrasonic ultrasonic_'+dropdown_pin+'('+dropdown_pin+');\n';
  //Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
	
	Blockly.Arduino.definitions_['ultrasonic_vars'] = 'int ultrasonic_cm = 300;\nunsigned long lastUltrasonic_ms = 0;\nint ultrasonic_pin_trig = 9;\nint ultrasonic_pin_echo = 10;\n';
  Blockly.Arduino.definitions_['ultrasonic_fcn'] = 'int getDistance(){\n  if(millis() > lastUltrasonic_ms + 100) {\n    digitalWrite(ultrasonic_pin_trig,LOW);\n    delayMicroseconds(2);\n    digitalWrite(ultrasonic_pin_trig,HIGH);\n    delayMicroseconds(10);\n    unsigned long duration = pulseIn(ultrasonic_pin_echo,HIGH,30000);\n    int distance_cm = (int)duration/58;\n    if(distance_cm == 0) {\n      distance_cm = 300;\n    }\n    ultrasonic_cm = distance_cm;\n    lastUltrasonic_ms = millis();\n  }\n  return ultrasonic_cm;\n}\n';
	
	var code = '';
  if(dropdown_unit==="cm"){
    //Blockly.Arduino.setups_['setup_ultrasonic_'+dropdown_pin] = 'ultrasonic_'+dropdown_pin+'.MeasureInCentimeters();';
    //code = 'getDistance(9, 10)';
		code = 'getDistance()';
  } else {
    //Blockly.Arduino.setups_['setup_ultrasonic_'+dropdown_pin] = 'ultrasonic_'+dropdown_pin+'.MeasureInInches();';
    //code = 'ultrasonic_'+dropdown_pin+'.RangeInInches();';
		code = '((getDistance() * 10) / 25)';
  }
	Blockly.Arduino.setups_['setup_output_'+pin_trig] = 'pinMode('+pin_trig+', OUTPUT);';
	Blockly.Arduino.setups_['setup_input_'+pin_echo] = 'pinMode('+pin_echo+', INPUT);';
  //var code = 'getDistance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_debug_serial = function() {
	var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = this.getFieldValue('CONTENT');

  Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';

  var code = 'Serial.println(' + content + ');\n';
	return code;
};

Blockly.Arduino.iziMakers_debug_iziSend = function() {
	var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = this.getFieldValue('CONTENT');
	
	// iziSerial
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['define_iziSerial'] = '#define RX_PIN 2\n#define TX_PIN 3\n#define IZI_SPEED 9600\nSoftwareSerial iziSerial(RX_PIN,TX_PIN);\nvoid iziSend(String chaine) {\n  Serial.println(chaine);\n  iziSerial.println(chaine);\n}\n';
	Blockly.Arduino.setups_['setup_iziSerial'] = 'delay(1000);\n  iziSerial.begin(IZI_SPEED);\n';
	
  //Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';

  var code = 'iziSend(' + content + ');\n';
	return code;
};




Blockly.Arduino.iziMakers_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_iziMakers_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakers_button = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_rotary_angle = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_tilt_switch = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_tilt_switch_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_piezo_buzzer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakers_relay = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_relay_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakers_temporature_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  /*
  a=analogRead(0);
  resistance=(float)(1023-a)*10000/a;
  temperature=1/(log(resistance/10000)/B+1/298.15)-273.15;
  */
  var code = 'round('+'(1/(log((float)(1023-analogRead('+dropdown_pin+'))*10000/analogRead('+dropdown_pin+'))/10000)/3975+1/298.15)-273.15'+')';
  Blockly.Arduino.setups_['setup_temporature_sensor_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
#include <SerialLCD.h>
#include <SoftwareSerial.h> //this is a must
SerialLCD slcd(11,12);//this is a must, assign soft serial pins

void setup()
{
  slcd.begin();// set up :
}

void loop()
{
  slcd.backlight();// Turn on the backlight: //noBacklight
  slcd.setCursor(0,0); // set the cursor to (0,0):
  slcd.print("  Seeed Studio"); // Print a message to the LCD.
  slcd.setCursor(0,1); //line 2
  slcd.print("   Starter kit   ");
  delay(5000);
  //slcd.scrollDisplayLeft();//scrollDisplayRight/autoscroll/
  //slcd.clear();
  //Power/noPower
}
*/

var _get_next_pin = function(dropdown_pin) {
  var pos = -1;
    //check if NextPIN in bound
  if(parseInt(dropdown_pin)){
    var NextPIN = parseInt(dropdown_pin)+1;
    pos = profile.defaultBoard.digital.indexOf(String(NextPIN));
  } else {
    var NextPIN = 'A'+(parseInt(dropdown_pin.slice(1,dropdown_pin.length))+1);
    pos = profile.defaultBoard.analog.indexOf(String(NextPIN));
  }
  if(pos < 0){
//    alert("Grove Sensor needs PIN#+1 port, current setting is out of bound.");
    return null;
  } else {
    return NextPIN;
  }
};

Blockly.Arduino.iziMakers_serial_lcd_print = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var text = Blockly.Arduino.valueToCode(this, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var text2 = Blockly.Arduino.valueToCode(this, 'TEXT2',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  /*if(text.length>16||text2.length>16){
      alert("string is too long");
  }*/
  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd_'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';

  Blockly.Arduino.setups_['setup_lcd_'+dropdown_pin] = 'slcd_'+dropdown_pin+'.begin();\n';
  var code = 'slcd_'+dropdown_pin+'.backlight();\n';
  code    += 'slcd_'+dropdown_pin+'.setCursor(0,0);\n';
  code    += 'slcd_'+dropdown_pin+'.print('+text+');\n';//text.replace(new RegExp('\'',"gm"),'')
  code    += 'slcd_'+dropdown_pin+'.setCursor(0,1);\n';
  code    += 'slcd_'+dropdown_pin+'.print('+text2+');\n';
  code    += 'delay('+delay_time+');\n';
  return code;
};

Blockly.Arduino.iziMakers_serial_lcd_power = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');

  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';
  var code = 'slcd_'+dropdown_pin;
  if(dropdown_stat==="ON"){
    code += '.Power();\n';
  } else {
    code += '.noPower();\n';
  }
  return code;
};

Blockly.Arduino.iziMakers_serial_lcd_effect = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');

  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';
  var code = 'slcd_'+dropdown_pin;
  if(dropdown_stat==="LEFT"){
    code += '.scrollDisplayLeft();\n';
  } else if(dropdown_stat==="RIGHT"){
    code += '.scrollDisplayRight();\n';
  } else {
    code += '.autoscroll();\n';
  }
  return code;
};

Blockly.Arduino.iziMakers_sound_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  Blockly.Arduino.setups_['setup_sound_sensor_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_pir_motion_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_line_finder = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*Blockly.Arduino.iziMakers_ultrasonic_ranger = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_unit = this.getFieldValue('UNIT');
  Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
  Blockly.Arduino.definitions_['var_ultrasonic'+dropdown_pin] = 'Ultrasonic ultrasonic_'+dropdown_pin+'('+dropdown_pin+');\n';
  var code;
  if(dropdown_unit==="cm"){
    Blockly.Arduino.setups_['setup_ultrasonic_'+dropdown_pin] = 'ultrasonic_'+dropdown_pin+'.MeasureInCentimeters();';
    code = 'ultrasonic_'+dropdown_pin+'.RangeInCentimeters();';
  } else {
    Blockly.Arduino.setups_['setup_ultrasonic_'+dropdown_pin] = 'ultrasonic_'+dropdown_pin+'.MeasureInInches();';
    code = 'ultrasonic_'+dropdown_pin+'.RangeInInches();';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};*/

Blockly.Arduino.iziMakers_motor_shield = function() {
  var dropdown_direction = this.getFieldValue('DIRECTION');
  var speed = 127;//Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '127';
  Blockly.Arduino.setups_["setup_motor"] = "pinMode(8,OUTPUT);//I1\n"+
  "  pinMode(11,OUTPUT);//I2\n"+
  "  pinMode(9,OUTPUT);//speedPinA\n"+
  "  pinMode(12,OUTPUT);//I3\n"+
  "  pinMode(13,OUTPUT);//I4\n"+
  "  pinMode(10,OUTPUT);//speedPinB\n";
  var code = "";
  if(dropdown_direction==="forward"){
    Blockly.Arduino.definitions_['define_forward'] = "void forward()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,HIGH);//turn DC Motor B move clockwise\n"+
     "  digitalWrite(12,LOW);\n"+
     "  digitalWrite(11,LOW);//turn DC Motor A move anticlockwise\n"+
     "  digitalWrite(8,HIGH);\n"+
"}\n";
    code="forward();\n";
  } else if (dropdown_direction==="right") {
    Blockly.Arduino.definitions_['define_right'] = "void right()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,LOW);//turn DC Motor B move anticlockwise\n"+
     "  digitalWrite(12,HIGH);\n"+
     "  digitalWrite(11,LOW);//turn DC Motor A move anticlockwise\n"+
     "  digitalWrite(8,HIGH);\n"+
"}\n\n";
    code="right();\n";
  } else if (dropdown_direction==="left") {
    Blockly.Arduino.definitions_['define_left'] = "void left()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,HIGH);//turn DC Motor B move clockwise\n"+
     "  digitalWrite(12,LOW);\n"+
     "  digitalWrite(11,HIGH);//turn DC Motor A move clockwise\n"+
     "  digitalWrite(8,LOW);\n"+
"}\n\n";
    code="left();\n";
  } else if (dropdown_direction==="backward"){
    Blockly.Arduino.definitions_['define_backward'] = "void backward()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,LOW);//turn DC Motor B move anticlockwise\n"+
     "  digitalWrite(12,HIGH);\n"+
     "  digitalWrite(11,HIGH);//turn DC Motor A move clockwise\n"+
     "  digitalWrite(8,LOW);\n"+
"}\n\n";
    code="backward();\n";
  } else if (dropdown_direction==="stop"){
    Blockly.Arduino.definitions_['define_stop'] = "void stop()\n"+
"{\n"+
     "digitalWrite(9,LOW);// disable the pin, to stop the motor. this should be done to avid damaging the motor.\n"+
     "digitalWrite(10,LOW);\n"+
     "delay(1000);\n"+
"}\n\n";
    code="stop();\n";
  }
  return code;
};

/*Blockly.Arduino.iziMakers_thumb_joystick =  function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_axis = this.getFieldValue('AXIS');
  var stickPIN = "0";
  if(dropdown_axis==="y"){
    stickPIN = _get_next_pin(dropdown_pin);
  } else {
    stickPIN = dropdown_pin;
  }
  var code = 'analogRead('+stickPIN+')';
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};*/

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);};
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);};
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);};
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;};

Blockly.Arduino.iziMakers_rgb_led = function() {
  var dropdown_pin_C1 = this.getFieldValue('PIN1');
  var dropdown_pin_C2 = this.getFieldValue('PIN2');
  var dropdown_pin_C3 = this.getFieldValue('PIN3');
  var dropdown_stat_C1 = Blockly.Arduino.valueToCode(this, 'C1', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat_C2 = Blockly.Arduino.valueToCode(this, 'C2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat_C3 = Blockly.Arduino.valueToCode(this, 'C3', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_red_led_'+dropdown_pin_C1] = 'pinMode('+dropdown_pin_C1+', OUTPUT);';
  Blockly.Arduino.setups_['setup_green_led_'+dropdown_pin_C2] = 'pinMode('+dropdown_pin_C2+', OUTPUT);';
  Blockly.Arduino.setups_['setup_blue_led_'+dropdown_pin_C3] = 'pinMode('+dropdown_pin_C3+', OUTPUT);';
  var code = 'analogWrite('+dropdown_pin_C1+','+dropdown_stat_C1+');\nanalogWrite('+dropdown_pin_C2+','+dropdown_stat_C2+');\nanalogWrite('+dropdown_pin_C3+','+dropdown_stat_C3+');\n';
  return code;
};

// Blockly.Arduino.iziMakers_rgb_led = function() {
  // var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  // var NextPIN = _get_next_pin(dropdown_pin);

  // Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  // Blockly.Arduino.setups_['setup_input_'+NextPIN] = 'pinMode('+NextPIN+', OUTPUT);';
  // Blockly.Arduino.definitions_['define_uint8'] = "#define uint8 unsigned char";
  // Blockly.Arduino.definitions_['define_uint16'] = "#define uint16 unsigned int";
  // Blockly.Arduino.definitions_['define_uint32'] = "#define uint32 unsigned long int";
  // Blockly.Arduino.definitions_['define_clkproduce_'+dropdown_pin] = "void ClkProduce_"+dropdown_pin+"(void)\n"+
  // "{\n"+
  // "  digitalWrite("+dropdown_pin+", LOW);\n"+
  // "  delayMicroseconds(20);\n"+
  // "  digitalWrite("+dropdown_pin+", HIGH);\n"+
  // "  delayMicroseconds(20);\n"+
  // "}\n";
  // Blockly.Arduino.definitions_['define_send32zero_'+dropdown_pin] = "void Send32Zero_"+dropdown_pin+"(void)\n"+
  // "{\n"+
  // "  uint8 i;\n"+
  // "  for (i=0; i<32; i++)\n"+
  // "  {\n"+
  // "    digitalWrite("+NextPIN+", LOW);\n"+
  // "    ClkProduce_"+dropdown_pin+"();\n"+
  // "  }\n"+
  // "}\n";
  // Blockly.Arduino.definitions_['define_taskanticode'] = "uint8 TakeAntiCode(uint8 dat)\n"+
  // "{\n"+
  // "  uint8 tmp = 0;\n"+
  // "  if ((dat & 0x80) == 0)\n"+
  // "  {\n"+
  // "    tmp |= 0x02;\n"+
  // "  }\n"+
  // "  \n"+
  // "  if ((dat & 0x40) == 0)\n"+
  // "  {\n"+
  // "    tmp |= 0x01;\n"+
  // "  }\n"+
  // "  return tmp;\n"+
  // "}\n";
  // Blockly.Arduino.definitions_['define_datasend_'+dropdown_pin] = "// gray data\n"+
  // "void DatSend_"+dropdown_pin+"(uint32 dx)\n"+
  // "{\n"+
  // "  uint8 i;\n"+
  // "  for (i=0; i<32; i++)\n"+
  // "  {\n"+
  // "    if ((dx & 0x80000000) != 0)\n"+
  // "    {\n"+
  // "      digitalWrite("+NextPIN+", HIGH);\n"+
  // "    }\n"+
  // "    else\n"+
  // "    {\n"+
  // "      digitalWrite("+NextPIN+", LOW);\n"+
  // "    }\n"+
  // "  dx <<= 1;\n"+
  // "  ClkProduce_"+dropdown_pin+"();\n"+
  // "  }\n"+
  // "}\n";
  // Blockly.Arduino.definitions_['define_datadealwithsend_'+dropdown_pin] = "// data processing\n"+
// "void DataDealWithAndSend_"+dropdown_pin+"(uint8 r, uint8 g, uint8 b)\n"+
// "{\n"+
  // "  uint32 dx = 0;\n"+
  // "  dx |= (uint32)0x03 << 30;             // highest two bits 1，flag bits\n"+
  // "  dx |= (uint32)TakeAntiCode(b) << 28;\n"+
  // "  dx |= (uint32)TakeAntiCode(g) << 26;\n"+
  // "  dx |= (uint32)TakeAntiCode(r) << 24;\n"+
 // "\n"+
  // "  dx |= (uint32)b << 16;\n"+
  // "  dx |= (uint32)g << 8;\n"+
  // "  dx |= r;\n"+
 // "\n"+
  // "  DatSend_"+dropdown_pin+"(dx);\n"+
// "}\n";
  // var code = "Send32Zero_"+dropdown_pin+"(); // begin\n";
  // console.log(this.itemCount_);
  // if (this.itemCount_ == 0) {
    // return '';
  // } else {
    // for (var n = 0; n < this.itemCount_; n++) {
      // var colour_rgb = this.getFieldValue('RGB'+n);
      // console.log(colour_rgb);
      // code += "DataDealWithAndSend_"+dropdown_pin+"("+hexToR(colour_rgb)+", "+hexToG(colour_rgb)+", "+hexToB(colour_rgb)+"); // first node data\n";
    // }
  // }
  // code += "Send32Zero_"+dropdown_pin+"();  // send to update data\n";
  // return code;
// };

Blockly.Arduino.iziMakers_bluetooth_slave = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var NextPIN = _get_next_pin(dropdown_pin);
  var name = this.getFieldValue('NAME');
//  var pincode = this.getFieldValue('PINCODE');
  var statement_receive = Blockly.Arduino.statementToCode(this, "RCV");
  var statement_send = Blockly.Arduino.statementToCode(this, "SNT");
  /* if(pincode.length != 4){
    alert("pincode length should be 4");
  } */
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['var_bluetooth_'+dropdown_pin] = 'SoftwareSerial blueToothSerial_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';

  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] = 'Serial.begin(9600);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  pinMode('+dropdown_pin+', INPUT);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  pinMode('+NextPIN+', OUTPUT);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  setupBlueToothConnection_'+dropdown_pin+'();\n';

  Blockly.Arduino.definitions_['define_setupBlueToothConnection_'+dropdown_pin] = 'void setupBlueToothConnection_'+dropdown_pin+'()\n'+
  '{\n'+
  '  blueToothSerial_'+dropdown_pin+'.begin(38400); //Set BluetoothBee BaudRate to default baud rate 38400\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STWMOD=0\\r\\n"); //set the bluetooth work in slave mode\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STNA='+name+'\\r\\n"); //set the bluetooth name as "'+name+'"\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STPIN=0000\\r\\n");//Set SLAVE pincode"0000"\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STOAUT=1\\r\\n"); // Permit Paired device to connect me\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STAUTO=0\\r\\n"); // Auto-connection should be forbidden here\n'+
  '  delay(2000); // This delay is required.\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+INQ=1\\r\\n"); //make the slave bluetooth inquirable \n'+
  '  Serial.println("The slave bluetooth is inquirable!");\n'+
  '  delay(2000); // This delay is required.\n'+
  '  blueToothSerial_'+dropdown_pin+'.flush();\n'+
  '}\n';
  var code = 'char recvChar_'+dropdown_pin+';\n'+
  'while(1) {\n'+
  '  if(blueToothSerial_'+dropdown_pin+'.available()) {//check if there is any data sent from the remote bluetooth shield\n'+
  '    recvChar_'+dropdown_pin+' = blueToothSerial_'+dropdown_pin+'.read();\n'+
  '    Serial.print(recvChar_'+dropdown_pin+');\n'+
       statement_receive+
  '  }\n'+
  '  if(Serial.available()){//check if there is any data sent from the local serial terminal, you can add the other applications here\n'+
  '    recvChar_'+dropdown_pin+' = Serial.read();\n'+
  '    blueToothSerial_'+dropdown_pin+'.print(recvChar_'+dropdown_pin+');\n'+
       statement_send+
  '  }\n'+
  '}\n';
  return code;
};
