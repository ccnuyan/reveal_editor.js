/* eslint-disable max-len */

const slidesTemplates = {
  default: `
    <div class="slides"><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content"><h1>Title</h1></div></div></section><section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content">    <h2>Sub Title 1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content">    <p>Content</p></div></div></section><section><div class="sc-block" data-block-type="text" style="width: 721px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content">    <h2>1.1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content">    <p>Content</p></div></div></section></section><section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content">    <h2>Sub Title 2</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content">    <p>Content</p></div></div></section><section><div class="sc-block" data-block-type="text" style="width: 721px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content">    <h2>2.1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content">    <p>Content</p></div></div></section></section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text"><h1>End</h1></div></div></section></div>`,
};

const sectionTemplates = {
  blank: '',
  title: '<div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text"><h1>Title Text</h1></div></div>',
  titleAndSubtitle: '<div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 190px; height: auto;"><div class="sc-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text"><h1>Title Text</h1></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 350px; height: auto;"><div class="sc-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle"><h2>Subtitle</h2></div></div>',
};

const imageTamplates = {
  initial: '<div class="sc-block-content"><img src="" alt=""/></div>',
};

export default {
  slidesTemplates,
  sectionTemplates,
  imageTamplates,
};
