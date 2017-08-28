/* eslint-disable max-len */
const blocks = {
  shape: {
    Circle: `<div class="sl-block" data-block-type="shape" data-svg-shape="circle" style="width: 200px; height: 200px;">
            <div class="sl-block-content" style="width: 100%; height: 100%;">
                <svg id="SvgjsSvg1018" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs">
                    <circle r="98.5" cx="100" cy="100" stroke="rgba(192,192,192,1)" stroke-width="3px" fill="rgba(0,0,0,0)"></circle>
                </svg>
            </div>
        </div>`,
    Ellipse: `<div class="sl-block" data-block-type="shape" data-svg-shape="ellipse" style="width: 200px; height: 200px;">
            <div class="sl-block-content" style="width: 100%; height: 100%;">
                <svg id="SvgjsSvg1011" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs">
                    <ellipse rx="98.5" ry="98.5" cx="100" cy="100" stroke="rgba(192,192,192,1)" stroke-width="3px"
                        fill="rgba(0,0,0,0)"></ellipse>
                </svg>
            </div>
        </div>`,
    Rect: `<div class="sl-block" data-block-type="shape" data-svg-shape="rect" style="width: 200px; height: 200px;">
            <div class="sl-block-content" style="width: 100%; height: 100%;">
                <svg id="SvgjsSvg1006" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs">
                    <rect width="197" height="197" x="1.5" y="1.5" stroke="rgba(192,192,192,1)" stroke-width="3px"
                        fill="rgba(0,0,0,0)"></rect>
                </svg>
            </div>
        </div>`,
  },
  text: `<div class="sl-block" data-block-type="text" style="position: absolute; width: 800px; top: 140px; left: 80px;">
        <div class="sl-block-content">
            <p>输入文本内容</p>
        </div>
    </div>`,

  image: `<div class="sl-block" data-block-type="image" style="position: absolute; width: 420px; height: auto; top: 240px; left: 270px;">
    <div class="sl-block-content" style="width: 100%; height: 100%; background-color:rgba(64,64,64,0.5)">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADR9JREFUeNrs3XGkXucdwPHzLlcIlxBCuHUncycVOrcyZZNZlVRrlb86m0zJbMIoY2RKGavO2GxMaZVMGZtVq5MqnU4jlf3TaYnFxgihVgsjxEoo8e739D3luEu79977nvOe3zmfD49b0Xvv+z7nfc/3Pud9z3kn0+m0AgBy+4wpAABBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABAEEHAAQdAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABAEEHAAQdAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQTcFACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADAIIOAIOwYgrSm5oCYMEmpsAKHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABgCVzpbjxcOUnwJUlrdABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdAFisFVNAIvfE2IyxL8bR+mv5t1sxrsa4EeNa/fVy/W8AozCZTqdmIbd5N+Ak4X3bG+NEjJP1OLTN7y9xfzHGH2O85aECg95fCLqge4L20EaMH9cRX13Qz/x3Hfen6v8G+wtBF3Q8QVtysA75mRh7WvodH8T4eYxf1v8N9heCLuh4gi5IeS38bD1WO/qd1+vV+nMeQthfCLqg4wm6e+V18fMx7lvS7385xret1rG/EHRBxxN050rEX4mxtuTbcSXGIzHe83DC/kLQs3IeOsvyjRgXexDzopz69naMr9osgBU6/uKe33dinOvhXH4Y4+EYFzyssL9A0PEE/XTlVLRymH1PT+fzZoz7q9mFacD+AkHHE/QOjsR4p+runew7VV5Lv7eaXXEO7C9IwWvodGVfvTJfTXBb12O8YJMBgg7/60fV7PrrWZSXBk7bbEAWDrnnl+EQWnkXeTnUvjfZ3JZD7p+vHHrH/gIrdPjILxLGvDhQzY4sAFihM/q/uI/Vq/OsykezfrbygS7YX2CFzsg9kfz2lzfzfd9mBKzQGfNf3OWQ9b+qnIfbm8oHudwV47aHG/YXWKEzRqcGEPOifIDMCZsTEHTG6qT7AiDo5FZeez4+oPtz3CYFBJ0x2qyjPhTlXPpDNisg6IzNPQP9IwVA0BH05DZs1lYdNQUg6PTP+gDv05rN2pryYThvV96rAIJO76wO8D7tt1lbi/np+jHzuqiDoCPo7lPemDfnWNRB0KFVe0xBqzEXdRB0euiDAd6nWzZr6zEXdRB0eubmAO+TT1zrJuaiDoJOj1wd4H1632btLOaiDoKOoLfmHzZrpzEXdRB0euDKAO/TZZu185iLOszJ56Hn19fPNy7vCP9PNZzruZfV+d0ebjt6HJzbZcybypstH47xZ1M7qP0FVuj02O0YFwZ0fy7YpEuPuZU6CDpL8uqA7suLNufSYy7q8Ckccs+vz4fQDsT4Z5X/sPu1GJ/zUOtFzJscfh/W/gIrdHrsRow/DOB+/Nqm7F3MrdTBCt1f3B0rH4n5t8TzW1aBd1XDvFBO5phbqVuhY4VOx/6efJX+KzHvdcyt1MEK3V/cHdqoV+l7k81tuTLc3dUwr0s/lJhbqVuhY4VOh8pV455KeLt/KOZpYm6ljhW6Fbq/uDtSVueXYtyXZF5/F+NbHl5pYm6lboUu6ILuCdqhwzHeqWans/VZuSrcF63OU8Zc1AV9tBxyp0vlfO6vx/iwx7exfETqI2KeOuaFw+8IOrSsXEK1HMq+3dNVXYn5VZspdcxFHUGHjrxcr9Rv9eg2vRfjyzH+YvMMIuaijqBDR8q56eU1zhs9uC1vVbPXzK/YLIOKuagj6NBhSL9QLfeNS+Wyrg9Ws9fOGV7MRR1Bh46Ui7fcX3V/zvf1GN+M8d2q32/SE3NRh7k4bS2/IZ2Gshbj6RiP1SFpQ/mj4bkYP6lc0nVMMd/6GBjrKW1OWxN0PEE7Vc5X/0GMU9XizlkvRwLK4fVybfYbHjajjfnYoy7ogo4n6FKUq8t9Lcaj1eww6fo2v79cIOZPMV6tvyLmY4+6oAs6nqC9WbmXj2PdqL/eybvV7Dzy8ilv1z08xFzUBV3Q8QRFzEXd/oI0vMsdGHPMC+9+R9ABMRd1EHRAzEUdBB0Qc1EHQQcxF3NRR9ABMRd1EHRgmTF/QcxFHUEH8sf8MVMh6gg6IOaiDoIOiLmog6ADYi7qIOgg5og6gg6IOaKOoANiLuog6ICYizoIOog5oo6gA2KOqCPogJiLOgg6dGctxmExR9QRdMhrPcalemSJupiLOgg6NBxuhHwtSdTFXNRB0KHhSB3w9ca/9T3qYi7qIOiwJeZv1gHfqq9RF3NRB0GHhqMxLn5CzPsadTEXdRB0aNisY35ojv+3L1EXc1EHQYeGY9XsMPvBbXzPsqMu5qIOgg4NX6pjfmAH37usqIu5qMNcJtPp1CzkNu8GnIj5RzvT/bv8Oe/H+EqMa2LODl2Oca/9BVbosH1lRfTGAmLe5UpdzIdrjylA0GH7HqhjvrrAn9l21MUcEHRoeCjGazH2tfCz24q6mAOCDg0nY5xvKeZtRV3MAUGHLTF/KcbeDn7XoqIu5oCgQ8OjHcZ8a9Q3dhHz34g5IOgwcyrG7zuOeTPqF3cQ9Y9jfsrmAwQdqup0HcZlnhK03aiLOSDo0HCmmr3+3Ifze+eNupgDgg4N34vxfM9u0/+LupgDgg4Nj8d4tqe37ZOiLuaAoEPD2RjP9Pw2bo26mAOCDg1PxvhZktv6cdSPiDnQphVTQDJP10HPpET9r9VyTqcDBB1656cxnkh628UcEHSoZofYz5oGAEEnr/Lmt8dNA4Cgk1c5x/yMaQAQdHIqp3idq2aXdAVA0Ekacx8lCiDoJI+587UBBJ3Eyqldv61mn2kOgKCTNOYvxThpKgAEnZz2xXglxkOmAkDQyRvz8zFOmAoAQSdvzF+L8YCpABB0clqN8XqM46YCYPd8fCrLsD/GG2IOYIVOXgfqmB8zFQCCTt6Yvxlj01QALJZD7nTloJgDWKGT26E65kdNBYAVOjmtxbgo5gBW6OS1Xsf8sKkAEHTyxvxS/RWAljnkThvWxBxA0MlvU8wBBB0AEHQAEHQAQNABAEEHAAQdAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAYAWrJgCWnAzxrumAe7oqimgDZPpdGoWcpt3A05MFdhf2F8Ml0PuACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ALBdK6ZgNKamAMAKHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABgCRcKS6/iSkAwAodAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABAEEHAAQdAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAEHQAQNABAEEHAAQdAAQdABB0AEDQAQBBBwBBBwAEHQAQdABA0AFA0AEAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAYDwXwEGAIic4adpx6atAAAAAElFTkSuQmCC"
            alt="" style="width: inherit; height: inherit; display: block;">
    </div>
  </div>`,
  icon: `<div class="sl-block" data-block-type="icon" style="width: 200px; height: 200px;">
        <div class="sl-block-content" style="width: 100%; height: 100%;">
    </div>
  </div>`,
  katex: `<div class="sl-block" data-block-type="latex" style="position: absolute; padding: 20px; width: auto; height: auto; top: 210px; left: 160px;">
        <div class="sl-block-content">
        </div>
  </div>`,
};

export default blocks;
