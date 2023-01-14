<template>
    <div class="items">
        <div class="is-hoverable-item"
            v-for="item in items"
            :key="item.id">
            <slot name="item"
                :item="item">
                <label class="checkbox">
                    <input type="checkbox"
                        :id="item.id"
                        :value="item.id"
                        :model-value="modelValue"
                        @input="$emit('update:modelValue', $event)">
                    {{ item.label }}
                </label>
            </slot>
        </div>
    </div>
</template>

<script>
import { Checked, Unchecked, Indeterminate } from '../statuses';

export default {
    name: 'CheckboxItems',

    inject: ['i18n'],

    props: {
        items: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Array,
            required: true,
        },
    },

    emits: ['change', 'update:modelValue'],

    computed: {
        checked() {
            return this.items.filter(({ id }) => this.modelValue.includes(id));
        },
        unchecked() {
            return this.items.filter(({ id }) => !this.modelValue.includes(id));
        },
        status() {
            if (this.checked.length === this.items.length) {
                return Checked;
            }

            return this.checked.length
                ? Indeterminate
                : Unchecked;
        },
    },

    watch: {
        status() {
            this.$emit('change');
        },
    },

    methods: {
        all() {
            this.unchecked.forEach(({ id }) => this.modelValue.push(id));
        },
        change(check) {
            if (check) {
                this.all();
            } else {
                this.none();
            }
        },
        none() {
            this.checked.forEach(item => this.uncheck(item));
        },
        uncheck({ id }) {
            const index = this.modelValue.indexOf(id);
            this.modelValue.splice(index, 1);
        },
    },
};
</script>
