/**
 * This file exports two Vue components that are used for managing checkboxes in a Bulma framework.
 */

import CheckboxManager from '../src/bulma/CheckboxManager.vue';
import CheckboxItems from '../src/bulma/CheckboxItems.vue';

/**
 * CheckboxManager component is responsible for managing the state of checkboxes.
 *
 * @component
 * @example
 * <CheckboxManager v-model="checkboxes" />
 */
export { CheckboxManager };

/**
 * CheckboxItems component renders a list of checkbox items.
 *
 * @component
 * @example
 * <CheckboxItems :items="checkboxItems" />
 *
 * @prop {string[]} items - The list of checkbox items.
 */
export { CheckboxItems };
