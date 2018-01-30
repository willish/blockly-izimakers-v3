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
 * @fileoverview Helper functions for generating iziMakersV2 blocks.
 * @author 
 */

goog.provide('Blockly.Arduino.iziMakersV2');

goog.require('Blockly.Arduino');



iziV2SetiziOs1 = function () {

	// PC Serial
	//Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
	Blockly.Arduino.definitions_['define_serial_PC'] = 'long baudrate_PC = 115200;\n';
	Blockly.Arduino.setups_['setup_serial_PC'] = 'Serial.begin(baudrate_PC);\n  Serial.println("{\\"mm\\":\\"Starting\\"}");\n';
	
	// iziSerial
	//Blockly.Arduino.definitions_['include_ArduinoJson'] = '#include <ArduinoJson.h>\n';
	Blockly.Arduino.definitions_['include_ArduinoJson'] = '#include <aJSON.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
	Blockly.Arduino.definitions_['define_pins'] = '#define PIN_RX 2\n#define PIN_TX 3\n#define PIN_RE 4\n#define PIN_DE 5\n//#define PIN_LED 13\n';
	Blockly.Arduino.definitions_['define_buffer_sizes'] = '#define INBUFFER_SIZE 256\n#define OUTBUFFER_SIZE 256\n//#define JSON_BUFFER_SIZE 512\n';
	Blockly.Arduino.definitions_['define_buffers'] = 'int inBuffer_i = 0;\nchar outBuffer[OUTBUFFER_SIZE];\nint outBuffer_len = 0;\n';
	Blockly.Arduino.definitions_['define_baudrate'] = 'long baudrate_Bus = 9600;\n';
	
  Blockly.Arduino.definitions_['define_fcn_setRX'] = 'void setRX() {\n  digitalWrite(PIN_RE, LOW);\n  digitalWrite(PIN_DE, LOW);\n}\n';
  Blockly.Arduino.definitions_['define_fcn_setTX'] = 'void setTX() {\n  digitalWrite(PIN_RE, HIGH);\n  digitalWrite(PIN_DE, HIGH);\n}\n';

  Blockly.Arduino.definitions_['define_iziSerial'] = 'SoftwareSerial iziSerial(PIN_RX,PIN_TX);\n';
	
  Blockly.Arduino.definitions_['define_vars'] = 'boolean stringComplete = false;\nboolean receiving = false;\nboolean sendOutput = false;\nunsigned long lastSerialRecevied = 0;\n';
	
  Blockly.Arduino.definitions_['define_fcn_readSerial'] = 'void readSerial(char *inBuf) {\n  if (iziSerial.available()) {\n    //digitalWrite(PIN_LED, HIGH);\n\n    if (receiving) {\n      Serial.println("RX not finished");\n    }\n\n    memset(inBuf, (char)0, INBUFFER_SIZE);\n    inBuffer_i = 0;\n    stringComplete = false;\n\n    Serial.write(\'[\');\n    while (iziSerial.available()) {\n      receiving = true;\n      // get the new byte:\n      char inChar = (char)iziSerial.read();\n      //Serial.write(inChar);\n      // add it to the inputString:\n      //inputString += inChar;\n      if (inChar != \'\\n\') {\n        Serial.write(inChar);\n        inBuf[inBuffer_i] = inChar;\n        inBuffer_i += 1;\n        inBuf[inBuffer_i] = (char)0;\n      }\n      // if the incoming character is a newline, set a flag\n      // so the main loop can do something about it:\n      if (inChar == \'\\n\') {\n        stringComplete = true;\n        receiving = false;\n        //Serial.println("> " + inputString);\n        //Serial.println("> " + String(inBuffer));\n        Serial.write(\']\');\n        Serial.write(\'>\');\n        Serial.write(\' \');\n        for (int i = 0 ; i < inBuffer_i ; i++) {\n          Serial.write(inBuf[i]);\n        }\n        Serial.write(\'\\n\');\n      }\n     \n      if(! iziSerial.available()) {\n        // on se laisse une chance de récupérer d\'autres caractères\n        delayMicroseconds(200);\n      }\n    }\n    lastSerialRecevied = millis();\n\n    if(receiving) {\n      receiving = false;\n      Serial.println("RX not finished properly");\n    }\n\n    //digitalWrite(PIN_LED, LOW);\n  }\n}\n';

  Blockly.Arduino.definitions_['define_sendSerial'] = 'void sendSerial() {\n  if (sendOutput) {\n    if (!receiving) {\n      if (!iziSerial.available()) {\n        //digitalWrite(PIN_LED, HIGH);\n        setTX();\n        Serial.write(\'<\');\n        Serial.write(\' \');\n        for (int i = 0 ; i < outBuffer_len ; i++) {\n          iziSerial.write(outBuffer[i]);\n          Serial.write(outBuffer[i]);\n        }\n        iziSerial.write(\'\\n\');\n        Serial.write(\'\\n\');\n        setRX();\n        sendOutput = false;\n        //digitalWrite(PIN_LED, LOW);\n      }\n      else {\n        Serial.println("no send:available" );\n      }\n    }\n    else {\n      Serial.println("no send:receiving" );\n    \n    if( millis() - lastSerialRecevied > 100) {\n        receiving = false;\n      }}\n  }\n}\n';

	Blockly.Arduino.setups_['setup_iziSerial'] = 'iziSerial.begin(baudrate_Bus);\n  pinMode(PIN_RE, OUTPUT);\n  pinMode(PIN_DE, OUTPUT);\n  setRX();\n  //pinMode(PIN_LED, OUTPUT);\n  //digitalWrite(PIN_LED, LOW);\n';
	
	// Modules management
  Blockly.Arduino.definitions_['define_vars_modules'] = '#define NB_MODULES_MAX 3\nint nb_modules = 0;\nunsigned long modules_SN[NB_MODULES_MAX];\nunsigned long modules_last[NB_MODULES_MAX];\nunsigned long lastSent = 0;\n';
	Blockly.Arduino.definitions_['define_fcn_isModuleKnown'] = 'boolean isModuleKnown(unsigned long sn) {\n  for(int i = 0 ; i <nb_modules ; i++) {\n    if(modules_SN[i] == sn) {\n      return true;\n    }\n  }\n  return false;\n}\n';
	Blockly.Arduino.definitions_['define_fcn_moduleNumber'] = 'int moduleNumber(unsigned long sn) {\n  for(int i = 0 ; i <nb_modules ; i++) {\n    if(modules_SN[i] == sn) {\n      return i;\n    }\n  }\n  return -1;\n}\n';
	Blockly.Arduino.definitions_['define_fcn_questionModules'] = 'void questionModules() {\n  if (!sendOutput) {\n    measureDC();\n    if (millis() > lastSent + 3000) {\n      printDC();\n      aJsonObject* objectJSON = aJson.createObject();\n      aJson.addItemToObject(objectJSON, "module", aJson.createItem("?"));\n      if (objectJSON != NULL) {\n        char* msg = aJson.print(objectJSON);\n        int i = 0;\n        while (*(msg + i) != \'\\0\') {\n          outBuffer[i] = *(msg + i);\n          i += 1;\n        }\n        outBuffer_len = i;\n        free(msg);\n        sendOutput = true;\n        lastSent = millis();\n      }\n      aJson.deleteItem(objectJSON);\n    }\n  }\n}\n';
	
	// Process Parse
	Blockly.Arduino.process_start_['process_parse_json'] = 'char inBuffer[INBUFFER_SIZE];\n  bool parseSuccess = false;\n  unsigned long SN_Module = 0;\n\n  readSerial(inBuffer);\n\n  if (stringComplete) {\n    stringComplete = false;\n    unsigned long startParse = micros();\n    aJsonObject* root = aJson.parse(inBuffer);\n\n    if (root != NULL) {\n      Serial.print("parse:");\n      Serial.print(String(micros() - startParse));\n      Serial.println("us");\n      /*Serial.print("<<");\n      char* msg = aJson.print(root);\n      Serial.print(msg);\n      free(msg);\n      Serial.println(">>");*/\n\n      aJsonObject* sn = aJson.getObjectItem(root, "sn");\n      if (sn != NULL) {\n        SN_Module = sn->valueint;    //valueint      root["sn"];\n        if ( ! isModuleKnown(SN_Module)) {\n          modules_SN[nb_modules] = SN_Module;\n          //modules_last[nb_modules] = millis();\n          nb_modules += 1;\n          Serial.print("New:");\n          Serial.println(SN_Module);\n        }\n        else {\n          Serial.print("Module:");\n          Serial.println(SN_Module);\n        }\n        parseSuccess = true;\n      }\n      else {\n        parseSuccess = false;\n        Serial.println("no \\"sn\\"");\n      }\n    }\n    else {\n      parseSuccess = false;\n      Serial.print("*** parseObject() failed : ");\n      Serial.print(String(micros() - startParse));\n      Serial.println("us");\n      //Serial.print(String(micros() - startParse) + "us *** parseObject() failed: << ");\n      Serial.print("<<");\n      Serial.print(String(inBuffer));\n      Serial.println(" >>");\n    }\n    aJson.deleteItem(root);\n  }\n  else {\n    parseSuccess = false;\n  }\n';
	
	// Mesure tension d'alimentation
	Blockly.Arduino.definitions_['define_vars_measureDC'] = '#define PIN_DC  A0\nint inputMesureDC = 0;\nint inputMesureDC_x = 5545;      // multiplicateur pour obtenir des mV\n';
	/*Blockly.Arduino.definitions_['define_fcn_measureDC'] = 'void measureDC() { \n  int v_max = 5 * inputMesureDC_x;\n  inputMesureDC = map(analogRead(PIN_DC), 0, 1023, 0, v_max);\n}\n';*/
	Blockly.Arduino.definitions_['define_fcn_measureDC'] = 'void measureDC() { \n  int sensorValue = analogRead(PIN_DC);\n  inputMesureDC = sensorValue *27;\n  //inputMesureDC = readVcc();\n}\n';
	/*Blockly.Arduino.definitions_['define_fcn_readVcc'] = 'long readVcc() {\n  // Read 1.1V reference against AVcc\n  // set the reference to Vcc and the measurement to the internal 1.1V reference\n  #if defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)\n    ADMUX = _BV(REFS0) | _BV(MUX4) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);\n  #elif defined (__AVR_ATtiny24__) || defined(__AVR_ATtiny44__) || defined(__AVR_ATtiny84__)\n    ADMUX = _BV(MUX5) | _BV(MUX0);\n  #elif defined (__AVR_ATtiny25__) || defined(__AVR_ATtiny45__) || defined(__AVR_ATtiny85__)\n    ADMUX = _BV(MUX3) | _BV(MUX2);\n  #else\n    ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);\n  #endif  \n\n  delay(2); // Wait for Vref to settle\n  ADCSRA |= _BV(ADSC); // Start conversion\n  while (bit_is_set(ADCSRA,ADSC)); // measuring\n\n  uint8_t low  = ADCL; // must read ADCL first - it then locks ADCH  \n  uint8_t high = ADCH; // unlocks both\n\n  long result = (high<<8) | low;\n\n  result = 1125300L / result; // Calculate Vcc (in mV); 1125300 = 1.1*1023*1000\n  return result; // Vcc in millivolts\n}\n';*/
	Blockly.Arduino.definitions_['define_fcn_getMeasureDC'] = 'int getMeasureDC() { \n  process();\n  return inputMesureDC;\n}\n';
	Blockly.Arduino.definitions_['define_fcn_printDC'] = 'void printDC() { \n  Serial.print("{\\"DC\\":");\n  Serial.print(inputMesureDC);\n  Serial.println("}");\n}\n';
	
	
	
	Blockly.Arduino.setups_['setup_waitforModules'] = 'while(nb_modules == 0) {process();}\n';
};

iziV2SetiziOs2 = function () {
	Blockly.Arduino.process_end_['process_questionModules'] = 'questionModules();\n';
	Blockly.Arduino.process_end_['process_sendSerial'] = 'sendSerial();\n';
};





iziV2SetMotorsFunctions = function () {
	// Motors
	Blockly.Arduino.definitions_['motors_vars'] = 'int motorA_speed = 0;\nint motorA_speed_target = 0;\nint motorB_speed = 0;\nint motorB_speed_target = 0;\nunsigned long lastMotors = 0;\nint SN_Motors = 101;\n';
	Blockly.Arduino.definitions_['motors_fcn_processModuleMotorsInput'] = 'void processModuleMotorsInput(unsigned long SN, char * inBuffer) {\n  if (isModuleKnown(SN_Motors)) {\n    if (SN > 0) {\n      if (SN == SN_Motors) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "a");\n          if (aJson.getObjectItem(root, "a") != NULL) {\n            motorA_speed = aJson.getObjectItem(root, "a")->valueint;\n            lastMotors = millis();\n          }\n          //aJsonObject* b_ = aJson.getObjectItem(root, "b");\n          if (aJson.getObjectItem(root, "b") != NULL) {\n            motorB_speed = aJson.getObjectItem(root, "b")->valueint;\n            lastMotors = millis();\n          }\n        }\n        else {\n          Serial.print("M in: err");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	Blockly.Arduino.definitions_['motors_fcn_processModuleMotorsOutput'] = 'void processModuleMotorsOutput() {\n  if (!sendOutput) {\n    if (isModuleKnown(SN_Motors)) {\n      if (motorA_speed != motorA_speed_target || motorB_speed != motorB_speed_target || (millis() >= lastMotors + 1000)) {\n        if (millis() >= lastMotors + 200) {\n          Serial.print("Mout:");\n          aJsonObject* objectJSON = aJson.createObject();\n          if (objectJSON != NULL) {\n            aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Motors));\n            aJson.addItemToObject(objectJSON, "a", aJson.createItem(motorA_speed_target));\n            aJson.addItemToObject(objectJSON, "b", aJson.createItem(motorB_speed_target));\n            char* msg = aJson.print(objectJSON);\n            Serial.println(msg);\n            int i = 0;\n            while (*(msg + i) != \'\\0\') {\n              outBuffer[i] = *(msg + i);\n              i += 1;\n            }\n            outBuffer_len = i;\n            free(msg);\n            aJson.deleteItem(objectJSON);\n            //freeMem("freeMem");\n            sendOutput = true;\n          }\n          else {\n            Serial.println("err");\n          }\n          lastMotors = millis();\n        }\n      }\n    }\n  }\n}';
	
	Blockly.Arduino.process_module_['process_motors_input'] = 'if(parseSuccess) {\n    processModuleMotorsInput(SN_Module, inBuffer);\n  }\n';
	Blockly.Arduino.process_module_['process_motors_output'] = 'processModuleMotorsOutput();\n';
};

iziV2SetJoysticksFunctions = function () {
	// Joystick
	Blockly.Arduino.definitions_['joysticks_vars'] = 'int J1X = 0;\nint J1Y = 0;\nint J1SW = 0;\nint J2X = 0;\nint J2Y = 0;\nint J2SW = 0;\nunsigned long lastJoystick = 0;\nint SN_Joystick = 101;\n';
	Blockly.Arduino.definitions_['joysticks_fcn_processModuleJoysticksInput'] = 'void processModuleJoysticksInput(unsigned long SN, char * inBuffer) {\n  if (isModuleKnown(SN_Joystick)) {\n    if (SN > 0) {\n      if (SN == SN_Joystick) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //Serial.println("Jin:");\n          //Serial.print(inBuffer);\n          if (aJson.getObjectItem(root, "JX") != NULL) {\n            J1X = (int)aJson.getObjectItem(root, "JX")->valueint;\n            Serial.print("J1X:");\n            Serial.println(J1X);\n            lastJoystick = millis();\n          }\n          if (aJson.getObjectItem(root, "JY") != NULL) {\n            J1Y = (int)aJson.getObjectItem(root, "JY")->valueint;\n            Serial.print("J1Y:");\n            Serial.println(J1Y);\n            lastJoystick = millis();\n          }\n          if (aJson.getObjectItem(root, "JSW") != NULL) {\n            J1SW = (int)aJson.getObjectItem(root, "JSW")->valueint;\n            Serial.print("J1SW:");\n            Serial.println(J1SW);\n            lastJoystick = millis();\n          }\n        }\n        else {\n          Serial.println("Jin:err");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['joysticks_fcn_processModuleJoysticksOutput'] = 'void processModuleJoysticksOutput() {\n  if (!sendOutput) {\n    if (millis() > lastJoystick + 300) {\n      if (isModuleKnown(SN_Joystick)) {\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Joystick));\n        aJson.addItemToObject(objectJSON, "j", aJson.createItem(1));\n        if (objectJSON != NULL) {\n          Serial.print("Jout:");\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          Serial.print(":ok");\n        }\n        else {\n          Serial.println("err");\n        }\n        aJson.deleteItem(objectJSON);\n        //freeMem("freeMem");\n      }\n      lastJoystick = millis();\n    }\n  }\n}';*/
	Blockly.Arduino.definitions_['joysticks_fcn_getJoysticksValues'] = 'int getJ1X() {\n  process();\n  return J1X;\n}\nint getJ1Y() {\n  process();\n  return J1Y;\n}\nint getJ1SW() {\n  process();\n  return J1SW;\n}';
	
	Blockly.Arduino.process_module_['process_joysticks_input'] = 'if(parseSuccess) {\n    processModuleJoysticksInput(SN_Module, inBuffer);\n  }\n';
	//Blockly.Arduino.process_module_['process_joysticks_output'] = 'processModuleJoysticksOutput();\n';
};

iziV2SetUltrasonicFunctions = function () {
	// Ultrasonic
	Blockly.Arduino.definitions_['ultrasonic_vars'] = 'int ultrasonic_cm = 0;\nunsigned long lastUltrasonic = 0;\nint SN_Ultrasonic = 101;\n';
	Blockly.Arduino.definitions_['ultrasonic_fcn_processModuleUltrasonicInput'] = 'void processModuleUltrasonicInput(unsigned long SN, char * inBuffer) {\n  if (isModuleKnown(SN_Ultrasonic)) {\n    if (SN > 0) {\n      if (SN == SN_Ultrasonic) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //Serial.print(inBuffer);\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "US");\n          if (aJson.getObjectItem(root, "US") != NULL) {\n            ultrasonic_cm = (int)aJson.getObjectItem(root, "US")->valueint;\n            if(ultrasonic_cm == 0){ultrasonic_cm = 300;}\n            Serial.print("US_cm:");\n            Serial.println(ultrasonic_cm);\n            lastUltrasonic = millis();\n          }\n          //aJson.deleteItem(obj);\n        }\n        else {\n          Serial.print("USin:err");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['ultrasonic_fcn_processModuleUltrasonicOutput'] = 'void processModuleUltrasonicOutput() {\n  if (!sendOutput) {\n    if (millis() > lastUltrasonic + 300) {\n      if (isModuleKnown(SN_Ultrasonic)) {\n        Serial.print("Ultrasonic:");\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Ultrasonic));\n        aJson.addItemToObject(objectJSON, "US", aJson.createItem(1));\n        if (objectJSON != NULL) {\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          Serial.println(":done");\n        }\n        else {\n          Serial.println("objectJSON = NULL");\n        }\n        aJson.deleteItem(objectJSON);\n      }\n      lastUltrasonic = millis();\n    }\n  }\n}\n';
	*/
	Blockly.Arduino.definitions_['joysticks_fcn_getUltrasonicValues'] = 'int getUltrasonic() {\n  process();\n  return ultrasonic_cm;\n}\n\nint getUltrasonic_inch() {\n  process();\n  return (int)(ultrasonic_cm / 2.54);\n}\n';
	
	Blockly.Arduino.process_module_['process_ultrasonic_input'] = 'if(parseSuccess) {\n    processModuleUltrasonicInput(SN_Module, inBuffer);\n  }\n';
	//Blockly.Arduino.process_['process_ultrasonic_output'] = 'processModuleUltrasonicOutput();\n';
};

Blockly.Arduino.iziMakersV2_setup = function () {
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

Blockly.Arduino.iziMakersV2_delay = function() {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
	
  Blockly.Arduino.definitions_['define_fcn_pause'] = 'void pause(unsigned long length_ms) {\n  unsigned long start_ms = millis();\n  while(millis() < start_ms + length_ms) {\n    process();\n  }\n}\n';
	
	iziV2SetiziOs1();
	iziV2SetiziOs2();
	
  var code = 'pause(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.iziMakersV2_millis = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_input_voltage = function() {

	iziV2SetiziOs1();
	//SetUltrasonicFunctions();
	iziV2SetiziOs2();
  
	var code = 'getMeasureDC()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.iziMakersV2_motors_a = function() {
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	iziV2SetiziOs1();
	iziV2SetMotorsFunctions();
	iziV2SetiziOs2();
	
	var code = 'motorA_speed_target = ' + motor_power + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV2_motors_b = function() {
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	iziV2SetiziOs1();
	iziV2SetMotorsFunctions();
	iziV2SetiziOs2();
	
	var code = 'motorB_speed_target = ' + motor_power + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV2_thumb_joystick =  function() {
  //var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_axis = this.getFieldValue('AXIS');
  /*var stickPIN = "0";
  if(dropdown_axis==="y"){
    stickPIN = 1;
  } else {
    //stickPIN = dropdown_pin;
  }*/
	
	iziV2SetiziOs1();
	iziV2SetJoysticksFunctions();
	iziV2SetiziOs2();
  
	var code = '';
  if(dropdown_axis==="y"){
		//code = 'J1Y';
		code = 'getJ1Y()';
  } 
	else if(dropdown_axis==="x"){
		//code = 'J1X';
		code = 'getJ1X()';
  } 
	else if(dropdown_axis==="sw"){
		//code = 'J1SW';
		code = 'getJ1SW()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_ultrasonic_ranger = function() {

  var dropdown_unit = this.getFieldValue('UNIT');
	
	iziV2SetiziOs1();
	iziV2SetUltrasonicFunctions();
	iziV2SetiziOs2();
  
	var code = '';
  if(dropdown_unit==="cm"){
		//code = 'ultrasonic_cm';
		code = 'getUltrasonic()';
  } 
	else {
		//code = 'ultrasonic_cm';
		code = 'getUltrasonic_inch()';
  } 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_debug_serial = function() {
	var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = this.getFieldValue('CONTENT');

  Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';

  var code = 'Serial.println(' + content + ');\n';
	return code;
};

Blockly.Arduino.iziMakersV2_debug_iziSend = function() {
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






Blockly.Arduino.iziMakersV2_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_iziMakersV2_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV2_button = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_rotary_angle = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_tilt_switch = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_tilt_switch_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_piezo_buzzer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV2_relay = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_relay_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV2_temporature_sensor = function() {
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

Blockly.Arduino.iziMakersV2_serial_lcd_print = function() {
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

Blockly.Arduino.iziMakersV2_serial_lcd_power = function() {
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

Blockly.Arduino.iziMakersV2_serial_lcd_effect = function() {
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

Blockly.Arduino.iziMakersV2_sound_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  Blockly.Arduino.setups_['setup_sound_sensor_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_pir_motion_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV2_line_finder = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*Blockly.Arduino.iziMakersV2_ultrasonic_ranger = function() {
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

Blockly.Arduino.iziMakersV2_motor_shield = function() {
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

/*Blockly.Arduino.iziMakersV2_thumb_joystick =  function() {
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

Blockly.Arduino.iziMakersV2_rgb_led = function() {
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

// Blockly.Arduino.iziMakersV2_rgb_led = function() {
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

Blockly.Arduino.iziMakersV2_bluetooth_slave = function() {
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

