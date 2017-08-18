/* eslint-disable max-len */

const slidesTemplates = {
  default: `<div class="slides">
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 270px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">
                            <h1>Title Text</h1>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 70px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Section Title">
                            <h2>Section Title</h2>
                        </div>
                    </div>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 210px; height: auto; text-align:left">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Content">
                            <p>Content</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 720px; left: 80px; top: 70px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Section Title">
                            <h2>Section Title</h2>
                        </div>
                    </div>
                    <div class="sl-block" data-block-type="text" style="width: 720px; left: 160px; top: 210px; height: auto; text-align:left">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Content">
                            <p>Content</p>
                        </div>
                    </div>
                </section>
            </div>`,
};

const sectionTemplates = {
  blank: '',
  title: `<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 270px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">
            <h1>Title Text</h1>
        </div>
    </div>`,
  titleAndSubtitle: `<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">
            <h1>Title Text</h1>
        </div>
        </div>
        <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 350px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle">
            <h2>Subtitle</h2>
        </div>
    </div>`,
  list: `<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">
            <h2>Title Text</h2>
        </div>
        </div>
        <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 264px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Text">
            <ul>
                <li>Bullet One</li>
                <li>Bullet Two</li>
                <li>Bullet Three</li>
            </ul>
        </div>
    </div>`,
    // maybe wrong
  textblocks: `<div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 190px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">
            <h1>Title Text</h1>
        </div>
        </div>
        <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 287px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Subtitle">
            <h2>Subtitle</h2>
        </div>
    </div>`,
  image: `<div class="sl-block" data-block-type="text" style="width: 800px; left: 79px; top: 50px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text">
            <h2>Title Text</h2>
        </div>
        </div>
        <div class="sl-block" data-block-type="image" style="width: 700px; height: 475px; left: 129px; top: 144px;">
        <div class="sl-block-content"></div>
    </div>`,
  textBlockAndImage: `<div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 87px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Title Text" style="text-align: left;">
            <h2>Title Text</h2>
        </div>
        </div>
        <div class="sl-block" data-block-type="text" style="width: 430px; left: 23px; top: 161px; height: auto;">
        <div class="sl-block-content" data-placeholder-tag="p" data-placeholder-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat." style="z-index: 13; text-align: left;">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec metus justo. Aliquam erat volutpat.</p>
        </div>
        </div>
        <div class="sl-block" data-block-type="image" style="width: 454px; height: 641px; left: 479px; top: 29px;">
        <div class="sl-block-content"></div>
    </div>`,
};

export default {
  slidesTemplates,
  sectionTemplates,
};
