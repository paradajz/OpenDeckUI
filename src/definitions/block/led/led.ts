import { markRaw } from "vue";
import {
  ISectionDefinition,
  FormInputComponent,
  SectionType,
  Block,
} from "../../interface";

import DeviceForm from "../../device/DeviceForm.vue";
import DeviceGridWithSettings from "../../device/DeviceGridWithSettings.vue";
import RouteWrapper from "../../../components/RouteWrapper.vue";
import LedIcon from "./LedIcon.vue";

export const sections: Dictionary<ISectionDefinition> = {
  // Settings definitions
  BlinkWithMidiClock: {
    block: Block.Led,
    key: "blinkWithMidiClock",
    type: SectionType.Setting,
    section: 2,
    settingIndex: 0,
    component: FormInputComponent.Toggle,
    label: "Blink with MIDI clock",
    helpText: `Enables or disables LED blinking via MIDI clock. When enabled, MIDI clock is used to toggle LED state. Otherwise, internal timer is used.`,
  },
  StartupAnimation: {
    key: "startupAnimation",
    type: SectionType.Setting,
    section: 2,
    settingIndex: 2,
    component: FormInputComponent.Toggle,
    label: "Start-up animation",
    helpText: `Enables or disables LED animation when the device is powered on.`,
    block: Block.Led,
  },
  // Component definitions
  LedColorTesting: {
    key: "ledColorTesting",
    type: SectionType.Value,
    section: 0,
    component: FormInputComponent.Select,
    options: [
      { value: 0, text: "Off (no color)" },
      { value: 1, text: "Red" },
      { value: 2, text: "Green" },
      { value: 3, text: "Yellow" },
      { value: 4, text: "Blue" },
      { value: 5, text: "Magenta" },
      { value: 6, text: "Cyan" },
      { value: 7, text: "White" },
    ],
    label: "LED color testing",
    helpText: ``,
    block: Block.Led,
  },
  ActivationNote: {
    key: "activationNote",
    type: SectionType.Value,
    section: 3,
    component: FormInputComponent.Input,
    min: 0,
    max: 127,
    label: "Activation ID",
    helpText: ``,
    block: Block.Led,
  },
  RGBEnable: {
    key: "rgbEnable",
    type: SectionType.Value,
    section: 4,
    component: FormInputComponent.Toggle,
    label: "RGB Enable",
    helpText: ``,
    block: Block.Led,
  },
  ControlType: {
    key: "controlType",
    type: SectionType.Value,
    section: 5,
    component: FormInputComponent.Select,
    options: [
      { value: 6, text: "MIDI in / Note (Multi value)" },
      { value: 8, text: "MIDI in / CC (Multi value)" },
      { value: 0, text: "MIDI in / Note (Single value)" },
      { value: 2, text: "MIDI in / CC (Single value)" },
      { value: 7, text: "Local / Note (Multi value)" },
      { value: 9, text: "Local / CC (Multi value)" },
      { value: 1, text: "Local / Note (Single value)" },
      { value: 3, text: "Local / CC (Single value)" },
      { value: 4, text: "Program change (Single value)" },
    ],
    label: "Control type",
    helpText: ``,
    block: Block.Led,
  },
  ActivationVelocity: {
    key: "activationVelocity",
    type: SectionType.Value,
    section: 6,
    component: FormInputComponent.Input,
    min: 1,
    max: 127,
    label: "Activation Velocity",
    helpText: "",
    block: Block.Led,
  },
  MidiChannel: {
    key: "midiChannel",
    type: SectionType.Value,
    section: 7,
    component: FormInputComponent.Input,
    min: 1,
    max: 16,
    label: "MIDI channel",
    helpText: "",
    block: Block.Led,
  },
};

export const LedBlock: IBlockDefinition = {
  block: Block.Led,
  title: "LED",
  routeName: "device-leds",
  iconComponent: markRaw(LedIcon),
  componentCountResponseIndex: 3,
  sections,
  routes: [
    {
      path: "leds",
      name: "device-leds",
      component: RouteWrapper,
      redirect: { name: "device-leds-list" },
      children: [
        {
          path: "list",
          name: "device-leds-list",
          component: DeviceGridWithSettings,
          props: {
            block: Block.Led,
            routeName: "device-leds-form",
            segmentGrid: true,
          },
        },
        {
          path: "leds/:index",
          name: "device-leds-form",
          component: DeviceForm,
          props: {
            block: Block.Led,
          },
        },
      ],
    },
  ],
};
