const navOpenBTN = document.querySelector(".nav-open-btn");
const navCloseBTN = document.querySelector(".nav-close-btn");
const mainNav = document.querySelector(".main-nav");

navOpenBTN.addEventListener("click", () => {
  mainNav.classList.add("main-nav-open");
  document.body.classList.add("stop-scrolling");
});

navCloseBTN.addEventListener("click", () => {
  mainNav.classList.remove("main-nav-open");
  document.body.classList.remove("stop-scrolling");
});

let displayStatus = window.getComputedStyle(navOpenBTN).display;

if (displayStatus === "none") {
  console.log("okay");
}

if (document.querySelector(".home-page")) {
  const serviceLogoOne = document.querySelector(".service-logo-one");

  const serviceLogoTwo = document.querySelector(".service-logo-two");

  const serviceLogoThree = document.querySelector(".service-logo-three");

  const logoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("logo-animate");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  logoObserver.observe(serviceLogoOne);
  logoObserver.observe(serviceLogoTwo);
  logoObserver.observe(serviceLogoThree);
}

//Lightbox Gallery Page//

if (document.querySelector(".gallery-page")) {
  const galleryImages = document.querySelectorAll(".gallery-image");

  const lightboxContainer = document.querySelector(".lightbox-container");

  const lightbox = document.querySelector(".lightbox");

  const lightboxLeftBTN = document.querySelector(".lightbox-btn-left");

  const lightboxRightBTN = document.querySelector(".lightbox-btn-right");

  const lightboxCloseBTN = document.querySelector(".lightbox-btn-close");

  const lightboxPicture = document.createElement("picture");

  const lightboxSourceOne = document.createElement("source");

  const lightboxSourceTwo = document.createElement("source");

  const lightboxSourceThree = document.createElement("source");

  const lightboxImage = document.createElement("img");

  let imageIndex;

  /* The const below are the only variables that should need to be changed on a case by case basis */
  const sourceOneMedia = 480; //media query px for source one small
  const sourceOneWidth = 297.953; //html width browser shows at the screen size specified in sourceOneMedia
  const sourceOneHeight = 446.922; //html height browser shows at the screen size specified in sourceOneMedia

  const sourceTwoMedia = 1024; //media query px for source two medium
  const sourceTwoWidth = 562.984; //html width browser shows at the screen size specified in sourceTwoMedia
  const sourceTwoHeight = 844.469; //html height browser shows at the screen size specified in sourceTwoMedia

  const sourceThreeMedia = 1025; //media query px for source two large
  const sourceThreeWidth = 600; //html width browser shows at the screen size specified in sourceThreeMedia
  const sourceThreeHeight = 900; //html height browser shows at the screen size specified in sourceThreeMedia

  function sourceDensityCalculator(sourceWidth, originalImage, nameExtension) {
    const sourceDesiredWidth = Math.ceil(sourceWidth);

    const endOfSrc = originalImage.search("-original.");

    const newSrc = originalImage.slice(0, endOfSrc);

    const widthPositionSrc = originalImage.lastIndexOf("-") + 1;

    const lastPositionSrc = originalImage.lastIndexOf(".");

    const originalWidthSrc = originalImage.slice(
      widthPositionSrc,
      lastPositionSrc
    );

    const srcDensity =
      Math.floor(originalWidthSrc / sourceDesiredWidth / 0.5) * 0.5;

    let sourceDensityResult;

    if (srcDensity >= 4) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@2x.webp 2x, ${newSrc}-lightbox-${nameExtension}@3x.webp 3x, ${newSrc}-lightbox-${nameExtension}@4x.webp 4x`;
    } else if (srcDensity === 3.5) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@2x.webp 2x, ${newSrc}-lightbox-${nameExtension}@3x.webp 3x, ${newSrc}-lightbox-${nameExtension}@3.5x.webp 3.5x`;
    } else if (srcDensity === 3) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@2x.webp 2x, ${newSrc}-lightbox-${nameExtension}@3x.webp 3x`;
    } else if (srcDensity === 2.5) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@2x.webp 2x, ${newSrc}-lightbox-${nameExtension}@2.5x.webp 2.5x`;
    } else if (srcDensity === 2) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@2x.webp 2x`;
    } else if (srcDensity === 1.5) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x, ${newSrc}-lightbox-${nameExtension}@1.5x.webp 1.5x`;
    } else if (srcDensity === 1) {
      sourceDensityResult = `${newSrc}-lightbox-${nameExtension}.webp 1x`;
    } else {
      console.log("Error src density is less than 1");
    }
    return sourceDensityResult;
  }

  function sourcePictureData() {
    lightboxSourceOne.setAttribute("media", `(max-width: ${sourceOneMedia}px)`);
    lightboxSourceOne.setAttribute(
      "srcset",
      sourceDensityCalculator(
        sourceOneWidth,
        galleryImages[imageIndex].src,
        "small"
      )
    );
    lightboxSourceOne.setAttribute("width", sourceOneWidth);
    lightboxSourceOne.setAttribute("height", sourceOneHeight);

    lightboxSourceTwo.setAttribute("media", `(max-width: ${sourceTwoMedia}px)`);
    lightboxSourceTwo.setAttribute(
      "srcset",
      sourceDensityCalculator(
        sourceTwoWidth,
        galleryImages[imageIndex].src,
        "medium"
      )
    );
    lightboxSourceTwo.setAttribute("width", sourceTwoWidth);
    lightboxSourceTwo.setAttribute("height", sourceTwoHeight);

    lightboxSourceThree.setAttribute(
      "media",
      `(min-width: ${sourceThreeMedia}px)`
    );
    lightboxSourceThree.setAttribute(
      "srcset",
      sourceDensityCalculator(
        sourceThreeWidth,
        galleryImages[imageIndex].src,
        "large"
      )
    );
    lightboxSourceThree.setAttribute("width", sourceThreeWidth);
    lightboxSourceThree.setAttribute("height", sourceThreeHeight);
  }

  for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].setAttribute("data-image-index", i);
  }

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxContainer.classList.add("active");
      document.body.classList.add("stop-scrolling");
      imageIndex = Number(image.getAttribute("data-image-index"));
      sourcePictureData();
      lightbox.appendChild(lightboxPicture);
      lightboxPicture.appendChild(lightboxSourceOne);
      lightboxPicture.appendChild(lightboxSourceTwo);
      lightboxPicture.appendChild(lightboxSourceThree);
      lightboxImage.src = galleryImages[imageIndex].src;
      lightboxPicture.appendChild(lightboxImage);
    });
  });

  lightboxLeftBTN.addEventListener("click", () => {
    if (imageIndex === 0) {
      return;
    } else {
      imageIndex--;
      sourcePictureData();
      lightboxImage.src = galleryImages[imageIndex].src;
    }
  });

  lightboxRightBTN.addEventListener("click", () => {
    if (imageIndex === galleryImages.length - 1) {
      return;
    } else {
      imageIndex++;
      sourcePictureData();
      lightboxImage.src = galleryImages[imageIndex].src;
    }
  });

  lightboxContainer.addEventListener("click", (e) => {
    //the if statment checks that if your not clicking on the lightbox which is the current target because its what the event listener has been added to, that it will do nothing, only when its the lightbox will it remove the active class
    if (e.target === e.currentTarget || e.target === lightboxCloseBTN) {
      lightboxContainer.classList.remove("active");
      document.body.classList.remove("stop-scrolling");
    } else {
      return;
    }
  });
}
