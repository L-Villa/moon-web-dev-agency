import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ReactComponent as CasesNext } from "../assets/arrow-right.svg";
import { ReactComponent as CasesPrev } from "../assets/arrow-left.svg";

const caseStudies = [
  {
    id: 1,
    subtitle: "Curology",
    title: "A custom formula for your skin's unique needs",
    img: "curology-min",
    active: false,
  },
  {
    id: 2,
    subtitle: "Yourspace",
    title: "Open space floor plans for your next venture",
    img: "yourspace-min",
    active: false,
  },
  {
    id: 3,
    subtitle: "Lumin",
    title: "For your best look ever",
    img: "lumin-min",
    active: false,
  },
  {
    id: 4,
    subtitle: "Lumin",
    title: "For your best look ever",
    img: "lumin-min",
    active: false,
  },
  {
    id: 5,
    subtitle: "Yourspace",
    title: "Open space floor plans for your next venture",
    img: "yourspace-min",
    active: false,
  },
  {
    id: 6,
    subtitle: "Curology",
    title: "A custom formula for your skin's unique needs",
    img: "curology-min",
    active: false,
  },
  {
    id: 7,
    subtitle: "Curology",
    title: "A custom formula for your skin's unique needs",
    img: "curology-min",
    active: false,
  },
  {
    id: 8,
    subtitle: "Yourspace",
    title: "Open space floor plans for your next venture",
    img: "yourspace-min",
    active: false,
  },
  {
    id: 9,
    subtitle: "Lumin",
    title: "For your best look ever",
    img: "lumin-min",
    active: false,
  },
];

const tl = gsap.timeline();

//? use useEffect to monitor the case active? If active === true then run gsap

export default function Cases() {
  const [width, setWidth] = useState(853);
  const [scroll, setScroll] = useState(0);

  const productAnimation = (e, index) => {
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    const windowOffsets = window.screen;
    const windowTop = windowOffsets.top;

    const initialCase = e.target.getBoundingClientRect();
    const initialY = initialCase.y;
    const initialX = initialCase.x;
    const initialHeight = initialCase.height;
    const initialWidth = initialCase.width;

    const finalCase = document.documentElement;
    const finalWidth = finalCase.clientWidth;
    const finalHeight = finalCase.clientHeight;

    //! remove scrolling until affect is done?
    for (let i = 0; i < caseStudies.length; i++) {
      if (index === i) {
        tl.to(`.case-details-${i + 1}`, {
          duration: 1,
          opacity: 0,
        })
          .to(".bruh", {
            duration: 0,
            delay: -1,
            top: scrollTop,
          })
          .fromTo(
            `.case-image-zoom:nth-of-type(${i + 1})`,
            {
              visibility: "hidden",
              y: initialY,
              x: initialX,
              width: initialWidth,
              height: initialHeight,
            },
            {
              duration: 2,
              delay: 0.2,
              visibility: "visible",
              y: windowTop,
              x: scrollLeft,
              width: finalWidth,
              height: finalHeight,
              ease: "expo.inOut",
            }
          );
      }
    }
  };

  //! change width so that it's not static
  //! only run these functions if page size is large enough
  const handleNext = (e) => {
    e.stopPropagation();
    if (scroll > (caseStudies.length - 6) * -width) {
      setScroll(scroll - width * 3);
    } else {
      setScroll((caseStudies.length - 3) * -width);
    }
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    if (scroll < -width * 3) {
      setScroll(scroll + width * 3);
    } else {
      setScroll(0);
    }
  };

  const newHandleScroll = (e) => {
    const dY = e.deltaY * 20;
    if (scroll >= (caseStudies.length - 3) * -width + dY && scroll <= dY) {
      setScroll(scroll - dY);
    } else if (scroll < (caseStudies.length - 3) * -width + dY && dY > 0) {
      setScroll((caseStudies.length - 3) * -width);
    } else if (scroll > dY && dY < 0) {
      setScroll(0);
    }
  };

  useEffect(() => {
    document.body.addEventListener("wheel", newHandleScroll);

    return () => {
      document.body.removeEventListener("wheel", newHandleScroll);
    };
  });

  return (
    <section className="cases">
      <div className="cases-wrapper">
        <div className="container-fluid">
          <div className="cases-navigation">
            <div
              className={"cases-arrow prev" + (scroll === 0 ? " disabled" : "")}
              onClick={handlePrev}
            >
              <CasesPrev />
            </div>
            <div
              className={
                "cases-arrow next" +
                (scroll <= (caseStudies.length - 3) * -width ? " disabled" : "")
              }
              onClick={handleNext}
            >
              <CasesNext />
            </div>
          </div>
          <div className="row">
            {caseStudies.map((caseItem, index) => (
              <div
                className="case"
                key={caseItem.id}
                onClick={(e) => productAnimation(e, index)}
                style={{
                  transform: `translateX(${scroll}px)`,
                }}
              >
                <div className={`case-details case-details-${index + 1}`}>
                  <span>{caseItem.subtitle}</span>
                  <h2> {caseItem.title} </h2>
                </div>
                <div className="case-image">
                  <img
                    src={require(`../assets/${caseItem.img}.png`)}
                    alt={caseItem.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bruh">
          {caseStudies.map((caseItem, index) => (
            <div
              className={
                "case-image-zoom"
              }
              key={caseItem.id}
            >
              <img
                src={require(`../assets/${caseItem.img}.png`)}
                alt={caseItem.title}
              />
            </div>
          ))}
        </div>
        <div className="fullscreen"></div>
      </div>
    </section>
  );
}
