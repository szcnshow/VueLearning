<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="p-col-12">
      <h1>Admin Log In</h1>
    </div>

    <Field v-solt="{field, errors}" v-model="username" name="uesrname">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <InputText placeholder="Username"
            :class="{ 'p-invalid':errors.length > 0 }"
            v-bind="field" />            
         </div>
         <small class="p-error" v-if="errors.length>0">
           Username is invalid
         </small>
      </div>
    </Field>

    <Field v-solt="{field, errors}" v-model="password" name="password">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <InputText placeholder="Password" type="password"
          :class="{'p-invalid': errors.length > 0 }"
          v-bind="field" />
        </div>
        <small class="p-error" v-if="errors.length > 0">
          Password is invalid
        </small>
      </div>
    </Field>

    <div class="p-col-12">
      <Button label="Log In" type="submit"/> 
    </div>
  </Form>
</template>

<script>
import * as yup from "yup"
import axios from "axios"
import { APIURL } from "@/constant"

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      schema,
    };
  },
  methods: {
    async onSubmit(values) {
      const {username, password} = values;
      try{
        const {
          data: {token },
        } = await axios.post(`${APIURL}/users/login`, {
          username, password,
        });
        localStorage.setItem("token", token);
        this.$router.push('/');
      } catch(error) {
        alert("Login failed");
      }
    }
  },
});
</script>
