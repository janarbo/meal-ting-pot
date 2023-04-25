import React from "react";

const teamMembers = [
  {
    name: "Janar Bo",
    image:
      "https://img.freepik.com/free-vector/plant-emoji_78370-262.jpg?w=826&t=st=1682322093~exp=1682322693~hmac=994b87fbe8336e70394cf41c7510320a93cf74ae100f877f204ceb1bc88abefe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    socialLinks: {
      Gitlab: "https://gitlab.com/Janarbo",
      Linkedin: "https://www.linkedin.com/in/janar-bokeyhan/",
    },
  },
  {
    name: "Ted Hwang",
    image:
      "https://img.freepik.com/free-vector/plant-emoji_78370-262.jpg?w=826&t=st=1682322093~exp=1682322693~hmac=994b87fbe8336e70394cf41c7510320a93cf74ae100f877f204ceb1bc88abefe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    socialLinks: {
      Gitlab: "https://gitlab.com/htedd",
      Linkedin: "https://www.linkedin.com/in/htedd10/",
    },
  },
  {
    name: "Derek Wang",
    image:
      "https://img.freepik.com/free-vector/plant-emoji_78370-262.jpg?w=826&t=st=1682322093~exp=1682322693~hmac=994b87fbe8336e70394cf41c7510320a93cf74ae100f877f204ceb1bc88abefe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    socialLinks: {
      Gitlab: "https://gitlab.com/derekwangg",
      Linkedin: "https://www.linkedin.com/in/john-doe",
    },
  },
  {
    name: "Jacob Williams",
    image:
      "https://img.freepik.com/free-vector/plant-emoji_78370-262.jpg?w=826&t=st=1682322093~exp=1682322693~hmac=994b87fbe8336e70394cf41c7510320a93cf74ae100f877f204ceb1bc88abefe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    socialLinks: {
      Gitlab: "https://gitlab.com/Jacobdub",
      Linkedin: "https://www.linkedin.com/in/jacob-williams04/",
    },
  },
];

const AboutUs = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-8">Meal-ting Pot</h1>
      <h2 className="text-2xl font-bold my-4">Our Mission Statement</h2>
      <p className="my-4 mx-auto max-w-2xl">Mission Statement.</p>
      <h2 className="text-2xl font-bold my-4">Our Promise/Pledge</h2>
      <p className="my-4 mx-auto max-w-2xl">Promise/Pledge.</p>
      <h2 className="text-2xl font-bold my-4">
        Meet Our Team: Bidoof Supremacy
      </h2>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map((member) => (
          <div key={member.name} className="max-w-md mx-4 my-8">
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full w-48 h-48 mx-auto"
            />
            <h3 className="text-xl font-bold my-4">
              {member.name} {member.title}
            </h3>
            <p className="my-4">{member.bio}</p>
            <ul className="flex justify-center">
              {Object.keys(member.socialLinks).map((key) => (
                <li key={key} className="mx-2">
                  <a href={member.socialLinks[key]}>{key}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
