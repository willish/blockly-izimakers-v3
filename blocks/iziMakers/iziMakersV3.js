/**
 * @license
 * Visual Blocks Editor
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

goog.provide('Blockly.Blocks.iziMakersV3');

goog.require('Blockly.Blocks');

Blockly.Blocks['iziMakersV3_setup'] = {
  init: function () {
        this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_SETUP_HELPURL);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.IZIMAKERSV3_SETUP_TEXT);
        this.appendStatementInput('DO')
            .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setTooltip("Exécuté seulement dans le 'Setup'");
    }
};

Blockly.Blocks['iziMakersV3_delay'] = {
  init: function() {
    this.setColour("#2C3A4E");
    this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_DELAY_HELPURL);
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField(Blockly.Msg.IZIMAKERSV3_DELAY_TEXT)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_DELAY_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_millis'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_MILLIS_HELPURL);
    this.appendDummyInput()
         .appendField(Blockly.Msg.IZIMAKERSV3_MILLIS_TEXT)
					.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/clock.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_MILLIS_TOOLTIP);
  }
};


Blockly.Blocks['iziMakersV3_input_voltage'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INPUT_VOLTAGE_HELPURL);
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERSV3_INPUT_VOLTAGE_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/batterie.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		//.appendField(Blockly.Msg.IZIMAKERSV3JOYSTICK_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
    //.appendField(Blockly.Msg.IZIMAKERSV3_JOYSTICK_TEXT2)
    //    .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_JOYSTICK_AXES), "AXIS");
    this.setOutput(true, 'Number');
	this.setTooltip(Blockly.Msg.IZIMAKERSV3_INPUT_VOLTAGE_TOOLTIP);
  }
};


Blockly.Blocks['iziMakersV3_motors'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_MOTORS_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_TEXT)
				
				.appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_MOTORS_NUM), "MOTEUR_NUM")
								
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-MotorDC.png', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("POWER", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_MOTORS_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_motors_a'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_MOTORS_A_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_A_TEXT)								
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-MotorDC.png', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("POWER", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_A_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_MOTORS_A_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_motors_b'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_MOTORS_B_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_B_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-MotorDC.png', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("POWER", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_MOTORS_B_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_MOTORS_B_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_thumb_joystick'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_JOYSTICK_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERSV3_JOYSTICK_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Thumb_Joystick_v0.9b.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		//.appendField(Blockly.Msg.IZIMAKERSV3JOYSTICK_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
    .appendField(Blockly.Msg.IZIMAKERSV3_JOYSTICK_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_JOYSTICK_AXES), "AXIS");
    this.setOutput(true, 'Number');
	this.setTooltip(Blockly.Msg.IZIMAKERSV3_JOYSTICK_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_ultrasonic_ranger'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
	    .appendField(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Ultrasonic_Ranger2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        //.appendField(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_UNIT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_UNIT_CHOICE), "UNIT");
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_ULTRASONIC_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_comm_send'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_COMM_SEND_HELPURL);
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.IZIMAKERSV3_COMM_SEND_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_COMM_SEND_TOOLTIP);
		//this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_comm_received'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_COMM_RECEIVED_HELPURL);
    this.appendDummyInput()
	    .appendField(Blockly.Msg.IZIMAKERSV3_COMM_RECEIVED_TEXT);
			
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_COMM_RECEIVED_TOOLTIP);
		//this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_comm_iziSend'] = {
  init: function() {
    this.setColour("#2C3A4E");
		this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_DEBUG_IZISEND_HELPURL);
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.IZIMAKERSV3_DEBUG_IZISEND_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_DEBUG_IZISEND_TOOLTIP);
		//this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_servo_move'] = {
  init: function() {
    this.setColour("#2C3A4E");		// 2475FA
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput("")
				//.appendField(new Blockly.FieldTextInput(''), 'MODULE_SN')
				//.appendField(new Blockly.FieldNumber(0, 0), "MODULE_SN")
				
				
        .appendField(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_TEXT)
				

				.appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_SERVO_NUM), "SERVO_NUM")
				
				
        //.appendField(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/230px-Servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	/*this.appendValueInput("PIN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_INPUT2);*/
    this.appendValueInput("DEGREE", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        //.appendField(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_DEGREE);
        .appendField(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_SERVO_MOVE_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakersV3_color_sensor'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_COLOR_SENSOR_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERSV3_COLOR_SENSOR_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/colors.gif', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		//.appendField(Blockly.Msg.IZIMAKERSV3JOYSTICK_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
    .appendField(Blockly.Msg.IZIMAKERSV3_COLOR_SENSOR_COMPONENT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_COLOR_SENSOR_COMPONENT_CHOICE), "COMPONENT");
    this.setOutput(true, 'Number');
	this.setTooltip(Blockly.Msg.IZIMAKERSV3_COLOR_SENSOR_TOOLTIP);
  }
};







Blockly.Blocks['iziMakersV3_Neopixels_init'] = {
  init: function() {
    this.setColour("#2C3A4E");
		
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
      .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_init)
			.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/neopixels.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    /*this.appendValueInput("Pin_LedRGB" , 'Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_ledRGB_WS2812B_init_Pin);		*/		
    this.appendValueInput("Number_of_Pixels" , 'Number')
        .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
			.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_init_Number_of_Pixels);		
    //this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setColour("#CAC7BE");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-de-modules-led-rgb-ws2812b-avec-blockly-arduino/');
  }
};

Blockly.Blocks['iziMakersV3_Neopixels_setPixelColor_picker'] = {
  init: function() {
    this.setColour("#2C3A4E");
		
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor)
			.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/neopixels.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("Pixel_number" , 'Number')
        .setAlign(Blockly.ALIGN_RIGHT)
			.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor_Pixel_Number);	
			
		this.appendDummyInput()
        .appendField('Couleur ')
        .appendField(new Blockly.FieldColour('#ff0000'), 'Colour_of_Pixel');
				

    //this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setColour("#CAC7BE");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-de-modules-led-rgb-ws2812b-avec-blockly-arduino/');
  }
};

Blockly.Blocks['iziMakersV3_Neopixels_setPixelColor_HSI'] = {
  init: function() {
    this.setColour("#2C3A4E");
		
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor)
			.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/neopixels.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    
		this.appendValueInput("Pixel_number" , 'Number')
        .setAlign(Blockly.ALIGN_RIGHT)
			.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor_Pixel_Number);	
			
		/*this.appendDummyInput()
        .appendField('Couleur ')
        .appendField(new Blockly.FieldColour('#ff0000'), 'Colour_of_Pixel');*/
				
				
    /*this.appendValueInput("COLOR_H", 'Number')
        .setCheck('Number')
        appendField('Teinte');	*/
				
    this.appendValueInput("HUE", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor_Hue);
				
    this.appendValueInput("SATURATION", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor_Saturation);
				
    this.appendValueInput("INTENSITY", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor_Intensity);
				
    //this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setColour("#CAC7BE");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-de-modules-led-rgb-ws2812b-avec-blockly-arduino/');
  }
};


Blockly.Blocks['iziMakersV3_Neopixels_special_effect'] = {
  init: function() {
    this.setColour("#2C3A4E");
		
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number');*/
        //.setAlign(Blockly.ALIGN_RIGHT);
				
    this.appendDummyInput()
			.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_setPixelColor)
      .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/neopixels.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
			//.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_EFFECTS)
			
    this.appendDummyInput()
			.appendField(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_special_effect)
			//.setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_EFFECTS_CHOICE), "EFFECT");
			
    this.appendDummyInput()
			//.setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_NEOPIXELS_ON_OFF), "ON_OFF");
			
		this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
		this.setTooltip('');
  }
};

Blockly.Blocks['iziMakersV3_BT_JoyCommander'] = {
  init: function() {
    this.setColour("#2C3A4E");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_BT_JoyCommander_HELPURL);
	
    /*this.appendValueInput("MODULE_SN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);*/
				
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERSV3_BT_JoyCommander_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/BT-Joy.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		//.appendField(Blockly.Msg.IZIMAKERSV3JOYSTICK_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
    .appendField(Blockly.Msg.IZIMAKERSV3_BT_JoyCommander_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_BT_JoyCommander_AXES), "AXIS");
    this.setOutput(true, 'Number');
	this.setTooltip(Blockly.Msg.IZIMAKERSV3_BT_JoyCommander_TOOLTIP);
  }
};





























Blockly.Blocks['iziMakersV3_led'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_LED_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LED_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LED1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LED_INPUT2);		
    this.setInputsInline(true);
	this.appendDummyInput()
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LED_INPUT3)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_LED_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_piezo_buzzer'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_BUZZER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BUZZER_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Buzzer1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
	this.appendValueInput("PIN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)	
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BUZZER_INPUT);
	this.appendDummyInput("")
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BUZZER_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_BUZZER_TOOLTIP);
  }
};

// Blockly.Blocks['iziMakersV3_rgb_led'] = {
  // init: function() {
    // this.setColour("#8ec31f");
	// this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_HELPURL);
    // this.appendDummyInput()
		// .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_TEXT)
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		// .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_INPUT)
        // .appendField(new Blockly.FieldDropdown(profile.defaultBoard.digital), "PIN");
	// this.appendField(new Blockly.ValueInput("C1", 'Number'))
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR1);
	// this.appendDummyInput()
		// .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_TEXT)
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	// this.interpolateMsg(
        // Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR1 + ' %1 ' + 
        // Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_INPUT + ' %2 ',
        // ["PIN", new Blockly.FieldDropdown(profile.defaultBoard.digital)],
        // ["C1", null, Blockly.ALIGN_RIGHT],
        // Blockly.ALIGN_RIGHT);
	// this.appendValueInput("C2", 'Number')
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR2);
	// this.appendValueInput("C3", 'Number')		
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR3);
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    // this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_TOOLTIP);
    // this.itemCount_ = 1;
  // }
// };
Blockly.Blocks['iziMakersV3_rgb_led'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_HELPURL);
    this.setColour("#8ec31f");
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_TEXT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/chanbalelednb1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("C1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR1)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN1')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_INPUT);
    this.appendValueInput("C2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR2)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN2')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_INPUT);
    this.appendValueInput("C3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_COLOR3)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN3')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RGBLED_INPUT);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

Blockly.Blocks['iziMakersV3_button'] = {
  init: function() {
    this.setColour("#8ec31f");
    this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_BUTTON_HELPURL);
	this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BUTTON_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Button1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		.appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BUTTON_INPUT)
		.appendField(new Blockly.FieldTextInput('', Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_BUTTON_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_rotary_angle'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_ROT_ANGLE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_ROT_ANGLE_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Potentiometer1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_ROT_ANGLE_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_ROT_ANGLE_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_tilt_switch'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_TILT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_TILT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Tilt1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_TILT_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_TILT_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_relay'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_RELAY_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RELAY_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-Relay1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RELAY_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_RELAY_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_RELAY_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_temporature_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_TEMP_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_TEMP_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Temperature1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_TEMP_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_TEMP_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_serial_lcd_print'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_INPUT1)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendValueInput("TEXT", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_INPUT2);
    this.appendValueInput("TEXT2", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_INPUT3);
    this.appendValueInput("DELAY_TIME", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_INPUT4);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_PRINT_TOOLTIP);
  }
};

//grove lcd power on/off
Blockly.Blocks['iziMakersV3_serial_lcd_power'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_POWER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_POWER_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_POWER_INPUT)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_POWER_STATE)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN_ONOFF), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_POWER_TOOLTIP);
  }
};

//scroll left/right/no scroll/blink/noblink
Blockly.Blocks['iziMakersV3_serial_lcd_effect'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_INPUT)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_EFFECT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_EFFECT_EFFECT), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_LCD_EFFECT_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_sound_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_SOUND_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_SOUND_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-Sound-sensor.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_SOUND_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_SOUND_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_pir_motion_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_PIR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_PIR_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-PIR_Motion_Sensor.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_PIR_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_PIR_TOOLTIP);
  }
};

Blockly.Blocks['iziMakersV3_line_finder'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_LINE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LINE_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Grovelinefinder1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
	    .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_LINE_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_LINE_TOOLTIP);
  }
};

/*Blockly.Blocks['iziMakersV3_ultrasonic_ranger'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_HELPURL);
    this.appendDummyInput()
	    .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakersV3/200px-Twig_-_Ultrasonic_Ranger2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_UNIT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_UNIT_CHOICE), "UNIT");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_ULTRASONIC_TOOLTIP);
  }
};*/

Blockly.Blocks['iziMakersV3_motor_shield'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_MOTOR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_MOTOR_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakersV3/400px-Smotoshield2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_INOUT_MOTOR_CHOICE), "DIRECTION");
    /*this.appendValueInput("SPEED", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed");*/
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_MOTOR_TOOLTIP);
  }
};

/*Blockly.Blocks['iziMakersV3_thumb_joystick'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_HELPURL);
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakersV3/200px-Twig_-_Thumb_Joystick_v0.9b.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		.appendField(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_AXES), "AXIS");
    this.setOutput(true, 'Number');
this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_JOYSTICK_TOOLTIP);
  }
};*/

Blockly.Blocks['iziMakersV3_bluetooth_slave'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERSV3_INOUT_BT_HELPURL);
    this.appendDummyInput()
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM1)
      .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakersV3/Twigbt00.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM2)
      .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM3)
      .appendField(new Blockly.FieldTextInput('blocklyduino'), 'NAME');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM4)
      .appendField(new Blockly.FieldTextInput('0000'), 'PINCODE');
    this.appendStatementInput("RCV")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM5);
    this.appendStatementInput("SNT")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERSV3_INOUT_BT_COMM6);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERSV3_INOUT_BT_TOOLTIP);
  }
};