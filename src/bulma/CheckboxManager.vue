<template>
    <card collapsible
        :collapsed="collapsed">
        <card-header class="has-background-light">
            <template #title>
                {{ title }}
            </template>
            <template #controls>
                <card-control>
                    <slot name="checkbox"
                        :update-below="updateBelow">
                        <input type="checkbox"
                            @change="updateBelow"
                            ref="checkbox">
                    </slot>
                </card-control>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="p-3">
            <checkbox-manager class="is-rounded checkbox-manager"
                :class="{ 'raises-on-hover': items[group]._items.length }"
                v-for="group in groups"
                collapsed
                :title="group"
                :key="group"
                :items="items[group]"
                v-model="modelValue"
                @change="update"
                :ref="setChildrenRef">
                <template #checkbox="props">
                    <slot name="checkbox"
                        v-bind="props"/>
                </template>
                <template #item="props">
                    <slot name="item"
                        v-bind="props"/>
                </template>
            </checkbox-manager>
            <checkbox-items :items="items._items"
                v-model="modelValue"
                @change="update"
                ref="items"
                v-if="hasItems">
                <template #item="props">
                    <slot name="item"
                        v-bind="props"/>
                </template>
            </checkbox-items>
        </card-content>
    </card>
</template>

<script>
import { shallowReadonly } from 'vue';
import {
    Card, CardHeader, CardContent, CardControl, CardCollapse,
} from '@enso-ui/card/bulma';
import CheckboxItems from './CheckboxItems.vue';
import { Checked, Unchecked } from '../statuses';

export default {
    name: 'CheckboxManager',

    components: {
        Card, CardControl, CheckboxItems, CardHeader, CardContent, CardCollapse,
    },

    props: {
        collapsed: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Array,
            required: true,
        },
    },

    emits: ['change'],

    data: () => ({
        ready: false,
        childrenRefs: [],
    }),

    computed: {
        checked() {
            return (!this.hasItems || this.itemsChecked)
                && (!this.hasChildren || this.childrenChecked);
        },
        childrenChecked() {
            return this.ready && !this.childrenRefs.some(child => !child.checked);
        },
        childrenUnchecked() {
            return this.ready && !this.childrenRefs.some(child => !child.unchecked);
        },
        itemsChecked() {
            return this.ready && this.$refs.items.status === Checked;
        },
        itemsUnchecked() {
            return this.ready && this.$refs.items.status === Unchecked;
        },
        hasChildren() {
            return this.groups.length > 0;
        },
        hasItems() {
            return this.items._items.length > 0;
        },
        groups() {
            return Object.keys(this.items).filter(key => key !== '_items');
        },
        unchecked() {
            return (!this.hasItems || this.itemsUnchecked)
                && (!this.hasChildren || this.childrenUnchecked);
        },
        checkbox() {
            return this.$refs.checkbox;
        },
    },

    mounted() {
        this.ready = true;
        this.update();
    },

    beforeUpdate() {
        this.childrenRefs = [];
    },

    methods: {
        change(checked) {
            if (checked) {
                this.check(true);
            } else {
                this.uncheck(true);
            }
        },
        check(below = false) {
            this.checkbox.indeterminate = false;
            this.checkbox.checked = true;

            if (below) {
                this.updateBelow();
            }
        },
        indeterminate() {
            this.checkbox.checked = false;
            this.checkbox.indeterminate = true;
        },
        setChildrenRef(el) {
            if (el) {
                this.childrenRefs.push(shallowReadonly(el));
            }
        },
        uncheck(below = false) {
            this.checkbox.checked = false;
            this.checkbox.indeterminate = false;

            if (below) {
                this.updateBelow();
            }
        },
        update() {
            if (this.checked) {
                this.check();
            } else if (this.unchecked) {
                this.uncheck();
            } else {
                this.indeterminate();
            }

            this.$emit('change');
        },
        updateBelow() {
            if (this.hasChildren) {
                this.childrenRefs
                    .forEach(child => child.change(this.checkbox.checked));
            }

            if (this.hasItems) {
                this.$refs.items.change(this.checkbox.checked);
            }
        },
    },
};
</script>

<style lang="scss">
    .checkbox-manager:not(:last-child) {
        margin-bottom: 0.3em;
    }
</style>
