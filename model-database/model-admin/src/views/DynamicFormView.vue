<template>
  <div>
    <dynamic-form
      :form="form"
      @submitted="formSubmitted"
      @error="processErrrors"
    />
    <button submit="true" :form="form.id">Submit</button>
  </div>
</template>

<script setup>
  import {ref,computed, onMounted } from 'vue';
  import { TextField, EmailField, SelectField } from '@asigloo/vue-dynamic-forms'
  //import { Validator, required, email } from '@asigloo/vue-dynamic-forms';

  let consoleOptions = ref([]);

  const form = computed(() => ({
    id: 'my-awesome-form',
    fields: {
      name: TextField({
        label: 'name',
      }),
      email: EmailField({
        label: 'email',
      }),
      console: SelectField({
        label: 'Console (Async Options)',
        optionValue: 'console',
        options: consoleOptions.value,
      }),
    }
  }));

  onMounted(async () => {
    try {
      //consoleOptions.value = await yourApiCall();
    } catch (e) {
      console.error(e);
    }
  });

  //return { form }
  
</script>
