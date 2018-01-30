/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Generating Arduino for text blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');


Blockly.Arduino.iziMakers_variables_declare = function() {
  // Variable setter.
  var dropdown_type = this.getFieldValue('TYPE');
  //TODO: settype to variable
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	//Blockly.Arduino.setups_['setup_var'+varName] = varName + ' = ' + argument0 + ';\n';
	//Blockly.Arduino.setups_['setup_var_'+varName] = varName + ' = 0;\n';			// 0 par défault
	Blockly.Arduino.definitions_['variables_'+varName] = dropdown_type + ' ' + varName + ';' ;//TEST ADEL
	
	Blockly.Arduino.iziVariables_[varName] = dropdown_type;
	
	var code = varName + ' = (' + dropdown_type + ')' + argument0 + ';\n';
  //return '';
	return code;
};

Blockly.Arduino.iziMakers_variables_get = function() {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.iziMakers_variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	
	var varType = Blockly.Arduino.iziVariables_[varName];
	var code = '';
	if(varType) {
		code = varName + ' = (' + varType + ')' + argument0 + ';\n';
	}
	else {
		code = varName + ' = ' + argument0 + ';\n';
	}
	return code;
};
