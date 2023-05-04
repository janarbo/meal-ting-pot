import React from "react";
import ted from "../src/images/aboutUs/ted_hwang.jpg"
import jacob from "../src/images/aboutUs/jacob_williams.jpg";
import derek from "../src/images/aboutUs/derek_wang.jpg"
import janar from "../src/images/aboutUs/janar_bokeyhan.jpg"
import Footer from "./Footer"
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Lottie from "lottie-react";
import chefIngredients from "./images/styling/chefIngredients.json";

const teamMembers = [
  {
    name: "Janar Bo",
    image:janar,
    bio: "I'm a Kazakh from Inner Asia living in LA, when I first moved to the city, I really missed the taste of home. But, that's when I started cooking up a storm in my own kitchen! I'm not a master chef, but I experimented with spices from local supermarkets to recreate the flavors I grew up with. I wanted to share my homemade dishes with more people who miss authentic food from home. Join us and let's bring authentic food to everyone! ",
    socialLinks: {
      Gitlab: "https://gitlab.com/Janarbo",
      Linkedin: "https://www.linkedin.com/in/janar-bokeyhan/",
    },
  },
  {
    name: "Ted Hwang",
    image: ted,
    bio: "As someone who isn't particularly skilled in cooking, I was intrigued when Janar pitched us her idea for our software app. With our e-commerce platform for home-cooked meals, I'm now able to eat cuisines from skilled chefs and explore a variety of culinary traditions from around the world.",
    socialLinks: {
      Gitlab: "https://gitlab.com/htedd",
      Linkedin: "https://www.linkedin.com/in/htedd10/",
    },
  },
  {
    name: "Derek Wang",
    image: derek,
    bio: "My love for cooking and sharing food really comes from watching my Mom make us meals as a kid. It started off with her giving me small tasks like throwing certain ingredients into the pan as she was cooking, and by the time I entered undergrad, I had the skills to cook for myself. My housemates would often walk into the kitchen, drawn by the sounds and smells of whatever I was cooking, and it brought me so much joy to be able to share my culture and what I was cooking with them. Meal-ting Pot is an everyday opportunity for others to feel that same joy that got me hooked in the first place.",
    socialLinks: {
      Gitlab: "https://gitlab.com/derekwangg",
      Linkedin: "https://www.linkedin.com/in/derek-wangg/",
    },
  },
  {
    name: "Jacob Williams",
    image: jacob,
    bio:
    "As a passionate food lover myself, I have always enjoyed trying out new dishes and exploring different cuisines to expand my palate. I hope that you too can experience the immense joy that I do through our awesome creation!",
    socialLinks: {
      Gitlab: "https://gitlab.com/Jacobdub",
      Linkedin: "https://www.linkedin.com/in/jacob-williamss/",
    },
  },
];

const AboutUs = () => {
  return (
    <>
    <div className="mockup-window-container mx-auto px-60 pt-10 text-center font-sans">
      <div
        data-theme="garden"
        className="mockup-window border border-[#b05e5e] pb-10"
      >
        <div className="border-t border-[#b05e5e]"></div>
          <div className="flex justify-center items-center">
            <div className="flex items-center flex-wrap">
              <div className="w-64 h-64">
                <Lottie animationData={chefIngredients} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-normal mt-0 mb-5">Our Mission Statement</h2>
          <p className="my-4 mx-auto max-w-2xl">
            At Meal-ting Pot, we strive to create a dynamic and inclusive platform
            that brings together food enthusiasts and aspiring chefs from all over
            the world. Our mission is to foster a community that encourages
            culinary exploration and skill development, while celebrating the
            diversity and richness of global cuisine. Whether you're a seasoned
            chef looking to share your passion with others or a food lover eager
            to expand your horizons, Meal-ting Pot is the place for you. Come join
            us on a journey of discovery and creativity, and let's explore the
            endless possibilities of food together!
          </p>
          <h2 className="text-2xl font-normal my-5">Our Promise/Pledge</h2>
          <p className="my-4 mx-auto max-w-2xl">
            As part of Meal-ting Pot's commitment to fostering a dynamic and
            inclusive community of food enthusiasts and aspiring chefs, we pledge
            to provide a platform that encourages culinary exploration, skill
            development, and celebrates the diversity and richness of global
            cuisine. We promise to continue to provide a space where seasoned
            chefs can share their passion and expertise with others, and food
            lovers can expand their horizons and embark on a journey of discovery
            and creativity. With Meal-ting Pot, you can trust that you will have
            access to an all-in-one platform that caters to your culinary needs,
            whether you're looking to showcase your culinary flair to the world or
            simply broaden your palate. Join us in our pledge to explore the
            endless possibilities of food together!
          </p>
      </div>
      <div>
        <h2 className="text-3xl font-light mt-4 mb-2 pt-10">
          Meet Our Team: Bidoof Supremacy
        </h2>
      </div>
      <div className="flex justify-center">
        {teamMembers.map((member) => (
          <div key={member.name} className="max-w-md mx-4 my-8">
            <div
              data-theme="garden"
              className="card w-96 shadow-xl pt-10 pl-10 pr-10 pb-5"
            >
              <img
                src={member.image}
                alt={member.name}
                className="avatar online rounded-full w-40 h-40 mx-auto"
              />
              <div className="card-body">
                <h2 className="card-title flex justify-center font-normal">
                  {member.name} {member.title}
                </h2>
              </div>
              <ul className="flex justify-center social-links">
                <li className="mx-2">
                  <a
                    href={member.socialLinks.Gitlab}
                    className="text-[#b05e5e] text-decoration-none hover:text-black"
                  >
                    <GitHubIcon />
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href={member.socialLinks.Linkedin}
                    className="text-[#b05e5e] text-decoration-none hover:text-black"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
              </ul>
              <p className="my-4 flex justify-center">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="pt-5">
        <Footer />
    </div>
    </>
  );
};

export default AboutUs;
