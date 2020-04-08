// DYNAMICALLY CREATING THE NAVIGATION BAR

let list;
let list2;
let list3;
let list4;

const createNavigationBar = () => {
  // Create div and set it's class and id attribute
  const headerDiv = document.createElement("div");
  headerDiv.setAttribute("class", "header");
  headerDiv.setAttribute("id", "header");
  // Create the name paragraph and append it to div
  const nameHeading = document.createElement("h2");
  nameHeading.textContent = "Omogbare R. Sikpojie";
  headerDiv.appendChild(nameHeading);
  // Create nav element and set class attribute.
  const nav = document.createElement("nav");
  nav.setAttribute("class", "navbar");
  //Create ul and set it's class attribute
  const ul = document.createElement("ul");
  ul.setAttribute("class", "uo-list");

  // append ul to nav
  nav.appendChild(ul);

  // CREATE THE LIST ITEM AND APPEND THEM TO ul
  list = `<li><a href="#home">Home</a></li>`;
  list2 = `<li><a href="#about">About</a></li>`;
  list3 = `<li><a href="#portfolio">Portfolio</a></li>`;
  list4 = `<li><a href="#contact">Contact</a></li>`;

  let listItemArray = [list, list2, list3, list4];
  // loop through the array with map to return individual value.
  let listItem = listItemArray.map((val) => {
    return val;
  });

  // convert the new listItem array to strings
  let listItemString = listItem.join(" ");

  ul.innerHTML = listItemString;

  // append nav to headerDiv
  headerDiv.appendChild(nav);
  const header = document.querySelector("header");
  header.appendChild(headerDiv);
};
createNavigationBar(); // calling this function creates the navigation bar

// IMPLEMENTING SMOOTH SCROLLING
const navbarLinks = document.querySelectorAll(".navbar a");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
  smoothScroll(event);
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId =
    event.currentTarget.getAttribute("href") === "#"
      ? "header"
      : event.currentTarget.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeOutQuad(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

// Easing Function for smooth scrolling
function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}

// Visibility of the "go to top" button
let gotoTop = document.querySelector(".goto-top");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (scrolled === scrollable) {
    gotoTop.style = "visibility: visible;";
  }
});

// ADDING ACTIVE CLASS TO SECTION IN THE VIEWPORT
let sectionInViewport = function (elem) {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

//Defining the sections
let home = document.querySelector(".home");
let about = document.querySelector(".about");
let portfolio = document.querySelector(".portfolio");
let contact = document.querySelector(".contact");

//Getting all "li" elements
const sectionNodeList = document.querySelectorAll("li");

let homeLink = sectionNodeList[0];
let aboutLink = sectionNodeList[1];
let portfolioLink = sectionNodeList[2];
let contactLink = sectionNodeList[3];

homeLink.classList.add("active");

const showActiveClass = () => {
  window.addEventListener("scroll", () => {
    if (sectionInViewport(home)) {
      homeLink.classList.add("active");
    } else {
      homeLink.classList.remove("active");
    }

    if (sectionInViewport(about)) {
      aboutLink.classList.add("active");
    } else {
      aboutLink.classList.remove("active");
    }

    if (sectionInViewport(portfolio)) {
      portfolioLink.classList.add("active");
    } else {
      portfolioLink.classList.remove("active");
    }

    if (sectionInViewport(contact)) {
      contactLink.classList.add("active");
    } else {
      contactLink.classList.remove("active");
    }
  });
};

showActiveClass();
