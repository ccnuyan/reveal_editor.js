/* eslint-disable max-len */

const slidesTemplates = {
  default: '<div class="slides"><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content"><h1>Title</h1></div></div></section><section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content"> <h2>Sub Title 1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content"> <p>Content</p></div></div></section><section><div class="sc-block" data-block-type="text" style="width: 721px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content"> <h2>1.1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content"> <p>Content</p></div></div></section></section><section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content"> <h2>Sub Title 2</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content"> <p>Content</p></div></div></section><section><div class="sc-block" data-block-type="text" style="width: 721px; left: 80px; top: 70px; height: auto;"><div class="sc-block-content"> <h2>2.1</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 210px; height: auto; text-align:left"><div class="sc-block-content"> <p>Content</p></div></div></section></section><section><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content"><h1>End</h1></div></div></section></div>',
};

const sectionTemplates = {
  title: '<div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 270px; height: auto;"><div class="sc-block-content"><h1>Title Text</h1></div></div>',
  titleAndSubtitle: '<div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 110px; height: auto;"><div class="sc-block-content"><h2>Title</h2></div></div><div class="sc-block" data-block-type="text" style="width: 801px; left: 80px; top: 230px; height: auto;"><div class="sc-block-content"><div>Content</div></div></div>',
};

export default {
  slidesTemplates,
  sectionTemplates,
};
