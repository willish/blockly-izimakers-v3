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
 * @fileoverview Helper functions for generating iziMakers blocks.
 * @author
 */

goog.provide('Blockly.Blocks.iziMakers');

goog.require('Blockly.Blocks');

Blockly.Blocks['iziMakers_setup'] = {
  init: function () {
        this.setColour("#DDC885");
		this.setHelpUrl(Blockly.Msg.IZIMAKERS_SETUP_HELPURL);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.IZIMAKERS_SETUP_TEXT);
        this.appendStatementInput('DO')
            .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setTooltip("Exécuté seulement dans le 'Setup'");
    }
};

Blockly.Blocks['iziMakers_delay'] = {
  init: function() {
    this.setColour("#DDC885");
    this.setHelpUrl(Blockly.Msg.IZIMAKERS_DELAY_HELPURL);
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField(Blockly.Msg.IZIMAKERS_DELAY_TEXT)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_DELAY_TOOLTIP);
  }
};


Blockly.Blocks['iziMakers_motors_a'] = {
  init: function() {
    this.setColour("#DDC885");
		this.setHelpUrl(Blockly.Msg.IZIMAKERS_MOTORS_A_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_MOTORS_A_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-iziMakers-motorDC.png', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("POWER", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_MOTORS_A_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_MOTORS_A_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakers_motors_b'] = {
  init: function() {
    this.setColour("#DDC885");
		this.setHelpUrl(Blockly.Msg.IZIMAKERS_MOTORS_B_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_MOTORS_B_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-iziMakers-motorDC.png', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("POWER", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_MOTORS_B_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_MOTORS_B_TOOLTIP);
		this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakers_thumb_joystick'] = {
  init: function() {
    this.setColour("#DDC885");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_JOYSTICK_HELPURL);
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERS_JOYSTICK_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Thumb_Joystick_v0.9b.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		//.appendField(Blockly.Msg.IZIMAKERSJOYSTICK_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
    .appendField(Blockly.Msg.IZIMAKERS_JOYSTICK_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_JOYSTICK_AXES), "AXIS");
    this.setOutput(true, 'Number');
	this.setTooltip(Blockly.Msg.IZIMAKERS_JOYSTICK_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_ultrasonic_ranger'] = {
  init: function() {
    this.setColour("#DDC885");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_ULTRASONIC_HELPURL);
    this.appendDummyInput()
	    .appendField(Blockly.Msg.IZIMAKERS_ULTRASONIC_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Ultrasonic_Ranger2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        //.appendField(Blockly.Msg.IZIMAKERS_ULTRASONIC_INPUT)
        //.appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERS_ULTRASONIC_UNIT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_ULTRASONIC_UNIT_CHOICE), "UNIT");
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERS_ULTRASONIC_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_debug_serial'] = {
  init: function() {
    this.setColour("#DDC885");
		this.setHelpUrl(Blockly.Msg.IZIMAKERS_DEBUG_SERIAL_HELPURL);
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.IZIMAKERS_DEBUG_SERIAL_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_DEBUG_SERIAL_TOOLTIP);
		//this.setInputsInline(true);
  }
};

Blockly.Blocks['iziMakers_debug_iziSend'] = {
  init: function() {
    this.setColour("#DDC885");
		this.setHelpUrl(Blockly.Msg.IZIMAKERS_DEBUG_IZISEND_HELPURL);
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.IZIMAKERS_DEBUG_IZISEND_INPUT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_DEBUG_IZISEND_TOOLTIP);
		//this.setInputsInline(true);
  }
};



Blockly.Blocks['iziMakers_led'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_LED_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LED_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LED1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LED_INPUT2);		
    this.setInputsInline(true);
	this.appendDummyInput()
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LED_INPUT3)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_LED_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_piezo_buzzer'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_BUZZER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_BUZZER_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Buzzer1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
	this.appendValueInput("PIN", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)	
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_BUZZER_INPUT);
	this.appendDummyInput("")
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_BUZZER_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_BUZZER_TOOLTIP);
  }
};

// Blockly.Blocks['iziMakers_rgb_led'] = {
  // init: function() {
    // this.setColour("#8ec31f");
	// this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_HELPURL);
    // this.appendDummyInput()
		// .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_TEXT)
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		// .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_INPUT)
        // .appendField(new Blockly.FieldDropdown(profile.defaultBoard.digital), "PIN");
	// this.appendField(new Blockly.ValueInput("C1", 'Number'))
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR1);
	// this.appendDummyInput()
		// .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_TEXT)
        // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	// this.interpolateMsg(
        // Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR1 + ' %1 ' + 
        // Blockly.Msg.IZIMAKERS_INOUT_RGBLED_INPUT + ' %2 ',
        // ["PIN", new Blockly.FieldDropdown(profile.defaultBoard.digital)],
        // ["C1", null, Blockly.ALIGN_RIGHT],
        // Blockly.ALIGN_RIGHT);
	// this.appendValueInput("C2", 'Number')
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR2);
	// this.appendValueInput("C3", 'Number')		
        // .setCheck('Number')
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR3);
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    // this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_TOOLTIP);
    // this.itemCount_ = 1;
  // }
// };
Blockly.Blocks['iziMakers_rgb_led'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_HELPURL);
    this.setColour("#8ec31f");
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_TEXT);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/chanbalelednb1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("C1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR1)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN1')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_INPUT);
    this.appendValueInput("C2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR2)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN2')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_INPUT);
    this.appendValueInput("C3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_COLOR3)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinPWMValidator), 'PIN3')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RGBLED_INPUT);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

Blockly.Blocks['iziMakers_button'] = {
  init: function() {
    this.setColour("#8ec31f");
    this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_BUTTON_HELPURL);
	this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_BUTTON_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Button1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		.appendField(Blockly.Msg.IZIMAKERS_INOUT_BUTTON_INPUT)
		.appendField(new Blockly.FieldTextInput('', Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_BUTTON_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_rotary_angle'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_ROT_ANGLE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_ROT_ANGLE_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Potentiometer1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_ROT_ANGLE_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_ROT_ANGLE_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_tilt_switch'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_TILT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_TILT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Tilt1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_TILT_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_TILT_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_relay'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_RELAY_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RELAY_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-Relay1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RELAY_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_RELAY_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_RELAY_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_temporature_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_TEMP_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_TEMP_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Temperature1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_TEMP_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_TEMP_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_serial_lcd_print'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_INPUT1)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendValueInput("TEXT", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_INPUT2);
    this.appendValueInput("TEXT2", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_INPUT3);
    this.appendValueInput("DELAY_TIME", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_INPUT4);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_LCD_PRINT_TOOLTIP);
  }
};

//grove lcd power on/off
Blockly.Blocks['iziMakers_serial_lcd_power'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_LCD_POWER_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_POWER_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_POWER_INPUT)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_POWER_STATE)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN_ONOFF), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_LCD_POWER_TOOLTIP);
  }
};

//scroll left/right/no scroll/blink/noblink
Blockly.Blocks['iziMakers_serial_lcd_effect'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-LCD1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_INPUT)
        .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_EFFECT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_EFFECT_EFFECT), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_LCD_EFFECT_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_sound_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_SOUND_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_SOUND_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-Sound-sensor.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_SOUND_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinAnalogValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_SOUND_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_pir_motion_sensor'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_PIR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_PIR_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Twig-PIR_Motion_Sensor.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_PIR_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_PIR_TOOLTIP);
  }
};

Blockly.Blocks['iziMakers_line_finder'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_LINE_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_LINE_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Grovelinefinder1.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
	    .appendField(Blockly.Msg.IZIMAKERS_INOUT_LINE_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_LINE_TOOLTIP);
  }
};

/*Blockly.Blocks['iziMakers_ultrasonic_ranger'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_HELPURL);
    this.appendDummyInput()
	    .appendField(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Ultrasonic_Ranger2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinDigitalValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_UNIT)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_UNIT_CHOICE), "UNIT");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_ULTRASONIC_TOOLTIP);
  }
};*/

Blockly.Blocks['iziMakers_motor_shield'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_MOTOR_HELPURL);
    this.appendDummyInput()
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_MOTOR_TEXT)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/400px-Smotoshield2.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_INOUT_MOTOR_CHOICE), "DIRECTION");
    /*this.appendValueInput("SPEED", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed");*/
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_MOTOR_TOOLTIP);
  }
};

/*Blockly.Blocks['iziMakers_thumb_joystick'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_HELPURL);
    this.appendDummyInput()
		.appendField(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_TEXT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/200px-Twig_-_Thumb_Joystick_v0.9b.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
		.appendField(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_INPUT)
        .appendField(new Blockly.FieldTextInput('',  Blockly.Arduino.pinGroveAnalogValidator), 'PIN')
        .appendField(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_TEXT2)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_AXES), "AXIS");
    this.setOutput(true, 'Number');
this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_JOYSTICK_TOOLTIP);
  }
};*/

Blockly.Blocks['iziMakers_bluetooth_slave'] = {
  init: function() {
    this.setColour("#8ec31f");
	this.setHelpUrl(Blockly.Msg.IZIMAKERS_INOUT_BT_HELPURL);
    this.appendDummyInput()
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM1)
      .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/iziMakers/Twigbt00.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM2)
      .appendField(new Blockly.FieldTextInput('1',  Blockly.Arduino.pinGroveDigitalValidator), 'PIN');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM3)
      .appendField(new Blockly.FieldTextInput('blocklyduino'), 'NAME');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM4)
      .appendField(new Blockly.FieldTextInput('0000'), 'PINCODE');
    this.appendStatementInput("RCV")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM5);
    this.appendStatementInput("SNT")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.IZIMAKERS_INOUT_BT_COMM6);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.IZIMAKERS_INOUT_BT_TOOLTIP);
  }
};