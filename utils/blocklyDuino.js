/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');


/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
  // http://arduino.cc/en/Reference/HomePage
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/*
 * Arduino Board profiles
 *
 */

var profile = {
	iziMakers_nano: {
		description: "iziMakers Nano",
		digital: ["1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		PWM : ["3", "5", "6", "9", "10", "11"],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		interrupt: ["2", "3"],
		picture : "media/iziMakers-blank.png",
		miniPicture : "media/iziMakers-blank.png",	    
		serial : 9600,
	},
	arduino_uno: {
	    description: "Arduino Uno",
	    digital: ["1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		PWM : ["3", "5", "6", "9", "10", "11"],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		interrupt: ["2", "3"],
		picture : "media/Arduino-Uno-Pinout.jpg",
		miniPicture : "media/Arduino-Uno-Pinout-mini.jpg",	    
		serial : 9600,
	},
	arduino_mega:{
		description: "Arduino Mega",
		digital : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52"],
		PWM : ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
		/*irqonchange : [["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["A8", "62"], ["A9", "63"], ["A10", "64"], ["A11", "65"], ["A12", "66"], ["A13", "67"], ["A14", "68"], ["A15", "69"]],*/
		interrupt: ["2", "3", "21", "20", "19", "18"],
		picture : "media/Arduino-Mega-2560-Pinout.jpg",
		miniPicture : "media/Arduino-Mega-2560-Pinout-mini.jpg",
        serial : 9600,
	},
	dfrobot_romeo:{
		description: "RoMeo v2",
		digital : ["1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		PWM : ["3", "5", "6", "9", "10", "11", "13"],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11"],
		interrupt: ["2", "3"],
		picture : "media/DFRobot-RoMeo-Pinout.jpg",
		miniPicture : "media/DFRobot-RoMeo-Pinout-mini.jpg",
        serial : 9600,
	},
};

//set default profile to arduino standard-compatible board
profile.defaultBoard = profile["iziMakers_nano"];

/**
 * Ensure that PIN number exists in Digital array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinDigitalValidator = function(text) {
	var pos = profile.defaultBoard.digital.indexOf(text);
		
	return (pos < 0) ? null : text;
};

Blockly.Arduino.pinInterruptValidator = function(text) {
	var pos = profile.defaultBoard.interrupt.indexOf(text);
		
	return (pos < 0) ? null : text;
};

/**
 * Ensure that PIN and next PIN numbers exists in Digital array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinGroveDigitalValidator = function(text) {
	var pos = profile.defaultBoard.digital.indexOf(text);
	if (pos >= 0) {
		var NextPIN = parseInt(text) + 1;
		// check if NextPIN in bound
		pos = profile.defaultBoard.digital.indexOf(String(NextPIN));
	}
	return (pos < 0) ? null : text;
};

/**
 * Ensure that PIN number exists in PWM array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinPWMValidator = function(text) {
	var pos = profile.defaultBoard.PWM.indexOf(text);

	return (pos < 0) ? null : text;
};

/**
 * Ensure that PIN number exists in Analog array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinAnalogValidator = function(text) {
	var pos = profile.defaultBoard.analog.indexOf(text);

	return (pos < 0) ? null : text;
};

/**
 * Ensure that PIN and next PIN numbers exists in Digital array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinGroveAnalogValidator = function(text) {
	var pos = profile.defaultBoard.analog.indexOf(text);
	if (pos >= 0) {
	    var NextPIN = 'A'+(parseInt(text.slice(1,text.length))+1);
		// check if NextPIN in bound
		pos = profile.defaultBoard.analog.indexOf(String(NextPIN));
	}
	return (pos < 0) ? null : text;
};

/**
 * Ensure that PIN and next PIN numbers exists in Digital or Analog array.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid PIN number, or null if invalid.
 */
Blockly.Arduino.pinDualValidator = function(text) {
	var posa = profile.defaultBoard.analog.indexOf(text);
	var posd = profile.defaultBoard.digital.indexOf(text);
	var pos = posa + posd
	return (pos < 0) ? null : text;
};

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of definitions to be printed before setups.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of setups to be printed before the code.
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Arduino.functionNames_ = Object.create(null);
	
	// *** Ajout iziMakers ***
  // Create a dictionary mapping desired function names in process_	
	Blockly.Arduino.process_start_ = Object.create(null);	
	Blockly.Arduino.process_module_ = Object.create(null);	
	Blockly.Arduino.process_module_input_ = Object.create(null);		// new for V3
	Blockly.Arduino.process_module_output_ = Object.create(null);		// new for V3
	Blockly.Arduino.process_end_ = Object.create(null);
	
	// iziVariables
	Blockly.Arduino.iziVariables_ = Object.create(null);
	// *** Ajout iziMakers ***

  if (Blockly.Variables) {
    if (!Blockly.Arduino.variableDB_) {
      Blockly.Arduino.variableDB_ =
          new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
    } else {
      Blockly.Arduino.variableDB_.reset();
    }

		// *** Modifications iziMakers ***
		var defvars = [];
    var variables = Blockly.Variables.allVariables(workspace);
    for (var x = 0; x < variables.length; x++) {
			var varName = Blockly.Arduino.variableDB_.getName(variables[x], Blockly.Variables.NAME_TYPE);
			defvars[x] = 'int ' + varName + ';\n';
			
			/*if(Blockly.Arduino.iziVariables_ && Blockly.Arduino.iziVariables_[varName]) {
				defvars[x] = Blockly.Arduino.iziVariables_[varName] + ' ' + varName + ';\n';
			}
			else {
				defvars[x] = 'int ' + varName + ';\n';
			}*/
			
			//Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
			Blockly.Arduino.definitions_['variables_'+varName] = defvars[x];	//'int ' + varName + ';' ;
    }
    //Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
		// *** Modifications iziMakers ***
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {

	// *** Ajout iziMakers ***
	// Convert the process dictionary into a list.
  var processes = [];
  for (var name in Blockly.Arduino.process_start_) {
    processes.push(Blockly.Arduino.process_start_[name]);
  }
	
  for (var name in Blockly.Arduino.process_module_) {
    processes.push(Blockly.Arduino.process_module_[name]);
  }
  for (var name in Blockly.Arduino.process_module_input_) {
    processes.push(Blockly.Arduino.process_module_input_[name]);
  }
  for (var name in Blockly.Arduino.process_module_output_) {
    processes.push(Blockly.Arduino.process_module_output_[name]);
  }
	
  for (var name in Blockly.Arduino.process_end_) {
    processes.push(Blockly.Arduino.process_end_[name]);
  }
	var codeProcesses = 'void process() \n{\n  ' + processes.join('\n  ') + '\n}'+ '\n\n';
	// *** Ajout iziMakers ***
	

  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n  while(true) {\n    process();\n  }\n}';	// *** iziMakers ***

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
	var codeImports = imports.join('\n') + '\n\n';
	var codeDefinitions = definitions.join('\n') + '\n\n';

  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
	var codeSetups = 'void setup() \n{\n  ' + setups.join('\n  ') + '\n}'+ '\n\n';

  var allDefs = codeImports + codeDefinitions + codeSetups + codeProcesses;	// *** iziMakers ***
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};