import React from "react";
import ted from "../src/images/aboutUs/ted_hwang.jpg"
import jacob from "../src/images/aboutUs/jacob_williams.jpg";
import derek from "../src/images/aboutUs/derek_wang.jpg"
import janar from "../src/images/aboutUs/janar_bokeyhan.jpg"
import Footer from "./Footer"

const teamMembers = [
  {
    name: "Janar Bo",
    image:janar,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    socialLinks: {
      Gitlab: "https://gitlab.com/Janarbo",
      Linkedin: "https://www.linkedin.com/in/janar-bokeyhan/",
    },
  },
  {
    name: "Ted Hwang",
    image: ted,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
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
    "As a passionate food lover myself, I have always enjoyed trying out new dishes and exploring different cuisines to expand my palate.",
    socialLinks: {
      Gitlab: "https://gitlab.com/Jacobdub",
      Linkedin: "https://www.linkedin.com/in/jacob-williams04/",
    },
  },
];

const AboutUs = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-8 text-[#b05e5e]">Meal-Ting-Pot</h1>
      <h2 className="text-2xl font-bold my-4">Our Mission Statement</h2>
      <p className="my-4 mx-auto max-w-2xl">
        At Meal-ting Pot, we strive to create a dynamic and inclusive platform
        that brings together food enthusiasts and aspiring chefs from all over
        the world. Our mission is to foster a community that encourages culinary
        exploration and skill development, while celebrating the diversity and
        richness of global cuisine. Whether you're a seasoned chef looking to
        share your passion with others or a food lover eager to expand your
        horizons, Meal-ting Pot is the place for you. Come join us on a journey
        of discovery and creativity, and let's explore the endless possibilities
        of food together!
      </p>
      <h2 className="text-2xl font-bold my-4">Our Promise/Pledge</h2>
      <p className="my-4 mx-auto max-w-2xl">
        As part of Meal-ting Pot's commitment to fostering a dynamic and
        inclusive community of food enthusiasts and aspiring chefs, we pledge to
        provide a platform that encourages culinary exploration, skill
        development, and celebrates the diversity and richness of global
        cuisine. We promise to continue to provide a space where seasoned chefs
        can share their passion and expertise with others, and food lovers can
        expand their horizons and embark on a journey of discovery and
        creativity. With Meal-ting Pot, you can trust that you will have access
        to an all-in-one platform that caters to your culinary needs, whether
        you're looking to showcase your culinary flair to the world or simply
        broaden your palate. Join us in our pledge to explore the endless
        possibilities of food together!
      </p>
      <h2 className="text-2xl font-bold my-4 text-[#b05e5e]">
        Meet Our Team: Bidoof Supremacy
      </h2>
      <div className="flex justify-center">
        {teamMembers.map((member) => (
          <div key={member.name} className="max-w-md mx-4 my-8">
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full w-48 h-48 mx-auto"
            />
            <h3 className="text-xl font-bold my-4 text-center">
              {member.name} {member.title}
            </h3>
            <div className="flex justify-center">
              <ul className="flex justify-center">
                {Object.keys(member.socialLinks).map((key) => (
                  <li key={key} className="mx-2">
                    <a
                      href={member.socialLinks[key]}
                      className="text-[#b05e5e] text-decoration-none hover:text-black"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="my-4">{member.bio}</p>
          </div>
        ))}
      </div>
        <div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;
