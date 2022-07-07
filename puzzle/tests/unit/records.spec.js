import { shallowMount } from "@vue/test-utils";
import 'jest-localstorage-mock';
import RecordsPanel from "@/components/RecordsPanel.vue";

describe('Record.vue', ()=>{
  it('get records from local storage', ()=>{
    shallowMount(RecordsPanel, {});
    expect(localStorage.getItem).toHaveBeenCalledWith('records');
  });

})