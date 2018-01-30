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
 * @fileoverview Helper functions for generating iziMakersV3 blocks.
 * @author 
 */

goog.provide('Blockly.Arduino.iziMakersV3');

goog.require('Blockly.Arduino');



iziV3SetiziOs1 = function () {

	// PC Serial
	//Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
	Blockly.Arduino.definitions_['define_serial_PC'] = 'long baudrate_PC = 57600;\n';		// 115200	57600
	Blockly.Arduino.setups_['setup_serial_PC'] = 'Serial.begin(baudrate_PC);\n  Serial.println("{\\"mm\\":\\"Starting\\"}");\n';
	

	Blockly.Arduino.definitions_['include_ArduinoJson'] = '#include <aJSON.h>\n';
	//Blockly.Arduino.definitions_['include_ArduinoJson'] = '#include <ArduinoJson.h>\n';
	
	// LED Status
	Blockly.Arduino.definitions_['define_LED_pin'] = '#define LED_PIN 7\n';
	Blockly.Arduino.definitions_['define_LED_vars'] = 'unsigned long LED_last = 0;\nbool LED_status = LOW;\n';
	Blockly.Arduino.definitions_['define_LED_functions'] = 'void LED_setup(void) {\n  pinMode(LED_PIN, OUTPUT);\n  LED_status = HIGH;\n  digitalWrite(LED_PIN, LED_status);\n}\n\nvoid LED_toggle(void) {\n  LED_status = !LED_status;\n  digitalWrite(LED_PIN, LED_status);\n}\n\nvoid LED_manage() {\n  if(millis() > LED_last + 500) {\n    LED_toggle();\n    LED_last = millis();\n  }\n}\n';
	Blockly.Arduino.setups_['setup_LED'] = 'LED_setup();\n';
	
	Blockly.Arduino.process_end_['process_LED_manage'] = '  LED_manage();\n ';
	
	
	// iziBus
  Blockly.Arduino.definitions_['define_izibus'] = '#define BUS_RS485   1\n#define BUS_SPI     2\n';
	Blockly.Arduino.definitions_['define_izibus_buffers'] = '#define INBUFFER_SIZE         64\n#define OUTBUFFER_SIZE        64\n\nchar inBuffer[INBUFFER_SIZE];\nint inBuffer_i = 0;\nchar outBuffer[OUTBUFFER_SIZE];\nint outBuffer_len = 0;\n\nboolean stringComplete = false;       // whether the string is complete\nboolean receiving = false;\n\n//String outputString = "";           // a string to hold incoming data\nboolean sendOutput = false;           // whether the string is complete\nint sendBus = 0;                      // BUS_RS485 , BUS_SPI\n\n';
	
  Blockly.Arduino.definitions_['define_Strings'] = 'char StrModule[] = "module";\nchar StrIndent[] = "  ";\nchar StrError[] = "err";\nchar TrameByteStart = \'{\';\nchar TrameByteEnd = \'}\';';
	
	
	// iziBus : SPI
	
	Blockly.Arduino.definitions_['define_digitalPinToInterrupt'] = '// SPI ****************\n#define digitalPinToInterrupt(p)  ( (p) == 2 ? 0 : ((p) == 3 ? 1 : -1) )\n';
	
	Blockly.Arduino.definitions_['define_SPI'] = 'char SPI_inBuffer[INBUFFER_SIZE];\nint SPI_inBuffer_i = 0;\n\nboolean SPI_stringComplete = false;   // whether the string is complete\nboolean SPI_receiving = false;\n\nunsigned long SPI_lastSent = 0;\n';
	
	Blockly.Arduino.definitions_['setup_SPI'] = 'unsigned long SPI_RX_start_ms = 0;\nunsigned long SPI_RX_end_ms = 0;\nunsigned long SPI_TX_end_ms = 0;\n\nlong        SPI_lastUpdate = 0;\nconst byte  SPI_SSinterruptPin = 3;\n\nconst byte SPI_delayMicroBetweenByte = 7;\n\n// SPI interrupt routine\nISR (SPI_STC_vect) {\n  byte inChar = SPDR;  // grab byte from SPI Data Register\n  /*if(!receiving) {\n    Serial.print("RX:");\n    Serial.print(inChar, HEX);\n  }*/\n  //receiving = true;\n  SPI_addIncomingChar(inChar);\n  SPI_RX_start_ms = millis();\n}\n\nvoid SPI_setup() {\n  SPI_beginSlaveTransaction();\n  //attachInterrupt (digitalPinToInterrupt(SPI_SSinterruptPin), SPI_ssRising, RISING);  // interrupt for SS rising edge\n  attachInterrupt (digitalPinToInterrupt(SPI_SSinterruptPin), SPI_ssChange, CHANGE);  // interrupt for SS rising edge\n}\n\n// At the transaction\'s end\n/*void SPI_ssRising () {\n  if(receiving) {\n    SPI_endRX();\n  }\n}*/\n\nvoid SPI_ssChange () {\n  delayMicroseconds(1);\n  if (digitalRead(SPI_SSinterruptPin) == HIGH) { // RISING\n    if(SPI_receiving) {\n      //if(receiveBus == BUS_SPI) {\n        SPI_endRX();\n      //}\n    } \n  }\n  else { // FALLING\n    SPI_receiving = true;\n    //receiveBus = BUS_SPI;\n  }\n}\n\nvoid SPI_endRX() {\n  SPI_receiving = false;\n  if(SPI_inBuffer_i > 0) {\n    SPI_stringComplete = true;\n    //Serial.print(StrIndent);\n    //Serial.print("RX:");\n    //Serial.println(SPI_inBuffer_i);\n  }\n  \n  //receiveBus = BUS_SPI;\n  SPI_RX_end_ms = millis();\n}\n\nbyte SPI_transferAndWait (const byte value) {\n  SPDR = value;                     //Load data into the buffer\n  //while (!(SPSR & (1 << SPIF) ));   //Wait until transmission complete\n  delayMicroseconds (SPI_delayMicroBetweenByte);\n  return (SPDR);                    //Return received data\n}\n\nvoid SPI_beginMasterTransaction() {\n  SPCR |= _BV(MSTR);\n  SPCR &= ~_BV(SPIE);\n  digitalWrite(MOSI, LOW);\n  digitalWrite(SCK, LOW);\n  digitalWrite(SS, LOW);\n  pinMode(MOSI, OUTPUT);\n  pinMode(SCK, OUTPUT);\n  pinMode(SS, OUTPUT);\n}\n\nvoid SPI_beginSlaveTransaction() {\n  pinMode(MISO, OUTPUT);\n  SPCR = _BV(SPE);\n  SPCR |= _BV(SPIE);\n}\n\nvoid SPI_send() {\n  if (sendOutput) {\n\n    if(SPI_receiving) {\n      if (digitalRead(SPI_SSinterruptPin) == HIGH) {\n        if(millis() > SPI_RX_start_ms + 10) {\n          Serial.print(StrIndent);\n          Serial.println("SPI end RX");\n          SPI_endRX();\n          //receiving = false;\n        }\n      }\n    }\n    \n    if (!SPI_receiving) {\n      if(millis() > SPI_RX_end_ms + 2 ) {\n        if(millis() > SPI_TX_end_ms + 10 ) {\n          if (digitalRead(SPI_SSinterruptPin) == HIGH) {\n            \n            SPI_beginMasterTransaction();\n            // enable Slave Select\n            digitalWrite(SS, LOW);\n      \n            Serial.print("SPI<");\n          \n            for (int iiii = 0 ; iiii < outBuffer_len ; iiii++) {\n              Serial.print(outBuffer[iiii]);\n              //if(iiii + 1 == outBuffer_len) {\n                //Serial.print(\'\\n\');\n              //}\n              SPI_transferAndWait(outBuffer[iiii]);\n            }\n      \n            // disable Slave Select\n            digitalWrite(SS, HIGH);\n            SPI_beginSlaveTransaction();\n      \n            //outputString = "";\n            sendOutput = false;\n    \n            Serial.println("");\n            SPI_TX_end_ms = millis();\n          }\n        }\n      }\n    }\n  }\n}\n\nvoid SPI_addIncomingChar(char inChar) {\n  //receiving = true;\n\n  if(inChar != 0) {\n    if(SPI_inBuffer_i == 0) {\n      if(inChar == TrameByteStart) {\n        SPI_inBuffer[SPI_inBuffer_i] = inChar;\n        if(SPI_inBuffer_i + 1 < INBUFFER_SIZE) {\n          SPI_inBuffer_i += 1;\n        }\n      }\n    }\n    else {\n      SPI_inBuffer[SPI_inBuffer_i] = inChar;\n      if(SPI_inBuffer_i + 1 < INBUFFER_SIZE) {\n        SPI_inBuffer_i += 1;\n      }\n    }\n  }\n}\n';
	
	Blockly.Arduino.setups_['setup_SPI'] = 'SPI_setup();\n';
	
	
	// iziBus : RS485
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
	Blockly.Arduino.definitions_['define_RS485'] = '// RS485 ********************************************\n#define RS485_PIN_RX  2\n#define RS485_PIN_TX  6\n#define RS485_PIN_RE  4\n#define RS485_PIN_DE  5\n\nSoftwareSerial RS485_Serial(RS485_PIN_RX, RS485_PIN_TX); // RX, TX\n\nlong RS485_baudrate = 38400;   // 115200  57600\n\nchar RS485_inBuffer[INBUFFER_SIZE];\nint RS485_inBuffer_i = 0;\n\nboolean RS485_stringComplete = false;  // whether the string is complete\nboolean RS485_receiving = false;\n\nunsigned long RS485_lastSent = 0;\nunsigned long RS485_lastRecevied = 0;\n';
	
	/*Blockly.Arduino.definitions_['RS485_pins'] = '#define RS485_PIN_RX  2\n#define RS485_PIN_TX  6\n#define RS485_PIN_RE  4\n#define RS485_PIN_DE  5\n';
	//Blockly.Arduino.definitions_['define_buffer_sizes'] = '#define RS485_INBUFFER_SIZE 128\n#define RS485_OUTBUFFER_SIZE 128\n';
	Blockly.Arduino.definitions_['define_buffers'] = 'int RS485_inBuffer_i = 0;\nchar RS485_inBuffer[INBUFFER_SIZE];\n';
	Blockly.Arduino.definitions_['define_baudrate'] = 'long RS485_baudrate = 9600;\n';
	
  Blockly.Arduino.definitions_['define_fcn_setRX'] = 'void setRX() {\n  digitalWrite(PIN_RE, LOW);\n  digitalWrite(PIN_DE, LOW);\n}\n';
  Blockly.Arduino.definitions_['define_fcn_setTX'] = 'void setTX() {\n  digitalWrite(PIN_RE, HIGH);\n  digitalWrite(PIN_DE, HIGH);\n}\n';

  Blockly.Arduino.definitions_['define_iziSerial'] = 'SoftwareSerial RS485_Serial(PIN_RX,PIN_TX);\n';
	
  Blockly.Arduino.definitions_['define_vars'] = 'boolean stringComplete = false;\nboolean receiving = false;\nboolean sendOutput = false;\nunsigned long lastSerialRecevied = 0;\n';*/
	
	Blockly.Arduino.definitions_['define_RS485_setup'] = 'void RS485_setup() {\n  // set the data rate for the SoftwareSerial port\n  RS485_Serial.begin(RS485_baudrate);\n  //RS485_Serial.println("Hello, world?");\n\n  pinMode(RS485_PIN_RE, OUTPUT);\n  pinMode(RS485_PIN_DE, OUTPUT);\n  RS485_setRX();\n}\n';
	
	Blockly.Arduino.definitions_['define_RS485_setRX'] = 'void RS485_setRX() {\n  digitalWrite(RS485_PIN_RE, LOW);\n  digitalWrite(RS485_PIN_DE, LOW);\n}\n';
	
	Blockly.Arduino.definitions_['define_RS485_setTX'] = 'void RS485_setTX() {\n  digitalWrite(RS485_PIN_RE, HIGH);\n  digitalWrite(RS485_PIN_DE, HIGH);\n}\n';
	
	Blockly.Arduino.definitions_['define_RS485_addIncomingChar'] = 'void RS485_addIncomingChar(char inChar) {\n  //receiving = true;\n\n  if(inChar != 0) {\n    if(RS485_inBuffer_i == 0) {\n      if(inChar == TrameByteStart) {\n        RS485_inBuffer[RS485_inBuffer_i] = inChar;\n        if(RS485_inBuffer_i + 1 < INBUFFER_SIZE) {\n          RS485_inBuffer_i += 1;\n        }\n      }\n    }\n    else {\n      RS485_inBuffer[RS485_inBuffer_i] = inChar;\n      if(RS485_inBuffer_i + 1 < INBUFFER_SIZE) {\n        RS485_inBuffer_i += 1;\n        //inBuffer[inBuffer_i] = 0;\n        //receiving = true;\n      }\n    }\n  }\n}\n';
	
  Blockly.Arduino.definitions_['define_RS485_read'] = 'void RS485_read() {\n  if (RS485_Serial.available()) {\n    //digitalWrite(PIN_LED, HIGH);\n\n    if (RS485_receiving) {\n      Serial.println("RX not finished");\n    }\n\n    memset(RS485_inBuffer, (char)0, INBUFFER_SIZE);\n    RS485_inBuffer_i = 0;\n    RS485_stringComplete = false;\n\n    //Serial.print("[");\n    while (RS485_Serial.available()) {\n      RS485_receiving = true;\n      // get the new byte:\n      char inChar = (char)RS485_Serial.read();\n      Serial.write(inChar);\n      // add it to the inputString:\n      //inputString += inChar;\n      if (inChar != \'\\n\') {\n        //Serial.write(inChar);\n        RS485_addIncomingChar(inChar);\n      }\n      // if the incoming character is a newline, set a flag\n      // so the main loop can do something about it:\n      if (inChar == \'\\n\') {\n        RS485_stringComplete = true;\n        RS485_receiving = false;\n        //Serial.println("> " + inputString);\n        //Serial.println("> " + String(inBuffer));\n\n        //Serial.write(\']\');\n        /*Serial.write(\'>\');\n        Serial.write(\' \');\n        for (int iiii = 0 ; iiii < inBuffer_i ; iiii++) {\n          Serial.write(inBuffer[iiii]);\n        }\n        Serial.write(\'\\n\');\n        */\n\n        //receiveBus = BUS_RS485;\n      }\n     \n      if(! RS485_Serial.available()) {\n        // on se laisse une chance de récupérer d\'autres caractères\n        // à 9600 bauds, 1 octet prend 100us\n        delayMicroseconds(200);\n      }\n    }\n    RS485_lastRecevied = millis();\n\n    if(RS485_receiving) {\n      RS485_receiving = false;\n      Serial.print("RX not finished properly:");\n      Serial.print(inBuffer_i);\n      Serial.print(":");\n      for (int iiii = 0 ; iiii < inBuffer_i ; iiii++) {\n        Serial.write(inBuffer[iiii]);\n      }\n      Serial.write(\'\\n\');\n\n      RS485_inBuffer_i = 0;\n    }\n\n    //digitalWrite(PIN_LED, LOW);\n  }\n}\n';

  Blockly.Arduino.definitions_['define_RS485_send'] = 'void RS485_send() {\n  if (sendOutput) {\n    if (!RS485_receiving) {\n      if (!RS485_Serial.available()) {\n    \n        //digitalWrite(PIN_LED, HIGH);\n  \n        //Serial.println("< " + outputString);\n        //Serial.println("< " + String(outBuffer));\n  \n        /*for(int iiii = 0 ; iiii < outBuffer_len ; iiii++) {\n          Serial.write(outBuffer[iiii]);\n          }\n          Serial.write(\'\\n\');*/\n  \n        RS485_setTX();\n\n        Serial.print("RS485<");\n        //Serial.write(\'<\');\n        //Serial.write(\' \');\n        //RS485_Serial.println(String(outBuffer));\n        for (int iiii = 0 ; iiii < outBuffer_len ; iiii++) {\n          RS485_Serial.write(outBuffer[iiii]);\n          Serial.write(outBuffer[iiii]);\n        }\n        RS485_Serial.write(\'\\n\');\n        Serial.write(\'\\n\');\n\n        delay(1);\n        \n        RS485_setRX();\n  \n        //outputString = "";\n        sendOutput = false;\n  \n        //digitalWrite(PIN_LED, LOW);\n      }\n      else {\n        Serial.println("Cannot send" );\n      }\n    }\n    else {\n      Serial.println("Cannot send" );\n\n      if( millis() - RS485_lastRecevied > 100) {\n        RS485_receiving = false;\n      }\n    }\n  }\n}\n';

	Blockly.Arduino.setups_['setup_RS485'] = 'RS485_setup();\n';

	
	// Modules management
  Blockly.Arduino.definitions_['define_vars_modules'] = '#define NB_MODULES_MAX    3\n\nint nb_modules = 0;\nunsigned long modules_SN[NB_MODULES_MAX];\nunsigned long modules_last[NB_MODULES_MAX];\nString modules_Types[NB_MODULES_MAX] = {};\nint modules_Bus[NB_MODULES_MAX];      // BUS_RS485 , BUS_SPI\n';
	Blockly.Arduino.definitions_['define_MODULES_fcn'] = 'boolean MODULES_isKnown(unsigned long sn) {\n  for (int iiii = 0 ; iiii < nb_modules ; iiii++) {\n    if (modules_SN[iiii] == sn) {\n      return true;\n    }\n  }\n  return false;\n}\n\nint MODULES_number(unsigned long sn) {\n  for (int iiii = 0 ; iiii < nb_modules ; iiii++) {\n    if (modules_SN[iiii] == sn) {\n      return iiii;\n    }\n  }\n  return -1;\n}\n\nint MODULES_bus(unsigned long sn) {\n  int modNum = MODULES_number(sn);\n  if(modNum > -1) {\n    return modules_Bus[modNum];\n  }\n  return -1;\n}\n';
	
	Blockly.Arduino.definitions_['RS485_MODULES_question'] = 'void RS485_MODULES_question() {\n  if (!sendOutput) {\n    //measureDC();\n    if (millis() > RS485_lastSent + 3100) {\n      //printDC();\n      \n      aJsonObject* objectJSON = aJson.createObject();\n      Serial.print(StrIndent);\n      Serial.print("qm:");\n      \n      if (objectJSON != NULL) {\n        aJson.addItemToObject(objectJSON, StrModule, aJson.createItem("?"));\n        char* msg = aJson.print(objectJSON);\n        //char* msg = "\\"{\\"module\\":\\"?\\"}";\n        //Serial.println(msg);\n        \n        int iiii = 0;\n        while (*(msg + iiii) != \'\\0\') {\n          outBuffer[iiii] = *(msg + iiii);\n          Serial.print(outBuffer[iiii]);\n          iiii += 1;\n        }\n        outBuffer_len = iiii;\n        free(msg);\n        sendOutput = true;\n        sendBus = BUS_RS485;      // BUS_RS485\n        \n        RS485_lastSent = millis();\n        //Serial.print("len:");\n        Serial.println(outBuffer_len);\n      }\n      else {\n        Serial.print(StrError);\n        Serial.println(":json");\n      }\n      aJson.deleteItem(objectJSON);\n      //freeMem("freeMem");\n    }\n  }\n}\n';
	Blockly.Arduino.definitions_['SPI_MODULES_question'] = 'void SPI_MODULES_question() {\n  if (!sendOutput) {\n    //measureDC();\n    if (millis() > SPI_lastSent + 3000) {\n      //printDC();\n      \n      aJsonObject* objectJSON = aJson.createObject();\n      Serial.print(StrIndent);\n      Serial.print("qm:");\n      \n      if (objectJSON != NULL) {\n        aJson.addItemToObject(objectJSON, StrModule, aJson.createItem("?"));\n        char* msg = aJson.print(objectJSON);\n        //char* msg = "\\"{\\"module\\":\\"?\\"}";\n        //Serial.println(msg);\n        \n        int iiii = 0;\n        while (*(msg + iiii) != \'\\0\') {\n          outBuffer[iiii] = *(msg + iiii);\n          Serial.print(outBuffer[iiii]);\n          iiii += 1;\n        }\n        outBuffer_len = iiii;\n        free(msg);\n        sendOutput = true;\n        sendBus = BUS_SPI;      // BUS_RS485\n        \n        SPI_lastSent = millis();\n        //Serial.print("len:");\n        Serial.println(outBuffer_len);\n      }\n      else {\n        Serial.print(StrError);\n        Serial.println(":json");\n      }\n      aJson.deleteItem(objectJSON);\n      //freeMem("freeMem");\n    }\n\n  }\n}\n';
	
	
	// Process Parse
	Blockly.Arduino.process_start_['process_parse_json'] = '  bool parseSuccess = false;\n  bool stringProcessed = false;\n  unsigned long SN_Module = 0;\n  int receiveBus = 0;                   // BUS_RS485 , BUS_SPI\n\n\n  RS485_read();\n  if(RS485_stringComplete) {\n    for (int iiii = 0 ; iiii < RS485_inBuffer_i ; iiii++) {\n      inBuffer[iiii] = RS485_inBuffer[iiii];\n    }\n    inBuffer_i = RS485_inBuffer_i;\n\n    RS485_inBuffer_i = 0;\n\n    //inBuffer[inBuffer_i] = 0;\n\n    RS485_stringComplete = false;\n    receiveBus = BUS_RS485;\n    stringComplete = true;\n  }\n  else if(SPI_stringComplete) {\n    for (int iiii = 0 ; iiii < SPI_inBuffer_i ; iiii++) {\n      inBuffer[iiii] = SPI_inBuffer[iiii];\n    }\n    inBuffer_i = SPI_inBuffer_i;\n\n    SPI_inBuffer_i = 0;\n\n    //inBuffer[inBuffer_i] = 0;\n\n    SPI_stringComplete = false;\n    receiveBus = BUS_SPI;\n    stringComplete = true;\n  }\n  else {\n    //stringComplete = false;\n  }\n\n\n  if (stringComplete) {\n    \n    //Serial.println("SC");\n\n    //Serial.print(millis());\n \n    if(receiveBus == BUS_SPI) {\n      Serial.print("SPI>");\n    }\n    else if(receiveBus == BUS_RS485) {\n      Serial.print("RS485>");\n    }\n    else {\n      Serial.print(" ?");\n    }\n\n    //memset(JsonBuffer, 0, JSON_BUFFER_SIZE);\n        \n    for (int iiii = 0 ; iiii < inBuffer_i ; iiii++) {\n      //JsonBuffer[iiii] = inBuffer[iiii];\n      Serial.write(inBuffer[iiii]);\n    }\n    //JsonBuffer[inBuffer_i] = inBuffer[inBuffer_i];\n    \n    Serial.print(".");\n    Serial.print(inBuffer_i);\n    Serial.print(".");\n    //if(false) {\n    if(inBuffer_i > 2) {\n\n      //Serial.println("_ok");\n      \n      unsigned long startParse = micros();\n\n      aJsonObject* root = aJson.parse(inBuffer);\n      //aJsonObject* root = aJson.parse(JsonBuffer);\n  \n      if (root != NULL) {\n        //Serial.print("parse:");\n        Serial.print(micros() - startParse);\n        Serial.println("us");\n  \n        aJsonObject* sn = aJson.getObjectItem(root, "sn");\n        if (sn != NULL) {\n          SN_Module = sn->valueint;    //valueint      root["sn"];\n          if ( ! MODULES_isKnown(SN_Module)) {\n            modules_SN[nb_modules] = SN_Module;\n            modules_Bus[nb_modules] = receiveBus;\n            \n            //modules_last[nb_modules] = millis();\n            nb_modules += 1;\n            Serial.print(StrIndent);\n            Serial.print("New:");\n            Serial.println(SN_Module);\n          }\n          else {\n            Serial.print(StrIndent);\n            Serial.print("Mod:");\n            Serial.println(SN_Module);\n          }\n          parseSuccess = true;\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":no \\"sn\\"");\n        }\n        //aJson.deleteItem(sn);\n      }\n      else {\n        Serial.print(StrError);\n        Serial.println(":parse");\n        //Serial.print(String(micros() - startParse));\n        //Serial.println("us");\n        //Serial.print(String(micros() - startParse) + "us *** parseObject() failed: << ");\n\n      }\n      aJson.deleteItem(root);   \n\n      /*if(!parseSuccess) {\n        Serial.print("(");\n        for (int iiii = 0 ; iiii < inBuffer_i ; iiii++) {\n          Serial.print(inBuffer[iiii], HEX);\n          Serial.print(".");\n        }\n        //Serial.print(String(JsonBuffer));\n        Serial.println(")");\n      }*/\n    }\n\n    stringProcessed = true;\n  }\n\n';
	
	// Mesure tension d'alimentation
	Blockly.Arduino.definitions_['define_vars_measureDC'] = '#define PIN_DC  A0\nint inputMesureDC = 0;\nint inputMesureDC_x = 5545;      // multiplicateur pour obtenir des mV\n';
	/*Blockly.Arduino.definitions_['define_fcn_measureDC'] = 'void measureDC() { \n  int v_max = 5 * inputMesureDC_x;\n  inputMesureDC = map(analogRead(PIN_DC), 0, 1023, 0, v_max);\n}\n';*/
	Blockly.Arduino.definitions_['define_fcn_measureDC'] = 'void measureDC() { \n  int sensorValue = analogRead(PIN_DC);\n  inputMesureDC = sensorValue *27;\n  //inputMesureDC = readVcc();\n}\n';
	/*Blockly.Arduino.definitions_['define_fcn_readVcc'] = 'long readVcc() {\n  // Read 1.1V reference against AVcc\n  // set the reference to Vcc and the measurement to the internal 1.1V reference\n  #if defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)\n    ADMUX = _BV(REFS0) | _BV(MUX4) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);\n  #elif defined (__AVR_ATtiny24__) || defined(__AVR_ATtiny44__) || defined(__AVR_ATtiny84__)\n    ADMUX = _BV(MUX5) | _BV(MUX0);\n  #elif defined (__AVR_ATtiny25__) || defined(__AVR_ATtiny45__) || defined(__AVR_ATtiny85__)\n    ADMUX = _BV(MUX3) | _BV(MUX2);\n  #else\n    ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);\n  #endif  \n\n  delay(2); // Wait for Vref to settle\n  ADCSRA |= _BV(ADSC); // Start conversion\n  while (bit_is_set(ADCSRA,ADSC)); // measuring\n\n  uint8_t low  = ADCL; // must read ADCL first - it then locks ADCH  \n  uint8_t high = ADCH; // unlocks both\n\n  long result = (high<<8) | low;\n\n  result = 1125300L / result; // Calculate Vcc (in mV); 1125300 = 1.1*1023*1000\n  return result; // Vcc in millivolts\n}\n';*/
	Blockly.Arduino.definitions_['define_fcn_getMeasureDC'] = 'int getMeasureDC() { \n  process();\n  return inputMesureDC;\n}\n';
	Blockly.Arduino.definitions_['define_fcn_printDC'] = 'void printDC() { \n  Serial.print("{\\"DC\\":");\n  Serial.print(inputMesureDC);\n  Serial.println("}");\n}\n';
	
	
	
	//Blockly.Arduino.setups_['setup_waitforModules'] = 'while(nb_modules == 0) {\n    process();\n  }\n';
};

iziV3SetiziOs2 = function () {

	Blockly.Arduino.setups_['setup_waitforModules'] = 'while(nb_modules == 0) {\n    process();\n  }\n';



	Blockly.Arduino.process_end_['process_clearString'] = '  if(stringProcessed) {\n    stringComplete = false;\n    \n    // clear the string:\n    memset(inBuffer, 0, inBuffer_i);\n    inBuffer_i = 0;\n\n    //Serial.println("inBuffer cleared");\n  }\n';
	Blockly.Arduino.process_end_['process_questionModules'] = '  RS485_MODULES_question();\n  SPI_MODULES_question();\n';
	Blockly.Arduino.process_end_['process_send'] = '  if(sendBus == BUS_RS485) {\n    RS485_send();\n  }\n  else if(sendBus == BUS_SPI) {\n    SPI_send();\n  } \n';
};


Blockly.Arduino.iziMakersV3_setup = function () {
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

Blockly.Arduino.iziMakersV3_delay = function() {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
	
  Blockly.Arduino.definitions_['define_fcn_pause'] = 'void pause(unsigned long length_ms) {\n  unsigned long start_ms = millis();\n  while(millis() < start_ms + length_ms) {\n    process();\n  }\n}\n';
	
	iziV3SetiziOs1();
	iziV3SetiziOs2();
	
  var code = 'pause(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.iziMakersV3_millis = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_input_voltage = function() {

	iziV3SetiziOs1();

	iziV3SetiziOs2();
  
	var code = 'getMeasureDC()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




iziV3SetMotorsFunctions = function (module_sn) {
	// Motors
	Blockly.Arduino.definitions_['motors_vars'] = 'int SN_Motors = ' + module_sn + ';\nint motorA_speed = 0;\nint motorA_speed_target = 0;\nint motorB_speed = 0;\nint motorB_speed_target = 0;\nunsigned long lastMotors = 0;\n';
	Blockly.Arduino.definitions_['motors_fcn_MOTORS_processInput'] = 'void MOTORS_processInput(unsigned long SN) {\n  if (MODULES_isKnown(SN_Motors)) {\n    if (SN > 0) {\n      if (SN == SN_Motors) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "a");\n          if (aJson.getObjectItem(root, "a") != NULL) {\n            motorA_speed = aJson.getObjectItem(root, "a")->valueint;\n            lastMotors = millis();\n\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("a:");\n            Serial.println(motorA_speed);\n          }\n          //aJsonObject* b_ = aJson.getObjectItem(root, "b");\n          if (aJson.getObjectItem(root, "b") != NULL) {\n            motorB_speed = aJson.getObjectItem(root, "b")->valueint;\n            lastMotors = millis();\n\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("b:");\n            Serial.println(motorB_speed);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":Min");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	Blockly.Arduino.definitions_['motors_fcn_MOTORS_processOutput'] = 'void MOTORS_processOutput() {\n  if (!sendOutput) {\n    if (MODULES_isKnown(SN_Motors)) {\n      if (motorA_speed != motorA_speed_target || motorB_speed != motorB_speed_target || (millis() >= lastMotors + 1000)) {\n        if (millis() >= lastMotors + 20) {\n          Serial.print(StrIndent);\n          Serial.print("Mout:");\n          aJsonObject* objectJSON = aJson.createObject();\n          if (objectJSON != NULL) {\n            aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Motors));\n            aJson.addItemToObject(objectJSON, "a", aJson.createItem(motorA_speed_target));\n            aJson.addItemToObject(objectJSON, "b", aJson.createItem(motorB_speed_target));\n            char* msg = aJson.print(objectJSON);\n            Serial.print(msg);\n            int i = 0;\n            while (*(msg + i) != \'\\0\') {\n              outBuffer[i] = *(msg + i);\n              i += 1;\n            }\n            outBuffer_len = i;\n            Serial.print(":");\n            Serial.println(outBuffer_len);\n            free(msg);\n            \n            //freeMem("freeMem");\n            sendOutput = true;\n            sendBus = MODULES_bus(SN_Motors);\n          }\n          else {\n            Serial.print(StrError);\n            Serial.println(":json");\n          }\n          aJson.deleteItem(objectJSON);\n          lastMotors = millis();\n        }\n      }\n    }\n  }\n}';
	
	Blockly.Arduino.process_module_input_['process_motors_input'] = 'if(parseSuccess) {\n    MOTORS_processInput(SN_Module);\n  }\n';
	Blockly.Arduino.process_module_output_['process_motors_output'] = 'MOTORS_processOutput();\n';
};

iziV3SetServoFunctions = function (module_sn) {
	// Servo
	Blockly.Arduino.definitions_['servos_vars'] = 'int SN_Servos = ' + module_sn + ';\n\nint SERVOS_Val[8] = {0, 0, 0, 0, 0, 0, 0, 0};\nint SERVOS_Val_target[8] = {0, 0, 0, 0, 0, 0, 0, 0};\nunsigned long SERVOS_last = 0;\n';
	//Blockly.Arduino.definitions_['servo_fcn_processInput'] = 'void processModuleMotorsInput(unsigned long SN, char * inBuffer) {\n  if (MODULES_isKnown(SN_Motors)) {\n    if (SN > 0) {\n      if (SN == SN_Motors) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "a");\n          if (aJson.getObjectItem(root, "a") != NULL) {\n            motorA_speed = aJson.getObjectItem(root, "a")->valueint;\n            lastMotors = millis();\n          }\n          //aJsonObject* b_ = aJson.getObjectItem(root, "b");\n          if (aJson.getObjectItem(root, "b") != NULL) {\n            motorB_speed = aJson.getObjectItem(root, "b")->valueint;\n            lastMotors = millis();\n          }\n        }\n        else {\n          Serial.print("M in: err");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	Blockly.Arduino.definitions_['servos_fcn_processOutput'] = 'void SERVOS_processOutput() {\n  if (!sendOutput) {\n    if (MODULES_isKnown(SN_Servos)) {\n      int nb_new_val = 0;\n      for(int iiii = 0 ; iiii < 8 ; iiii++) {\n        if(SERVOS_Val[iiii] != SERVOS_Val_target[iiii]) {\n          nb_new_val += 1;\n        }\n      }\n\n      if (nb_new_val > 0) { // || (millis() >= SERVOS_last + 1000)) {\n        if (millis() >= SERVOS_last + 10) {\n          Serial.print(StrIndent);\n          Serial.print("Sout:");\n          aJsonObject* objectJSON = aJson.createObject();\n          if (objectJSON != NULL) {\n\n            aJsonObject* fmt;\n            aJson.addNumberToObject(objectJSON,"sn", SN_Servos);\n\n            //if (nb_new_val < 4) {\n            int new_val_to_send = 0;\n              for(int iiii = 0 ; iiii < 8 ; iiii++) {\n                if(SERVOS_Val[iiii] != SERVOS_Val_target[iiii]) {\n                  char buf[2];\n                  itoa(iiii + 1, buf, 10);\n                  aJson.addNumberToObject(objectJSON, buf, SERVOS_Val_target[iiii]);\n                  SERVOS_Val[iiii] = SERVOS_Val_target[iiii];\n\n                  new_val_to_send += 1;\n\n                  if(new_val_to_send > 3) break;\n                }\n              }\n            /*}\n            else {\n              aJson.addItemToObject(objectJSON, "s", fmt = aJson.createArray());\n              aJsonObject* day;\n\n              for(int iiii = 0 ; iiii < 6 ; iiii++) {\n                  day = aJson.createItem(SERVOS_Val_target[iiii]);\n                  aJson.addItemToArray(fmt, day);\n  \n                  SERVOS_Val[iiii] = SERVOS_Val_target[iiii];\n              }\n            }*/\n\n            char* msg = aJson.print(objectJSON);\n            Serial.print(msg);\n            int i = 0;\n            while (*(msg + i) != \'\\0\') {\n              outBuffer[i] = *(msg + i);\n              i += 1;\n            }\n            outBuffer_len = i;\n            Serial.print(":");\n            Serial.println(outBuffer_len);\n            free(msg);\n\n            //freeMem("freeMem");\n            sendOutput = true;\n            sendBus = MODULES_bus(SN_Servos);\n          }\n          else {\n            Serial.print(StrError);\n            Serial.println(":json");\n          }\n          aJson.deleteItem(objectJSON);\n          SERVOS_last = millis();\n        }\n      }\n    }\n  }\n}';
	
	//Blockly.Arduino.process_module_['process_servo_input'] = 'if(parseSuccess) {\n    processModuleMotorsInput(SN_Module, inBuffer);\n  }\n';
	Blockly.Arduino.process_module_output_['process_servos_output'] = 'SERVOS_processOutput();\n';
};

iziV3SetJoysticksFunctions = function (module_sn) {
	// Joystick
	Blockly.Arduino.definitions_['joysticks_vars'] = 'int SN_Joystick = ' + module_sn + ';\nint JOYSTICKS_J1X = 0;\nint JOYSTICKS_J1Y = 0;\nint JOYSTICKS_J1SW = 0;\nint JOYSTICKS_J2X = 0;\nint JOYSTICKS_J2Y = 0;\nint JOYSTICKS_J2SW = 0;\nunsigned long JOYSTICKS_lastReceived = 0;\n';
	Blockly.Arduino.definitions_['joysticks_fcn_JOYSTICKS_processInput'] = 'void JOYSTICKS_processInput(unsigned long SN, char * inBuffer) {\n  if (MODULES_isKnown(SN_Joystick)) {\n    if (SN > 0) {\n      if (SN == SN_Joystick) {\n        Serial.print(StrIndent);\n        Serial.print("Jin");\n        //Serial.println(inBuffer);\n        \n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          Serial.print("\\n");\n          //Serial.println("Jin:");\n          //Serial.print(inBuffer);\n          if (aJson.getObjectItem(root, "JX") != NULL) {\n            JOYSTICKS_J1X = (int)aJson.getObjectItem(root, "JX")->valueint;\n            JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1X:");\n            Serial.println(JOYSTICKS_J1X);\n          }\n          if (aJson.getObjectItem(root, "JY") != NULL) {\n            JOYSTICKS_J1Y = (int)aJson.getObjectItem(root, "JY")->valueint;\n            JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1Y:");\n            Serial.println(JOYSTICKS_J1Y);\n          }\n          if (aJson.getObjectItem(root, "JSW") != NULL) {\n            JOYSTICKS_J1SW = (int)aJson.getObjectItem(root, "JSW")->valueint;\n            JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW:");\n            Serial.println(JOYSTICKS_J1SW);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['joysticks_fcn_processModuleJoysticksOutput'] = 'void JOYSTICKS_processOutput() {\n  if (!sendOutput) {\n    if (millis() > JOYSTICKS_lastReceived + 300) {\n      if (MODULES_isKnown(SN_Joystick)) {\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Joystick));\n        aJson.addItemToObject(objectJSON, "j", aJson.createItem(1));\n\n        Serial.print(StrIndent);\n        Serial.print("Jout:");\n        if (objectJSON != NULL) {\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          sendBus = MODULES_bus(SN_Joystick);\n          Serial.println(":ok");\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(objectJSON);\n        //freeMem("freeMem");\n      }\n      JOYSTICKS_lastReceived = millis();\n    }\n  }\n}\n}';*/
	Blockly.Arduino.definitions_['joysticks_fcn_getJoysticksValues'] = 'int JOYSTICKS_getJ1X() {\n  process();\n  return JOYSTICKS_J1X;\n}\nint JOYSTICKS_getJ1Y() {\n  process();\n  return JOYSTICKS_J1Y;\n}\nint JOYSTICKS_getJ1SW() {\n  process();\n  return JOYSTICKS_J1SW;\n}\n';
	
	Blockly.Arduino.process_module_input_['process_joysticks_input'] = 'if(parseSuccess) {\n    JOYSTICKS_processInput(SN_Module, inBuffer);\n  }\n';
	//Blockly.Arduino.process_module_output_['process_joysticks_output'] = 'processModuleJoysticksOutput();\n';
};

iziV3SetUltrasonicFunctions = function (module_sn) {
	// Ultrasonic
	Blockly.Arduino.definitions_['ultrasonic_vars'] = 'int SN_Ultrasonic = ' + module_sn + ';\nint ultrasonic_cm = 0;\nunsigned long lastUltrasonic = 0;\n';
	Blockly.Arduino.definitions_['ultrasonic_fcn_processModuleUltrasonicInput'] = 'void processModuleUltrasonicInput(unsigned long SN, char * inBuffer) {\n  if (MODULES_isKnown(SN_Ultrasonic)) {\n    if (SN > 0) {\n      if (SN == SN_Ultrasonic) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //Serial.print(inBuffer);\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "US");\n          if (aJson.getObjectItem(root, "US") != NULL) {\n            ultrasonic_cm = (int)aJson.getObjectItem(root, "US")->valueint;\n            if(ultrasonic_cm == 0){ultrasonic_cm = 300;}\n            Serial.print("US_cm:");\n            Serial.println(ultrasonic_cm);\n            lastUltrasonic = millis();\n          }\n          //aJson.deleteItem(obj);\n        }\n        else {\n          Serial.print("USin:err");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['ultrasonic_fcn_processModuleUltrasonicOutput'] = 'void processModuleUltrasonicOutput() {\n  if (!sendOutput) {\n    if (millis() > lastUltrasonic + 300) {\n      if (MODULES_isKnown(SN_Ultrasonic)) {\n        Serial.print("Ultrasonic:");\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Ultrasonic));\n        aJson.addItemToObject(objectJSON, "US", aJson.createItem(1));\n        if (objectJSON != NULL) {\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          Serial.println(":done");\n        }\n        else {\n          Serial.println("objectJSON = NULL");\n        }\n        aJson.deleteItem(objectJSON);\n      }\n      lastUltrasonic = millis();\n    }\n  }\n}\n';
	*/
	Blockly.Arduino.definitions_['joysticks_fcn_getUltrasonicValues'] = 'int getUltrasonic() {\n  process();\n  return ultrasonic_cm;\n}\n\nint getUltrasonic_inch() {\n  process();\n  return (int)(ultrasonic_cm / 2.54);\n}\n';
	
	Blockly.Arduino.process_module_input_['process_ultrasonic_input'] = 'if(parseSuccess) {\n    processModuleUltrasonicInput(SN_Module, inBuffer);\n  }\n';
	//Blockly.Arduino.process_module_output_['process_ultrasonic_output'] = 'processModuleUltrasonicOutput();\n';
};

iziV3SetColorSensorFunctions = function (module_sn) {
	// Color Sensor
	Blockly.Arduino.definitions_['color_sensor_vars'] = 'int SN_ColorSensor = ' + module_sn + ';\n\nint COLORSENSOR_R = 0;\nint COLORSENSOR_G = 0;\nint COLORSENSOR_B = 0;\nint COLORSENSOR_H = 0;\nint COLORSENSOR_S = 0;\nint COLORSENSOR_V = 0;\nint COLORSENSOR_P = 0; // O:back 1:white 2:red 3:orange 4:yellow 5:lime 6:green 7:turquoise 8:cyan 9:cobalt 10:blue 11:violet 12:magenta 13:crimson\nunsigned long COLORSENSOR_lastReceived = 0;\n\n';
	Blockly.Arduino.definitions_['color_sensor_Input'] = 'void COLORSENSOR_processInput(unsigned long SN) {\n  if (MODULES_isKnown(SN_ColorSensor)) {\n    if (SN > 0) {\n      if (SN == SN_ColorSensor) {\n        Serial.print(StrIndent);\n        Serial.print("Cin");\n        //Serial.println(inBuffer);\n        \n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          Serial.print("\\n");\n          //Serial.println("Jin:");\n          //Serial.print(inBuffer);\n          if (aJson.getObjectItem(root, "H") != NULL) {\n            COLORSENSOR_H = (int)aJson.getObjectItem(root, "H")->valueint;\n            COLORSENSOR_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("H:");\n            Serial.println(COLORSENSOR_H);\n          }\n          if (aJson.getObjectItem(root, "S") != NULL) {\n            COLORSENSOR_S = (int)aJson.getObjectItem(root, "S")->valueint;\n            COLORSENSOR_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("S:");\n            Serial.println(COLORSENSOR_S);\n          }\n          if (aJson.getObjectItem(root, "V") != NULL) {\n            COLORSENSOR_V = (int)aJson.getObjectItem(root, "V")->valueint;\n            COLORSENSOR_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("V:");\n            Serial.println(COLORSENSOR_V);\n          }\n          if (aJson.getObjectItem(root, "P") != NULL) {\n            COLORSENSOR_P = (int)aJson.getObjectItem(root, "P")->valueint;\n            COLORSENSOR_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("P:");\n            Serial.println(COLORSENSOR_P);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['ultrasonic_fcn_processModuleUltrasonicOutput'] = 'void processModuleUltrasonicOutput() {\n  if (!sendOutput) {\n    if (millis() > lastUltrasonic + 300) {\n      if (MODULES_isKnown(SN_Ultrasonic)) {\n        Serial.print("Ultrasonic:");\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Ultrasonic));\n        aJson.addItemToObject(objectJSON, "US", aJson.createItem(1));\n        if (objectJSON != NULL) {\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          Serial.println(":done");\n        }\n        else {\n          Serial.println("objectJSON = NULL");\n        }\n        aJson.deleteItem(objectJSON);\n      }\n      lastUltrasonic = millis();\n    }\n  }\n}\n';
	*/
	Blockly.Arduino.process_module_input_['process_color_sensor_input'] = '  if (parseSuccess) {\n    COLORSENSOR_processInput(SN_Module);\n  }\n';
	//Blockly.Arduino.process_module_output_['process_ultrasonic_output'] = 'processModuleUltrasonicOutput();\n';
	
	Blockly.Arduino.definitions_['color_sensor_getValues'] = 'int COLORSENSOR_getH() {\n  process();\n  return COLORSENSOR_H;\n}\n\nint COLORSENSOR_getS() {\n  process();\n  return COLORSENSOR_S;\n}\n\nint COLORSENSOR_getV() {\n  process();\n  return COLORSENSOR_V;\n}\n\nint COLORSENSOR_getP() {\n  process();\n  return COLORSENSOR_P;\n}\n';
};





Blockly.Arduino.iziMakersV3_motors = function() {
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var moteur_num = this.getFieldValue('MOTEUR_NUM');
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	var module_sn = 101;
	
	iziV3SetiziOs1();
	iziV3SetMotorsFunctions(module_sn);
	iziV3SetiziOs2();
	
	var code = '';
	if(moteur_num === "A") {
		code = 'motorA_speed_target = ' + motor_power + ';\nprocess();\n';
	}
	else if(moteur_num === "B") {
		code = 'motorB_speed_target = ' + motor_power + ';\nprocess();\n';
	}
	
	//var code = 'motorA_speed_target = ' + motor_power + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV3_motors_a = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	var module_sn = 101;
	
	iziV3SetiziOs1();
	iziV3SetMotorsFunctions(module_sn);
	iziV3SetiziOs2();
	
	var code = 'motorA_speed_target = ' + motor_power + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV3_motors_b = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	var motor_power = Blockly.Arduino.valueToCode(this, 'POWER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	var module_sn = 101;
	
	iziV3SetiziOs1();
	iziV3SetMotorsFunctions(module_sn);
	iziV3SetiziOs2();
	
	var code = 'motorB_speed_target = ' + motor_power + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV3_thumb_joystick =  function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
  //var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_axis = this.getFieldValue('AXIS');
  /*var stickPIN = "0";
  if(dropdown_axis==="y"){
    stickPIN = 1;
  } else {
    //stickPIN = dropdown_pin;
  }*/
	
	var module_sn = 101;
	
	iziV3SetiziOs1();
	iziV3SetJoysticksFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = '';
  if(dropdown_axis==="y"){
		//code = 'J1Y';
		code = 'JOYSTICKS_getJ1Y()';
  } 
	else if(dropdown_axis==="x"){
		//code = 'J1X';
		code = 'JOYSTICKS_getJ1X()';
  } 
	else if(dropdown_axis==="sw"){
		//code = 'J1SW';
		code = 'JOYSTICKS_getJ1SW()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_ultrasonic_ranger = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var dropdown_unit = this.getFieldValue('UNIT');
	
	var module_sn = 101;
	
	iziV3SetiziOs1();
	iziV3SetUltrasonicFunctions(module_sn);
	iziV3SetiziOs2();
  
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

iziV3SetNeopixelsFunctions = function (module_sn) {
	// Neopixels
	Blockly.Arduino.definitions_['pixels_vars'] = '#define PIXELS_MAX    60\n\nint SN_Pixels = 103;\nboolean PIXELS_new_value = false;\nint PIXELS_pixel[PIXELS_MAX];\nboolean PIXELS_new[PIXELS_MAX];\nboolean PIXELS_effect_fire = false;\nunsigned long PIXELS_last = 0;\nint Pixels_nb = 0;\n\nboolean Pixels_fire_ack = false;';
	//Blockly.Arduino.definitions_['pixels_fcn_MOTORS_processInput'] = 'void MOTORS_processInput(unsigned long SN) {\n  if (MODULES_isKnown(SN_Motors)) {\n    if (SN > 0) {\n      if (SN == SN_Motors) {\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          //aJsonObject* obj;\n          //obj = aJson.getObjectItem(root, "a");\n          if (aJson.getObjectItem(root, "a") != NULL) {\n            motorA_speed = aJson.getObjectItem(root, "a")->valueint;\n            lastMotors = millis();\n\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("a:");\n            Serial.println(motorA_speed);\n          }\n          //aJsonObject* b_ = aJson.getObjectItem(root, "b");\n          if (aJson.getObjectItem(root, "b") != NULL) {\n            motorB_speed = aJson.getObjectItem(root, "b")->valueint;\n            lastMotors = millis();\n\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("b:");\n            Serial.println(motorB_speed);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":Min");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	
	Blockly.Arduino.definitions_['pixels_processInput'] = 'void PIXELS_processInput(unsigned long SN) {\n  if (MODULES_isKnown(SN_Pixels)) {\n    if (SN > 0) {\n      if (SN == SN_Pixels) {\n        Serial.print(StrIndent);\n        Serial.print("Pin");\n        //Serial.println(inBuffer);\n\n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          Serial.print("\\n");\n          //Serial.println("Jin:");\n          //Serial.print(inBuffer);\n          if (aJson.getObjectItem(root, "pix") != NULL) {\n            Pixels_nb = (int)aJson.getObjectItem(root, "pix")->valueint;\n            //JOYSTICKS_lastReceived = millis();\n            if(Pixels_nb > PIXELS_MAX) {\n              Pixels_nb = PIXELS_MAX;\n            }\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("pix:");\n            Serial.println(Pixels_nb);\n          }\n          if (aJson.getObjectItem(root, "fire") != NULL) {\n            boolean temp_fire = (int)aJson.getObjectItem(root, "fire")->valuebool;\n\n            if(temp_fire == PIXELS_effect_fire) {\n              Pixels_fire_ack = true;\n            }\n\n            //JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("fire:");\n            Serial.println(temp_fire);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	
	Blockly.Arduino.definitions_['pixels_processOutput'] = 'void PIXELS_processOutput() {\n  if (!sendOutput) {\n    if (MODULES_isKnown(SN_Pixels)) {\n      if (PIXELS_new_value) {\n        //if (millis() >= lastMotors + 100) {\n          Serial.print(StrIndent);\n          Serial.print("Pout:");\n          aJsonObject* objectJSON = aJson.createObject();\n          if (objectJSON != NULL) {\n            aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Pixels));\n\n            if(PIXELS_effect_fire) {\n              if(!Pixels_fire_ack) {\n                if (millis() >= PIXELS_last + 100) {\n                  aJson.addItemToObject(objectJSON, "fire", aJson.createItem(1));\n                }\n              }\n            }\n            else {\n              char charBuf[3] = {0, 0, 0};\n              int nb_pixels = 5;    // nombre de pixels max à envoyer par trame\n              for(int iiii = 0 ; iiii < Pixels_nb ; iiii++) {\n                if(PIXELS_new[iiii] && nb_pixels > 0) {\n                  itoa(iiii,charBuf,10);\n                  aJson.addItemToObject(objectJSON, charBuf, aJson.createItem(PIXELS_pixel[iiii]));\n                  PIXELS_new[iiii] = false;\n                  nb_pixels -= 1;\n                }\n              }\n              if(nb_pixels == 5) {\n                //aJson.addItemToObject(objectJSON, "fire", aJson.createItem(0));\n              }\n            }\n\n            /*if(PIXELS_new[1]) {\n              aJson.addItemToObject(objectJSON, "1", aJson.createItem(PIXELS_pixel[1]));\n              PIXELS_new[1] = false;\n            }*/\n\n            char* msg = aJson.print(objectJSON);\n            Serial.print(msg);\n            int iiii = 0;\n            while (*(msg + iiii) != \'\\0\') {\n              outBuffer[iiii] = *(msg + iiii);\n              iiii += 1;\n            }\n            outBuffer_len = iiii;\n            Serial.print(":");\n            Serial.println(outBuffer_len);\n            free(msg);\n\n            //freeMem("freeMem");\n            sendOutput = true;\n            sendBus = MODULES_bus(SN_Pixels);\n\n            PIXELS_new_value = false;\n            for(int iiii = 0 ; iiii < PIXELS_MAX ; iiii++) {\n              if(PIXELS_new[iiii]) {\n                PIXELS_new_value = true;\n              }\n            }\n\n          }\n          else {\n            Serial.print(StrError);\n            Serial.println(":json");\n          }\n          aJson.deleteItem(objectJSON);\n          PIXELS_last = millis();\n       // }\n      }\n    }\n  }\n}\n';
	
	Blockly.Arduino.definitions_['pixels_setup'] = 'void PIXELS_setup() {\n  for(int iiii = 0 ; iiii < PIXELS_MAX ; iiii++) {\n    PIXELS_pixel[iiii] = 0;\n    PIXELS_new[iiii] = false;\n  }\n}\n';
	
	Blockly.Arduino.definitions_['pixels_set_color'] = 'void PIXELS_set(int pixel_num, int pixel_color) {\n  if(pixel_num > 0) {\n    pixel_num -= 1;\n  }\n  \n  PIXELS_pixel[pixel_num] = pixel_color;\n  PIXELS_new[pixel_num] = true;\n  PIXELS_new_value = true;\n}\n';
	
	Blockly.Arduino.definitions_['PIXELS_set_hsl'] = 'void PIXELS_set_hsl(int pixel_num, double h, double s, double l) {\n  if(pixel_num > 0) {\n    pixel_num -= 1;\n  }\n\n  byte rgb[3];\n\n  hslToRgb(h, s, l, rgb);\n\n  int pixel_color = ((rgb[0] / 16) << 8) + ((rgb[1] / 16) << 4) + ((rgb[2] / 16) << 0);\n  \n  PIXELS_pixel[pixel_num] = pixel_color;\n  PIXELS_new[pixel_num] = true;\n  PIXELS_new_value = true;\n}\n';
	
	Blockly.Arduino.definitions_['PIXELS_set_fire'] = 'void PIXELS_set_fire(boolean val) {\n  if(val != PIXELS_effect_fire) {  \n    Pixels_fire_ack = false;\n    PIXELS_effect_fire = val;\n    PIXELS_new_value = true;\n  }\n}\n';
	
	
	
	
	Blockly.Arduino.setups_['PIXELS_setup'] = 'PIXELS_setup();\n';
	
	Blockly.Arduino.process_module_['process_motors_input'] = 'if(parseSuccess) {\n    PIXELS_processInput(SN_Module);\n  }\n';
	Blockly.Arduino.process_module_output_['process_pixels_output'] = 'PIXELS_processOutput();\n';
	
	
	
	
	Blockly.Arduino.definitions_['hslToRgb'] = 'void hslToRgb(double h, double s, double l, byte rgb[]) {\n    double r, g, b;\n\n    h = h / 360;\n    s = s / 100;\n    l = l / 100;\n    \n    if (s == 0) {\n        r = g = b = l; // achromatic\n    } \n    else {\n        double q = l < 0.5 ? l * (1 + s) : l + s - l * s;\n        double p = 2 * l - q;\n        r = hue2rgb(p, q, h + 1/3.0);\n        g = hue2rgb(p, q, h);\n        b = hue2rgb(p, q, h - 1/3.0);\n    }\n\n    rgb[0] = r * 255;\n    rgb[1] = g * 255;\n    rgb[2] = b * 255;\n}\n';
	Blockly.Arduino.definitions_['hue2rgb'] = 'double hue2rgb(double p, double q, double t) {\n    if(t < 0) t += 1;\n    if(t > 1) t -= 1;\n    if(t < 1/6.0) return p + (q - p) * 6 * t;\n    if(t < 1/2.0) return q;\n    if(t < 2/3.0) return p + (q - p) * (2/3.0 - t) * 6;\n    return p;\n}\n';
};

Blockly.Arduino.iziMakersV3_Neopixels_init = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Number_of_Pixels = Blockly.Arduino.valueToCode(this, 'Number_of_Pixels', Blockly.Arduino.ORDER_ATOMIC) || '0';
		
  //var Number_of_Pixels = this.getFieldValue('Number_of_Pixels');
	var module_sn = 103;
	
	iziV3SetiziOs1();
	iziV3SetNeopixelsFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = 'int Number_of_Pixels = ' + Number_of_Pixels + ';\n';

  return code;
};

Blockly.Arduino.iziMakersV3_Neopixels_setPixelColor_picker = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Pixel_number = Blockly.Arduino.valueToCode(this, 'Pixel_number', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	var module_sn = 103;

	if(Pixel_number == '0') {
		Pixel_number = '1';
	}
  //var dropdown_unit = this.getFieldValue('UNIT');
	var Colour_of_Pixel = this.getFieldValue('Colour_of_Pixel');
	
	iziV3SetiziOs1();
	iziV3SetNeopixelsFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = '';
	//code += 'int Pixel_number = ' + Pixel_number + ';\n';
	
	var RGB = hexToRgb(Colour_of_Pixel);
	
	//code += 'unsigned long RGB_8bits = ' + rgbToHex_8bits(RGB.r, RGB.g, RGB.b) + ';\n';
	//code += 'unsigned long RGB_4bits = ' + rgbToHex_4bits(RGB.r, RGB.g, RGB.b) + ';\n';
	
	//code += 'int Colour_of_Pixel_r = ' + RGB.r + ';\n';
	//code += 'int Colour_of_Pixel_g = ' + RGB.g + ';\n';
	//code += 'int Colour_of_Pixel_b = ' + RGB.b + ';\n';
	
	//var RGB_int = (RGB.r << 16) + (RGB.g << 8) + (RGB.b << 0);
	
	code += 'PIXELS_set(' + Pixel_number + ', ' + Math.floor(rgbToHex_4bits(RGB.r, RGB.g, RGB.b)) + ');\n';
	
	//code += 'PIXELS_set(' + RGB_int + ');\n';
	
	//code += 'process();\n';

  return code;
};

Blockly.Arduino.iziMakersV3_Neopixels_setPixelColor_HSI = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Pixel_number = Blockly.Arduino.valueToCode(this, 'Pixel_number', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var hue = Blockly.Arduino.valueToCode(this, 'HUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var saturation = Blockly.Arduino.valueToCode(this, 'SATURATION', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var intensity = Blockly.Arduino.valueToCode(this, 'INTENSITY', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	var module_sn = 103;
	
	if(Pixel_number == '0') {
		Pixel_number = '1';
	}
  //var dropdown_unit = this.getFieldValue('UNIT');

	
	iziV3SetiziOs1();
	iziV3SetNeopixelsFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = '';
	//code += 'int Pixel_number = ' + Pixel_number + ';\n';
	//code += 'int hue = ' + hue + ';\n';
	//code += 'int saturation = ' + saturation + ';\n';
	//code += 'int intensity = ' + intensity + ';\n';
	
	//var RGB = hslToRgb(hue/360, saturation/100, intensity / 100);
	
	//code += 'int Colour_of_Pixel_r = ' + RGB.r + ';\n';
	//code += 'int Colour_of_Pixel_g = ' + RGB.g + ';\n';
	//code += 'int Colour_of_Pixel_b = ' + RGB.b + ';\n';
	
	//code += 'unsigned long RGB_8bits = ' + rgbToHex_8bits(RGB.r, RGB.g, RGB.b) + ';\n';
	//code += 'unsigned long RGB_4bits = ' + rgbToHex_4bits(RGB.r, RGB.g, RGB.b) + ';\n';
	
	//code += 'int Colour_of_Pixel = ' + rgbToHex_4bits(RGB.r, RGB.g, RGB.b) + ';\n';
	
	//code += 'PIXELS_set(' + Pixel_number + ', ' + Math.floor(rgbToHex_4bits(RGB.r, RGB.g, RGB.b)) + ');\n';
	code += 'PIXELS_set_hsl(' + Pixel_number + ', ' + hue + ', ' + saturation + ', ' + intensity + ');\n';
	
	//code += 'process();\n';
	
  return code;
};

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// 8 bits : 	16 millions de couleurs
function rgbToHex_8bits(r, g, b) {
    //return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return (r << 16) + (g << 8) + b;
}

// 4 bits : 	4 096 couleurs
function rgbToHex_4bits(r, g, b) {	
	var r_4bits = r / 16;	
	var g_4bits = g / 16;	
	var b_4bits = b / 16;
	
    //return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return (r_4bits << 8) + (g_4bits << 4) + b_4bits;
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  //return [ r * 255, g * 255, b * 255 ];
	return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

Blockly.Arduino.iziMakersV3_Neopixels_special_effect = function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var Pixel_number = Blockly.Arduino.valueToCode(this, 'Pixel_number', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var hue = Blockly.Arduino.valueToCode(this, 'HUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var saturation = Blockly.Arduino.valueToCode(this, 'SATURATION', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var intensity = Blockly.Arduino.valueToCode(this, 'INTENSITY', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	var module_sn = 103;
	
  var special_effect = this.getFieldValue('EFFECT');
  var on_off = this.getFieldValue('ON_OFF');
	
	var val_on_off = false;
	if(on_off == '1') {
		val_on_off = true;
	}
	
	var code = '';
	if(special_effect == 'F') {
		code += 'PIXELS_set_fire(' + val_on_off + ');\n';
	}
	
	iziV3SetiziOs1();
	iziV3SetNeopixelsFunctions(module_sn);
	iziV3SetiziOs2();
	
	code += 'process();\n';
	
  return code;
};



Blockly.Arduino.iziMakersV3_comm_send = function() {
	var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = this.getFieldValue('CONTENT');

  //Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
	
	iziV3SetiziOs1();

  var code = 'Serial.println(' + content + ');\n';
	return code;
};

Blockly.Arduino.iziMakersV3_comm_received = function() {
	//var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = this.getFieldValue('CONTENT');

  //Blockly.Arduino.setups_['setup_serial_' + profile.defaultBoard.serial] = 'Serial.begin(' + profile.defaultBoard.serial + ');\n';
	
	iziV3SetiziOs1();
	
  var code = '';
	return code;
};

Blockly.Arduino.iziMakersV3_comm_iziSend = function() {
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

Blockly.Arduino.iziMakersV3_servo_move = function() {
	var servo_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
	
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
  //var module_sn = this.getFieldValue('MODULE_SN');
	
	var servo_num = this.getFieldValue('SERVO_NUM');
	
	
	var module_sn = 104;
	
	iziV3SetiziOs1();
	iziV3SetServoFunctions(module_sn);
	iziV3SetiziOs2();

	var code = '';
	if(servo_num === "A") {
		code += 'SERVOS_Val_target[0] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "B") {
		code += 'SERVOS_Val_target[1] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "C") {
		code += 'SERVOS_Val_target[2] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "D") {
		code += 'SERVOS_Val_target[3] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "E") {
		code += 'SERVOS_Val_target[4] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "F") {
		code += 'SERVOS_Val_target[5] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "G") {
		code += 'SERVOS_Val_target[6] = ' + servo_degree + ';\n';
	}
	else if(servo_num === "H") {
		code += 'SERVOS_Val_target[7] = ' + servo_degree + ';\n';
	}
	
	//code = 'SERVOS_Val_target = ' + servo_degree + ';\nprocess();\n';
  return code;
};

Blockly.Arduino.iziMakersV3_color_sensor =  function() {
  var component = this.getFieldValue('COMPONENT');
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
	
	var module_sn = 102;
	
	iziV3SetiziOs1();
	iziV3SetColorSensorFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = '';
  /*if(component==="R"){
		//code = 'J1Y';
		//code = 'getJ1Y()';
  } 
	else if(component==="G"){
		//code = 'J1X';
		//code = 'getJ1X()';
  } 
	else if(component==="B"){
		//code = 'J1SW';
		//code = 'getJ1SW()';
  } 
	else */
	if(component==="H"){
		//code = 'J1X';
		code = 'COLORSENSOR_getH()';
  } 
	else if(component==="S"){
		//code = 'J1SW';
		code = 'COLORSENSOR_getS()';
  } 
	else if(component==="V"){
		//code = 'J1SW';
		code = 'COLORSENSOR_getV()';
  } 
	else if(component==="P"){
		//code = 'J1SW';
		code = 'COLORSENSOR_getP()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


iziV3SetBTJoysticksFunctions = function (module_sn) {
	// BT Joystick
	Blockly.Arduino.definitions_['BT_joysticks_vars'] = 'int SN_BT_Joystick = ' + module_sn + ';\nint BT_JOYSTICKS_J1X = 0;\nint BT_JOYSTICKS_J1Y = 0;\nint BT_JOYSTICKS_J1SW1 = 0;\nint BT_JOYSTICKS_J1SW2 = 0;\nint BT_JOYSTICKS_J1SW3 = 0;\nint BT_JOYSTICKS_J1SW4 = 0;\nint BT_JOYSTICKS_J1SW5 = 0;\nint BT_JOYSTICKS_J1SW6 = 0;\nint BT_JOYSTICKS_J2X = 0;\nint BT_JOYSTICKS_J2Y = 0;\nint BT_JOYSTICKS_J2SW1 = 0;\nunsigned long BT_JOYSTICKS_lastReceived = 0;\n';
	Blockly.Arduino.definitions_['BT_joysticks_fcn_JOYSTICKS_processInput'] = 'void BT_JOYSTICKS_processInput(unsigned long SN, char * inBuffer) {\n  if (MODULES_isKnown(SN_BT_Joystick)) {\n    if (SN > 0) {\n      if (SN == SN_BT_Joystick) {\n        Serial.print(StrIndent);\n        Serial.print("Jin");\n        //Serial.println(inBuffer);\n        \n        aJsonObject* root = aJson.parse(inBuffer);\n        if (root != NULL) {\n          Serial.print("\\n");\n          //Serial.println("Jin:");\n          //Serial.print(inBuffer);\n          if (aJson.getObjectItem(root, "JX") != NULL) {\n            BT_JOYSTICKS_J1X = (int)aJson.getObjectItem(root, "JX")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1X:");\n            Serial.println(BT_JOYSTICKS_J1X);\n          }\n          if (aJson.getObjectItem(root, "JY") != NULL) {\n            BT_JOYSTICKS_J1Y = (int)aJson.getObjectItem(root, "JY")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1Y:");\n            Serial.println(BT_JOYSTICKS_J1Y);\n          }\n          if (aJson.getObjectItem(root, "B1") != NULL) {\n            BT_JOYSTICKS_J1SW1 = (int)aJson.getObjectItem(root, "B1")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW1:");\n            Serial.println(BT_JOYSTICKS_J1SW1);\n          }\n          if (aJson.getObjectItem(root, "B2") != NULL) {\n            BT_JOYSTICKS_J1SW2 = (int)aJson.getObjectItem(root, "B2")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW2:");\n            Serial.println(BT_JOYSTICKS_J1SW2);\n          }\n          if (aJson.getObjectItem(root, "B3") != NULL) {\n            BT_JOYSTICKS_J1SW3 = (int)aJson.getObjectItem(root, "B3")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW3:");\n            Serial.println(BT_JOYSTICKS_J1SW3);\n          }\n          if (aJson.getObjectItem(root, "B4") != NULL) {\n            BT_JOYSTICKS_J1SW4 = (int)aJson.getObjectItem(root, "B4")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW4:");\n            Serial.println(BT_JOYSTICKS_J1SW4);\n          }\n          if (aJson.getObjectItem(root, "B5") != NULL) {\n            BT_JOYSTICKS_J1SW5 = (int)aJson.getObjectItem(root, "B5")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW5:");\n            Serial.println(BT_JOYSTICKS_J1SW5);\n          }\n          if (aJson.getObjectItem(root, "B6") != NULL) {\n            BT_JOYSTICKS_J1SW6 = (int)aJson.getObjectItem(root, "B6")->valueint;\n            BT_JOYSTICKS_lastReceived = millis();\n            Serial.print(StrIndent);\n            Serial.print(StrIndent);\n            Serial.print("J1SW6:");\n            Serial.println(BT_JOYSTICKS_J1SW6);\n          }\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(root);\n      }\n    }\n  }\n}\n';
	/*Blockly.Arduino.definitions_['joysticks_fcn_processModuleJoysticksOutput'] = 'void JOYSTICKS_processOutput() {\n  if (!sendOutput) {\n    if (millis() > JOYSTICKS_lastReceived + 300) {\n      if (MODULES_isKnown(SN_Joystick)) {\n        aJsonObject* objectJSON = aJson.createObject();\n        aJson.addItemToObject(objectJSON, "sn", aJson.createItem(SN_Joystick));\n        aJson.addItemToObject(objectJSON, "j", aJson.createItem(1));\n\n        Serial.print(StrIndent);\n        Serial.print("Jout:");\n        if (objectJSON != NULL) {\n          char* msg = aJson.print(objectJSON);\n          int i = 0;\n          while (*(msg + i) != \'\\0\') {\n            outBuffer[i] = *(msg + i);\n            Serial.write(outBuffer[i]);\n            i += 1;\n          }\n          outBuffer_len = i;\n          free(msg);\n          sendOutput = true;\n          sendBus = MODULES_bus(SN_Joystick);\n          Serial.println(":ok");\n        }\n        else {\n          Serial.print(StrError);\n          Serial.println(":");\n        }\n        aJson.deleteItem(objectJSON);\n        //freeMem("freeMem");\n      }\n      JOYSTICKS_lastReceived = millis();\n    }\n  }\n}\n}';*/
	Blockly.Arduino.definitions_['BT_joysticks_fcn_getJoysticksValues'] = 'int BT_JOYSTICKS_getJ1X() {\n  process();\n  return BT_JOYSTICKS_J1X;\n}\nint BT_JOYSTICKS_getJ1Y() {\n  process();\n  return BT_JOYSTICKS_J1Y;\n}\nint BT_JOYSTICKS_getJ1SW1() {\n  process();\n  return BT_JOYSTICKS_J1SW1;\n}\nint BT_JOYSTICKS_getJ1SW2() {\n  process();\n  return BT_JOYSTICKS_J1SW2;\n}\nint BT_JOYSTICKS_getJ1SW3() {\n  process();\n  return BT_JOYSTICKS_J1SW3;\n}\nint BT_JOYSTICKS_getJ1SW4() {\n  process();\n  return BT_JOYSTICKS_J1SW4;\n}\nint BT_JOYSTICKS_getJ1SW5() {\n  process();\n  return BT_JOYSTICKS_J1SW5;\n}\nint BT_JOYSTICKS_getJ1SW6() {\n  process();\n  return BT_JOYSTICKS_J1SW6;\n}\n';
	
	Blockly.Arduino.process_module_input_['BT_process_joysticks_input'] = 'if(parseSuccess) {\n    BT_JOYSTICKS_processInput(SN_Module, inBuffer);\n  }\n';
	//Blockly.Arduino.process_module_output_['process_joysticks_output'] = 'processModuleJoysticksOutput();\n';
};

Blockly.Arduino.iziMakersV3_BT_JoyCommander =  function() {
	
	//var module_sn = Blockly.Arduino.valueToCode(this, 'MODULE_SN', Blockly.Arduino.ORDER_ATOMIC) || '0';
	
  //var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_axis = this.getFieldValue('AXIS');
  /*var stickPIN = "0";
  if(dropdown_axis==="y"){
    stickPIN = 1;
  } else {
    //stickPIN = dropdown_pin;
  }*/
	
	var module_sn = 105;
	
	iziV3SetiziOs1();
	iziV3SetBTJoysticksFunctions(module_sn);
	iziV3SetiziOs2();
  
	var code = '';
  if(dropdown_axis==="x"){
		//code = 'J1X';
		code = 'BT_JOYSTICKS_getJ1X()';
  }
	else if(dropdown_axis==="y"){
		//code = 'J1Y';
		code = 'BT_JOYSTICKS_getJ1Y()';
  } 
	else if(dropdown_axis==="sw1"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW1()';
  }
	else if(dropdown_axis==="sw2"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW2()';
  }
	else if(dropdown_axis==="sw3"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW3()';
  }
	else if(dropdown_axis==="sw4"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW4()';
  }
	else if(dropdown_axis==="sw5"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW5()';
  }
	else if(dropdown_axis==="sw6"){
		//code = 'J1SW';
		code = 'BT_JOYSTICKS_getJ1SW6()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};






















Blockly.Arduino.iziMakersV3_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_iziMakersV3_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV3_button = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_rotary_angle = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_tilt_switch = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_tilt_switch_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_piezo_buzzer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV3_relay = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_relay_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.iziMakersV3_temporature_sensor = function() {
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

Blockly.Arduino.iziMakersV3_serial_lcd_print = function() {
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

Blockly.Arduino.iziMakersV3_serial_lcd_power = function() {
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

Blockly.Arduino.iziMakersV3_serial_lcd_effect = function() {
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

Blockly.Arduino.iziMakersV3_sound_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  Blockly.Arduino.setups_['setup_sound_sensor_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_pir_motion_sensor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakersV3_line_finder = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*Blockly.Arduino.iziMakersV3_ultrasonic_ranger = function() {
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

Blockly.Arduino.iziMakersV3_motor_shield = function() {
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

/*Blockly.Arduino.iziMakersV3_thumb_joystick =  function() {
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

Blockly.Arduino.iziMakersV3_rgb_led = function() {
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

// Blockly.Arduino.iziMakersV3_rgb_led = function() {
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

Blockly.Arduino.iziMakersV3_bluetooth_slave = function() {
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

