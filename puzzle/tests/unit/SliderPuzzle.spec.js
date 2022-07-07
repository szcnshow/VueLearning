import { mount } from "@vue/test-utils";
import SliderPuzzle from "@/components/SliderPuzzle.vue";
import "jest-localstorage-mock";

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('SliderPuzzle.vue', ()=>{
  it('Insert the index of image to swap when we click on an image', ()=>{
    const wrapper = mount(SliderPuzzle);
    wrapper.find("#start-button").trigger('click');
    wrapper.find('img').trigger('click');
    expect(wrapper.vm.indexsToSwap.length).toBeGreaterThan(0);
  });

  it('swaps the image order when 2 images are clicked', ()=>{
    const wrapper = mount(SliderPuzzle);
    wrapper.find("#start-button").trigger('click');
    const [firstImage, secondImage] = wrapper.vm.shuffledPuzzleArray;
    wrapper.get('.column:nth-child(1) img').trigger('click');
    wrapper.get('.column:nth-child(2) img').trigger('click');
    expect(wrapper.vm.indexsToSwap.length).toBe(0);
    
    const [newFirstImage, newSecondImage] = wrapper.vm.shuffledPuzzleArray;
    expect(firstImage).toBe(newSecondImage);
    expect(secondImage).toBe(newFirstImage);
  });
  
  it('starts timer when start method is called', ()=>{
    const wrapper = mount(SliderPuzzle);
    wrapper.vm.Start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('stops timer when stop method is called', ()=>{
    const wrapper = mount(SliderPuzzle);
    wrapper.vm.Stop();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('records record to local storage', () => {
    const wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(),
          startDateTime: new Date()
        }
      }
    });
    wrapper.vm.recordSpeedRecords();
    const {elapsedDiff, elapsedTime} = wrapper.vm;
    const stringifiledRecords = JSON.stringify([{elapsedTime, elapsedDiff}]);
    expect(localStorage.setItem).toHaveBeenCalledWith('records', stringifiledRecords);
  });

  it('starts timer with Start button is clicked', () => {
    const wrapper = mount(SliderPuzzle);
    wrapper.get('#start-button').trigger('click');
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('stop timer with Quit button is clicked', () => {
    const wrapper = mount(SliderPuzzle
    , {
      data() {
        return {
          timer: setInterval(() => {}, 1000),
        }
      }
    });
    // wrapper.vm.Start();
    wrapper.get('#quit-button').trigger('click');
    expect(clearInterval).toHaveBeenCalledTimes(1);
    clearInterval(wrapper.vm.timer);
  });

  it('show the elapsed time', () => {
    const wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(2020, 0, 1, 0, 0, 2),
          startDateTime: new Date(2020, 0, 1, 0, 0, 1),
          timer: setInterval(()=>{}),
        }
      }
    });
    wrapper.vm.Start();
    expect(wrapper.html()).toContain("00:00:01");
    clearInterval(wrapper.vm.timer);
  });

  afterEach(() =>{
    jest.clearAllMocks();
  })
})

