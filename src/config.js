export const DEFAULT_CARD_CONFIG = Object.freeze({
  title: 'Guest Access',
  show_qr: true,
  show_remaining_uses: false,
  default_duration: 24,
  mode_entity: 'binary_sensor.guest_mode_active',
});

/** Return a new card config containing the value from one editor input. */
export function updateCardConfig(currentConfig, input) {
  const config = { ...currentConfig };

  if (input.type === 'checkbox') {
    config[input.name] = input.checked;
  } else if (input.type === 'number') {
    if (input.value === '') {
      delete config[input.name];
    } else {
      config[input.name] = Number(input.value);
    }
  } else {
    config[input.name] = input.value;
  }

  return config;
}
